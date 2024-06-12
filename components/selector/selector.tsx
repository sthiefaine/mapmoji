"use client";
import { countriesList } from "@/data/mapmoji";
import styles from "./selector.module.css";
import { usePathname } from "next/navigation";

export function Selector({ time }: { time?: Date }) {
  const pathname = usePathname();
  const pathNameClean =
    pathname.split("/")?.[2]?.toLowerCase()?.trim() ?? "brazil";
  const timezone =
    countriesList.find((country) => country.name === pathNameClean)?.timeZone ??
    "UTC";

  const getLocalTime = new Intl.DateTimeFormat("fr-FR", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
  }).format(time);

  return (
    <div className={styles.container}>
      <div className={styles.element}>
        <span className={styles.name}>Brazil 🇧🇷</span>
        <span className={styles.time}>{getLocalTime}</span>
      </div>
      <div className={styles.element}>
        <button className={styles.button}>Share 📸</button>
      </div>
    </div>
  );
}
