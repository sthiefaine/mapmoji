interface HourlyUnits {
  time: string;
  temperature_2m: string;
  is_day: string;
  weather_code: string;
  uv_index: string;
  uv_index_clear_sky: string;
}

interface HourlyData {
  time: string[];
  temperature_2m: number[];
  is_day: number[];
  weather_code: number[];
  uv_index: number[];
  uv_index_clear_sky: number[];
}

export interface WeatherDataForDay {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: HourlyUnits;
  hourly: HourlyData;
}

interface WeatherUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  is_day: string;
  precipitation: string;
  rain: string;
  showers: string;
  snowfall: string;
  weather_code: string;
  cloud_cover: string;
  wind_speed_10m: string;
}

interface CurrentWeatherData {
  time?: string;
  interval?: number;
  temperature_2m?: number;
  relative_humidity_2m?: number;
  is_day: number;
  precipitation?: number;
  rain?: number;
  showers?: number;
  snowfall?: number;
  weather_code: number;
  cloud_cover?: number;
  wind_speed_10m?: number;
  uv_index?: number;
  uv_index_clear_sky?: number;
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: WeatherUnits;
  current: CurrentWeatherData;
}

export function getWeatherEmoji(currentWeatherData: CurrentWeatherData) {
  const isDay = currentWeatherData.is_day;
  const weatherCode = currentWeatherData.weather_code;

  const weatherEmojis: {
    [key: number]: { emoji: string; description: string };
  } = {
    // Clear sky
    0: { emoji: isDay ? "☀️" : "🌕", description: "Ciel dégagé" },
    // Mostly clear
    1: { emoji: isDay ? "🌤️" : "🌖", description: "Majoritairement dégagé" },
    // Partly cloudy
    2: { emoji: isDay ? "⛅" : "🌒", description: "Partiellement nuageux" },
    // Cloudy
    3: { emoji: isDay ? "☁️" : "🌑", description: "Nuageux" },
    // Fog
    45: { emoji: "🌫️", description: "Brouillard" },
    // Freezing Fog
    48: { emoji: "🌫️", description: "Brouillard givrant" },
    // Light Drizzle
    51: { emoji: "🌧️", description: "Bruine légère" },
    // Drizzle
    53: { emoji: "🌧️", description: "Bruine" },
    // Heavy Drizzle
    55: { emoji: "🌧️", description: "Fortes averses" },
    // Light Freezing Drizzle
    56: { emoji: "🌨️", description: "Légère bruine verglaçante" },
    // Freezing Drizzle
    57: { emoji: "🌨️", description: "Bruine verglaçante" },
    // Light Rain
    61: { emoji: "🌧️", description: "Pluie légère" },
    // Rain
    63: { emoji: "🌧️", description: "Pluie" },
    // Heavy Rain
    65: { emoji: "🌧️", description: "Forte pluie" },
    // Light Freezing Rain
    66: { emoji: "🌨️", description: "Légère pluie verglaçante" },
    // Freezing Rain
    67: { emoji: "🌨️", description: "Pluie verglaçante" },
    // Light Snow
    71: { emoji: "🌨️", description: "Neige légère" },
    // Snow
    73: { emoji: "🌨️", description: "Neige" },
    // Heavy Snow
    75: { emoji: "🌨️", description: "Forte neige" },
    // Snow Grains
    77: { emoji: "🌨️", description: "Grains de neige" },
    // Light Rain Shower
    80: { emoji: "🌧️", description: "Averses de pluie légères" },
    // Rain Shower
    81: { emoji: "🌧️", description: "Averses de pluie" },
    // Heavy Rain Shower
    82: { emoji: "🌧️", description: "Forte averses de pluie" },
    // Snow Shower
    85: { emoji: "🌨️", description: "Averses de neige" },
    // Heavy Snow Shower
    86: { emoji: "🌨️", description: "Forte averses de neige" },
    // Thunderstorm
    95: { emoji: "🌩️", description: "Orage" },
    // Hailstorm
    96: { emoji: "⛈️", description: "Chute de grêle" },
    // Heavy Hailstorm
    99: { emoji: "⛈️", description: "Violent orage de grêle" },
  };

  return (
    weatherEmojis[weatherCode] || {
      emoji: weatherCode.toString(),
      description: "",
    }
  );
}

// const weatherEmoji = getWeatherEmoji(weatherData);

export const weatherResultMock: WeatherData = {
  latitude: 48.86,
  longitude: 2.3599997,
  generationtime_ms: 0.06401538848876953,
  utc_offset_seconds: 0,
  timezone: "GMT",
  timezone_abbreviation: "GMT",
  elevation: 36,
  current_units: {
    time: "iso8601",
    interval: "seconds",
    temperature_2m: "°C",
    relative_humidity_2m: "%",
    is_day: "",
    precipitation: "mm",
    rain: "mm",
    showers: "mm",
    snowfall: "cm",
    weather_code: "wmo code",
    cloud_cover: "%",
    wind_speed_10m: "km/h",
  },
  current: {
    time: "2024-05-17T09:30",
    interval: 900,
    temperature_2m: 16.5,
    relative_humidity_2m: 63,
    is_day: 1,
    precipitation: 0,
    rain: 0,
    showers: 0,
    snowfall: 0,
    weather_code: 3,
    cloud_cover: 100,
    wind_speed_10m: 4.1,
    uv_index: 0,
    uv_index_clear_sky: 0,
  },
};

export const weatherEmojiMock = {
  emoji: "☁️",
  description: "Nuageux",
};
