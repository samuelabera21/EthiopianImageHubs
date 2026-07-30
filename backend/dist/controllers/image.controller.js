"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageController = exports.ImageController = void 0;
const image_schema_1 = require("./image.schema");
const image_service_1 = require("../services/image.service");
class ImageController {
    /**
     * Upload image
     */
    async uploadImage(req, res, next) {
        try {
            const image = await image_service_1.imageService.uploadImage(req.user.userId, req.file, req.body);
            return res.status(201).json(image);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Get images
     */
    /**
     * Get images
     */
    async getImages(req, res, next) {
        try {
            // Validate and parse query parameters
            const query = image_schema_1.getImagesQuerySchema.parse(req.query);
            const result = await image_service_1.imageService.getImages(query);
            // Normalize image paths and tags for web compatibility
            const normalizedImages = result.data.map(image => ({
                ...image,
                storageKey: image.storageKey ? image.storageKey.replace(/\\/g, "/") : image.storageKey,
                tags: Array.isArray(image.tags)
                    ? image.tags.map((t) => (t.tag ? t.tag : t))
                    : [],
            }));
            return res.json({
                ...result,
                data: normalizedImages,
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Get image by ID
     */
    async getImageById(req, res, next) {
        try {
            // Validate and parse path parameters
            const { imageId } = image_schema_1.imageIdParamsSchema.parse(req.params);
            const result = await image_service_1.imageService.getImageById(imageId);
            if (!result || !result.data) {
                return res.status(404).json({ success: false, message: "Image not found" });
            }
            // Normalize image path and tags for web compatibility
            if (result.data.storageKey) {
                result.data.storageKey = result.data.storageKey.replace(/\\/g, "/");
            }
            if (Array.isArray(result.data.tags)) {
                result.data.tags = result.data.tags.map((t) => (t.tag ? t.tag : t));
            }
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Download image file as attachment
     */
    async downloadImage(req, res, next) {
        try {
            const { imageId } = image_schema_1.imageIdParamsSchema.parse(req.params);
            const result = await image_service_1.imageService.getImageById(imageId);
            if (!result || !result.data) {
                return res.status(404).json({ success: false, message: "Image not found" });
            }
            const image = result.data;
            const pathModule = await import("path");
            const filePath = pathModule.join(process.cwd(), image.storageKey);
            const filename = image.originalFilename || `${image.title}.${image.extension || "jpg"}`;
            return res.download(filePath, filename);
        }
        catch (error) {
            next(error);
        }
    }
    async updateImage(req, res, next) {
        try {
            const result = await image_service_1.imageService.updateImage(image_schema_1.imageIdParamsSchema.parse(req.params).imageId, // imageId is already a UUID here
            req.user.userId, req.body);
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteImage(req, res, next) {
        try {
            const result = await image_service_1.imageService.deleteImage(image_schema_1.imageIdParamsSchema.parse(req.params).imageId, // imageId is already a UUID here
            req.user.userId);
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async permanentlyDeleteImage(req, res, next) {
        try {
            const result = await image_service_1.imageService.permanentlyDeleteImage(image_schema_1.imageIdParamsSchema.parse(req.params).imageId, // imageId is already a UUID here
            req.user.userId);
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Restore image
     */
    async restoreImage(req, res, next) {
        try {
            const result = await image_service_1.imageService.restoreImage(image_schema_1.imageIdParamsSchema.parse(req.params).imageId, // imageId is already a UUID here
            req.user.userId);
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ImageController = ImageController;
exports.imageController = new ImageController();
