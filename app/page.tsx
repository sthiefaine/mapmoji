import { Weather } from "@/components/(server)/weather/weather";
import styles from "./page.module.css";
import { getMapMoji } from "./actions/weather/weather.actions";
import { BrazilMap, brazilMap2Json } from "@/data/brazilTopoJson";

export default async function Home() {
  const resultData = await getMapMoji("brazil");
  const emojiMap: BrazilMap = resultData
    ? JSON.parse(resultData.object)
    : brazilMap2Json;

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1 className={styles.title}>Weather MapMoji 🗺️</h1>

        <p className={styles.subtitle}>Previsão no Brasil 🇧🇷</p>
      </div>
      <Weather emojiMap={emojiMap} />
      <footer className={styles.footer}>
        <div className={styles.element}>
          <p>
            dev{" "}
            <a
              href="http://thiefaine.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Thiefaine
            </a>
          </p>
          <p>
            {" "}
            weather api <a></a>
          </p>
        </div>
        {resultData?.key && (
          <div className={styles.element}>
            <p>
              {resultData?.time.toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            <p>{resultData?.key}</p>
          </div>
        )}
      </footer>
    </div>
  );
}
