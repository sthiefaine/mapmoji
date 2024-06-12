import { brazilMap2Json } from "./country/brazil";

export type Country = {
  name: string;
  mapData: any;
  timeZone: string;
  updateHours: string[];
  countryCodeLanguage: string;
};

export const countriesList: Country[] = [
  {
    name: "brazil",
    mapData: brazilMap2Json,
    timeZone: "America/Sao_Paulo",
    updateHours: ["6", "8", "12", "17", "19", "22"],
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
