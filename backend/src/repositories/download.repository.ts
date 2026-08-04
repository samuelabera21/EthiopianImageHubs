import { prisma } from "../config/database";

class DownloadRepository {
  async createDownload(imageId: string, userId?: string, ipHash?: string, userAgent?: string) {
    return prisma.download.create({
      data: {
        imageId,
        userId,
        ipHash,
        userAgent,
      },
    });
  }

  async getUserDownloadHistory(userId: string, skip: number, take: number) {
    const [totalItems, items] = await prisma.$transaction([
      prisma.download.count({ where: { userId } }),
      prisma.download.findMany({
        where: { userId },
        orderBy: { downloadedAt: "desc" },
        skip,
        take,
        include: {
          image: {
            select: {
              title: true,
            }
          }
        }
      })
    ]);
    return { totalItems, items };
  }
}

export const downloadRepository = new DownloadRepository();
