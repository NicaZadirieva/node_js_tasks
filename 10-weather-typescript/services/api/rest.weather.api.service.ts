import axios from "axios";
import { LoggerService } from "../log/log.service";
import { WEATHER_URL } from "../shared/helpers";
import { HttpUtils } from "../shared/httpUtils";
import { getLanguage, getToken } from "../storage";
import { BasicWeatherApiService } from "./basic.weather.api.service";
import { IWeatherApiService } from "./weather.api.service.interface";

const logger = new LoggerService();
export class RestWeatherApiService
  extends BasicWeatherApiService
  implements IWeatherApiService
{
  constructor(
    private token: string,
    private lang: Lang,
    private cities: string[]
  ) {
    super();
  }
  async getWeather(city: string) {
    const OPEN_WEATHER_MAP_API_KEY = this.token || (await getToken());
    const LANGUAGE = this.lang || (await getLanguage());
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

  async getForecast(paramCities?: string[]) {
    try {
      const cities = paramCities || this.cities;
      const forecast: Forecast = await super.getForecast(cities);
      logger.logForecast(forecast);
      return forecast;
    } catch (e) {
      if (e instanceof Error) {
        logger.logError(e.message);
      }
      return Promise.reject(e);
    }
  }
}
