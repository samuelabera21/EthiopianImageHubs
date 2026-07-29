import { apiClient } from "@/services/api";
import { normalizeAuthError } from "@/services/auth-errors";
import type { ResetPasswordResponse } from "@/types/auth";
import type { ResetPasswordFormValues } from "@/features/authentication/reset-password/reset-password.schema";

export async function resetPasswordUser(
  payload: ResetPasswordFormValues,
): Promise<ResetPasswordResponse> {
  try {
    const response = await apiClient.post<ResetPasswordResponse>("/auth/reset-password", {
      token: payload.token,
      password: payload.password,
    });
    return response.data;
  } catch (error) {
    throw normalizeAuthError(error);
  }
}
