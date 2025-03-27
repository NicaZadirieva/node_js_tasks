import { AxiosError } from 'axios';
import { getIcon, getWeatherApiInfo } from '../shared/helpers';

import StorageService from '../storage/storage.service';
import { IWeatherApiService } from './weather.api.service.interface';

const storageService = new StorageService();
export abstract class BasicWeatherApiService implements IWeatherApiService {
   abstract getWeather(city: string): Promise<Weather>;
   async getForecast(paramCities?: string[]) {
    try {
      const cities = paramCities || (await storageService.getCities());
      if (!cities) {
        throw new Error("City not available. Set it");
      }
      const weatherPromises = [];
      for (const city of cities) {
        weatherPromises.push(this.getWeather(city));
      }
      const weatherData : Weather[] = await Promise.all(weatherPromises);
      return weatherData
        .map((weather: Weather) =>
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
      } else {
        throw new Error('Непредвиденная ошибка');
      }
    }
  }
    
}