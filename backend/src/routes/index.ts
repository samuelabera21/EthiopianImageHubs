import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    success: true,
    message: "Welcome to EthiopiaHub Images API",
    version: "v1",
  });
});

router.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "API is healthy",
    timestamp: new Date(),
  });
});

export default router;