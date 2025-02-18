const { add } = require("./add");
const { multiply } = require("./multiply");
const { EventEmitter } = require("events");
const { validate } = require("./validate");

const myEmitter = new EventEmitter();

// event handlers while success
myEmitter.on("result", (result) => {
  console.log(`Result: ${result}`);
});
myEmitter.on("add", (a, b) => {
  myEmitter.emit("result", add(a, b));
});

myEmitter.on("multiply", (a, b) => {
  myEmitter.emit("result", multiply(a, b));
});

// event handlers while error
myEmitter.on("error", (error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});

const a = Number(process.argv[2]);
const b = Number(process.argv[3]);
const method = process.argv[4];

try {
  validate(a, b, method);

  if (method === "add") {
    myEmitter.emit("add", a, b);
  }

  if (method === "multiply") {
    myEmitter.emit("multiply", a, b);
  }
} catch (e) {
  myEmitter.emit("error", e);
}
