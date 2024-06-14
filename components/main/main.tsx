"use client";

import styles from "./main.module.css";
import { MainFooter } from "../mainFooter/mainFooter";
import { Weather } from "../weather/weather";
import { Country, MapMojiType } from "@/data/mapmoji";
import html2canvas from "html2canvas";
import { capitalizeFirstLetter } from "@/helpers/string";
import { Selector } from "../selector/selector";

type MainProps = {
  emojiMap: MapMojiType;
  time?: Date;
  country?: Country;
};

export function Main({ emojiMap, time, country }: MainProps) {
  const handleShareClick = () => {
    const weatherElement = document.getElementById("weather-section");
    if (!weatherElement) {
      return;
    }
    html2canvas(weatherElement, { backgroundColor: null }).then((canvas) => {
      const blackCanvas = document.createElement("canvas");
      blackCanvas.width = canvas.width;
      blackCanvas.height = canvas.height;
      const blackContext = blackCanvas.getContext("2d");

      if (!blackContext) {
        return;
      }
      blackContext.fillStyle = "black";
      blackContext.fillRect(0, 0, blackCanvas.width, blackCanvas.height);

      blackContext.drawImage(canvas, 0, 0);

      const resizedCanvas = document.createElement("canvas");
      resizedCanvas.width = 400;
      resizedCanvas.height = 500;
      const resizedContext = resizedCanvas.getContext("2d");
      if (!resizedContext) {
        return;
      }

      resizedContext.drawImage(
        blackCanvas,
        0,
        0,
        resizedCanvas.width,
        resizedCanvas.height
      );

      const countryText =
        capitalizeFirstLetter(country?.name ?? "") + " " + country?.emoji;

      const getLocalTime = new Intl.DateTimeFormat("fr-FR", {
        timeZone: country?.timeZone ?? "UTC",
        hour: "2-digit",
        minute: "2-digit",
      }).format(time);

      // Draw the text
      const text = `${countryText}, ${getLocalTime}`;
      const textWidth = resizedContext.measureText(text).width;
      const x = (resizedCanvas.width - textWidth) / 2;

      const padding = 10;
      const y = padding + 20;

      resizedContext.font = "16px Arial";
      resizedContext.fillStyle = "white";
      resizedContext.textAlign = "left";

      resizedContext.fillText(text, x, y);

      const imgData = resizedCanvas.toDataURL("image/png");

      const blob = dataURLToBlob(imgData);
      const file = new File([blob], `weather-${country?.name}.png`, {
        type: "image/png",
      });

      if (navigator?.share) {
        navigator
          .share({
            title: "Weather Information",
            text: "weather with emoji by https://mapmoji.vercel.app/",
            files: [file],
          })
          .then(() => console.log("Share was successful."))
          .catch((error) => console.error("Error sharing:", error));
      } else {
        console.error("Web Share API is not supported in your browser.");
      }
    });
  };

  const dataURLToBlob = (dataURL: string) => {
    const parts = dataURL.split(";base64,");
    const byteString = atob(parts[1]);
    const mimeString = parts[0].split(":")[1];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  return (
    <section className={styles.section}>
      <div id="weather-section" className={styles.container}>
        <Weather emojiMap={emojiMap} />
      </div>

      <MainFooter
        country={country}
        time={time}
        handleShareClick={handleShareClick}
      />
    </section>
  );
}
