import { Router } from "express";

import authRoutes from "./auth.routes";
import categoryRoutes from "./category.routes";
import tagRoutes from "./tag.routes";
import discoveryRoutes from "./discovery.routes";
import searchRoutes from "./search.routes";
import imageRoutes from "./image.routes";
import contributorRoutes from "./contributor.routes";
import adminRoutes from "./admin.routes";
import downloadRoutes from "./download.routes";
import profileRoutes from "./profile.routes";

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
 * Tags
 */
router.use("/tags", tagRoutes);

/**
 * Search & Discovery
 */
router.use("/images", discoveryRoutes);
router.use("/search", searchRoutes);

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
router.use("/admin", adminRoutes);

/**
 * Downloads
 */
router.use("/downloads", downloadRoutes);

/**
 * Profiles
 */
router.use("/profiles", profileRoutes);

export default router;