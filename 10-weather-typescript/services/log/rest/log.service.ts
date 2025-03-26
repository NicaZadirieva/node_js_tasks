import dedent from "dedent-js";
import { Weather } from '../cli/log.service';

const getWeatherApiInfo = (weather: Weather, icon: string) => {
  const weatherInfo = dedent`${icon}  ${weather.name}: ${weather.main.temp}°C, ${weather.weather[0].description}`;
  return weatherInfo;
};

export { getWeatherApiInfo };

