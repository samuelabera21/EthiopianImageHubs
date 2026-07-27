import { prisma } from "../config/database";

export class ImageRepository {
  /**
   * Find category by ID
   */
  async findCategoryById(categoryId: string) {
    return prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
  }

  /**
   * Find tag by IDs
   */
  async findTagsByIds(tagIds: string[]) {
    return prisma.tag.findMany({
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
  async createImage(data: {
    ownerId: string;

    categoryId: string;

    title: string;

    description?: string;

    location?: string;

    storageProvider: "LOCAL" | "CLOUDINARY";

    originalFilename: string;

    storedFilename: string;

    storageKey: string;

    mimeType: string;

    extension: string;

    fileSize: bigint;

    width: number;

    height: number;

    checksum?: string;

    dominantColor?: string;

    cameraModel?: string;

    visibility: "PUBLIC" | "PRIVATE" | "UNLISTED";

    tagIds?: string[];
  }) {
    return prisma.image.create({
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
  async findById(imageId: string) {
    return prisma.image.findUnique({
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
async findMany(options: {
  skip: number;
  take: number;

  categoryId?: string;
  ownerId?: string;
  visibility?: "PUBLIC" | "PRIVATE" | "UNLISTED";
  status?: "ACTIVE" | "DELETED";
}) {
  return prisma.image.findMany({
    where: {
      categoryId: options.categoryId,
      ownerId: options.ownerId,
      visibility: options.visibility,
      status: options.status,
    },

    skip: options.skip,
    take: options.take,

    orderBy: {
      createdAt: "desc",
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
async count(options: {
  categoryId?: string;
  ownerId?: string;
  visibility?: "PUBLIC" | "PRIVATE" | "UNLISTED";
  status?: "ACTIVE" | "DELETED";
}) {
  return prisma.image.count({
    where: {
      categoryId: options.categoryId,
      ownerId: options.ownerId,
      visibility: options.visibility,
      status: options.status,
    },
  });
}

/**
 * Update image
 */
async updateImage(
  imageId: string,
  data: {
    categoryId?: string;
    title?: string;
    description?: string;
    location?: string;
    visibility?: "PUBLIC" | "PRIVATE" | "UNLISTED";
    tagIds?: string[];
  },
) {
  return prisma.image.update({
    where: {
      id: imageId,
    },

    data: {
      categoryId: data.categoryId,

      title: data.title,

      description: data.description,

      location: data.location,

      visibility: data.visibility,

      tags:
        data.tagIds !== undefined
          ? {
              deleteMany: {},

              create: data.tagIds.map(
                (tagId) => ({
                  tagId,
                }),
              ),
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
async softDelete(imageId: string) {
  return prisma.image.update({
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
 * Restore image
 */
async restore(imageId: string) {
  return prisma.image.update({
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

export const imageRepository =
  new ImageRepository();