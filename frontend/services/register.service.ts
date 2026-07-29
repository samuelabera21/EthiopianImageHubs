import { apiClient } from "@/services/api";
import { AuthServiceError, normalizeAuthError } from "@/services/auth-errors";
import type { LoginResponse, RegisterRequest } from "@/types/auth";

export { AuthServiceError };

export async function registerUser(payload: RegisterRequest): Promise<LoginResponse> {
  try {
    const response = await apiClient.post<LoginResponse>("/auth/register", payload);
    return response.data;
  } catch (error) {
    throw normalizeAuthError(error);
  }
}
