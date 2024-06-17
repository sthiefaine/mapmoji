import styles from "./page.module.css";
import { getMapMoji } from "./actions/weather/weather.actions";
import { Footer } from "@/components/footer/footer";
import {
  Country,
  MapMojiForDayType,
  MapMojiType,
  countriesList,
} from "@/data/mapmoji";
import { brazilMap2Json } from "@/data/country/brazil";
import { Main } from "@/components/main/main";
import { TimeUpdate } from "@/components/timeUpdate/timeUpdate";
import { headers } from "next/headers";
import { Header } from "@/components/header/header";
import { getMapMojiForDay } from "./actions/weather/weatherForDay.actions";

export default async function Home() {
  const defaultCountry = headers().get("x-country") ?? "BR";

  const fallbackCountry: Country = {
    ...countriesList[0],
  };

  const countrySelected: Country =
    countriesList.find((country) => country.countryCode === defaultCountry) ??
    countriesList.find((country) => country.countryCode === "BR") ??
    fallbackCountry;

  const countryName = countrySelected?.name ?? defaultCountry;
  const countryMapData = countrySelected?.mapData ?? brazilMap2Json;

  const resultData = await getMapMojiForDay(countryName);

  const emojiMaps: MapMojiType[] =
    resultData.length > 0
      ? resultData
          .filter((r) => r.country === countryName)
          .map((re) => JSON.parse(re.object))
      : [countryMapData];

  const timesList = resultData.map((time) => time.time);

  console.log("timesList", timesList);
  return (
    <div className={styles.app}>
      <Header />
      <TimeUpdate timesList={timesList} country={countrySelected} />
      <Main
        emojiMaps={emojiMaps}
        timesList={timesList}
        country={countrySelected}
      />
      <Footer time={resultData[10]?.time} />
    </div>
  );
}
