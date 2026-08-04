import { prisma } from "../config/database";

class FavoriteRepository {
  async findFavorite(userId: string, imageId: string) {
    return prisma.favorite.findUnique({
      where: {
        userId_imageId: {
          userId,
          imageId,
        },
      },
    });
  }

  async createFavorite(userId: string, imageId: string) {
    return prisma.favorite.create({
      data: {
        userId,
        imageId,
      },
    });
  }

  async deleteFavorite(userId: string, imageId: string) {
    return prisma.favorite.delete({
      where: {
        userId_imageId: {
          userId,
          imageId,
        },
      },
    });
  }
}

export const favoriteRepository = new FavoriteRepository();
