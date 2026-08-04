import sharp from "sharp";

import { imageRepository } from "../repositories/image.repository";
import { prisma } from "../config/database";

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

  const totalItems =
    await imageRepository.count({
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

  const images =
    await imageRepository.findMany({
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

  const totalPages =
    Math.ceil(totalItems / limit);

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
  async getImageById(imageId: string, userId?: string) {
    //------------------------------------
    // Find image
    //------------------------------------

    const image = await imageRepository.findById(imageId);

    //------------------------------------
    // Not found
    //------------------------------------

    if (!image || image.status === "DELETED") {
      throw Object.assign(new Error("Image not found"), { status: 404 });
    }

    let isLiked = false;
    let isFavorited = false;

    if (userId) {
      const [like, favorite] = await Promise.all([
        prisma.imageLike.findUnique({
          where: { userId_imageId: { userId, imageId } }
        }),
        prisma.favorite.findUnique({
          where: { userId_imageId: { userId, imageId } }
        })
      ]);
      isLiked = !!like;
      isFavorited = !!favorite;
    }

    //------------------------------------
    // Response
    //------------------------------------

    const serializedData = serializeBigInt(image);
    
    return {
      success: true,
      message: "Image retrieved successfully",
      data: {
        ...serializedData,
        isLiked,
        isFavorited
      },
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

    await imageRepository.softDelete(imageId);

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
  async permanentlyDeleteImage(imageId: string, userId: string) {
    //------------------------------------
    // Find image
    //------------------------------------

    const image = await imageRepository.findById(imageId);

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

    await storage.delete(image.storageKey);

    //------------------------------------
    // Delete database record
    //------------------------------------

    await imageRepository.deletePermanently(imageId);

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
  async restoreImage(imageId: string, userId: string) {
    //------------------------------------
    // Find image
    //------------------------------------

    const image = await imageRepository.findById(imageId);

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

    await imageRepository.restore(imageId);

    //------------------------------------
    // Response
    //------------------------------------

    return {
      success: true,
      message: "Image restored successfully",
    };
  }
}

export const imageService = new ImageService();
