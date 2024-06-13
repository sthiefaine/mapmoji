"use client";

import styles from "./main.module.css";
import { Selector } from "../selector/selector";
import { Weather } from "../weather/weather";
import { MapMojiType } from "@/data/mapmoji";
import { useState } from "react";
import html2canvas from "html2canvas";

type MainProps = {
  emojiMap: MapMojiType;
  time?: Date;
};

export function Main({ emojiMap, time }: MainProps) {
  const [capturedImage, setCapturedImage] = useState<string>("");

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
      resizedCanvas.width = 450;
      resizedCanvas.height = 450;
      const resizedContext = resizedCanvas.getContext("2d");
      if (!resizedContext) {
        return;
      }

      resizedContext.drawImage(blackCanvas, 0, 0, 450, 450);

      const imgData = resizedCanvas.toDataURL("image/png");
      setCapturedImage(imgData);

      const blob = dataURLToBlob(imgData);
      const file = new File([blob], "weather.png", { type: "image/png" });

      if (navigator.share === undefined) {
        console.log("navigator", navigator);
        alert("Unsupported share feature");
        return;
      }

      if (navigator.share) {
        navigator
          .share({
            title: "Weather Information",
            text: "Check out this weather info!",
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
    <>
      <Selector
        time={time}
        handleShareClick={handleShareClick}
        capturedImage={capturedImage}
      />
      <section id="weather-section" className={styles.section}>
        <Weather emojiMap={emojiMap} />
      </section>
      <section className={styles.section}></section>
    </>
  );
}
