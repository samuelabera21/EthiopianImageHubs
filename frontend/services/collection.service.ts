import { apiClient } from "./api";
import {
  Collection,
  CollectionListResponse,
  CollectionResponse,
  CreateCollectionRequest,
  UpdateCollectionRequest,
} from "@/types/collection";

export const collectionService = {
  getCollections: async (params?: {
    ownerId?: string;
    isPublic?: boolean;
    page?: number;
    limit?: number;
  }): Promise<CollectionListResponse> => {
    const response = await apiClient.get<CollectionListResponse>("/collections", {
      params,
    });
    return response.data;
  },

  getCollectionById: async (id: string): Promise<CollectionResponse> => {
    const response = await apiClient.get<CollectionResponse>(`/collections/${id}`);
    return response.data;
  },

  createCollection: async (data: CreateCollectionRequest): Promise<CollectionResponse> => {
    const response = await apiClient.post<CollectionResponse>("/collections", data);
    return response.data;
  },

  updateCollection: async (
    id: string,
    data: UpdateCollectionRequest
  ): Promise<CollectionResponse> => {
    const response = await apiClient.patch<CollectionResponse>(`/collections/${id}`, data);
    return response.data;
  },

  deleteCollection: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete<{ success: boolean; message: string }>(
      `/collections/${id}`
    );
    return response.data;
  },

  addImageToCollection: async (
    collectionId: string,
    imageId: string
  ): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post<{ success: boolean; message: string }>(
      `/collections/${collectionId}/images`,
      { imageId }
    );
    return response.data;
  },

  removeImageFromCollection: async (
    collectionId: string,
    imageId: string
  ): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete<{ success: boolean; message: string }>(
      `/collections/${collectionId}/images/${imageId}`
    );
    return response.data;
  },
};
