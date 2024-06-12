import { Weather } from "@/components/(server)/weather/weather";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1 className={styles.title}>Weather MapMoji 🗺️</h1>

        <p className={styles.subtitle}>Previsão no Brasil 🇧🇷</p>
      </div>
      <Weather />
      <footer className={styles.footer}>
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
      </footer>
    </div>
  );
}
