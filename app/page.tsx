import styles from "./page.module.css";
import { getMapMoji } from "./actions/weather/weather.actions";
import { Footer } from "@/components/footer/footer";
import { MapMojiType } from "@/data/mapmoji";
import { brazilMap2Json } from "@/data/country/brazil";
import { Main } from "@/components/main/main";

export default async function Home() {
  const resultData = await getMapMoji("brazil");
  const emojiMap: MapMojiType = resultData
    ? JSON.parse(resultData.object)
    : brazilMap2Json;

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1 className={styles.title}> 🗺️ Weather MapMoji</h1>
      </div>
      <Main emojiMap={emojiMap} time={resultData?.time} />
      <Footer time={resultData?.time} timeKey={resultData?.key} />
    </div>
  );
}
