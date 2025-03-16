import express, { Request, Response } from "express";

const router = express.Router();

router.post("/login", (req: Request, res: Response) => {
  throw new Error("Not implemented");
});

router.post("/register", (req: Request, res: Response) => {
  res.send("register");
});

export { router };

