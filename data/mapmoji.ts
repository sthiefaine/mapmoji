import { brazilMap2Json } from "./country/brazil";
import { franceMap2Json } from "./country/france";
import { japanMap2Json } from "./country/japan";
import { usaMap2Json } from "./country/usa";

interface Column {
  emoji: string;
  space: number;
  lat: string;
  long: string;
}

interface Row {
  row: number;
  columns: Column[];
}

export type MapMojiType = Row[];

export type Country = {
  name: string;
  emoji?: string;
  mapData: any;
  timeZone: string;
  updateHours: string[];
  countryCodeLanguage: string;
  countryCode?: string;
};

export const countriesList: Country[] = [
  {
    name: "brazil",
    emoji: "🇧🇷",
    mapData: brazilMap2Json,
    timeZone: "America/Sao_Paulo",
    updateHours: ["5", "7", "9", "11", "15", "17", "19"],
    countryCodeLanguage: "pt-BR",
    countryCode: "BR",
  },
  {
    name: "france",
    emoji: "🇫🇷",
    mapData: franceMap2Json,
    timeZone: "Europe/Paris",
    updateHours: ["6", "8", "11", "15", "17", "19", "22"],
    countryCodeLanguage: "fr-FR",
    countryCode: "FR",
  },
  {
    name: "USA",
    emoji: "🇺🇸",
    mapData: usaMap2Json,
    timeZone: "America/New_York",
    updateHours: ["6", "8", "11", "15", "17", "19", "22"],
    countryCodeLanguage: "en-US",
    countryCode: "US",
  },
  {
    name: "japan",
    emoji: "🇯🇵",
    mapData: japanMap2Json,
    timeZone: "Asia/Tokyo",
    updateHours: ["5", "7", "9", "11", "15", "17", "19"],
    countryCodeLanguage: "ja-JP",
    countryCode: "JP",
  },
];
