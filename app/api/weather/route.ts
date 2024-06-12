import { NextRequest, NextResponse } from "next/server";
import { brazilMap2Json } from "@/data/brazilTopoJson";
import { getWeatherEmoji } from "@/helpers/open-meteo";
import { addMapMoji } from "@/app/actions/weather/weather.actions";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const getEmoji = async () => {
    const updatedBrazilMap = await Promise.all(
      brazilMap2Json.map(async (row) => {
        const updatedColumns = await Promise.all(
          row.columns.map(async (col) => {
            const lat = col.lat;
            const long = col.long;
            const params = {
              latitude: lat,
              longitude: long,
              current:
                "temperature_2m,relative_humidity_2m,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m",
            };

            const url = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&current=${params.current}`;

            const weather = await fetch(url, { cache: "no-store" }).then(
              (res) => res.json()
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

    return updatedBrazilMap;
  };

  try {
    const updatedMap = await getEmoji();
    const newMapmoji = await addMapMoji(updatedMap, "brazil");

    if (!newMapmoji.success) {
      return new NextResponse("error", {
        status: 500,
      });
    }

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
