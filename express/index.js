import express from "express";

const port = 8000;
const host = "localhost";
const app = express();

app.all("/hello", (req, res, next) => {
  console.log("Hello, world!");
  next();
});

app.get("/hel?lo", (req, res) => {
  res.status(200);
  res.header("Content-Type", "text/plain");
  res.send("Hello, Express!");
});
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
