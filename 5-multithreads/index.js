const { createWorkerProcess } = require("./worker");
const { getItemsDeletedBy3 } = require("./utils");
const { performance, PerformanceObserver } = require("perf_hooks");
const os = require("os");

/**
 * Число ядер
 */
const COUNT_CORE = os.cpus().length;

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration} ms`);
  });
});
performanceObserver.observe({ entryTypes: ["measure"] });

function linearExecution(arr) {
  performance.mark("linear start");
  const res = getItemsDeletedBy3(arr);
  performance.mark("linear end");
  performance.measure("linear", "linear start", "linear end");
  console.log(res);
  return res;
}

function parallelExecution(arr) {
  const chunkSize = Math.ceil(arr.length / COUNT_CORE);
  const results = [];
  for (let i = 0; i < COUNT_CORE; i++) {
    const start = i * chunkSize;
    const end = Math.min((i + 1) * chunkSize, arr.length);
    results.push(createWorkerProcess(arr.slice(start, end)));
  }
  performance.mark("parallel start");
  return Promise.all(results).then((res) => {
    const mergedResult = res.reduce((acc, curr) => (acc += curr), 0);
    performance.mark("parallel end");
    performance.measure("parallel", "parallel start", "parallel end");
    console.log(mergedResult);
  });
}

function main() {
  const arr = [];
  for (let i = 1; i < 300000; i++) {
    arr.push(i);
  }

  linearExecution(arr);
  parallelExecution(arr);
}

main();
