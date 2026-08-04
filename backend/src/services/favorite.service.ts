import { favoriteRepository } from "../repositories/favorite.repository";
import { imageRepository } from "../repositories/image.repository";

export class FavoriteService {
  async favoriteImage(userId: string, imageId: string) {
    const image = await imageRepository.findById(imageId);

    if (!image || image.status !== "ACTIVE" || image.visibility !== "PUBLIC") {
      throw Object.assign(new Error("Image not found"), { status: 404 });
    }

    const existingFavorite = await favoriteRepository.findFavorite(userId, imageId);
    if (existingFavorite) {
      throw Object.assign(new Error("Image already favorited"), { status: 409 });
    }

    await favoriteRepository.createFavorite(userId, imageId);

    return {
      success: true,
      message: "Image added to favorites",
    };
  }

  async unfavoriteImage(userId: string, imageId: string) {
    const existingFavorite = await favoriteRepository.findFavorite(userId, imageId);
    if (!existingFavorite) {
      throw Object.assign(new Error("Favorite not found"), { status: 404 });
    }

    await favoriteRepository.deleteFavorite(userId, imageId);

    return {
      success: true,
      message: "Favorite removed",
    };
  }
}

export const favoriteService = new FavoriteService();
