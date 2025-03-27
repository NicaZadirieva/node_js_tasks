import { PathLike, promises } from "fs";
import { homedir } from "os";
import { join } from "path";
import BaseStorageService from "./base.storage.service.js";
import { IStorageService } from "./storage.service.interface.js";
const filePath = join(homedir(), "weather_data.json");

const isExist = async (path: PathLike) => {
  try {
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

export default class StorageService
  extends BaseStorageService
  implements IStorageService
{
  async saveKeyValue(key: string, value: string) {
    let data: any = {};
    if (await isExist(filePath)) {
      const jsonData = await promises.readFile(filePath, "utf8");
      data = JSON.parse(jsonData);
    }
    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
  }
  async getKeyValue(key: string) {
    if (!(await isExist(filePath))) {
      // если файла нет, null
      return null;
    }

    // файл есть
    const jsonData = await promises.readFile(filePath, "utf8");
    const data = JSON.parse(jsonData);
    return data[key];
  }
}