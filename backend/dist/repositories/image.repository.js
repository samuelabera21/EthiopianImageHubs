"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRepository = exports.ImageRepository = void 0;
const database_1 = require("../config/database");
class ImageRepository {
    /**
     * Find category by ID
     */
    async findCategoryById(categoryId) {
        return database_1.prisma.category.findUnique({
            where: {
                id: categoryId,
            },
        });
    }
    /**
     * Find tag by IDs
     */
    async findTagsByIds(tagIds) {
        return database_1.prisma.tag.findMany({
            where: {
                id: {
                    in: tagIds,
                },
            },
        });
    }
    /**
     * Create image
     */
    async createImage(data) {
        return database_1.prisma.image.create({
            data: {
                ownerId: data.ownerId,
                categoryId: data.categoryId,
                title: data.title,
                description: data.description,
                location: data.location,
                storageProvider: data.storageProvider,
                originalFilename: data.originalFilename,
                storedFilename: data.storedFilename,
                storageKey: data.storageKey,
                mimeType: data.mimeType,
                extension: data.extension,
                fileSize: data.fileSize,
                width: data.width,
                height: data.height,
                checksum: data.checksum,
                dominantColor: data.dominantColor,
                cameraModel: data.cameraModel,
                visibility: data.visibility,
                tags: data.tagIds
                    ? {
                        create: data.tagIds.map((tagId) => ({
                            tagId,
                        })),
                    }
                    : undefined,
            },
            include: {
                category: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
    }
    /**
     * Find image by ID
     */
    async findById(imageId) {
        return database_1.prisma.image.findUnique({
            where: {
                id: imageId,
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                },
                category: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
    }
    /**
     * Get images
     */
    async findMany(options) {
        return database_1.prisma.image.findMany({
            where: {
                categoryId: options.categoryId,
                ownerId: options.ownerId,
                visibility: options.visibility,
                status: options.status,
                location: options.location
                    ? {
                        contains: options.location,
                        mode: "insensitive",
                    }
                    : undefined,
                OR: options.search
                    ? [
                        {
                            title: {
                                contains: options.search,
                                mode: "insensitive",
                            },
                        },
                        {
                            description: {
                                contains: options.search,
                                mode: "insensitive",
                            },
                        },
                        {
                            location: {
                                contains: options.search,
                                mode: "insensitive",
                            },
                        },
                    ]
                    : undefined,
                tags: options.tagId
                    ? {
                        some: {
                            tagId: options.tagId,
                        },
                    }
                    : undefined,
            },
            skip: options.skip,
            take: options.take,
            orderBy: {
                [options.sortBy ?? "createdAt"]: options.sortOrder ?? "desc",
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                },
                category: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
    }
    /**
     * Count images
     */
    async count(options) {
        return database_1.prisma.image.count({
            where: {
                categoryId: options.categoryId,
                ownerId: options.ownerId,
                visibility: options.visibility,
                status: options.status,
                location: options.location
                    ? {
                        contains: options.location,
                        mode: "insensitive",
                    }
                    : undefined,
                OR: options.search
                    ? [
                        {
                            title: {
                                contains: options.search,
                                mode: "insensitive",
                            },
                        },
                        {
                            description: {
                                contains: options.search,
                                mode: "insensitive",
                            },
                        },
                        {
                            location: {
                                contains: options.search,
                                mode: "insensitive",
                            },
                        },
                    ]
                    : undefined,
                tags: options.tagId
                    ? {
                        some: {
                            tagId: options.tagId,
                        },
                    }
                    : undefined,
            },
        });
    }
    /**
     * Update image
     */
    async updateImage(imageId, data) {
        return database_1.prisma.image.update({
            where: {
                id: imageId,
            },
            data: {
                categoryId: data.categoryId,
                title: data.title,
                description: data.description,
                location: data.location,
                visibility: data.visibility,
                tags: data.tagIds !== undefined
                    ? {
                        deleteMany: {},
                        create: data.tagIds.map((tagId) => ({
                            tagId,
                        })),
                    }
                    : undefined,
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                },
                category: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
    }
    /** * Soft delete image
     */
    async softDelete(imageId) {
        return database_1.prisma.image.update({
            where: {
                id: imageId,
            },
            data: {
                status: "DELETED",
                deletedAt: new Date(),
            },
        });
    }
    /**
     * Permanent delete image
     */
    async deletePermanently(imageId) {
        return database_1.prisma.image.delete({
            where: {
                id: imageId,
            },
        });
    }
    /**
     * Restore image
     */
    async restore(imageId) {
        return database_1.prisma.image.update({
            where: {
                id: imageId,
            },
            data: {
                status: "ACTIVE",
                deletedAt: null,
            },
        });
    }
}
exports.ImageRepository = ImageRepository;
exports.imageRepository = new ImageRepository();
