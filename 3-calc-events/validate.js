function validate(a, b, method) {
  if (!a || !b || isNaN(a) || isNaN(b)) {
    throw new Error("Please provide two numbers as an argument");
  }

  if (!method || (method !== "add" && method !== "multiply")) {
    throw new Error("Please provide 'add' or'multiply' as a third argument");
  }

  return true; // validation successful
}

module.exports = { validate };
