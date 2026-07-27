import { Router } from "express";

import authRoutes from "./auth.routes";
import imageRoutes from "./image.routes";

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

/**
 * Authentication
 */
router.use("/auth", authRoutes);
/**
 * Images
 */
router.use("/images", imageRoutes);

export default router;