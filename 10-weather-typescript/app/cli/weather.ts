#!/usr/bin/env node
import { getForecast } from '../../services/api';
import { printHelp } from '../../services/log';
import { getLanguage, saveCity, saveLanguage, saveToken } from '../../services/storage';
import { Argv, getArgs } from "./helpers/args";


const initCli = async () => {
  console.log("CLI started...");
  const args = getArgs(process.argv) as Argv;

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
