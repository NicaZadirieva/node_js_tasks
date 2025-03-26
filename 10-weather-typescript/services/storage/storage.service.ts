import { PathLike, promises } from "fs";
import { homedir } from "os";
import { join } from "path";
import { printError, printSuccess } from "../log/cli/log.service.js";
const filePath = join(homedir(), "weather_data.json");

const saveToken = async (token: string) => {
  if (!token.length) {
    printError("Не передан токен");
    return;
  }
  try {
    await saveKeyValue("token", token);
    printSuccess(`Токен сохранен в ${filePath}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      printError(error.message);
    }
  }
};

const getToken = async () => {
  const token = process.env.TOKEN ?? (await getKeyValue("token"));
  if (!token) {
    return null;
  }
  return token;
};

const saveCity = async (city: string) => {
  if (!city.length) {
    printError("Не передан город");
    return;
  }
  try {
    await saveKeyValue("city", city);
    printSuccess(`Город сохранен в ${filePath}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      printError(error.message);
    }
  }
};

const getCities = async () => {
  const cities = process.env.CITY ?? (await getKeyValue("city"));
  if (!cities) {
    return null;
  }
  return cities.split(",").map((city: string) => city.trim());
};

const saveKeyValue = async (key: string, value: string) => {
  let data : {[key] : string} = {};
  if (await isExist(filePath)) {
    const jsonData = await promises.readFile(filePath, "utf8");
    data = JSON.parse(jsonData);
  }
  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};
const getLanguage = async () => {
  const lang = process.env.TOKEN ?? (await getKeyValue("lang"));
  if (!lang) {
    return null;
  }
  return lang;
};

const saveLanguage = async (value: string) => {
  if (!value.length) {
    printError("Не передан язык");
    return;
  }
  try {
    await saveKeyValue("lang", value);
    printSuccess(`Язык сохранен в ${filePath}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      printError(error.message);
    }
  }
};

const getKeyValue = async (key: string) => {
  if (!(await isExist(filePath))) {
    // если файла нет, null
    return null;
  }

  // файл есть
  const jsonData = await promises.readFile(filePath, "utf8");
  const data = JSON.parse(jsonData);
  return data[key];
};
const isExist = async (path: PathLike) => {
  try {
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

export {
  getCities,
  getLanguage,
  getToken,
  saveCity,
  saveKeyValue,
  saveLanguage,
  saveToken
};

