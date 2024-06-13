"use client";
import styles from "./footer.module.css";

type FooterProps = {
  time?: Date;
  timeKey?: string;
};

export function Footer({ time, timeKey }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.element}>
        <p>
          <a
            href="http://thiefaine.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made by Thiefaine
          </a>
        </p>
        <p>
          <a
            href="https://open-meteo.com/en/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open-Meteo API
          </a>
        </p>
      </div>
      {
        <div className={styles.element}>
          <p className={styles.updateTime}>
            Update:{" "}
            {time?.toLocaleDateString("fr-FR", {
              year: "2-digit",
              month: "numeric",
              day: "numeric",
            }) +
              " " +
              time?.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
          </p>
        </div>
      }
    </footer>
  );
}
