"use server";

import styles from "@/app/page.module.css";
import { MapMojiType, brazilMap2Json } from "@/data/brazilTopoJson";

import { Suspense } from "react";

type WeatherProps = {
  emojiMap: MapMojiType;
};

export async function Weather({ emojiMap }: WeatherProps) {
  return (
    <Suspense
      fallback={
        <div className={styles.map}>
          {brazilMap2Json.map((row) => (
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
      }
    >
      <div className={styles.map}>
        {emojiMap.map((row) => (
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
    </Suspense>
  );
}
