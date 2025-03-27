const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const DEFAULT_LANGUAGE = "ru";
import dedent from "dedent-js";

const getIcon = (icon: string) => {
  const iconMap: any = {
    "01": "☀️",
    "02": "⛅",
    "03": "☁️",
    "04": "☁️",
    "09": "🌧️",
    10: "⛅",
    11: "☁️",
    13: "🌨️",
    50: "🥵",
  };
  return iconMap[icon.slice(0, -1)];
};

const getWeatherApiInfo = (weather: Weather, icon: string) => {
  const weatherInfo = dedent`${icon}  ${weather.name}: ${weather.main.temp}°C, ${weather.weather[0].description}`;
  return weatherInfo;
};

export { DEFAULT_LANGUAGE, getIcon, getWeatherApiInfo, WEATHER_URL };

