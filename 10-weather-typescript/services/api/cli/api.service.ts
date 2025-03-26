import axios, { AxiosError } from "axios";
import { LoggerService } from '../../log/log.service';
import {
  getCities,
  getLanguage,
  getToken,
} from "../../storage/storage.service";
import { DEFAULT_LANGUAGE, WEATHER_URL, getIcon } from "../shared/helpers";
import { HttpUtils } from "../shared/httpUtils";

const logger = new LoggerService();
const getWeather = async (city: string) => {
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
    const weatherPromises = [];
    for (const city of cities) {
      weatherPromises.push(getWeather(city));
    }
    const weatherData = await Promise.all(weatherPromises);
    for (const weather of weatherData) {
      logger.logWeather(weather, getIcon(weather.weather[0].icon));
    }
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      if (err?.response?.status == 404) {
        logger.logError('Город не найден');
      } else if (err?.response?.status == 401) {
        logger.logError("Не авторизован. Установите токен с помощью -t [API_KEY]");
      } else {
        logger.logError(err.message);
      }
    } else if (err instanceof Error) {
      logger.logError(err.message);
    }
  }
};

export { getForecast, getIcon, getWeather };

