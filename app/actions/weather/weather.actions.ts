"use server";
import { MapMojiType } from "@/data/mapmoji";
import prisma from "@/lib/prisma";

export async function getMapMoji(country: string) {
  const mapMoji = await prisma.weather.findFirst({
    where: { country: country.toLowerCase() },
    orderBy: { time: "desc" },
  });
  return mapMoji;
}

export async function addMapMoji(mapMoji: MapMojiType, country: string) {
  const today = new Date();
  const currentHour = today.getHours();

  let mapKey = "";

  if (currentHour < 12) {
    mapKey = "morning";
  } else if (currentHour < 18) {
    mapKey = "afternoon";
  } else {
    mapKey = "evening";
  }

  try {
    const result = await prisma.weather.upsert({
      where: { country: country.toLowerCase() },
      update: {
        time: today,
        key: mapKey,
        object: JSON.stringify(mapMoji),
      },
      create: {
        country: country.toLowerCase(),
        time: today,
        key: mapKey,
        object: JSON.stringify(mapMoji),
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
