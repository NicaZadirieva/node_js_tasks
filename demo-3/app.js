const EventEmitter = require("events");

const myEmitter = new EventEmitter();

const logDbConnection = () => {
  console.log("Database connection established");
};

myEmitter.on("db-connection", logDbConnection);

myEmitter.emit("db-connection");

myEmitter.removeListener("db-connection", logDbConnection);

myEmitter.emit("db-connection");

myEmitter.on("msg", (data) => {
  console.log(`Message received: ${data}`);
});

myEmitter.emit("msg", "Hello, World!");

myEmitter.once("off", () => {
  console.log("Я вызвался 1 раз и не больше");
});

myEmitter.emit("off");
myEmitter.emit("off");

console.log(myEmitter.getMaxListeners());
myEmitter.setMaxListeners(1);

console.log(myEmitter.getMaxListeners());
console.log(myEmitter.listenerCount("msg"));
console.log(myEmitter.listenerCount("off"));

console.log(myEmitter.eventNames());
