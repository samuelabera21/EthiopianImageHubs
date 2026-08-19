import { collectionRepository } from "../repositories/collection.repository";
import { favoriteRepository } from "../repositories/favorite.repository";
import { imageRepository } from "../repositories/image.repository";
import { serializeBigInt } from "../utils/json";
import {
  CreateCollectionInput,
  UpdateCollectionInput,
} from "../validators/collection.validator";

export class CollectionService {
  async createCollection(userId: string, data: CreateCollectionInput) {
    const collection = await collectionRepository.create({
      ownerId: userId,
      name: data.name,
      description: data.description,
      isPublic: data.isPublic ?? true,
    });

    return {
      success: true,
      message: "Collection created successfully",
      data: serializeBigInt(collection),
    };
  }

  async getCollectionById(collectionId: string, userId?: string, userRole?: string) {
    const collection = await collectionRepository.findById(collectionId);

    if (!collection) {
      throw Object.assign(new Error("Collection not found"), { status: 404 });
    }

    // Protection for private collections
    if (!collection.isPublic) {
      if (collection.ownerId !== userId && userRole !== "ADMIN") {
        throw Object.assign(new Error("Collection not found"), { status: 404 });
      }
    }

    // Filter contained images to respect moderation and visibility for non-owners/non-admins/non-moderators
    const isOwnerOrStaff =
      collection.ownerId === userId || userRole === "ADMIN" || userRole === "MODERATOR";

    const filteredImages = collection.images
      .filter((item) => {
        if (!item.image || item.image.status === "DELETED") return false;
        if (!isOwnerOrStaff) {
          return item.image.moderationStatus === "APPROVED" && item.image.visibility === "PUBLIC";
        }
        return true;
      })
      .map((item) => {
        const img = item.image as any;
        return {
          ...img,
          storageKey: img.storageKey ? img.storageKey.replace(/\\/g, "/") : img.storageKey,
          tags: Array.isArray(img.tags)
            ? img.tags.map((t: any) => (t.tag ? t.tag : t))
            : [],
          addedToCollectionAt: item.createdAt,
        };
      });

    const result = {
      ...collection,
      images: filteredImages,
      _count: {
        images: filteredImages.length,
      },
    };

    return {
      success: true,
      message: "Collection retrieved successfully",
      data: serializeBigInt(result),
    };
  }

  async getCollections(query: {
    ownerId?: string;
    isPublic?: boolean;
    userId?: string;
    page?: number;
    limit?: number;
  }) {
    let targetIsPublic: boolean | undefined = query.isPublic;

    // If querying another user's collections or unauthenticated, enforce public only
    if (query.ownerId && query.ownerId !== query.userId) {
      targetIsPublic = true;
    }

    // If fetching general public collections without ownerId specified
    if (!query.ownerId && !query.userId) {
      targetIsPublic = true;
    }

    const result = await collectionRepository.findMany({
      ownerId: query.ownerId,
      isPublic: targetIsPublic,
      page: query.page,
      limit: query.limit,
    });

    const normalizedCollections = result.collections.map((col) => ({
      ...col,
      images: col.images.map((item) => ({
        ...item.image,
        imageId: item.imageId,
        storageKey: item.image?.storageKey
          ? item.image.storageKey.replace(/\\/g, "/")
          : item.image?.storageKey,
      })),
    }));

    return {
      success: true,
      message: "Collections retrieved successfully",
      data: serializeBigInt(normalizedCollections),
      pagination: result.pagination,
    };
  }

  async updateCollection(
    collectionId: string,
    userId: string,
    userRole: string | undefined,
    data: UpdateCollectionInput
  ) {
    const collection = await collectionRepository.findById(collectionId);

    if (!collection) {
      throw Object.assign(new Error("Collection not found"), { status: 404 });
    }

    if (collection.ownerId !== userId && userRole !== "ADMIN") {
      throw Object.assign(new Error("You do not have permission to edit this collection"), {
        status: 403,
      });
    }

    const updated = await collectionRepository.update(collectionId, data);

    return {
      success: true,
      message: "Collection updated successfully",
      data: serializeBigInt(updated),
    };
  }

  async deleteCollection(collectionId: string, userId: string, userRole?: string) {
    const collection = await collectionRepository.findById(collectionId);

    if (!collection) {
      throw Object.assign(new Error("Collection not found"), { status: 404 });
    }

    if (collection.ownerId !== userId && userRole !== "ADMIN") {
      throw Object.assign(new Error("You do not have permission to delete this collection"), {
        status: 403,
      });
    }

    await collectionRepository.delete(collectionId);

    return {
      success: true,
      message: "Collection deleted successfully",
    };
  }

  async addImageToCollection(
    collectionId: string,
    imageId: string,
    userId: string,
    userRole?: string
  ) {
    const collection = await collectionRepository.findById(collectionId);

    if (!collection) {
      throw Object.assign(new Error("Collection not found"), { status: 404 });
    }

    if (collection.ownerId !== userId && userRole !== "ADMIN") {
      throw Object.assign(new Error("You do not have permission to modify this collection"), {
        status: 403,
      });
    }

    const image = await imageRepository.findById(imageId);
    if (!image || image.status === "DELETED") {
      throw Object.assign(new Error("Image not found"), { status: 404 });
    }

    // Check duplicate
    const existing = await collectionRepository.findCollectionImage(collectionId, imageId);
    if (existing) {
      return {
        success: true,
        message: "Image is already in this collection",
        data: serializeBigInt(existing),
      };
    }

    const added = await collectionRepository.addImage(collectionId, imageId);

    // Sync with favorites so favorite count increments
    try {
      const existingFav = await favoriteRepository.findFavorite(userId, imageId);
      if (!existingFav) {
        await favoriteRepository.createFavorite(userId, imageId);
      }
    } catch {}

    return {
      success: true,
      message: "Image added to collection successfully",
      data: serializeBigInt(added),
    };
  }

  async removeImageFromCollection(
    collectionId: string,
    imageId: string,
    userId: string,
    userRole?: string
  ) {
    const collection = await collectionRepository.findById(collectionId);

    if (!collection) {
      throw Object.assign(new Error("Collection not found"), { status: 404 });
    }

    if (collection.ownerId !== userId && userRole !== "ADMIN") {
      throw Object.assign(new Error("You do not have permission to modify this collection"), {
        status: 403,
      });
    }

    const existing = await collectionRepository.findCollectionImage(collectionId, imageId);
    if (!existing) {
      throw Object.assign(new Error("Image is not in this collection"), { status: 404 });
    }

    await collectionRepository.removeImage(collectionId, imageId);

    // Sync with favorites so favorite count decrements
    try {
      const existingFav = await favoriteRepository.findFavorite(userId, imageId);
      if (existingFav) {
        await favoriteRepository.deleteFavorite(userId, imageId);
      }
    } catch {}

    return {
      success: true,
      message: "Image removed from collection successfully",
    };
  }
}

export const collectionService = new CollectionService();
