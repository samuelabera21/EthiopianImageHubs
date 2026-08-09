import { apiClient } from "@/services/api";
import { Image } from "@/types/image";

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

class ModerationService {
  async getPendingImages(page = 1, limit = 20): Promise<PaginatedResponse<Image>> {
    const response = await apiClient.get("/moderation", {
      params: { page, limit },
    });
    return response.data;
  }

  async approveImage(imageId: string, note?: string): Promise<{ success: true }> {
    const response = await apiClient.patch(`/moderation/${imageId}/approve`, {
      moderationNote: note,
    });
    return response.data;
  }

  async rejectImage(imageId: string, note: string): Promise<{ success: true }> {
    const response = await apiClient.patch(`/moderation/${imageId}/reject`, {
      moderationNote: note,
    });
    return response.data;
  }
}

export const moderationService = new ModerationService();
