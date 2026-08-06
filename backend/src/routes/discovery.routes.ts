import { Router } from "express";
import { discoveryController } from "../controllers/discovery.controller";

const router = Router();

router.get("/featured", discoveryController.getFeaturedImages.bind(discoveryController));
router.get("/trending", discoveryController.getTrendingImages.bind(discoveryController));
router.get("/:imageId/recommended", discoveryController.getRecommendedImages.bind(discoveryController));

export default router;
