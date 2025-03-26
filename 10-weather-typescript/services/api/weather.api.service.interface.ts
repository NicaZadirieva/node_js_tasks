export interface IWeatherApiService {
    getWeather: (city: string) => Promise<Weather>;
    getForecast: (paramCities?: string[]) => Promise<Forecast> | void;
}