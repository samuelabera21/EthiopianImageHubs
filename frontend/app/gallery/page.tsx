"use client";

import { useState, useCallback } from "react";
import { AuthHeader } from "@/components/ui/auth-header";
import { Footer } from "@/components/ui/footer";
import { Container } from "@/components/ui/container";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { FilterPanel, FilterState } from "@/components/gallery/filter-panel";
import { GalleryToolbar } from "@/components/gallery/gallery-toolbar";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { useImages } from "@/hooks/useImages";
import { useCategories } from "@/hooks/useCategories";
import type { Image, ImageVisibility } from "@/types/image";

export default function GalleryPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    categoryId: "",
    visibility: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [showFilters, setShowFilters] = useState(false);

  const { categories } = useCategories();

  const { images, isLoading, isError, error, refetch } = useImages({
    search: filters.search || undefined,
    categoryId: filters.categoryId || undefined,
    visibility: (filters.visibility as ImageVisibility) || undefined,
    sortBy: filters.sortBy as "createdAt" | "title" | "fileSize",
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
              <GalleryToolbar
                searchQuery={filters.search}
                onSearchChange={(search) => setFilters({ ...filters, search })}
                resultCount={images.length}
                onToggleFilters={() => setShowFilters((prev) => !prev)}
                showFilters={showFilters}
                className="mb-8"
              />
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
