import { Router } from "express";

import { categoryController } from "../controllers/category.controller";

const router = Router();

/**
 * GET /categories
 */
router.get(
  "/",
  categoryController.getCategories.bind(
    categoryController,
  ),
);

export default router;
