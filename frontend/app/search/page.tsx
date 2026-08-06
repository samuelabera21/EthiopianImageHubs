"use client";

import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { AuthHeader } from "@/components/ui/auth-header";
import { Footer } from "@/components/ui/footer";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { FilterPanel, FilterState } from "@/components/gallery/filter-panel";
import { useImages } from "@/hooks/useImages";
import { useCategories } from "@/hooks/useCategories";
import type { Image, ImageVisibility } from "@/types/image";

import { Suspense } from "react";

function SearchPageClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [filters, setFilters] = useState<FilterState>({
    search: initialQuery,
    categoryId: searchParams.get("categoryId") ?? "",
    region: searchParams.get("region") ?? "",
    city: searchParams.get("city") ?? "",
    orientation: searchParams.get("orientation") ?? "",
    visibility: searchParams.get("visibility") ?? "",
    sortBy: (searchParams.get("sortBy") as FilterState["sortBy"]) ?? "relevance",
    sortOrder: (searchParams.get("sortOrder") as FilterState["sortOrder"]) ?? "desc",
  });
  const [showFilters, setShowFilters] = useState(true);

  const { categories } = useCategories();

  const { images, isLoading, isError, error, refetch } = useImages({
    search: filters.search || undefined,
    categoryId: filters.categoryId || undefined,
    region: filters.region || undefined,
    city: filters.city || undefined,
    orientation: (filters.orientation as any) || undefined,
    visibility: (filters.visibility as ImageVisibility) || undefined,
    sortBy: filters.sortBy as any,
    sortOrder: filters.sortOrder as "asc" | "desc",
    limit: 20,
  });

  const handleImageClick = useCallback((image: Image) => {
    window.location.href = `/images/${image.id}`;
  }, []);

  return (
    <div className="min-h-screen">
      <AuthHeader />
      <main>
        <SectionWrapper>
          <Container>
            <div className="mx-auto max-w-7xl">
              <div className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Search Images
                </h1>
                <p className="mt-2 text-base text-muted-foreground">
                  Find the perfect image from Ethiopia&apos;s visual library.
                </p>
              </div>
              <div className="flex gap-8">
                {showFilters && (
                  <div className="hidden w-64 flex-shrink-0 lg:block">
                    <FilterPanel
                      filters={filters}
                      onFilterChange={setFilters}
                      categories={categories}
                    />
                  </div>
                )}
                <div className="flex-1">
                  <GalleryGrid
                    images={images}
                    isLoading={isLoading}
                    isError={isError}
                    error={error as Error}
                    onImageClick={handleImageClick}
                    onRetry={refetch}
                  />
                </div>
              </div>
            </div>
          </Container>
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SearchPageClient />
    </Suspense>
  );
}
