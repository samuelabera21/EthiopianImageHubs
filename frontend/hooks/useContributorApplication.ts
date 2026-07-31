"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyForContributor } from "@/services/contributor.service";
import type { ApplyContributorRequest } from "@/types/contributor";

export function useContributorApplication() {
  const queryClient = useQueryClient();

  const applyMutation = useMutation({
    mutationFn: async (payload: ApplyContributorRequest) => applyForContributor(payload),
    onSuccess: () => {
      // Invalidate the application status query so it refetches
      queryClient.invalidateQueries({ queryKey: ["contributorApplication"] });
    },
  });

  return {
    applyMutation,
    apply: applyMutation.mutateAsync,
    isApplying: applyMutation.isPending,
    isSuccess: applyMutation.isSuccess,
    error: applyMutation.error,
  };
}
