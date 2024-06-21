"use client";
import { Link as LinkIcon } from "lucide-react";
import styles from "./footer.module.css";
import Link from "next/link";

type FooterProps = {
  time?: Date;
};

export function Footer({ time }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.element}>
        <p className={styles.link}>
          {" "}
          <LinkIcon size={12} />
          <Link
            href="http://thiefaine.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            💻 Thiefaine
          </Link>
        </p>
        <p className={styles.link}>
          <LinkIcon size={12} />
          <Link
            href="https://open-meteo.com/en/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open-Meteo API
          </Link>
        </p>
      </div>
      {time && process.env.NODE_ENV === "development" && (
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
      )}
    </footer>
  );
}
