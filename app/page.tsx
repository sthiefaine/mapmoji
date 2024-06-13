import styles from "./page.module.css";
import { getMapMoji } from "./actions/weather/weather.actions";
import { Footer } from "@/components/footer/footer";
import { MapMojiType, countriesList } from "@/data/mapmoji";
import { brazilMap2Json } from "@/data/country/brazil";
import { Main } from "@/components/main/main";

export default async function Home() {
  const countrySelected = countriesList.find(
    (country) => country.name === "brazil"
  );
  const countryName = countrySelected?.name ?? "brazil";
  const countryMapData = countrySelected?.mapData ?? brazilMap2Json;

  const resultData = await getMapMoji(countryName);
  const emojiMap: MapMojiType = resultData
    ? JSON.parse(resultData.object)
    : countryMapData;

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1 className={styles.title}> 🗺️ Weather MapMoji</h1>
      </div>
      <Main
        emojiMap={emojiMap}
        time={resultData?.time}
        country={countrySelected}
      />
      <Footer time={resultData?.time} timeKey={resultData?.key} />
    </div>
  );
}
