const { parentPort, workerData } = require("worker_threads");
const factorial = require("./factorial");
const imitateDelay = () => {
  const arr = [];
  for (let i = 0; i < 10000000; i++) {
    arr.push(i * i);
  }
};
const compute = ({ array }) => {
  imitateDelay();
  return array.map((el) => factorial(el));
};

parentPort.postMessage(compute(workerData));
