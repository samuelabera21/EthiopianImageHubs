import { apiClient } from "@/services/api";
import { AuthServiceError, normalizeAuthError } from "@/services/auth-errors";
import type { ForgotPasswordRequest, ForgotPasswordResponse } from "@/types/auth";

export { AuthServiceError };

export async function forgotPasswordUser(
  payload: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> {
  try {
    const response = await apiClient.post<ForgotPasswordResponse>(
      "/auth/forgot-password",
      payload,
    );
    return response.data;
  } catch (error) {
    throw normalizeAuthError(error);
  }
}
