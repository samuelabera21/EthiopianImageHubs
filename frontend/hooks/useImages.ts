"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getImages } from "@/services/image.service";
import type { GetImagesQuery, Image } from "@/types/image";

export function useImages(query: GetImagesQuery = {}) {
  const [page, setPage] = useState(query.page ?? 1);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["images", query, page],
    queryFn: () => getImages({ ...query, page }),
  });

  return {
    images: (data?.data ?? []) as Image[],
    pagination: data?.pagination,
    isLoading,
    isError,
    error,
    refetch,
    page,
    setPage,
  };
}
