const utilTimer = require("./timer");

function initCli() {
  const time = process.argv.slice(2).join(" ");
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
}

initCli();
