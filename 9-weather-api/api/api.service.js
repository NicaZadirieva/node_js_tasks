import axios from "axios";
import { getWeatherApiInfo } from "../cli/services/log.service.js";
import {
  getCities,
  getLanguage,
  getToken,
} from "../cli/services/storage.service.js";
const DEFAULT_LANGUAGE = "ru";
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
const getWeather = async ({ city, fromQuery: { token, lang } }) => {
  // Формируем строку `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric`;
  const OPEN_WEATHER_MAP_API_KEY = token || (await getToken());
  const LANGUAGE = lang || (await getLanguage()) || DEFAULT_LANGUAGE;
  if (!OPEN_WEATHER_MAP_API_KEY) {
    throw new Error("Token not available. Set it with command : -t [API_KEY]");
  }
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather`,
    {
      params: {
        q: city,
        appid: OPEN_WEATHER_MAP_API_KEY,
        lang: LANGUAGE,
        units: "metric",
      },
    }
  );

  return data;
};

const getForecast = async ({
  fromQuery: { token, lang, cities: citiesFromQuery },
}) => {
  try {
    const cities = citiesFromQuery || (await getCities());
    if (!cities) {
      throw new Error("City not available. Set it");
    }
    const weatherInfoAllCities = [];
    for (const city of cities) {
      const weather = await getWeather({ city, fromQuery: { token, lang } });
      weatherInfoAllCities.push(
        getWeatherApiInfo(weather, getIcon(weather.weather[0].icon))
      );
    }
    return weatherInfoAllCities.join("\n");
  } catch (err) {
    if (err?.response?.status == 404) {
      throw new Error("Город не найден");
    } else if (err?.response?.status == 401) {
      throw new Error("Не авторизован. Установите токен");
    } else {
      throw new Error(err.message);
    }
  }
};

export { getForecast, getIcon, getWeather };
