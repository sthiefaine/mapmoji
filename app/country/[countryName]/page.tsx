"use server";
import { MapMojiType, countriesList } from "@/data/mapmoji";
import { getMapMoji } from "@/app/actions/weather/weather.actions";

import styles from "@/app/page.module.css";
import { Footer } from "@/components/footer/footer";
import { Main } from "@/components/main/main";
import { TimeUpdate } from "@/components/timeUpdate/timeUpdate";
import { Header } from "@/components/header/header";

export async function generateStaticParams() {
  const items = countriesList;
  return items.map((item) => ({
    countryName: item.name.toLocaleLowerCase(),
  }));
}

type CountryParams = {
  countryName: string;
};

export default async function Country({ params }: { params: CountryParams }) {
  const { countryName } = params;

  const mapData: MapMojiType = countriesList.find(
    (country) => country.name.toLowerCase() === countryName
  )?.mapData;

  const country = countriesList.find(
    (country) => country.name.toLowerCase() === countryName
  );

  const resultData = await getMapMoji(countryName);

  const emojiMap: MapMojiType = resultData
    ? JSON.parse(resultData.object)
    : mapData;

  return (
    <div className={styles.app}>
      <Header />
      <TimeUpdate time={resultData?.time} country={country} />
      <Main emojiMap={emojiMap} time={resultData?.time} country={country} />
      <Footer time={resultData?.time} timeKey={resultData?.key} />
    </div>
  );
}
