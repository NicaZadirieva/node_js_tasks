const { fork } = require("child_process");

function createForkProcess(array) {
  return new Promise((resolve, reject) => {
    performance.mark("start parallel");
    const forkProcess = fork("parallel.js");

    forkProcess.on("message", (count) => {
      resolve(count);
    });

    forkProcess.on("close", (code) => {
      console.log(`Child process exited with code ${code}`);
    });

    forkProcess.send({ array });
  });
}

module.exports = { createForkProcess };
