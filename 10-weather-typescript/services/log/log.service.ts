import chalk from "chalk";
import dedent from "dedent-js";
import { ILoggerService } from "./log.service.interface";


export class LoggerService implements ILoggerService {
  private printRuHelp = () => {
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

  private printEngHelp = () => {
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
  logWeather(weather: Weather, icon: string) {
    console.log(
      dedent`${chalk.bgMagenta("WEATHER")} ${icon}  ${weather.name}: ${
        weather.main.temp
      }°C, ${weather.weather[0].description}`
    );
  }
  logError(errorMessage: string ): void {
    console.error(chalk.bgRed("ERROR") + " " + errorMessage);
  }
  logSuccess(message: string): void {
    console.log(chalk.bgGreen("SUCCESS") + " " + message);
  }
  logHelp(lang: "ru" | "eng"): void {
    switch (lang) {
      case "ru":
        this.printRuHelp();
        break;
      case "eng":
        this.printEngHelp();
        break;
      default:
        this.printRuHelp();
    }
  }
}
