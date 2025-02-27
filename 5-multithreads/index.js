const { performance, PerformanceObserver } = require("perf_hooks");

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration} ms`);
  });
});
performanceObserver.observe({ entryTypes: ["measure"] });

function getItemsDeletedBy3(arr) {
  return arr.filter((num) => num % 3 === 0).length;
}

function linearExecution(arr) {
  performance.mark("linear start");
  const res = getItemsDeletedBy3(arr);
  performance.mark("linear end");
  performance.measure("linear", "linear start", "linear end");
  console.log(res);
  return res;
}

function main() {
  const arr = [];
  for (let i = 1; i < 300000; i++) {
    arr.push(i);
  }

  linearExecution(arr);
}

main();
