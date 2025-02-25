const { Worker } = require("worker_threads");
const { fork } = require("child_process");

const { performance, PerformanceObserver } = require("perf_hooks");

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration} ms`);
  });
});
performanceObserver.observe({ entryTypes: ["measure"] });
const workerFunction = (array) => {
  return new Promise((resolve, reject) => {
    performance.mark("worker start");
    const worker = new Worker("./worker.js", {
      workerData: { array },
    });
    worker.on("message", (data) => {
      performance.mark("worker end");
      performance.measure("worker", "worker start", "worker end");
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
    performance.mark("start fork");
    const forkProcess = fork("fork.js");

    forkProcess.on("message", (message) => {
      performance.mark("end fork");
      performance.measure("fork", "start fork", "end fork");
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
  const result = await workerFunction(array);
  console.log("Worker result:", result);

  const forkedResult = await forkFunction(array);
  console.log("Forked result:", forkedResult);
};

main();
