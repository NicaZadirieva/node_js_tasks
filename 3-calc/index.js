const { add } = require("./add");
const { multiply } = require("./multiply");

const METHODS = ["add", "multiply"];
const [ADD_METHOD, MULTIPLY_METHOD] = METHODS;

function initCli() {
  const a = Number(process.argv[2]);
  const b = Number(process.argv[3]);

  if (!a || !b || isNaN(a) || isNaN(b)) {
    console.error("Please provide two numbers as an argument");
    process.exit(1);
  }

  const method = process.argv[4];

  if (!METHODS.includes(method)) {
    console.error("Please provide 'add' or'multiply' as a third argument");
    process.exit(1);
  }

  if (method === ADD_METHOD) {
    console.log(add(a, b));
  }

  if (method === MULTIPLY_METHOD) {
    console.log(multiply(a, b));
  }
}

initCli();
