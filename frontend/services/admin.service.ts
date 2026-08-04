import { apiClient } from "./api";

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: { name: string };
  status: string;
  createdAt: string;
}

export interface GetUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}

export interface UsersResponse {
  users: AdminUser[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ContributorApplication {
  id: string;
  userId: string;
  message: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  reviewedById: string | null;
  reviewedAt: string | null;
  adminNote: string | null;
  createdAt: string;
  user: {
    email: string;
    username: string;
  };
}

export const adminService = {
  async getUsers(query: GetUsersQuery) {
    const response = await apiClient.get<ApiResponse<UsersResponse>>("/admin/users", {
      params: query,
    });
    return response.data;
  },

  async updateUserRole(userId: string, roleName: string) {
    const response = await apiClient.put<ApiResponse<AdminUser>>(`/admin/users/${userId}/role`, {
      roleName,
    });
    return response.data;
  },

  async updateUserStatus(userId: string, status: string) {
    const response = await apiClient.put<ApiResponse<AdminUser>>(`/admin/users/${userId}/status`, {
      status,
    });
    return response.data;
  },

  async getApplications(query?: { page?: number; limit?: number; status?: string }) {
    const response = await apiClient.get<ApiResponse<ContributorApplication[]>>("/admin/applications", {
      params: query,
    });
    return response.data;
  },

  async reviewApplication(applicationId: string, status: "APPROVED" | "REJECTED", adminNote?: string) {
    const response = await apiClient.patch<ApiResponse<ContributorApplication>>(`/admin/applications/${applicationId}`, {
      status,
      adminNote,
    });
    return response.data;
  },
};
