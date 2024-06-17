"use client";

import { useEffect } from "react";
import styles from "./timeUpdate.module.css";

import { Country } from "@/data/mapmoji";

type TimeUpdateProps = {
  country: Country;
  timesList: Date[];
};

export function TimeUpdate({ timesList, country }: TimeUpdateProps) {
  const currentTime = new Date();
  const getLocalTime = new Intl.DateTimeFormat("fr-FR", {
    timeZone: country?.timeZone ?? "UTC",
    hour: "2-digit",
    minute: "2-digit",
  }).format(currentTime);
  const getHour = getLocalTime.split(":")[0];

  useEffect(() => {
    if (!country || !getHour) return;
    const selectedHour = document.getElementById(getHour);
    if (selectedHour) {
      selectedHour.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [country, getHour]);

  return (
    <div className={styles.timeline}>
      {timesList.map((time, index) => {
        const localTimeHour = time.toISOString().split("T")[1].split(":")[0];
        return (
          <span
            id={localTimeHour}
            key={time.toLocaleDateString() + index}
            className={`${styles.hour} ${
              getHour === localTimeHour ? styles.current : ""
            }`}
          >
            {localTimeHour}h
          </span>
        );
      })}
    </div>
  );
}
