"use client";
import { Country, countriesList } from "@/data/mapmoji";
import styles from "./selector.module.css";
import { usePathname } from "next/navigation";
import useIsClient from "@/hooks/isClient";
import { capitalizeFirstLetter } from "@/helpers/string";

type SelectorProps = {
  time?: Date;
  handleShareClick?: () => void;
  country?: Country;
};

export function Selector({ time, handleShareClick, country }: SelectorProps) {
  const isClient = useIsClient();
  const pathname = usePathname();

  const pathNameClean =
    pathname.split("/")?.[2]?.toLowerCase()?.trim() ?? "brazil";
  const timezone =
    countriesList.find(
      (country) => country.name === country.name ?? pathNameClean
    )?.timeZone ?? "UTC";

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
        <span className={styles.name}>
          {capitalizeFirstLetter(country?.name ?? "") + " " + country?.emoji}
        </span>
        {/*         <span className={styles.time}>{time ? getLocalTime : null}</span> */}
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
