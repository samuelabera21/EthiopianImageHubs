import { apiClient, getTokens } from "@/services/api";

export async function logoutUser(): Promise<void> {
  const { refreshToken } = getTokens();

  try {
    await apiClient.post("/auth/logout", { refreshToken });
  } catch {
    // Local logout proceeds regardless of backend failure.
  }
}
