"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { interactionService } from "@/services/interaction.service";
import { useAuth } from "@/features/authentication/provider/AuthProvider";
import { useRouter } from "next/navigation";

export function useImageInteractions(imageId: string, initialIsLiked = false, initialIsFavorited = false) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Optimistic UI state for likes and favorites
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  useEffect(() => {
    setIsFavorited(initialIsFavorited);
  }, [initialIsFavorited]);

  const requireAuth = (action: () => void) => {
    if (!isAuthenticated) {
      // Redirect to login or show toast
      router.push(`/login?redirect=/images/${imageId}`);
      return;
    }
    action();
  };

  const likeMutation = useMutation({
    mutationFn: () => interactionService.likeImage(imageId),
    onMutate: () => {
      setIsLiked(true);
    },
    onError: (error: any) => {
      setIsLiked(false);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => interactionService.unlikeImage(imageId),
    onMutate: () => {
      setIsLiked(false);
    },
    onError: () => {
      setIsLiked(true);
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: () => interactionService.favoriteImage(imageId),
    onMutate: () => {
      setIsFavorited(true);
    },
    onError: (error: any) => {
      setIsFavorited(false);
    },
  });

  const unfavoriteMutation = useMutation({
    mutationFn: () => interactionService.unfavoriteImage(imageId),
    onMutate: () => {
      setIsFavorited(false);
    },
    onError: () => {
      setIsFavorited(true);
    },
  });

  const downloadMutation = useMutation({
    mutationFn: () => interactionService.trackDownload(imageId),
  });

  const toggleLike = () => {
    requireAuth(() => {
      if (isLiked) {
        unlikeMutation.mutate();
      } else {
        likeMutation.mutate();
      }
    });
  };

  const toggleFavorite = () => {
    requireAuth(() => {
      if (isFavorited) {
        unfavoriteMutation.mutate();
      } else {
        favoriteMutation.mutate();
      }
    });
  };

  const trackDownload = async () => {
    const response = await downloadMutation.mutateAsync();
    return response.data;
  };

  return {
    isLiked,
    isFavorited,
    toggleLike,
    toggleFavorite,
    trackDownload,
    isLiking: likeMutation.isPending || unlikeMutation.isPending,
    isFavoriting: favoriteMutation.isPending || unfavoriteMutation.isPending,
    isDownloading: downloadMutation.isPending,
  };
}
