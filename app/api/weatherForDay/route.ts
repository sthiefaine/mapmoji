export const maxDuration = 300;

import { NextRequest, NextResponse } from "next/server";
import { WeatherDataForDay, getWeatherEmoji } from "@/helpers/open-meteo";
import { revalidatePath } from "next/cache";
import {
  Country,
  MapMojiForDayType,
  MapMojiType,
  countriesList,
} from "@/data/mapmoji";
import { addMapMojiForDay } from "@/app/actions/weather/weatherForDay.actions";

const isUpdateHourForCountry = (country: Country) => {
  const time = new Date();
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    timeZone: country.timeZone ?? "UTC",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const localTimeString = formatter.format(time);
  const [localHour, localMinute] = localTimeString.split(":").map(Number);

  let result = null;

  // in case of debug
  /*   console.log(
    "update hour",
    country.name,
    localHour,
    country.updateHours
  ); */

  if (country.updateHours.includes(localHour.toString())) {
    result = localHour;
  }
  if (localHour === 0) {
    result = 0;
  }

  return result;
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getEmoji = async (country: Country) => {
  let updatedMapForDay: MapMojiForDayType[] = Array(24)
    .fill(null)
    .map((_, i) => ({
      time: "",
      object: country.mapData.map((row) => ({
        row: row.row,
        columns: row.columns.map((col) => ({
          emoji: col.emoji,
          space: col.space,
          lat: col.lat,
          long: col.long,
          uv_index_clear_sky: 0,
          temperature_2m: 0,
          sunrise: "",
          sunset: "",
        })),
      })),
    }));

  for (const row of country.mapData) {
    for (const col of row.columns) {
      const lat = col.lat;
      const long = col.long;
      if (lat && long) {
        const params = {
          latitude: lat,
          longitude: long,
          uv: "uv_index,uv_index_clear_sky,",
          current: "temperature_2m,is_day,weather_code,",
          daily: "sunrise,sunset",
          timezone: country.timeZone ?? "UTC",
          forecast_days: "1",
        };

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&hourly=${params.current}${params.uv}&daily=${params.daily}&timezone=${params.timezone}&forecast_days=${params.forecast_days}`;

        try {
          const weather: WeatherDataForDay = await fetch(url, {
            cache: "no-store",
          }).then((res) => res.json());

          if (
            !weather.hourly ||
            !weather.hourly.time ||
            !weather.daily ||
            !weather.daily.sunrise ||
            !weather.daily.sunset
          ) {
            console.error("Invalid weather data structure:", weather);
            continue;
          }

          const sunrise = weather.daily.sunrise[0];
          const sunset = weather.daily.sunset[0];

          weather.hourly.time.forEach((time: string, hourIndex: number) => {
            const currentWeatherData = {
              time: time,
              is_day: weather.hourly.is_day[hourIndex],
              weather_code: weather.hourly.weather_code[hourIndex],
              sunrise: sunrise,
              sunset: sunset,
            };
            const weatherEmoji = getWeatherEmoji(
              currentWeatherData,
              country.name.toLowerCase()
            );

            updatedMapForDay[hourIndex].time = time;
            updatedMapForDay[hourIndex].object[country.mapData.indexOf(row)].columns[
              row.columns.indexOf(col)
            ].emoji = weatherEmoji?.emoji ?? col.emoji;
            updatedMapForDay[hourIndex].object[country.mapData.indexOf(row)].columns[
              row.columns.indexOf(col)
            ].uv_index_clear_sky = weather.hourly.uv_index_clear_sky[hourIndex];
            updatedMapForDay[hourIndex].object[country.mapData.indexOf(row)].columns[
              row.columns.indexOf(col)
            ].temperature_2m = weather.hourly.temperature_2m[hourIndex];
            updatedMapForDay[hourIndex].object[country.mapData.indexOf(row)].columns[
              row.columns.indexOf(col)
            ].sunrise = sunrise;
            updatedMapForDay[hourIndex].object[country.mapData.indexOf(row)].columns[
              row.columns.indexOf(col)
            ].sunset = sunset;
          });
          await delay(100);
        } catch (error) {
          console.error(`Error fetching weather data for coordinates ${lat},${long}:`, error);
        }
      }
    }
  }

  return updatedMapForDay as MapMojiForDayType[];
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  const url = new URL(req.url);
  const forceUpdate = url.searchParams.get("update");

  const authHeader = req.headers.get("authorization");

  if (forceUpdate) {
    if (forceUpdate !== process.env.FORCE_UPDATE) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
  } else {
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
  }

  try {
    let updatedAnyCountry = false;
    for (const country of countriesList) {
      let isUpdateHour = null;
      isUpdateHour = isUpdateHourForCountry(country);
      if (
        typeof isUpdateHour === "number" ||
        forceUpdate === process.env.FORCE_UPDATE
      ) {
        const updatedMap = await getEmoji(country);

        for (const updatedMapForDay of updatedMap) {
          const newMapmoji = await addMapMojiForDay(
            updatedMapForDay,
            country.name,
            isUpdateHour
          );

          if (!newMapmoji.success) {
            return new NextResponse(`error with: ${country.name}`, {
              status: 500,
            });
          }
        }

        updatedAnyCountry = true;
      }
    }

    if (!updatedAnyCountry) {
      return new NextResponse(
        "No countries are due for an update at this time",
        { status: 200 }
      );
    }

    revalidatePath("/", "page");
    return new NextResponse("success", {
      status: 200,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return new NextResponse("error", {
      status: 500,
    });
  }
};
