#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
const initCli = () => {
  console.log("CLI started...", process.argv);
  const args = getArgs(process.argv);
  console.log(args);

  if (args.h) {
    // Вывод help
  }

  if (args.s) {
    // Сохранить город
  }

  if (args.t) {
    // Сохранить токен
  }
};

initCli();
