import { apiClient } from "./api";
import type { ImageListResponse } from "@/types/image";

export interface SearchSuggestion {
  text: string;
  type: "tag" | "category" | "title";
}

export const discoveryService = {
  getFeaturedImages: async (limit: number = 10): Promise<ImageListResponse> => {
    try {
      const response = await apiClient.get<ImageListResponse>(`/images/featured?limit=${limit}`);
      return response.data;
    } catch {
      return { success: false, message: "Failed to fetch", data: [], pagination: { page: 1, limit, totalItems: 0, totalPages: 0, hasNext: false, hasPrevious: false } };
    }
  },

  getTrendingImages: async (limit: number = 10): Promise<ImageListResponse> => {
    try {
      const response = await apiClient.get<ImageListResponse>(`/images/trending?limit=${limit}`);
      return response.data;
    } catch {
      return { success: false, message: "Failed to fetch", data: [], pagination: { page: 1, limit, totalItems: 0, totalPages: 0, hasNext: false, hasPrevious: false } };
    }
  },

  getRecommendedImages: async (imageId: string, limit: number = 10): Promise<ImageListResponse> => {
    try {
      const response = await apiClient.get<ImageListResponse>(`/images/${imageId}/recommended?limit=${limit}`);
      return response.data;
    } catch {
      return { success: false, message: "Failed to fetch", data: [], pagination: { page: 1, limit, totalItems: 0, totalPages: 0, hasNext: false, hasPrevious: false } };
    }
  },

  getSearchSuggestions: async (query: string, limit: number = 5): Promise<SearchSuggestion[]> => {
    try {
      if (!query) return [];
      const response = await apiClient.get<{ success: boolean; data: SearchSuggestion[] }>(`/search/suggestions?q=${encodeURIComponent(query)}&limit=${limit}`);
      return response.data.data;
    } catch {
      return [];
    }
  }
};
