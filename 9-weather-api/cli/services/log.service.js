import chalk from "chalk";
import dedent from "dedent-js";
const printError = (error) => {
  console.error(chalk.bgRed("ERROR") + " " + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen("SUCCESS") + " " + message);
};

const printHelp = (lang) => {
  switch (lang) {
    case "ru":
      printRuHelp();
      break;
    case "eng":
      printEngHelp();
      break;
    default:
      printRuHelp();
  }
};
const printRuHelp = () => {
  console.log(
    dedent`${chalk.bgCyan("HELP")}
      Без параметров - вывод погоды
      Параметры:
      -s [city] - установка города
      -h -  help
      -t [API_KEY] -сохранить токен
      -lang [language] - установить язык`
  );
};

const printEngHelp = () => {
  console.log(
    dedent`${chalk.bgCyan("HELP")}
      No paramenets - show the weather information
      Parameters can be:
      -s [city] - save the city
      -h -  help
      -t [API_KEY] - save the token for API requests
      -lang [language] - save the language`
  );
};

const getWeatherApiInfo = (weather, icon) => {
  const weatherInfo = dedent`${icon}  ${weather.name}: ${weather.main.temp}°C, ${weather.weather[0].description}`;
  return weatherInfo;
};

const printWeather = (weather, icon) => {
  console.log(
    dedent`${chalk.bgMagenta("WEATHER")} ${icon}  ${weather.name}: ${
      weather.main.temp
    }°C, ${weather.weather[0].description}`
  );
};

export { getWeatherApiInfo, printError, printHelp, printSuccess, printWeather };
