"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageService = exports.ImageService = void 0;
const sharp_1 = __importDefault(require("sharp"));
const image_repository_1 = require("../repositories/image.repository");
const storage_factory_1 = require("../storage/storage.factory");
const json_1 = require("../utils/json");
class ImageService {
    /**
     * Upload image
     */
    async uploadImage(userId, file, data) {
        //------------------------------------
        // File required
        //------------------------------------
        if (!file) {
            throw new Error("Image file is required");
        }
        //------------------------------------
        // Category
        //------------------------------------
        const category = await image_repository_1.imageRepository.findCategoryById(data.categoryId);
        if (!category) {
            throw new Error("Category not found");
        }
        //------------------------------------
        // Tags
        //------------------------------------
        if (data.tagIds?.length) {
            const tags = await image_repository_1.imageRepository.findTagsByIds(data.tagIds);
            if (tags.length !== data.tagIds.length) {
                throw new Error("One or more tags do not exist");
            }
        }
        //------------------------------------
        // Upload file
        //------------------------------------
        const uploaded = await storage_factory_1.storage.upload({
            file,
        });
        //------------------------------------
        // Image metadata
        //------------------------------------
        const metadata = await (0, sharp_1.default)(file.buffer).metadata();
        //------------------------------------
        // Save image
        //------------------------------------
        const image = await image_repository_1.imageRepository.createImage({
            ownerId: userId,
            categoryId: data.categoryId,
            title: data.title,
            description: data.description,
            location: data.location,
            storageProvider: uploaded.storageProvider,
            originalFilename: uploaded.originalFilename,
            storedFilename: uploaded.storedFilename,
            storageKey: uploaded.storageKey,
            mimeType: uploaded.mimeType,
            extension: uploaded.extension,
            fileSize: BigInt(uploaded.fileSize),
            width: uploaded.width,
            height: uploaded.height,
            checksum: undefined,
            dominantColor: undefined,
            cameraModel: undefined,
            visibility: data.visibility,
            tagIds: data.tagIds,
        });
        //------------------------------------
        // Response
        //------------------------------------
        return {
            success: true,
            message: "Image uploaded successfully",
            data: (0, json_1.serializeBigInt)(image),
        };
    }
    async getImages(query) {
        //------------------------------------
        // Pagination
        //------------------------------------
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const skip = (page - 1) * limit;
        //------------------------------------
        // Total
        //------------------------------------
        const totalItems = await image_repository_1.imageRepository.count({
            categoryId: query.categoryId,
            ownerId: query.ownerId,
            visibility: query.visibility,
            status: query.status ?? "ACTIVE",
            search: query.search,
            location: query.location,
            tagId: query.tagId,
        });
        //------------------------------------
        // Images
        //------------------------------------
        const images = await image_repository_1.imageRepository.findMany({
            skip,
            take: limit,
            categoryId: query.categoryId,
            ownerId: query.ownerId,
            visibility: query.visibility,
            status: query.status ?? "ACTIVE",
            search: query.search,
            location: query.location,
            tagId: query.tagId,
            sortBy: query.sortBy,
            sortOrder: query.sortOrder,
        });
        //------------------------------------
        // Pagination metadata
        //------------------------------------
        const totalPages = Math.ceil(totalItems / limit);
        //------------------------------------
        // Response
        //------------------------------------
        return {
            success: true,
            message: "Images retrieved successfully",
            data: (0, json_1.serializeBigInt)(images),
            pagination: {
                page,
                limit,
                totalItems,
                totalPages,
                hasNext: page < totalPages,
                hasPrevious: page > 1,
            },
        };
    }
    /**
     * Get image by ID
     */
    async getImageById(imageId) {
        //------------------------------------
        // Find image
        //------------------------------------
        const image = await image_repository_1.imageRepository.findById(imageId);
        //------------------------------------
        // Not found
        //------------------------------------
        if (!image || image.status === "DELETED") {
            throw Object.assign(new Error("Image not found"), { status: 404 });
        }
        //------------------------------------
        // Response
        //------------------------------------
        return {
            success: true,
            message: "Image retrieved successfully",
            data: (0, json_1.serializeBigInt)(image),
        };
    }
    /**
     * Update image
     */
    async updateImage(imageId, userId, data) {
        //------------------------------------
        // Find image
        //------------------------------------
        const image = await image_repository_1.imageRepository.findById(imageId);
        if (!image || image.status === "DELETED") {
            throw Object.assign(new Error("Image not found"), { status: 404 });
        }
        //------------------------------------
        // Ownership
        //------------------------------------
        if (image.ownerId !== userId) {
            throw Object.assign(new Error("You are not allowed to update this image"), { status: 403 });
        }
        //------------------------------------
        // Category
        //------------------------------------
        if (data.categoryId) {
            const category = await image_repository_1.imageRepository.findCategoryById(data.categoryId);
            if (!category) {
                throw new Error("Category not found");
            }
        }
        //------------------------------------
        // Tags
        //------------------------------------
        if (data.tagIds) {
            const tags = await image_repository_1.imageRepository.findTagsByIds(data.tagIds);
            if (tags.length !== data.tagIds.length) {
                throw new Error("One or more tags do not exist");
            }
        }
        //------------------------------------
        // Update image
        //------------------------------------
        const updatedImage = await image_repository_1.imageRepository.updateImage(imageId, data);
        //------------------------------------
        // Response
        //------------------------------------
        return {
            success: true,
            message: "Image updated successfully",
            data: (0, json_1.serializeBigInt)(updatedImage),
        };
    }
    /**
     * Soft delete image
     */
    async deleteImage(imageId, userId) {
        //------------------------------------
        // Find image
        //------------------------------------
        const image = await image_repository_1.imageRepository.findById(imageId);
        if (!image) {
            throw Object.assign(new Error("Image not found"), { status: 404 });
        }
        //------------------------------------
        // Ownership
        //------------------------------------
        if (image.ownerId !== userId) {
            throw Object.assign(new Error("You are not allowed to delete this image"), { status: 403 });
        }
        //------------------------------------
        // Already deleted
        //------------------------------------
        if (image.status === "DELETED") {
            throw Object.assign(new Error("Image already deleted"), { status: 400 });
        }
        //------------------------------------
        // Soft delete
        //------------------------------------
        await image_repository_1.imageRepository.softDelete(imageId);
        //------------------------------------
        // Response
        //------------------------------------
        return {
            success: true,
            message: "Image deleted successfully",
        };
    }
    /**
     * Permanently delete image
     */
    async permanentlyDeleteImage(imageId, userId) {
        //------------------------------------
        // Find image
        //------------------------------------
        const image = await image_repository_1.imageRepository.findById(imageId);
        if (!image) {
            throw Object.assign(new Error("Image not found"), { status: 404 });
        }
        //------------------------------------
        // Ownership
        //------------------------------------
        if (image.ownerId !== userId) {
            throw Object.assign(new Error("You are not allowed to permanently delete this image"), { status: 403 });
        }
        //------------------------------------
        // Must already be soft deleted
        //------------------------------------
        if (image.status !== "DELETED") {
            throw Object.assign(new Error("Image must be soft deleted before permanent deletion"), { status: 400 });
        }
        //------------------------------------
        // Delete physical file
        //------------------------------------
        await storage_factory_1.storage.delete(image.storageKey);
        //------------------------------------
        // Delete database record
        //------------------------------------
        await image_repository_1.imageRepository.deletePermanently(imageId);
        //------------------------------------
        // Response
        //------------------------------------
        return {
            success: true,
            message: "Image permanently deleted successfully",
        };
    }
    /**
     * Restore image
     */
    async restoreImage(imageId, userId) {
        //------------------------------------
        // Find image
        //------------------------------------
        const image = await image_repository_1.imageRepository.findById(imageId);
        if (!image) {
            throw Object.assign(new Error("Image not found"), { status: 404 });
        }
        //------------------------------------
        // Ownership
        //------------------------------------
        if (image.ownerId !== userId) {
            throw Object.assign(new Error("You are not allowed to restore this image"), { status: 403 });
        }
        //------------------------------------
        // Already active
        //------------------------------------
        if (image.status === "ACTIVE") {
            throw Object.assign(new Error("Image is not deleted"), { status: 400 });
        }
        //------------------------------------
        // Restore
        //------------------------------------
        await image_repository_1.imageRepository.restore(imageId);
        //------------------------------------
        // Response
        //------------------------------------
        return {
            success: true,
            message: "Image restored successfully",
        };
    }
}
exports.ImageService = ImageService;
exports.imageService = new ImageService();
