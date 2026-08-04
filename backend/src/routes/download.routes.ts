import { Router } from "express";
import { downloadController } from "../controllers/download.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

/**
 * POST /downloads/:imageId
 * Optional authentication
 */
router.post(
  "/:imageId",
  downloadController.downloadImage.bind(downloadController)
);

/**
 * GET /downloads/history
 */
router.get(
  "/history",
  authenticate,
  authorize(["USER", "CONTRIBUTOR", "ADMIN"]),
  downloadController.getDownloadHistory.bind(downloadController)
);

export default router;
