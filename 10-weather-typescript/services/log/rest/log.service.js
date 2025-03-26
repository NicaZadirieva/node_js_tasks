import dedent from "dedent-js";

const getWeatherApiInfo = (weather, icon) => {
  const weatherInfo = dedent`${icon}  ${weather.name}: ${weather.main.temp}°C, ${weather.weather[0].description}`;
  return weatherInfo;
};

export { getWeatherApiInfo };
