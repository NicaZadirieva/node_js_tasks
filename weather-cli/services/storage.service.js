import { promises } from "fs";
import { homedir } from "os";
import { join } from "path";
import { printError, printSuccess } from "./log.service.js";
const filePath = join(homedir(), "weather_data.json");

const saveToken = async (token) => {
  try {
    await saveKeyValue("token", token);
    printSuccess(`Токен сохранен в ${filePath}`);
  } catch (e) {
    printError(error.message);
  }
};

const saveKeyValue = async (key, value) => {
  let data = {};
  if (await isExist(filePath)) {
    const jsonData = await promises.readFile(filePath, "utf8");
    data = JSON.parse(jsonData);
  }
  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
  if (!(await isExist(filePath))) {
    // если файла нет, null
    return null;
  }

  // файл есть
  const jsonData = await promises.readFile(filePath, "utf8");
  const data = JSON.parse(jsonData);
  return data[key];
};
const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

export { saveKeyValue, saveToken };
