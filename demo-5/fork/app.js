const { fork } = require("child_process");

const forkProcess = fork("fork.js");

forkProcess.on("message", (message) => {
  console.log(`Parent received: ${message}`);
});

forkProcess.on("close", (code) => {
  console.log(`Child process exited with code ${code}`);
});

forkProcess.send("Ping");
