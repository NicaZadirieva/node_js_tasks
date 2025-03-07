#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getForecast } from "./services/api.service.js";
import { printHelp } from "./services/log.service.js";
import { saveCity, saveToken } from "./services/storage.service.js";
const initCli = async () => {
  console.log("CLI started...");
  const args = getArgs(process.argv);

  if (args.h) {
    // Вывод help
    printHelp();
  }

  if (args.s) {
    // Сохранить город
    await saveCity(args.s);
  }

  if (args.t) {
    // Сохранить токен
    await saveToken(args.t);
  }

  await getForecast();
};

initCli();
