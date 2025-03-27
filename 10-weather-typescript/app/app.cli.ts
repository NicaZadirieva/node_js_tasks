import { CliWeatherApiService } from "../services/api/cli.weather.api.service";
import { LoggerService } from "../services/log/log.service";
import StorageService from "../services/storage/storage.service";
import { IApp } from "./app.interface";
import { Argv, getArgs } from './helpers/args';


const storageService = new StorageService();
export default class CliApp implements IApp {
  async run() {
    console.log("CLI started...");
    const args = getArgs(process.argv) as Argv;
    const logger = new LoggerService();
    const weatherApiService = new CliWeatherApiService();
    if (args.s) {
      // Сохранить город
      await storageService.saveCity(args.s);
    }

    if (args.t) {
      // Сохранить токен
      await storageService.saveToken(args.t);
    }

    if (args.lang) {
      // Установить язык
      await storageService.saveLanguage(args.lang);
    }

    if (args.h) {
      // Вывод help
      const lang = await storageService.getLanguage();
      logger.logHelp(lang);
    }

    await weatherApiService.getForecast();
  }
}
