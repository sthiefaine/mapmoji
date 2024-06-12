"use client";
import styles from "@/app/page.module.css";

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
            made by Thiefaine
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
          <p>
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
