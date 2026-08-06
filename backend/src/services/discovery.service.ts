import { prisma } from "../config/database";
import { GetSearchSuggestionsQuery } from "../validators/discovery.validator";
import { imageService } from "./image.service";
import { serializeBigInt } from "../utils/json";

export class DiscoveryService {
  async getFeaturedImages(limit: number = 10) {
    // In absence of a real "isFeatured" field, proxy it via most downloaded all time
    const result = await imageService.getImages({
      limit,
      page: 1,
      sortBy: "downloads",
      sortOrder: "desc",
      visibility: "PUBLIC",
      status: "ACTIVE",
    });
    
    return {
      success: true,
      message: "Featured images retrieved successfully",
      data: result.data,
    };
  }

  async getTrendingImages(limit: number = 10) {
    const result = await imageService.getImages({
      limit,
      page: 1,
      sortBy: "trending",
      sortOrder: "desc",
      visibility: "PUBLIC",
      status: "ACTIVE",
    });

    return {
      success: true,
      message: "Trending images retrieved successfully",
      data: result.data,
    };
  }

  async getRecommendedImages(imageId: string, limit: number = 10) {
    const image = await prisma.image.findUnique({
      where: { id: imageId },
      include: {
        category: true,
        tags: { include: { tag: true } }
      }
    });

    if (!image) {
      throw Object.assign(new Error("Image not found"), { status: 404 });
    }

    // Recommendation logic: same category OR shared tags
    const tagIds = image.tags.map(t => t.tagId);

    const recommended = await prisma.image.findMany({
      where: {
        id: { not: imageId },
        status: "ACTIVE",
        visibility: "PUBLIC",
        OR: [
          { categoryId: image.categoryId },
          { tags: { some: { tagId: { in: tagIds } } } }
        ]
      },
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        owner: { select: { id: true, username: true, profile: { select: { displayName: true, avatarUrl: true } } } },
        category: true,
        tags: { include: { tag: true } },
        _count: { select: { likes: true, downloads: true, favorites: true } }
      }
    });

    return {
      success: true,
      message: "Recommended images retrieved successfully",
      data: serializeBigInt(recommended),
    };
  }

  async getSearchSuggestions(query: GetSearchSuggestionsQuery) {
    const { q, limit } = query;

    const [tags, categories, titles] = await Promise.all([
      prisma.tag.findMany({
        where: { name: { contains: q, mode: "insensitive" } },
        take: limit,
      }),
      prisma.category.findMany({
        where: { name: { contains: q, mode: "insensitive" } },
        take: limit,
      }),
      prisma.image.findMany({
        where: { title: { contains: q, mode: "insensitive" }, status: "ACTIVE", visibility: "PUBLIC" },
        take: limit,
        select: { title: true }
      })
    ]);

    const suggestions = [
      ...tags.map(t => ({ text: t.name, type: "tag" })),
      ...categories.map(c => ({ text: c.name, type: "category" })),
      ...titles.map(t => ({ text: t.title, type: "title" })),
    ].slice(0, limit);

    return {
      success: true,
      message: "Search suggestions retrieved successfully",
      data: suggestions,
    };
  }
}

export const discoveryService = new DiscoveryService();
