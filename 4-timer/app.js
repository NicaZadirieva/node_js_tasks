const utilTimer = require("./timer");

const time = process.argv.slice(2).join(" ");
console.log(time);

if (!time) {
  console.error("Please provide a time duration.");
  process.exit(1);
}

utilTimer.createTimer(time, "Time is up!");
