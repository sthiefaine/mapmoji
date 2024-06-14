import { MapMojiType, countriesList } from "@/data/mapmoji";
import styles from "./miniMaps.module.css";

type MiniMapsProps = {
  emojiMap?: MapMojiType;
};

export function MiniMaps({ emojiMap }: MiniMapsProps) {
  const mapListToLoop: MapMojiType[] = countriesList.map(
    (country) => country.mapData
  );
  return (
    <div className={styles.container}>
      {mapListToLoop.map((mapList, index) => (
        <div key={index} className={styles.card}>
          <span className={styles.title}>
            {countriesList[index].name} {countriesList[index].emoji}
          </span>
          <div className={styles.map}>
            {mapList.map((row) => (
              <div key={row.row} style={{ whiteSpace: "pre" }}>
                {row.columns.map((col, index) => (
                  <span key={index}>
                    {"\u00A0".repeat(col.space)}
                    {col.emoji}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
