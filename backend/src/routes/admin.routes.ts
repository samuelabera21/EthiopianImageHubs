import { Router } from "express";
import { contributorApplicationController } from "../controllers/contributor.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
import { validate } from "../middlewares/validation.middleware";
import { reviewApplicationSchema } from "../validators/contributor.validator";

const router = Router();

/**
 * Admin endpoints for Contributor Applications
 * All routes mounted at /admin/contributor-applications are restricted to ADMIN.
 */

router.use(authenticate, authorize(["ADMIN"]));

/**
 * GET /admin/contributor-applications
 */
router.get(
  "/",
  contributorApplicationController.getApplications.bind(contributorApplicationController),
);

/**
 * PATCH /admin/contributor-applications/:applicationId
 */
router.patch(
  "/:applicationId",
  validate(reviewApplicationSchema),
  contributorApplicationController.reviewApplication.bind(contributorApplicationController),
);

export default router;
