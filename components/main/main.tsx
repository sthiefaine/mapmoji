"use client";

import styles from "@/app/page.module.css";
import { Selector } from "../selector/selector";
import { Weather } from "../weather/weather";
import { MapMojiType } from "@/data/mapmoji";

type MainProps = {
  emojiMap: MapMojiType;
  time?: Date;
};

export function Main({ emojiMap, time }: MainProps) {
  return (
    <>
      <Selector time={time} />
      <Weather emojiMap={emojiMap} />
    </>
  );
}
