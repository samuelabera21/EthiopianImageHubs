import sharp from "sharp";

import { imageRepository } from "../repositories/image.repository";

import { storage } from "../storage/storage.factory";

import {
  UploadImageInput,
  UpdateImageInput,
  GetImagesQuery,
} from "../validators/image.validator";

import { serializeBigInt } from "../utils/json";

export class ImageService {
  /**
   * Upload image
   */
  async uploadImage(
    userId: string,
    file: Express.Multer.File,
    data: UploadImageInput,
  ) {
    //------------------------------------
    // File required
    //------------------------------------

    if (!file) {
      throw new Error("Image file is required");
    }

    //------------------------------------
    // Category
    //------------------------------------

    const category = await imageRepository.findCategoryById(data.categoryId);

    if (!category) {
      throw new Error("Category not found");
    }

    //------------------------------------
    // Tags
    //------------------------------------

    if (data.tagIds?.length) {
      const tags = await imageRepository.findTagsByIds(data.tagIds);

      if (tags.length !== data.tagIds.length) {
        throw new Error("One or more tags do not exist");
      }
    }

    //------------------------------------
    // Upload file
    //------------------------------------

    const uploaded = await storage.upload({
      file,
    });

    //------------------------------------
    // Image metadata
    //------------------------------------

    const metadata = await sharp(file.buffer).metadata();

    //------------------------------------
    // Save image
    //------------------------------------

    const image = await imageRepository.createImage({
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
      data: serializeBigInt(image),
    };
  }

  async getImages(query: GetImagesQuery) {
    //------------------------------------
    // Pagination
    //------------------------------------

    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const skip = (page - 1) * limit;

    //------------------------------------
    // Total
    //------------------------------------

    const totalItems = await imageRepository.count({
      categoryId: query.categoryId,
      ownerId: query.ownerId,
      visibility: query.visibility,
      status: query.status ?? "ACTIVE",
    });

    //------------------------------------
    // Images
    //------------------------------------

    const images = await imageRepository.findMany({
      skip,
      take: limit,

      categoryId: query.categoryId,
      ownerId: query.ownerId,
      visibility: query.visibility,
      status: query.status ?? "ACTIVE",
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

      data: serializeBigInt(images),

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
  async getImageById(imageId: string) {
    //------------------------------------
    // Find image
    //------------------------------------

    const image = await imageRepository.findById(imageId);

    //------------------------------------
    // Not found
    //------------------------------------

    if (!image || image.status === "DELETED") {
      throw new Error("Image not found");
    }

    //------------------------------------
    // Response
    //------------------------------------

    return {
      success: true,

      message: "Image retrieved successfully",

      data: serializeBigInt(image),
    };
  }

  /**
   * Update image
   */
  async updateImage(imageId: string, userId: string, data: UpdateImageInput) {
    //------------------------------------
    // Find image
    //------------------------------------

    const image = await imageRepository.findById(imageId);

    if (!image || image.status === "DELETED") {
      throw new Error("Image not found");
    }

    //------------------------------------
    // Ownership
    //------------------------------------

    if (image.ownerId !== userId) {
      throw new Error("You are not allowed to update this image");
    }

    //------------------------------------
    // Category
    //------------------------------------

    if (data.categoryId) {
      const category = await imageRepository.findCategoryById(data.categoryId);

      if (!category) {
        throw new Error("Category not found");
      }
    }

    //------------------------------------
    // Tags
    //------------------------------------

    if (data.tagIds) {
      const tags = await imageRepository.findTagsByIds(data.tagIds);

      if (tags.length !== data.tagIds.length) {
        throw new Error("One or more tags do not exist");
      }
    }

    //------------------------------------
    // Update image
    //------------------------------------

    const updatedImage = await imageRepository.updateImage(imageId, data);

    //------------------------------------
    // Response
    //------------------------------------

    return {
      success: true,
      message: "Image updated successfully",
      data: serializeBigInt(updatedImage),
    };
  }

  /**
   * Soft delete image
   */
  async deleteImage(imageId: string, userId: string) {
    //------------------------------------
    // Find image
    //------------------------------------

    const image = await imageRepository.findById(imageId);

    if (!image) {
      throw new Error("Image not found");
    }

    //------------------------------------
    // Ownership
    //------------------------------------

    if (image.ownerId !== userId) {
      throw new Error("You are not allowed to delete this image");
    }

    //------------------------------------
    // Already deleted
    //------------------------------------

    if (image.status === "DELETED") {
      throw new Error("Image already deleted");
    }

    //------------------------------------
    // Soft delete
    //------------------------------------

    await imageRepository.softDelete(imageId);

    //------------------------------------
    // Response
    //------------------------------------

    return {
      success: true,
      message: "Image deleted successfully",
    };
  }
}

export const imageService = new ImageService();
