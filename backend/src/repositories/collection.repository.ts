import { prisma } from "../config/database";

export class CollectionRepository {
  async create(data: {
    ownerId: string;
    name: string;
    description?: string;
    isPublic: boolean;
  }) {
    return prisma.collection.create({
      data: {
        ownerId: data.ownerId,
        name: data.name,
        description: data.description,
        isPublic: data.isPublic,
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
        _count: {
          select: {
            images: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return prisma.collection.findUnique({
      where: { id },
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
        images: {
          include: {
            image: {
              include: {
                owner: {
                  select: {
                    id: true,
                    username: true,
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
                    downloads: true,
                    favorites: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            images: true,
          },
        },
      },
    });
  }

  async findMany(options: {
    ownerId?: string;
    isPublic?: boolean;
    page?: number;
    limit?: number;
  }) {
    const page = options.page ?? 1;
    const limit = options.limit ?? 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (options.ownerId !== undefined) {
      where.ownerId = options.ownerId;
    }
    if (options.isPublic !== undefined) {
      where.isPublic = options.isPublic;
    }

    const [totalItems, collections] = await Promise.all([
      prisma.collection.count({ where }),
      prisma.collection.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          owner: {
            select: {
              id: true,
              username: true,
              profile: {
                select: {
                  displayName: true,
                  avatarUrl: true,
                },
              },
            },
          },
          images: {
            take: 4,
            include: {
              image: {
                select: {
                  id: true,
                  title: true,
                  storageKey: true,
                  storageProvider: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          },
          _count: {
            select: {
              images: true,
            },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      collections,
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

  async update(
    id: string,
    data: {
      name?: string;
      description?: string;
      isPublic?: boolean;
    }
  ) {
    return prisma.collection.update({
      where: { id },
      data,
      include: {
        owner: {
          select: {
            id: true,
            username: true,
          },
        },
        _count: {
          select: {
            images: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    return prisma.collection.delete({
      where: { id },
    });
  }

  async findCollectionImage(collectionId: string, imageId: string) {
    return prisma.collectionImage.findUnique({
      where: {
        collectionId_imageId: {
          collectionId,
          imageId,
        },
      },
    });
  }

  async addImage(collectionId: string, imageId: string) {
    return prisma.collectionImage.create({
      data: {
        collectionId,
        imageId,
      },
      include: {
        image: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async removeImage(collectionId: string, imageId: string) {
    return prisma.collectionImage.delete({
      where: {
        collectionId_imageId: {
          collectionId,
          imageId,
        },
      },
    });
  }
}

export const collectionRepository = new CollectionRepository();
