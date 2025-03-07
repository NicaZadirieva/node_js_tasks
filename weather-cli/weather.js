#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getForecast } from "./services/api.service.js";
import { printHelp } from "./services/log.service.js";
import { saveToken } from "./services/storage.service.js";
const initCli = async () => {
  console.log("CLI started...");
  const args = getArgs(process.argv);

  if (args.h) {
    // Вывод help
    printHelp();
  }

  if (args.s) {
    // Сохранить город
  }

  if (args.t) {
    // Сохранить токен
    saveToken(args.t);
  }

  await getForecast();
};

initCli();
