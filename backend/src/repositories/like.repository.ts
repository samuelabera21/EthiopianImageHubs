import { prisma } from "../config/database";

class LikeRepository {
  async findLike(userId: string, imageId: string) {
    return prisma.imageLike.findUnique({
      where: {
        userId_imageId: {
          userId,
          imageId,
        },
      },
    });
  }

  async createLike(userId: string, imageId: string) {
    return prisma.imageLike.create({
      data: {
        userId,
        imageId,
      },
    });
  }

  async deleteLike(userId: string, imageId: string) {
    return prisma.imageLike.delete({
      where: {
        userId_imageId: {
          userId,
          imageId,
        },
      },
    });
  }
}

export const likeRepository = new LikeRepository();
