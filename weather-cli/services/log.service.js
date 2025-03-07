import chalk from "chalk";
import dedent from "dedent-js";
const printError = (error) => {
  console.error(chalk.bgRed("ERROR") + " " + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen("SUCCESS") + " " + message);
};

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan("HELP")}
      Без параметров - вывод погоды
      Параметры:
      -s [city] - установка города
      -h -  help
      -t [API_KEY] -сохранить токен`
  );
};

const printWeather = (weather, icon) => {
  console.log(
    dedent`${chalk.bgMagenta("WEATHER")} ${icon}  Погода в ${weather.name}: ${
      weather.main.temp
    }°C, ${weather.weather[0].description}`
  );
};

export { printError, printHelp, printSuccess, printWeather };
