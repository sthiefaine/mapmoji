"use server";
import { Weather } from "@/components/(server)/weather/weather";
import styles from "./page.module.css";
import { getMapMoji } from "./actions/weather/weather.actions";
import { MapMojiType, brazilMap2Json } from "@/data/brazilTopoJson";
import { Footer } from "@/components/footer/footer";

export default async function Home() {
  const resultData = await getMapMoji("brazil");
  const emojiMap: MapMojiType = resultData
    ? JSON.parse(resultData.object)
    : brazilMap2Json;

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1 className={styles.title}>Weather MapMoji 🗺️</h1>

        <p className={styles.subtitle}>Previsão no Brasil 🇧🇷</p>
      </div>
      <Weather emojiMap={emojiMap} />
      <Footer time={resultData?.time} timeKey={resultData?.key} />
    </div>
  );
}
