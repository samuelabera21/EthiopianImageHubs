"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { ImageDetails } from "@/components/gallery/image-details";
import { RelatedImages } from "@/components/gallery/related-images";
import { Card } from "@/components/ui/card";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { useImage, useRelatedImages } from "@/hooks/useImage";
import { downloadImageFile } from "@/lib/media";
import { useImageInteractions } from "@/hooks/useImageInteractions";
import type { Image } from "@/types/image";

interface ImageDetailsClientProps {
  imageId: string;
}

export function ImageDetailsClient({ imageId }: ImageDetailsClientProps) {
  const router = useRouter();
  const { image, isLoading, isError, error } = useImage(imageId);
  const { images: relatedImages, isLoading: relatedLoading } = useRelatedImages(
    image?.category.id ?? "",
    imageId,
    4,
  );

  const {
    isLiked,
    isFavorited,
    toggleLike,
    toggleFavorite,
    trackDownload,
    isLiking,
    isFavoriting,
    isDownloading,
  } = useImageInteractions(imageId, !!image?.isLiked, !!image?.isFavorited);

  const handleDownload = useCallback(async () => {
    if (!image) return;
    try {
      const { downloadUrl, fileName } = await trackDownload();
      downloadImageFile(downloadUrl, fileName);
    } catch (err) {
      console.error("Failed to track download", err);
      // Fallback or show error
    }
  }, [image, trackDownload]);

  const handleLike = useCallback(() => {
    toggleLike();
  }, [toggleLike]);

  const handleShare = useCallback(async () => {
    if (!image) return;
    const url = `${window.location.origin}/images/${image.id}`;
    if (navigator.share) {
      await navigator.share({ title: image.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    }
  }, [image]);

  const handleSave = useCallback(() => {
    toggleFavorite();
  }, [toggleFavorite]);

  const handleRelatedImageClick = useCallback((relatedImage: Image) => {
    router.push(`/images/${relatedImage.id}`);
  }, [router]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <LoadingSkeleton className="h-96 w-full" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="space-y-4">
                <LoadingSkeleton className="h-8 w-3/4" />
                <LoadingSkeleton className="h-4 w-full" />
                <LoadingSkeleton className="h-4 w-2/3" />
              </div>
            </Card>
          </div>
          <div className="space-y-4">
            <Card className="p-6">
              <LoadingSkeleton className="h-6 w-1/2" />
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !image) {
    return (
      <ErrorState
        title="Image not found"
        message={error?.message ?? "The image you are looking for does not exist or has been removed."}
        actionLabel="Back to gallery"
        actionHref="/gallery"
      />
    );
  }

  return (
    <div className="space-y-12">
      <ImageDetails
        image={image}
        onDownload={handleDownload}
        onLike={handleLike}
        onShare={handleShare}
        onSave={handleSave}
        isLiked={isLiked}
        isFavorited={isFavorited}
        isLiking={isLiking}
        isFavoriting={isFavoriting}
        isDownloading={isDownloading}
      />
      {!relatedLoading && relatedImages.length > 0 && (
        <RelatedImages
          images={relatedImages}
          onImageClick={handleRelatedImageClick}
        />
      )}
    </div>
  );
}
