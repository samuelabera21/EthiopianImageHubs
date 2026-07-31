import { Router } from "express";
import { contributorApplicationController } from "../controllers/contributor.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
import { validate } from "../middlewares/validation.middleware";
import { applyContributorSchema } from "../validators/contributor.validator";

const router = Router();

/**
 * POST /contributors/apply
 * Allows an authenticated USER to submit an application.
 */
router.post(
  "/apply",
  authenticate,
  authorize(["USER"]),
  validate(applyContributorSchema),
  contributorApplicationController.apply.bind(contributorApplicationController),
);

/**
 * GET /contributors/application
 * Returns the authenticated user's contributor application.
 */
router.get(
  "/application",
  authenticate,
  authorize(["USER", "CONTRIBUTOR", "MODERATOR", "ADMIN"]),
  contributorApplicationController.getApplication.bind(contributorApplicationController),
);

export default router;
