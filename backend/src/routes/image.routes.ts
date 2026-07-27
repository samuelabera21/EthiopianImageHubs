import { Router } from "express";

import { imageController } from "../controllers/image.controller";

import { authenticate } from "../middlewares/auth.middleware";

import { uploadSingleImage } from "../middlewares/upload.middleware";

import { validate } from "../middlewares/validation.middleware";

import { updateImageSchema, uploadImageSchema } from "../validators/image.validator";

const router = Router();

/**
 * GET /images
 */
router.get(
  "/",
  imageController.getImages.bind(
    imageController,
  ),
);

/**
 * GET /images/:imageId
 */
router.get(
  "/:imageId",
  imageController.getImageById.bind(
    imageController,
  ),
);

/**
 * POST /images
 */
router.post(
  "/",
  authenticate,
  uploadSingleImage,
  validate(uploadImageSchema),
  imageController.uploadImage.bind(imageController),
);

router.patch(
  "/:imageId",
  authenticate,
  validate(updateImageSchema),
  imageController.updateImage.bind(imageController),
);

router.delete(
  "/:imageId",
  authenticate,
  imageController.deleteImage.bind(imageController),
);

router.patch(
  "/:imageId/restore",
  authenticate,
  imageController.restoreImage.bind(
    imageController,
  ),
);

export default router;