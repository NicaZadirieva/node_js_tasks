const { Worker } = require("worker_threads");
function createWorkerProcess(array) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./parallel.js", {
      workerData: array,
    });

    worker.on("message", (count) => {
      resolve(count);
    });

    worker.on("close", (code) => {
      console.log(`Child process exited with code ${code}`);
    });
  });
}

module.exports = { createWorkerProcess };
