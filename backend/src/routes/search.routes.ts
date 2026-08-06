import { Router } from "express";
import { discoveryController } from "../controllers/discovery.controller";

const router = Router();

router.get("/suggestions", discoveryController.getSearchSuggestions.bind(discoveryController));

export default router;
