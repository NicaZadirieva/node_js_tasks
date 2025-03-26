import axios from "axios";
import { LoggerService } from '../log/log.service';
import { getLanguage, getToken } from "../storage";
import { BasicWeatherApiService } from './basic.weather.api.service';
import { DEFAULT_LANGUAGE, WEATHER_URL } from "./shared/helpers";
import { HttpUtils } from "./shared/httpUtils";
import { IWeatherApiService } from "./weather.api.service.interface";

const logger = new LoggerService();
export class CliWeatherApiService extends BasicWeatherApiService implements IWeatherApiService {
  async getWeather(city: string) {
    const OPEN_WEATHER_MAP_API_KEY = await getToken();
    const LANGUAGE = (await getLanguage()) || DEFAULT_LANGUAGE;
    if (!OPEN_WEATHER_MAP_API_KEY) {
      throw new Error(
        "Token not available. Set it with command : -t [API_KEY]"
      );
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
  }
  async getForecast(cities?: string[]) {
    try {
        const forecast : Forecast = await super.getForecast(cities);
        logger.logForecast(forecast);
        return forecast;
    } catch (e) {
        if (e instanceof Error) {
            logger.logError(e.message);
        }
        return Promise.reject(e);
    };
  }
}
