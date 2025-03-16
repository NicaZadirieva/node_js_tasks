import express from "express";

const port = 8000;
const host = "localhost";
const app = express();

app.get("/hello", (req, res) => {
  res.status(200);
  res.header("Content-Type", "text/plain");
  res.send("Hello, World!");
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
