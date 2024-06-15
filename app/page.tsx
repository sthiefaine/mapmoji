import styles from "./page.module.css";
import { getMapMoji } from "./actions/weather/weather.actions";
import { Footer } from "@/components/footer/footer";
import { MapMojiType, countriesList } from "@/data/mapmoji";
import { brazilMap2Json } from "@/data/country/brazil";
import { Main } from "@/components/main/main";
import { TimeUpdate } from "@/components/timeUpdate/timeUpdate";
import { headers } from "next/headers";
import { Header } from "@/components/header/header";

export default async function Home() {
  const defaultCountry = headers().get("x-country") ?? "BR";

  const countrySelected =
    countriesList.find((country) => country.countryCode === defaultCountry) ??
    countriesList.find((country) => country.countryCode === "BR");

  const countryName = countrySelected?.name ?? defaultCountry;
  const countryMapData = countrySelected?.mapData ?? brazilMap2Json;

  const resultData = await getMapMoji(countryName);
  const emojiMap: MapMojiType = resultData
    ? JSON.parse(resultData.object)
    : countryMapData;

  return (
    <div className={styles.app}>
      <Header />
      <TimeUpdate time={resultData?.time} country={countrySelected} />
      <Main
        emojiMap={emojiMap}
        time={resultData?.time}
        country={countrySelected}
      />
      <Footer time={resultData?.time} timeKey={resultData?.key} />
    </div>
  );
}
