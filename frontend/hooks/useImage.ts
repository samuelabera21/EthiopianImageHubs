"use client";

import { useQuery } from "@tanstack/react-query";
import { getImageById, getImages } from "@/services/image.service";
import type { Image } from "@/types/image";

export function useImage(imageId: string) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["image", imageId],
    queryFn: () => getImageById(imageId),
    enabled: !!imageId,
  });

  return {
    image: data?.data as Image | undefined,
    isLoading,
    isError,
    error,
    refetch,
  };
}

export function useRelatedImages(categoryId: string, currentImageId: string, limit = 4) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["related-images", categoryId, currentImageId],
    queryFn: () => getImages({ categoryId, limit }),
    enabled: !!categoryId,
  });

  const relatedImages = (data?.data ?? [])
    .filter((img) => img.id !== currentImageId)
    .slice(0, limit);

  return {
    images: relatedImages,
    isLoading,
    isError,
    error,
  };
}
