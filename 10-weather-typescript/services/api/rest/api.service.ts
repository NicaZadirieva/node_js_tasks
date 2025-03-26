import axios, { AxiosError } from "axios";
import { getWeatherApiInfo } from "../../log/rest/log.service";
import {
  getCities,
  getLanguage,
  getToken,
} from "../../storage/storage.service";
import { DEFAULT_LANGUAGE, WEATHER_URL, getIcon } from "../shared/helpers";
import { HttpUtils } from "../shared/httpUtils";

const getWeather = async ({
  city,
  fromQuery: { token, lang },
}: {
  city: string;
  fromQuery: {
    token: string;
    lang: "ru" | "eng";
  };
}) => {
  const OPEN_WEATHER_MAP_API_KEY = token || (await getToken());
  const LANGUAGE = lang || (await getLanguage()) || DEFAULT_LANGUAGE;
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

const getForecast = async ({
  fromQuery: { token, lang, cities: citiesFromQuery },
}: {
  fromQuery: { token: string; lang: "ru" | "eng"; cities: string[] };
}) => {
  try {
    const cities = citiesFromQuery || (await getCities());
    if (!cities) {
      throw new Error("City not available. Set it");
    }
    const weatherPromises = [];
    for (const city of cities) {
      weatherPromises.push(getWeather({ city, fromQuery: { token, lang } }));
    }
    const weatherData = await Promise.all(weatherPromises);
    return weatherData
      .map((weather) =>
        getWeatherApiInfo(weather, getIcon(weather.weather[0].icon))
      )
      .join("\n");
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      if (err?.response?.status == 404) {
        throw new Error("Город не найден");
      } else if (err?.response?.status == 401) {
        throw new Error("Не авторизован. Установите токен");
      } else {
        throw new Error(err.message);
      }
    } else if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

export { getForecast, getIcon, getWeather };

