"use client";

import { useQuery } from "@tanstack/react-query";
import { profileService } from "@/services/profile.service";

export function useContributorProfile(username: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => profileService.getContributorProfile(username),
    enabled: !!username,
  });

  return {
    profile: data?.data.profile,
    isLoading,
    isError,
    error,
  };
}

export function useContributorPortfolio(username: string, page = 1, pageSize = 20) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["portfolio", username, page, pageSize],
    queryFn: () => profileService.getContributorPortfolio(username, page, pageSize),
    enabled: !!username,
  });

  return {
    portfolio: data?.data.items ?? [],
    pagination: data?.data.pagination,
    isLoading,
    isError,
    error,
  };
}
