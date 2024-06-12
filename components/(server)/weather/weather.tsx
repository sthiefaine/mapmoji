"use server";

import styles from "@/app/page.module.css";
import { brazilMap2Json } from "@/data/brazilTopoJson";

import { WeatherData, getWeatherEmoji } from "@/helpers/open-meteo";
import { Suspense } from "react";

export async function Weather() {
  const geoMock = {
    latitude: 48.8566,
    longitude: 2.3522,
    city: "Paris",
    country: "France",
  };

  const params = {
    latitude: geoMock.latitude,
    longitude: geoMock.longitude,
    current:
      "temperature_2m,relative_humidity_2m,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m",
  };
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&current=${params.current}`;

  const weather: WeatherData = await fetch(url, { cache: "no-store" }).then(
    (res) => res.json()
  );

  const weatherEmoji = getWeatherEmoji(weather);

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
    </Suspense>
  );
}
