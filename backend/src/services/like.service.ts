import { likeRepository } from "../repositories/like.repository";
import { imageRepository } from "../repositories/image.repository";

export class LikeService {
  async likeImage(userId: string, imageId: string) {
    const image = await imageRepository.findById(imageId);

    if (!image || image.status !== "ACTIVE" || image.visibility !== "PUBLIC") {
      throw Object.assign(new Error("Image not found"), { status: 404 });
    }

    const existingLike = await likeRepository.findLike(userId, imageId);
    if (existingLike) {
      throw Object.assign(new Error("Image already liked"), { status: 409 });
    }

    await likeRepository.createLike(userId, imageId);

    return {
      success: true,
      message: "Image liked successfully",
    };
  }

  async unlikeImage(userId: string, imageId: string) {
    const existingLike = await likeRepository.findLike(userId, imageId);
    if (!existingLike) {
      throw Object.assign(new Error("Like not found"), { status: 404 });
    }

    await likeRepository.deleteLike(userId, imageId);

    return {
      success: true,
      message: "Like removed",
    };
  }
}

export const likeService = new LikeService();
