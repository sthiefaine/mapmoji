"use server";
import { MapMojiForDayType } from "@/data/mapmoji";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getMapMojiForDay(country: string) {
  try {
    const mapMoji = await prisma.weatherForDay.findMany({
      where: { country: country.toLowerCase() },
      orderBy: { time: "asc" },
    });
    
    console.log(`Récupération de ${mapMoji.length} entrées météo pour ${country}`);
    
    return mapMoji;
  } catch (error) {
    console.error('Erreur lors de la récupération des données météo pour', country, ':', error);
    return [];
  }
}

export async function addMapMojiForDay(
  mapMoji: MapMojiForDayType,
  country: string,
  isUpdateHour: number | null
) {
  const mapMojiForDay = mapMoji.object;
  
  // Gérer correctement la date sans ajouter "Z" si c'est déjà une date ISO
  let today: Date;
  try {
    // Si mapMoji.time est déjà une date ISO complète, l'utiliser directement
    if (mapMoji.time.includes('T') && (mapMoji.time.includes('Z') || mapMoji.time.includes('+'))) {
      today = new Date(mapMoji.time);
    } else {
      // Sinon, ajouter le timezone du pays
      today = new Date(mapMoji.time + "Z");
    }
  } catch (error) {
    console.error('Erreur de parsing de date pour', country, mapMoji.time, error);
    today = new Date(mapMoji.time + "Z");
  }
  
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
        data: result,
        country: country,
        time: today.toISOString(),
        isUpdateHour: isUpdateHour
      };
    } else {
      return {
        success: false,
        error: 'No result returned from database operation',
        country: country,
        time: today.toISOString()
      };
    }
  } catch (error) {
    console.error('Error saving weather data for', country, ':', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      country: country,
      time: today.toISOString()
    };
  }
}
