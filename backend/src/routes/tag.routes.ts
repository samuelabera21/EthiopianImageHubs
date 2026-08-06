import { Router } from "express";
import { tagController } from "../controllers/tag.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

router.get("/", tagController.getTags.bind(tagController));

router.post(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  tagController.createTag.bind(tagController)
);

router.patch(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  tagController.updateTag.bind(tagController)
);

router.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  tagController.deleteTag.bind(tagController)
);

export default router;
