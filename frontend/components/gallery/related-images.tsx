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
      <div className="columns-1 gap-4.5 sm:columns-2 lg:columns-4 space-y-4.5">
        {images.map((image) => (
          <div key={image.id} className="break-inside-avoid">
            <GalleryImageCard image={image} onClick={onImageClick} />
          </div>
        ))}
      </div>
    </div>
  );
}
