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
      {
        <div className={styles.element}>
          <p>
            update:{" "}
            {time?.toLocaleDateString() + " " + time?.toLocaleTimeString()}
          </p>
        </div>
      }
    </footer>
  );
}
