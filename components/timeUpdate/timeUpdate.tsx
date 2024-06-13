"use client";

import styles from "./timeUpdate.module.css";

import { Country } from "@/data/mapmoji";

type TimeUpdateProps = {
  country?: Country;
  time?: Date;
};

export function TimeUpdate({ time, country }: TimeUpdateProps) {
  let lastUpdateTime: number = 0;

  const getLocalTime = time
    ? new Intl.DateTimeFormat("fr-FR", {
        timeZone: country?.timeZone ?? "UTC",
        hour: "2-digit",
        minute: "2-digit",
      }).format(time)
    : null;

  const lastUpdateHour = parseInt(getLocalTime?.split(":")[0] ?? "0");
  const updateHours = country?.updateHours.map((hour) => parseInt(hour)) ?? [];

  for (let i = 0; i < updateHours.length; i++) {
    const parsedHour = updateHours[i];

    if (lastUpdateTime !== 0) {
      break;
    }

    if (lastUpdateHour === parsedHour) {
      lastUpdateTime = parsedHour;
      break;
    } else if (lastUpdateHour < parsedHour) {
      lastUpdateTime = updateHours[i - 1];
      break;
    }
  }

  return (
    <div className={styles.timeline}>
      {country?.updateHours.map((hour, index) => {
        return (
          <span
            key={hour}
            className={`${styles.hour} ${
              lastUpdateTime === parseInt(hour) ? styles.current : ""
            }`}
          >
            {hour}h
          </span>
        );
      })}
    </div>
  );
}
