"use server";
import { MapMojiType, countriesList } from "@/data/mapmoji";
import { getMapMoji } from "@/app/actions/weather/weather.actions";

import styles from "@/app/page.module.css";
import { Weather } from "@/components/weather/weather";
import { Footer } from "@/components/footer/footer";
import { Selector } from "@/components/selector/selector";

export async function generateStaticParams() {
  const items = countriesList;
  return items.map((item) => ({
    country: item.name.toLowerCase(),
    mapData: item.mapData,
  }));
}

type CountryParams = {
  country: string;
  mapData: MapMojiType;
};

export default async function Country({ params }: { params: CountryParams }) {
  const { country, mapData } = params;
  const resultData = await getMapMoji(country);
  const emojiMap: MapMojiType = resultData
    ? JSON.parse(resultData.object)
    : mapData;

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1 className={styles.title}> 🗺️ Weather MapMoji</h1>{" "}
      </div>

      <Selector time={resultData?.time} />
      <Weather emojiMap={emojiMap} />
      <Footer time={resultData?.time} timeKey={resultData?.key} />
    </div>
  );
}
