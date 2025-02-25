const { Worker } = require("worker_threads");
const { fork } = require("child_process");
const workerFunction = (array) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", {
      workerData: { array },
    });
    worker.on("message", (data) => {
      console.log(worker.threadId);
      resolve(data);
    });
    worker.on("error", (err) => {
      reject(err);
    });

    worker.on("exit", () => {
      console.error(`Worker stopped`);
    });
  });
};

const forkFunction = (array) => {
  return new Promise((resolve, reject) => {
    const forkProcess = fork("fork.js");

    forkProcess.on("message", (message) => {
      console.log(`Parent received: ${message}`);
      resolve(message);
    });

    forkProcess.on("close", (code) => {
      console.log(`Child process exited with code ${code}`);
    });

    forkProcess.send({ array });
  });
};

const main = async () => {
  const array = [1, 2, 3, 4, 5];
  performance.mark("start");
  const result = await workerFunction(array);
  console.log("Worker result:", result);
  performance.mark("end");
  performance.measure("worker", "start", "end");

  performance.mark("start_fork");
  const forkedResult = await forkFunction(array);
  performance.mark("end_fork");
  console.log("Forked result:", forkedResult);
  performance.measure("fork", "start_fork", "end_fork");

  console.log("Performance metrics:");
  console.log(
    "Worker time:",
    performance.getEntriesByName("worker")[0].duration
  );
  console.log("Fork time:", performance.getEntriesByName("fork")[0].duration);
};

main();
