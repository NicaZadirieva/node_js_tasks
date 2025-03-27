import { LoggerService } from "../log/log.service";
import { IStorageService } from "./storage.service.interface";

const logger = new LoggerService();
export default abstract class BaseStorageService implements IStorageService {
  abstract saveKeyValue(key: string, value: string): Promise<void>;
  abstract getKeyValue<T>(key: string): Promise<T>;
  async saveToken(token: string) {
    if (!token.length) {
      logger.logError("Не передан токен");
      return;
    }
    try {
      await this.saveKeyValue("token", token);
      logger.logSuccess(`Токен сохранен`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.logError(error.message);
      }
    }
  }
  async getToken() {
    const token = process.env.TOKEN ?? (await this.getKeyValue("token"));
    if (!token) {
      return null;
    }
    return token;
  }
  async saveCity(city: string) {
    if (!city.length) {
      logger.logError("Не передан город");
      return;
    }
    try {
      await this.saveKeyValue("city", city);
      logger.logSuccess(`Город сохранен`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.logError(error.message);
      }
    }
  }
  async getCities() {
    const cities = process.env.CITY ?? (await this.getKeyValue("city"));
    if (!cities) {
      return null;
    }
    return cities.split(",").map((city: string) => city.trim());
  }
  async getLanguage() {
    const lang = await this.getKeyValue("lang") as Lang;
    if (!lang) {
      return null;
    }
    return lang;
  }
  async saveLanguage(language: Lang) {
    if (!language.length) {
      logger.logError("Не передан язык");
      return;
    }
    try {
      await this.saveKeyValue("lang", language);
      logger.logSuccess(`Язык сохранен`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.logError(error.message);
      }
    }
  }
}
