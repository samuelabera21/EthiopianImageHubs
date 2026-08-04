import { Router } from "express";
import { profileController } from "../controllers/profile.controller";

const router = Router();

/**
 * GET /profiles/:username
 */
router.get(
  "/:username",
  profileController.getProfile.bind(profileController)
);

/**
 * GET /profiles/:username/images
 */
router.get(
  "/:username/images",
  profileController.getPortfolio.bind(profileController)
);

export default router;
