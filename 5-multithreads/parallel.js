const { getItemsDeletedBy3 } = require("./utils.js");

process.on("message", ({ array }) => {
  process.send(getItemsDeletedBy3(array));
});
