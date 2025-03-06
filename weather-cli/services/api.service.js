import axios from "axios";
import { getToken } from "./storage.service.js";
const getWeather = async (city) => {
  // Формируем строку `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric`;
  const OPEN_WEATHER_MAP_API_KEY = await getToken();
  if (!OPEN_WEATHER_MAP_API_KEY) {
    throw new Error("Token not available. Set it with command : -t [API_KEY]");
  }
  //   const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  //   url.searchParams.append("q", city);
  //   url.searchParams.append("appid", OPEN_WEATHER_MAP_API_KEY);
  //   url.searchParams.append("units", "metric");
  //   url.searchParams.append("lang", "ru");

  //   return await https.get(url, (response) => {
  //     let res = "";
  //     response.on("data", (chunk) => {
  //       res += chunk;
  //     });

  //     response.on("end", () => {
  //       try {
  //         const weatherData = JSON.parse(res);
  //         printSuccess(
  //           `Погода в ${city}: ${weatherData.main.temp}°C, ${weatherData.weather[0].description}`
  //         );
  //       } catch (error) {
  //         printError(error.message);
  //       }
  //     });
  //     response.on("error", (error) => {
  //       printError(error.message);
  //     });
  //   });
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather`,
    {
      params: {
        q: city,
        appid: OPEN_WEATHER_MAP_API_KEY,
        lang: "ru",
        units: "metric",
      },
    }
  );

  return data;
};

export { getWeather };
