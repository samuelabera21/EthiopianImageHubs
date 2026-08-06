import { Router } from "express";
import { categoryController } from "../controllers/category.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

/**
 * GET /categories
 */
router.get("/", categoryController.getCategories.bind(categoryController));

/**
 * POST /categories
 */
router.post(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  categoryController.createCategory.bind(categoryController)
);

/**
 * PATCH /categories/:id
 */
router.patch(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  categoryController.updateCategory.bind(categoryController)
);

/**
 * DELETE /categories/:id
 */
router.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  categoryController.deleteCategory.bind(categoryController)
);

export default router;
