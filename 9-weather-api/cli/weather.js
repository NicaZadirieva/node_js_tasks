#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getForecast } from "./services/api.service.js";
import { printHelp } from "./services/log.service.js";
import {
  getLanguage,
  saveCity,
  saveLanguage,
  saveToken,
} from "./services/storage.service.js";

const initCli = async () => {
  console.log("CLI started...");
  const args = getArgs(process.argv);

  if (args.s) {
    // Сохранить город
    await saveCity(args.s);
  }

  if (args.t) {
    // Сохранить токен
    await saveToken(args.t);
  }

  if (args.lang) {
    // Установить язык
    await saveLanguage(args.lang);
  }

  if (args.h) {
    // Вывод help
    const lang = await getLanguage();
    printHelp(lang);
  }

  await getForecast();
};

initCli();
