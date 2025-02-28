const { getItemsDeletedBy3 } = require("./utils.js");
const { parentPort, workerData } = require("worker_threads");

parentPort.postMessage(getItemsDeletedBy3(workerData));
