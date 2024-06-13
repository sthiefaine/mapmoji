import { Country, countriesList } from "@/data/mapmoji";
import styles from "./selector.module.css";
import Link from "next/link";

type SelectorProps = {
  country?: Country;
};

export function Selector({ country }: SelectorProps) {
  return (
    <div className={styles.selector}>
      {countriesList.map((c, index) => {
        return (
          <Link key={index} href={`/country/${c.name}`}>
            <button
              className={`${styles.button} ${
                country?.name === c.name ? styles.selected : ""
              }`}
            >
              {c?.emoji} {c?.name}
            </button>
          </Link>
        );
      })}
    </div>
  );
}
