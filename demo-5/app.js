const factorial = require("./factorial");
const imitateDelay = () => {
  const arr = [];
  for (let i = 0; i < 10000000; i++) {
    arr.push(i * i);
  }
};
const compute = (array) => {
  imitateDelay();
  return array.map((el) => factorial(el));
};

const main = () => {
  performance.mark("start");
  const result = [
    compute([25, 20, 19, 48, 30, 50]),
    compute([25, 20, 19, 48, 30, 50]),
    compute([25, 20, 19, 48, 30, 50]),
    compute([25, 20, 19, 48, 30, 50]),
  ];
  console.log(result);
  performance.mark("end");
  performance.measure("main", "start", "end");
  console.log(performance.getEntriesByName("main")[0].duration);
};

main();
