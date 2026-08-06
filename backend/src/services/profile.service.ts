import { profileRepository } from "../repositories/profile.repository";
import { imageRepository } from "../repositories/image.repository";
import { serializeBigInt } from "../utils/json";
import { storage } from "../storage/storage.factory";

export class ProfileService {
  async getProfile(username: string) {
    const user = await profileRepository.getProfileByUsername(username);

    if (!user) {
      throw Object.assign(new Error("Contributor not found"), { status: 404 });
    }

    const { totalDownloads, totalLikesReceived, totalFavoritesReceived } = await profileRepository.getContributorStats(user.id);

    return {
      success: true,
      message: "Contributor profile retrieved",
      data: {
        profile: {
          id: user.id,
          username: user.username,
          displayName: user.profile?.displayName || user.username,
          bio: user.profile?.bio || null,
          avatarUrl: user.profile?.avatarUrl || null,
          joinedAt: user.createdAt,
          statistics: {
            totalUploads: user._count.images,
            totalDownloads,
            totalLikes: totalLikesReceived,
            totalFavorites: totalFavoritesReceived,
          }
        }
      }
    };
  }

  async getPortfolio(username: string, page: number = 1, pageSize: number = 20, sortBy: string = "createdAt", sortOrder: string = "desc") {
    const user = await profileRepository.getProfileByUsername(username);
    if (!user) {
      throw Object.assign(new Error("Contributor not found"), { status: 404 });
    }

    const skip = (page - 1) * pageSize;

    const totalItems = await imageRepository.count({
      ownerId: user.id,
      status: "ACTIVE",
      visibility: "PUBLIC",
    });

    const images = await imageRepository.findMany({
      skip,
      take: pageSize,
      ownerId: user.id,
      status: "ACTIVE",
      visibility: "PUBLIC",
      sortBy: sortBy as any,
      sortOrder: sortOrder as any,
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      success: true,
      message: "Contributor portfolio retrieved",
      data: {
        items: images.map((img: any) => ({
          id: img.id,
          title: img.title,
          thumbnailUrl: `/${img.storageKey.replace(/\\/g, "/")}`,
          category: img.category.name,
          likes: img._count?.likes || 0,
          downloads: img._count?.downloads || 0,
          createdAt: img.createdAt,
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

  async updateProfile(userId: string, data: { displayName?: string; bio?: string }) {
    const updated = await profileRepository.updateProfile(userId, data);
    return {
      success: true,
      message: "Profile updated successfully",
      data: updated,
    };
  }

  async updateAvatar(userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new Error("Avatar image is required");
    }

    const uploaded = await storage.upload({ file });

    const avatarUrl = `/${uploaded.storageKey.replace(/\\/g, "/")}`;
    const updated = await profileRepository.updateProfile(userId, { avatarUrl });

    return {
      success: true,
      message: "Avatar updated successfully",
      data: updated,
    };
  }
}

export const profileService = new ProfileService();
