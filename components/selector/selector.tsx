"use client";
import { countriesList } from "@/data/mapmoji";
import styles from "./selector.module.css";
import { usePathname } from "next/navigation";
import useIsClient from "@/hooks/isClient";

type SelectorProps = {
  time?: Date;
  handleShareClick?: () => void;
};

export function Selector({ time, handleShareClick }: SelectorProps) {
  const isClient = useIsClient();
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

  const displayShareButton = isClient
    ? navigator?.share === undefined
      ? "hidden"
      : "visible"
    : "hidden";

  return (
    <div className={styles.container}>
      <div className={styles.element}>
        <span className={styles.name}>Brazil 🇧🇷</span>
        <span className={styles.time}>{getLocalTime}</span>
      </div>
      <div className={styles.element}>
        <button
          style={{ visibility: displayShareButton }}
          className={styles.button}
          onClick={handleShareClick}
        >
          Share 📸
        </button>
      </div>
    </div>
  );
}
