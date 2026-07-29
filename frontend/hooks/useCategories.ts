"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/category.service";

export function useCategories() {
  const { data: categories = [], isLoading, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
  });

  return {
    categories: categories.map((c) => ({ id: c.id, name: c.name })),
    isLoading,
    error,
    refetch,
  };
}
