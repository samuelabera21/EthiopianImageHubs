import { apiClient } from "@/services/api";
import { AuthServiceError, normalizeAuthError } from "@/services/auth-errors";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export { AuthServiceError, normalizeAuthError };

export async function loginUser(payload: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await apiClient.post<LoginResponse>("/auth/login", payload);
    return response.data;
  } catch (error) {
    throw normalizeAuthError(error);
  }
}
