import { Router } from "express";
import { profileController } from "../controllers/profile.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
import { uploadSingleImage } from "../middlewares/upload.middleware";

const router = Router();

/**
 * PATCH /profiles/me
 */
router.patch(
  "/me",
  authenticate,
  authorize(["USER", "CONTRIBUTOR", "ADMIN"]),
  profileController.updateProfile.bind(profileController)
);

/**
 * PATCH /profiles/me/avatar
 */
router.patch(
  "/me/avatar",
  authenticate,
  authorize(["USER", "CONTRIBUTOR", "ADMIN"]),
  uploadSingleImage,
  profileController.updateAvatar.bind(profileController)
);

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
