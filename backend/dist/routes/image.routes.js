"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_controller_1 = require("../controllers/image.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const image_validator_1 = require("../validators/image.validator");
const router = (0, express_1.Router)();
/**
 * GET /images
 */
router.get("/", image_controller_1.imageController.getImages.bind(image_controller_1.imageController));
/**
 * GET /images/:imageId
 */
router.get("/:imageId", image_controller_1.imageController.getImageById.bind(image_controller_1.imageController));
/**
 * GET /images/:imageId/download
 */
router.get("/:imageId/download", image_controller_1.imageController.downloadImage.bind(image_controller_1.imageController));
/**
 * POST /images
 */
router.post("/", auth_middleware_1.authenticate, upload_middleware_1.uploadSingleImage, (0, validation_middleware_1.validate)(image_validator_1.uploadImageSchema), image_controller_1.imageController.uploadImage.bind(image_controller_1.imageController));
router.patch("/:imageId", auth_middleware_1.authenticate, (0, validation_middleware_1.validate)(image_validator_1.updateImageSchema), image_controller_1.imageController.updateImage.bind(image_controller_1.imageController));
router.delete("/:imageId", auth_middleware_1.authenticate, image_controller_1.imageController.deleteImage.bind(image_controller_1.imageController));
router.delete("/:imageId/permanent", auth_middleware_1.authenticate, image_controller_1.imageController.permanentlyDeleteImage.bind(image_controller_1.imageController));
router.patch("/:imageId/restore", auth_middleware_1.authenticate, (0, validation_middleware_1.validate)(image_validator_1.updateImageSchema), image_controller_1.imageController.restoreImage.bind(image_controller_1.imageController));
exports.default = router;
