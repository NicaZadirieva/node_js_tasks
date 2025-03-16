import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  throw new Error("Not implemented");
});

router.post("/register", (req, res) => {
  res.send("register");
});

export { router };
