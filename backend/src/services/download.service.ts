import { downloadRepository } from "../repositories/download.repository";
import { imageRepository } from "../repositories/image.repository";
import { serializeBigInt } from "../utils/json";

export class DownloadService {
  async downloadImage(imageId: string, userId?: string, ipHash?: string, userAgent?: string) {
    const image = await imageRepository.findById(imageId);

    if (!image || image.status !== "ACTIVE" || image.visibility !== "PUBLIC") {
      throw Object.assign(new Error("Image not found"), { status: 404 });
    }

    // Creating immutable record
    await downloadRepository.createDownload(imageId, userId, ipHash, userAgent);

    return {
      success: true,
      message: "Download successful",
      data: serializeBigInt({
        downloadUrl: `/${image.storageKey.replace(/\\/g, "/")}`,
        fileName: image.originalFilename || `${image.title}.${image.extension || "jpg"}`,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours expiry
      }),
    };
  }

  async getDownloadHistory(userId: string, page: number = 1, pageSize: number = 20) {
    const skip = (page - 1) * pageSize;
    const { totalItems, items } = await downloadRepository.getUserDownloadHistory(userId, skip, pageSize);
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      success: true,
      message: "Download history retrieved",
      data: {
        items: items.map((item: any) => ({
          id: item.id,
          imageId: item.imageId,
          title: item.image.title,
          downloadedAt: item.downloadedAt,
        })),
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        }
      }
    };
  }
}

export const downloadService = new DownloadService();
