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
  
  // Vérifier si les données contiennent les informations de lever/coucher du soleil
  const hasSunData = mapMojiForDay.some((row) => 
    row.columns.some((col) => 
      col.sunrise && col.sunset
    )
  );

  if (!hasSunData) {
    console.error('Missing sunrise/sunset data for country:', country);
  }

  try {
    const result = await prisma.weatherForDay.upsert({
      where: {
        country_time: {
          country: country.toLowerCase(),
          time: today,
        },
      },
      update: {
        object: JSON.stringify(mapMojiForDay),
      },
      create: {
        country: country.toLowerCase(),
        time: today,
        object: JSON.stringify(mapMojiForDay),
      },
    });

    if (result) {
      revalidatePath(`/country/${country.toLowerCase()}`);
      return {
        success: true,
      };
    }
  } catch (error) {
    console.error('Error saving weather data:', error);
    return {
      success: false,
    };
  }

  return {
    success: false,
  };
}
