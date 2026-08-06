import { apiClient } from "./api";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await apiClient.get<{ success: boolean; data: Category[] }>("/categories");
    return response.data.data;
  } catch {
    return [];
  }
}

export async function createCategory(name: string, slug?: string, description?: string): Promise<Category> {
  const response = await apiClient.post<{ success: boolean; data: Category }>("/categories", {
    name,
    slug,
    description,
  });
  return response.data.data;
}

export async function updateCategory(id: string, name?: string, slug?: string, description?: string): Promise<Category> {
  const response = await apiClient.patch<{ success: boolean; data: Category }>(`/categories/${id}`, {
    name,
    slug,
    description,
  });
  return response.data.data;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const response = await apiClient.delete<{ success: boolean }>(`/categories/${id}`);
  return response.data.success;
}
