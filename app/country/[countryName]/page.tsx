"use server";
import { MapMojiType, countriesList, notFoundCountry } from "@/data/mapmoji";
import styles from "@/app/page.module.css";
import { Footer } from "@/components/footer/footer";
import { Main } from "@/components/main/main";
import { Header } from "@/components/header/header";
import { getMapMojiForDay } from "@/app/actions/weather/weatherForDay.actions";

export async function generateStaticParams() {
  const items = countriesList;

  return items.map((item) => ({
    countryName: item.name.toLowerCase(),
  }));
}

type CountryParams = {
  countryName: string;
};

export default async function Country({ params }: { params: CountryParams }) {
  const { countryName } = params;

  const fallbackCountry = {
    ...countriesList[0],
  };

  const mapData: MapMojiType =
    countriesList.find((country) => country.name.toLowerCase() === countryName)
      ?.mapData ?? notFoundCountry.mapData;

  const country =
    countriesList.find(
      (country) => country.name.toLowerCase() === countryName
    ) ?? fallbackCountry;

  const resultData = await getMapMojiForDay(countryName);

  const emojiMaps: MapMojiType[] =
    resultData.length > 0
      ? resultData
          .filter((r) => r.country === countryName)
          .map((re) => JSON.parse(re.object))
      : [mapData];

  const timesList = resultData.map((time) => time.time);

  return (
    <div className={styles.app}>
      <Header />
      <Main
        emojiMaps={emojiMaps}
        timesList={timesList}
        country={country ?? notFoundCountry}
      />
      <Footer time={resultData[10]?.time} />
    </div>
  );
}
