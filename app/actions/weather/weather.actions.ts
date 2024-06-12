import { BrazilMap } from "@/data/brazilTopoJson";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addMapMoji(mapMoji: BrazilMap, country: string) {
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
      revalidatePath("/", "page");
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

export async function getMapMoji(country: string) {
  const mapMoji = await prisma.weather.findFirst({
    where: { country: country.toLowerCase() },
    orderBy: { time: "desc" },
  });
  return mapMoji;
}
