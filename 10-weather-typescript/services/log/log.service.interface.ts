
export interface ILoggerService {
    logWeather(weather: Weather, icon: string): void;
    logError(errorMessage: string): void;
    logSuccess(message: string): void;
    logHelp(lang: Lang | null): void;
    logForecast(forecast: Forecast): void;
}