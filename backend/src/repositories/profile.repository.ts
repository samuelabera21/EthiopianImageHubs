import { prisma } from "../config/database";

class ProfileRepository {
  async getProfileByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username },
      include: {
        profile: true,
        _count: {
          select: {
            images: {
              where: {
                status: "ACTIVE",
                visibility: "PUBLIC"
              }
            },
            likes: true,
            favorites: true,
            downloads: true,
          }
        }
      }
    });
  }

  // To compute total downloads and likes received, we need to aggregate over the user's images
  async getContributorStats(userId: string) {
    const totalDownloads = await prisma.download.count({
      where: {
        image: {
          ownerId: userId,
          status: "ACTIVE",
          visibility: "PUBLIC"
        }
      }
    });

    const totalLikesReceived = await prisma.imageLike.count({
      where: {
        image: {
          ownerId: userId,
          status: "ACTIVE",
          visibility: "PUBLIC"
        }
      }
    });

    const totalFavoritesReceived = await prisma.favorite.count({
      where: {
        image: {
          ownerId: userId,
          status: "ACTIVE",
          visibility: "PUBLIC"
        }
      }
    });

    return {
      totalDownloads,
      totalLikesReceived,
      totalFavoritesReceived,
    };
  }

  async updateProfile(userId: string, data: { displayName?: string; bio?: string; avatarUrl?: string }) {
    return prisma.userProfile.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data,
      },
    });
  }
}

export const profileRepository = new ProfileRepository();
