import axios from "axios";
import { printError, printWeather } from "./log.service.js";
import { getCities, getToken } from "./storage.service.js";
const getIcon = (icon) => {
  const iconMap = {
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
const getWeather = async (city) => {
  // Формируем строку `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric`;
  const OPEN_WEATHER_MAP_API_KEY = await getToken();
  if (!OPEN_WEATHER_MAP_API_KEY) {
    throw new Error("Token not available. Set it with command : -t [API_KEY]");
  }
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather`,
    {
      params: {
        q: city,
        appid: OPEN_WEATHER_MAP_API_KEY,
        lang: "ru",
        units: "metric",
      },
    }
  );

  return data;
};

const getForecast = async () => {
  try {
    const cities = await getCities();
    if (!cities) {
      throw new Error("City not available. Set it with command : -s [city]");
    }
    for (const city of cities) {
      const weather = await getWeather(city);
      printWeather(weather, getIcon(weather.weather[0].icon));
    }
  } catch (err) {
    if (err?.response?.status == 404) {
      printError("Город не найден");
    } else if (err?.response?.status == 401) {
      printError("Не авторизован. Установите токен с помощью -t [API_KEY]");
    } else {
      printError(err.message);
    }
  }
};

export { getForecast, getIcon, getWeather };
