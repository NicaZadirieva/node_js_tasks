const utilTimer = require("./timer");

const time = process.argv.slice(2).join(" ");
console.log(time);

if (!time) {
  console.error("Please provide a time duration.");
  process.exit(1);
}
try {
  utilTimer.createTimer(time, "Time is up!");
} catch (err) {
  console.error("Invalid time duration format.");
  process.exit(1);
}
