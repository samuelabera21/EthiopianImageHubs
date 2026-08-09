import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
import { moderationController } from "../controllers/moderation.controller";

const router = Router();

// Protect all moderation routes
router.use(authenticate);
router.use(authorize(["MODERATOR", "ADMIN"]));

router.get("/", moderationController.getPendingImages.bind(moderationController));
router.patch("/:imageId/approve", moderationController.approveImage.bind(moderationController));
router.patch("/:imageId/reject", moderationController.rejectImage.bind(moderationController));

export default router;
