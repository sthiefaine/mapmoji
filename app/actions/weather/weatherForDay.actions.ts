"use server";
import { MapMojiForDayType } from "@/data/mapmoji";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getMapMojiForDay(country: string) {
  const mapMoji = await prisma.weatherForDay.findMany({
    where: { country: country.toLowerCase() },
    orderBy: { time: "asc" },
  });
  return mapMoji;
}

export async function addMapMojiForDay(
  mapMoji: MapMojiForDayType,
  country: string,
  isUpdateHour: number | null
) {
  const mapMojiForDay = mapMoji.object;
  const today = new Date(mapMoji.time + "Z");
  const yesterday = new Date(new Date(today).setDate(today.getDate() - 1));

  try {
    const result = await prisma.weatherForDay.upsert({
      where: {
        country_time: {
          country: country.toLowerCase(),
          time: isUpdateHour === 0 ? yesterday : today,
        },
      },
      update: {
        time: today,
        object: JSON.stringify(mapMojiForDay),
      },
      create: {
        country: country.toLowerCase(),
        time: today,
        object: JSON.stringify(mapMojiForDay),
      },
    });

    if (result) {
      revalidatePath(`/country/${country.toLowerCase()}`, "page");
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
