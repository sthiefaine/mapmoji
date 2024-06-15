import { brazilMap2Json } from "./country/brazil";
import { franceMap2Json } from "./country/france";
import { usaMap2Json } from "./country/usa";

export type Country = {
  name: string;
  emoji?: string;
  mapData: any;
  timeZone: string;
  updateHours: string[];
  countryCodeLanguage: string;
};

export const countriesList: Country[] = [
  {
    name: "brazil",
    emoji: "🇧🇷",
    mapData: brazilMap2Json,
    timeZone: "America/Sao_Paulo",
    updateHours: ["5", "7", "9", "11", "15", "17", "19"],
    countryCodeLanguage: "pt-BR",
  },
  {
    name: "france",
    emoji: "🇫🇷",
    mapData: franceMap2Json,
    timeZone: "Europe/Paris",
    updateHours: ["6", "8", "11", "15", "17", "19", "22"],
    countryCodeLanguage: "fr-FR",
  },
  {
    name: "USA",
    emoji: "🇺🇸",
    mapData: usaMap2Json,
    timeZone: "America/New_York",
    updateHours: ["6", "8", "11", "15", "17", "19", "22"],
    countryCodeLanguage: "en-US",
  },
];

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
