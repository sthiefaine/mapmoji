"use client";

import { useEffect, useState } from "react";
import styles from "./timeUpdate.module.css";

import { Country } from "@/data/mapmoji";

type TimeUpdateProps = {
  country: Country;
  timesList: Date[];
  setSelectedHour: (hour: number) => void;
  selectedHour: number | null;
};

export function TimeUpdate({
  timesList,
  country,
  selectedHour,
  setSelectedHour,
}: TimeUpdateProps) {
  const [currentHour, setCurrentHour] = useState<number>(selectedHour ?? 0);

  useEffect(() => {
    const currentTime = new Date();
    const getLocalTime = new Intl.DateTimeFormat("fr-FR", {
      timeZone: country?.timeZone ?? "UTC",
      hour: "2-digit",
      minute: "2-digit",
    }).format(currentTime);
    const getHour =
      selectedHour?.toString().padStart(2, "0") ?? getLocalTime.split(":")[0];
    setCurrentHour(parseInt(getHour));
  }, [selectedHour, country]);

  useEffect(() => {
    const scrollToHour = document.getElementById(currentHour.toString());
    if (scrollToHour) {
      scrollToHour.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [currentHour]);

  return (
    <div className={styles.timeline}>
      {timesList.map((time, index) => {
        const localTimeHour = time.toISOString().split("T")[1].split(":")[0];
        return (
          <span
            onClick={() => setSelectedHour(parseInt(localTimeHour))}
            id={localTimeHour}
            key={time.toLocaleDateString() + index}
            className={`${styles.hour} ${
              currentHour.toString().padStart(2, "0") === localTimeHour
                ? styles.current
                : ""
            }`}
          >
            {localTimeHour}h
          </span>
        );
      })}
    </div>
  );
}
