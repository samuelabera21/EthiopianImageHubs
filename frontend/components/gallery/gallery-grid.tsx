"use client";

import { GalleryImageCard } from "@/components/gallery/image-card";
import { SkeletonGallery } from "@/components/gallery/skeleton-gallery";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { SectionTitle } from "@/components/ui/section-title";
import type { Image as ImageType } from "@/types/image";

interface GalleryGridProps {
  images: ImageType[];
  isLoading: boolean;
  isError: boolean;
  error?: Error;
  onImageClick?: (image: ImageType) => void;
  onRetry?: () => void;
  className?: string;
}

export function GalleryGrid({
  images,
  isLoading,
  isError,
  error,
  onImageClick,
  onRetry,
  className,
}: GalleryGridProps) {
  if (isLoading) {
    return (
      <div className={className}>
        <SectionTitle title="Gallery" description="Browse and discover images from the community." />
        <SkeletonGallery count={8} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={className}>
        <SectionTitle title="Gallery" description="Browse and discover images from the community." />
        <ErrorState
          title="Unable to load gallery"
          message={error?.message ?? "Something went wrong while fetching images."}
          actionLabel="Try again"
          onRetry={onRetry}
        />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className={className}>
        <SectionTitle title="Gallery" description="Browse and discover images from the community." />
        <EmptyState
          title="No images found"
          description="Try adjusting your filters or search query to find what you're looking for."
          actionLabel="Clear filters"
          actionHref="#"
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <SectionTitle title="Gallery" description="Browse and discover images from the community." />
      <div className="columns-1 gap-4.5 sm:columns-2 md:columns-3 lg:columns-4 2xl:columns-5 space-y-4.5">
        {images.map((image) => (
          <div key={image.id} className="break-inside-avoid">
            <GalleryImageCard image={image} onClick={onImageClick} />
          </div>
        ))}
      </div>
    </div>
  );
}
