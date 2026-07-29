import { apiClient } from "@/services/api";
import { normalizeAuthError } from "@/services/auth-errors";

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
}

export async function verifyEmailUser(token: string): Promise<VerifyEmailResponse> {
  try {
    const response = await apiClient.get<VerifyEmailResponse>("/auth/verify-email", {
      params: { token },
    });
    return response.data;
  } catch (error) {
    throw normalizeAuthError(error);
  }
}
