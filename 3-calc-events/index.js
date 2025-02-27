const { add } = require("./add");
const { multiply } = require("./multiply");
const { EventEmitter } = require("events");
const { validate } = require("./validate");

const myEmitter = new EventEmitter();
const METHODS = ["add", "multiply"];
const [ADD_METHOD, MULTIPLY_METHOD] = METHODS;
const RESULT_TYPE = "result";
const ERROR_TYPE = "error";
// event handlers while success
myEmitter.on(RESULT_TYPE, (result) => {
  console.log(`Result: ${result}`);
});
myEmitter.on(ADD_METHOD, (a, b) => {
  myEmitter.emit(RESULT_TYPE, add(a, b));
});

myEmitter.on(MULTIPLY_METHOD, (a, b) => {
  myEmitter.emit(RESULT_TYPE, multiply(a, b));
});

// event handlers while error
myEmitter.on(ERROR_TYPE, (error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});

function initCli() {
  try {
    const a = Number(process.argv[2]);
    const b = Number(process.argv[3]);
    const method = process.argv[4];
    validate(a, b, method);
    myEmitter.emit(method, a, b);
  } catch (e) {
    myEmitter.emit(ERROR_TYPE, e);
  }
}

initCli();
