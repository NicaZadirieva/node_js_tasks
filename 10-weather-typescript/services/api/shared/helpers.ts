const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const DEFAULT_LANGUAGE = "ru";

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
export { DEFAULT_LANGUAGE, getIcon, WEATHER_URL };

