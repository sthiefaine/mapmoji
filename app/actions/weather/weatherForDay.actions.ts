"use server";
import { MapMojiForDayType } from "@/data/mapmoji";
import prisma from "@/lib/prisma";

export async function getMapMojiForDay(country: string) {
  const mapMoji = await prisma.weatherForDay.findFirst({
    where: { country: country.toLowerCase() },
    orderBy: { time: "desc" },
  });
  return mapMoji;
}

export async function addMapMojiForDay(
  mapMoji: MapMojiForDayType,
  country: string
) {
  const mapMojiForDay = mapMoji.object;
  const todayHour = new Date(mapMoji.time);

  try {
    const result = await prisma.weatherForDay.upsert({
      where: {
        country_time: {
          country: country.toLowerCase(),
          time: todayHour,
        },
      },
      update: {
        time: todayHour,
        object: JSON.stringify(mapMojiForDay),
      },
      create: {
        country: country.toLowerCase(),
        time: todayHour,
        object: JSON.stringify(mapMojiForDay),
      },
    });

    if (result) {
      return {
        success: true,
      };
    }
  } catch (error) {
    return {
      success: false,
    };
  }

  return {
    success: false,
  };
}
