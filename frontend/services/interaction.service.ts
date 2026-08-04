import { apiClient } from "./api";
import type { DownloadResponse, DownloadHistoryResponse } from "../types/interaction";

export const interactionService = {
  // Likes
  likeImage: async (imageId: string): Promise<void> => {
    await apiClient.post(`/images/${imageId}/likes`);
  },

  unlikeImage: async (imageId: string): Promise<void> => {
    await apiClient.delete(`/images/${imageId}/likes`);
  },

  // Favorites
  favoriteImage: async (imageId: string): Promise<void> => {
    await apiClient.post(`/images/${imageId}/favorites`);
  },

  unfavoriteImage: async (imageId: string): Promise<void> => {
    await apiClient.delete(`/images/${imageId}/favorites`);
  },

  // Downloads
  trackDownload: async (imageId: string): Promise<DownloadResponse> => {
    const response = await apiClient.post<DownloadResponse>(`/downloads/${imageId}`);
    return response.data;
  },

  getDownloadHistory: async (page: number = 1, pageSize: number = 20): Promise<DownloadHistoryResponse> => {
    const response = await apiClient.get<DownloadHistoryResponse>("/downloads/history", {
      params: { page, pageSize },
    });
    return response.data;
  },
};
