import express from "express";
import router from "./test.js";

const port = 8000;
const host = "localhost";
const app = express();

app.use("/user", router);
app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}/`);
});

/*
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!\n");
});
*/
