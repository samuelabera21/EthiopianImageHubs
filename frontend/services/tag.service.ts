import { apiClient } from "./api";

export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export async function getTags(): Promise<Tag[]> {
  try {
    const response = await apiClient.get<{ success: boolean; data: Tag[] }>("/tags");
    return response.data.data;
  } catch {
    return [];
  }
}

export async function createTag(name: string): Promise<Tag> {
  const response = await apiClient.post<{ success: boolean; data: Tag }>("/tags", {
    name,
  });
  return response.data.data;
}

export async function updateTag(id: string, name: string): Promise<Tag> {
  const response = await apiClient.patch<{ success: boolean; data: Tag }>(`/tags/${id}`, {
    name,
  });
  return response.data.data;
}

export async function deleteTag(id: string): Promise<boolean> {
  const response = await apiClient.delete<{ success: boolean }>(`/tags/${id}`);
  return response.data.success;
}
