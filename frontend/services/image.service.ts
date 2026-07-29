import { apiClient } from "@/services/api";
import type {
  CreateImageRequest,
  GetImagesQuery,
  ImageListResponse,
  ImageResponse,
  SuccessResponse,
  UpdateImageRequest,
} from "@/types/image";

export async function uploadImage(
  payload: CreateImageRequest,
  onProgress?: (progress: number) => void,
): Promise<ImageResponse> {
  const formData = new FormData();
  formData.append("image", payload.file);
  formData.append("categoryId", payload.categoryId);
  formData.append("title", payload.title);
  if (payload.description) {
    formData.append("description", payload.description);
  }
  if (payload.location) {
    formData.append("location", payload.location);
  }
  formData.append("visibility", payload.visibility);
  if (payload.tagIds && payload.tagIds.length > 0) {
    payload.tagIds.forEach((tagId) => formData.append("tagIds", tagId));
  }

  const response = await apiClient.post<ImageResponse>("/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress?.(progress);
      }
    },
  });
  return response.data;
}

export async function getImages(
  query: GetImagesQuery = {},
): Promise<ImageListResponse> {
  const params = new URLSearchParams();

  if (query.page) params.append("page", String(query.page));
  if (query.limit) params.append("limit", String(query.limit));
  if (query.categoryId) params.append("categoryId", query.categoryId);
  if (query.ownerId) params.append("ownerId", query.ownerId);
  if (query.visibility) params.append("visibility", query.visibility);
  if (query.status) params.append("status", query.status);
  if (query.search) params.append("search", query.search);
  if (query.location) params.append("location", query.location);
  if (query.tagId) params.append("tagId", query.tagId);
  if (query.sortBy) params.append("sortBy", query.sortBy);
  if (query.sortOrder) params.append("sortOrder", query.sortOrder);

  const response = await apiClient.get<ImageListResponse>(`/images?${params.toString()}`);
  return response.data;
}

export async function getImageById(imageId: string): Promise<ImageResponse> {
  const response = await apiClient.get<ImageResponse>(`/images/${imageId}`);
  return response.data;
}

export async function updateImage(
  imageId: string,
  payload: UpdateImageRequest,
): Promise<ImageResponse> {
  const response = await apiClient.patch<ImageResponse>(`/images/${imageId}`, payload);
  return response.data;
}

export async function deleteImage(imageId: string): Promise<SuccessResponse> {
  const response = await apiClient.delete<SuccessResponse>(`/images/${imageId}`);
  return response.data;
}
