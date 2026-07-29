"use client";

import { GalleryImageCard } from "@/components/gallery/image-card";
import { SectionTitle } from "@/components/ui/section-title";
import type { Image as ImageType } from "@/types/image";

interface RelatedImagesProps {
  images: ImageType[];
  onImageClick: (image: ImageType) => void;
  className?: string;
}

export function RelatedImages({ images, onImageClick, className }: RelatedImagesProps) {
  if (images.length === 0) return null;

  return (
    <div className={className}>
      <SectionTitle
        eyebrow="Related Images"
        title="You might also like"
        description="More images from the same category."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image) => (
          <GalleryImageCard key={image.id} image={image} onClick={onImageClick} />
        ))}
      </div>
    </div>
  );
}
