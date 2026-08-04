import { Router } from "express";
import { contributorApplicationController } from "../controllers/contributor.controller";
import { adminUserController } from "../controllers/admin.user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
import { validate } from "../middlewares/validation.middleware";
import { reviewApplicationSchema } from "../validators/contributor.validator";

const router = Router();

/**
 * Admin endpoints
 * All routes mounted at /admin are restricted to ADMIN.
 */
router.use(authenticate, authorize(["ADMIN"]));

//=================================================
// Contributor Applications
//=================================================

router.get(
  "/applications",
  contributorApplicationController.getApplications.bind(contributorApplicationController),
);

router.patch(
  "/applications/:applicationId",
  validate(reviewApplicationSchema),
  contributorApplicationController.reviewApplication.bind(contributorApplicationController),
);

//=================================================
// User Management
//=================================================

router.get("/users", adminUserController.getUsers.bind(adminUserController));
router.put("/users/:userId/role", adminUserController.updateUserRole.bind(adminUserController));
router.put("/users/:userId/status", adminUserController.updateUserStatus.bind(adminUserController));

export default router;
