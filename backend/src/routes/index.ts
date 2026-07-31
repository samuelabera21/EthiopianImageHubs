import { Router } from "express";

import authRoutes from "./auth.routes";
import categoryRoutes from "./category.routes";
import imageRoutes from "./image.routes";
import contributorRoutes from "./contributor.routes";
import adminRoutes from "./admin.routes";

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
 * Categories
 */
router.use("/categories", categoryRoutes);
/**
 * Images
 */
router.use("/images", imageRoutes);
/**
 * Contributors
 */
router.use("/contributors", contributorRoutes);
/**
 * Admin
 */
router.use("/admin/contributor-applications", adminRoutes);

export default router;