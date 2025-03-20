import axios from "axios";
import { printError, printWeather } from "../../log/cli/log.service.js";
import {
  getCities,
  getLanguage,
  getToken,
} from "../../storage/storage.service.js";
import { DEFAULT_LANGUAGE, WEATHER_URL, getIcon } from "../shared/helpers.js";
import { HttpUtils } from "../shared/httpUtils.js";

const getWeather = async (city) => {
  const OPEN_WEATHER_MAP_API_KEY = await getToken();
  const LANGUAGE = (await getLanguage()) || DEFAULT_LANGUAGE;
  if (!OPEN_WEATHER_MAP_API_KEY) {
    throw new Error("Token not available. Set it with command : -t [API_KEY]");
  }
  const { data } = await axios.get(
    WEATHER_URL,
    HttpUtils.formHttpParams({
      city,
      token: OPEN_WEATHER_MAP_API_KEY,
      lang: LANGUAGE,
    })
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
