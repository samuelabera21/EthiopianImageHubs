import { apiClient } from "./api";
import type { PublicProfileResponse, PortfolioResponse } from "../types/profile";

export const profileService = {
  getContributorProfile: async (username: string): Promise<PublicProfileResponse> => {
    const response = await apiClient.get<PublicProfileResponse>(`/profiles/${username}`);
    return response.data;
  },

  getContributorPortfolio: async (
    username: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<PortfolioResponse> => {
    const response = await apiClient.get<PortfolioResponse>(
      `/profiles/${username}/images`,
      {
        params: { page, pageSize },
      }
    );
    return response.data;
  },
};
