"use client";

import { useQuery } from "@tanstack/react-query";
import { getContributorApplication } from "@/services/contributor.service";

export function useContributorStatus(enabled: boolean = true) {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["contributorApplication"],
    queryFn: async () => {
      try {
        const response = await getContributorApplication();
        return response.data;
      } catch (err: any) {
        // If 404, it means the user hasn't applied yet.
        if (err?.response?.status === 404) {
          return null;
        }
        throw err;
      }
    },
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 3;
    },
  });

  return {
    application: data,
    hasApplied: data !== null && data !== undefined,
    status: data?.status || null,
    isLoading,
    error,
    refetch,
  };
}
