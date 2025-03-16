import express from "express";
import { router as userRouter } from "./users/users.js";
const port = 8000;
const host = "localhost";
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/users", userRouter);

app.use((err, req, res, next) => {
  res.status(500).send("Server Error");
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
