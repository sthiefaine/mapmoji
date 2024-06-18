import { brazilMap2Json } from "./country/brazil";
import { franceMap2Json } from "./country/france";
import { japanMap2Json } from "./country/japan";
import { usaMap2Json } from "./country/usa";

interface Column {
  emoji: string;
  space: number;
  lat: string;
  long: string;
  uv_index_clear_sky?: number;
  temperature_2m?: number;
}

interface Row {
  row: number;
  columns: Column[];
}

export type MapMojiType = Row[];

export type MapMojiForDayType = {
  time: string;
  object: MapMojiType;
};

export type Country = {
  name: string;
  emoji?: string;
  mapData: MapMojiType;
  timeZone: string;
  updateHours: string[];
  countryCodeLanguage: string;
  countryCode: string;
};

const southUpdateHours: string[] = ["6", "12", "16"];
const northUpdateHours: string[] = ["6", "12", "16"];

export const notFoundCountry: Country = {
  name: "notFound",
  mapData: [],
  timeZone: "UTC",
  updateHours: [],
  countryCodeLanguage: "en-US",
  countryCode: "XX",
};

export const countriesList: Country[] = [
  {
    name: "brazil",
    emoji: "🇧🇷",
    mapData: brazilMap2Json,
    timeZone: "America/Sao_Paulo",
    updateHours: southUpdateHours,
    countryCodeLanguage: "pt-BR",
    countryCode: "BR",
  },
  {
    name: "france",
    emoji: "🇫🇷",
    mapData: franceMap2Json,
    timeZone: "Europe/Paris",
    updateHours: northUpdateHours,
    countryCodeLanguage: "fr-FR",
    countryCode: "FR",
  },
  {
    name: "USA",
    emoji: "🇺🇸",
    mapData: usaMap2Json,
    timeZone: "America/New_York",
    updateHours: northUpdateHours,
    countryCodeLanguage: "en-US",
    countryCode: "US",
  },
  {
    name: "japan",
    emoji: "🇯🇵",
    mapData: japanMap2Json,
    timeZone: "Asia/Tokyo",
    updateHours: southUpdateHours,
    countryCodeLanguage: "ja-JP",
    countryCode: "JP",
  },
];
