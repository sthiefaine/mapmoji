import { brazilMap2Json } from "./country/brazil";

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
    updateHours: ["6", "8", "11", "15", "17", "19", "21"],
    countryCodeLanguage: "pt-BR",
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
