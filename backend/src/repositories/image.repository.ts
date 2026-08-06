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
            profile: {
              select: {
                displayName: true,
                avatarUrl: true,
              },
            },
          },
        },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            likes: true,
            favorites: true,
            downloads: true,
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

  search?: string;

  location?: string;
  region?: string;
  city?: string;
  orientation?: "landscape" | "portrait" | "square";
  tagId?: string;
  sortBy?: "createdAt" | "title" | "fileSize" | "relevance" | "newest" | "oldest" | "downloads" | "likes" | "trending";
  sortOrder?: "asc" | "desc";
}) {
  return prisma.image.findMany({
    where: {
      categoryId: options.categoryId,
      ownerId: options.ownerId,
      visibility: options.visibility,
      status: options.status,
      
      // Combine location, region, and city into OR condition or single field
      location: (options.location || options.region || options.city)
        ? {
            contains: options.location || options.region || options.city,
            mode: "insensitive",
          }
        : undefined,

      OR: options.search
        ? [
            { title: { contains: options.search, mode: "insensitive" } },
            { description: { contains: options.search, mode: "insensitive" } },
            { location: { contains: options.search, mode: "insensitive" } },
          ]
        : undefined,

      tags: options.tagId
        ? { some: { tagId: options.tagId } }
        : undefined,
        
      // Note: orientation filtering is omitted at the DB level due to Prisma limitations
      // without schema changes (cannot compare width and height columns directly in where).
    },

    skip: options.skip,
    take: options.take,

    orderBy: (() => {
      switch (options.sortBy) {
        case "newest": return { createdAt: "desc" };
        case "oldest": return { createdAt: "asc" };
        case "downloads": return { downloads: { _count: options.sortOrder || "desc" } };
        case "likes": return { likes: { _count: options.sortOrder || "desc" } };
        case "trending": return [
          { downloads: { _count: "desc" } },
          { likes: { _count: "desc" } },
          { createdAt: "desc" }
        ];
        case "relevance": return { createdAt: "desc" };
        default: return { [options.sortBy ?? "createdAt"]: options.sortOrder ?? "desc" };
      }
    })(),

    include: {
      owner: {
        select: {
          id: true,
          username: true,
          email: true,
          profile: {
            select: {
              displayName: true,
              avatarUrl: true,
            },
          },
        },
      },
      category: true,
      tags: { include: { tag: true } },
      _count: {
        select: {
          likes: true,
          favorites: true,
          downloads: true,
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

  search?: string;

  location?: string;

  tagId?: string;
  region?: string;
  city?: string;
  orientation?: "landscape" | "portrait" | "square";
}) {
  return prisma.image.count({
    where: {
      categoryId: options.categoryId,
      ownerId: options.ownerId,
      visibility: options.visibility,
      status: options.status,

      // Combine location, region, and city into OR condition or single field
      location: (options.location || options.region || options.city)
        ? {
            contains: options.location || options.region || options.city,
            mode: "insensitive",
          }
        : undefined,

      OR: options.search
        ? [
            { title: { contains: options.search, mode: "insensitive" } },
            { description: { contains: options.search, mode: "insensitive" } },
            { location: { contains: options.search, mode: "insensitive" } },
          ]
        : undefined,

      tags: options.tagId
        ? { some: { tagId: options.tagId } }
        : undefined,
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
 * Permanent delete image
 */
async deletePermanently(
  imageId: string,
) {
  return prisma.image.delete({
    where: {
      id: imageId,
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