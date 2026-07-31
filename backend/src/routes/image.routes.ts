import { Router } from "express";

import { imageController } from "../controllers/image.controller";

import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";

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
 * GET /images/:imageId/download
 */
router.get(
  "/:imageId/download",
  imageController.downloadImage.bind(
    imageController,
  ),
);

/**
 * POST /images
 */
router.post(
  "/",
  authenticate,
  authorize(["CONTRIBUTOR", "ADMIN"]),
  uploadSingleImage,
  validate(uploadImageSchema),
  imageController.uploadImage.bind(imageController),
);

router.patch(
  "/:imageId",
  authenticate,
  authorize(["CONTRIBUTOR", "ADMIN"]),
  validate(updateImageSchema),
  imageController.updateImage.bind(imageController),
);

router.delete(
  "/:imageId",
  authenticate,
  authorize(["CONTRIBUTOR", "ADMIN"]),
  imageController.deleteImage.bind(imageController),
);

router.delete(
  "/:imageId/permanent",
  authenticate,
  authorize(["CONTRIBUTOR", "ADMIN"]),
  imageController.permanentlyDeleteImage.bind(
    imageController,
  ),
);

router.patch(
  "/:imageId/restore",
  authenticate,
  authorize(["CONTRIBUTOR", "ADMIN"]),
  validate(updateImageSchema),
  imageController.restoreImage.bind(
    imageController,
  ),
);

export default router;
