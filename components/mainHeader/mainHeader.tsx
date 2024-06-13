"use client";
import { Country, countriesList } from "@/data/mapmoji";
import styles from "./mainHeader.module.css";
import { usePathname } from "next/navigation";
import useIsClient from "@/hooks/isClient";
import { capitalizeFirstLetter } from "@/helpers/string";

type MainHeaderProps = {
  time?: Date;
  handleShareClick?: () => void;
  country?: Country;
};

export function MainHeader({
  time,
  handleShareClick,
  country,
}: MainHeaderProps) {
  const isClient = useIsClient();

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
