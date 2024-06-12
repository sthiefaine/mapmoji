import { NextRequest, NextResponse } from "next/server";
import { MapMojiType, brazilMap2Json } from "@/data/brazilTopoJson";
import { getWeatherEmoji } from "@/helpers/open-meteo";
import { addMapMoji } from "@/app/actions/weather/weather.actions";
import { revalidatePath } from "next/cache";

type Country = {
  name: string;
  mapData: any;
  timeZone: string;
  updateHours: string[];
  countryCodeLanguage: string;
};

const countriesList: Country[] = [
  {
    name: "brazil",
    mapData: brazilMap2Json,
    timeZone: "America/Sao_Paulo",
    updateHours: ["6", "11", "17", "22"],
    countryCodeLanguage: "pt-BR",
  },
];

const isUpdateHourForCountry = (country: Country) => {
  const { timeZone, updateHours, countryCodeLanguage } = country;
  const countryTime = new Date().toLocaleString(countryCodeLanguage, {
    timeZone,
  });
  const countryDate = new Date(countryTime);
  const currentHour = countryDate.getHours().toString();
  return updateHours.includes(currentHour);
};

const getEmoji = async (country: Country) => {
  const updatedMap = await Promise.all(
    country.mapData.map(async (row: MapMojiType[0]) => {
      const updatedColumns = await Promise.all(
        row.columns.map(async (col: MapMojiType[0]["columns"][0]) => {
          const lat = col.lat;
          const long = col.long;
          const params = {
            latitude: lat,
            longitude: long,
            current:
              "temperature_2m,relative_humidity_2m,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m",
          };

          const url = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&current=${params.current}`;

          const weather = await fetch(url, { cache: "no-store" }).then((res) =>
            res.json()
          );

          const weatherEmoji = getWeatherEmoji(weather);

          col.emoji = weatherEmoji?.emoji ?? col.emoji;

          return col;
        })
      );

      row.columns = updatedColumns;
      return row;
    })
  );

  return updatedMap;
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  const url = new URL(req.url);
  const forceUpdate = url.searchParams.get("update");

  const authHeader = req.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  let updatedAnyCountry = false;

  try {
    for (const country of countriesList) {
      if (
        isUpdateHourForCountry(country) ||
        forceUpdate === process.env.FORCE_UPDATE
      ) {
        const updatedMap = await getEmoji(country);
        const newMapmoji = await addMapMoji(updatedMap, country.name);

        if (!newMapmoji.success) {
          return new NextResponse(`error with: ${country}`, {
            status: 500,
          });
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
