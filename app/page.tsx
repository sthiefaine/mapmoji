import { Weather } from "@/components/(server)/weather/weather";
import styles from "./page.module.css";
import { getMapMoji } from "./actions/weather/weather.actions";
import { Footer } from "@/components/footer/footer";
import { Selector } from "@/components/selector/selector";
import { MapMojiType } from "@/data/mapmoji";
import { brazilMap2Json } from "@/data/country/brazil";

export default async function Home() {
  const resultData = await getMapMoji("brazil");
  const emojiMap: MapMojiType = resultData
    ? JSON.parse(resultData.object)
    : brazilMap2Json;

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1 className={styles.title}>Weather MapMoji 🗺️</h1>
      </div>

      <Selector />
      <Weather emojiMap={emojiMap} />
      <Footer time={resultData?.time} timeKey={resultData?.key} />
    </div>
  );
}
