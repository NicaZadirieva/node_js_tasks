const METHODS = ["add", "multiply"];
function validate(a, b, method) {
  if (!a || !b || isNaN(a) || isNaN(b)) {
    throw new Error("Please provide two numbers as an argument");
  }

  if (!METHODS.includes(method)) {
    throw new Error("Please provide correct method as a third argument");
  }

  return true; // validation successful
}

module.exports = { validate };
