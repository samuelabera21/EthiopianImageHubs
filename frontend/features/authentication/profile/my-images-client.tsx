"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/features/authentication/provider/AuthProvider";
import { apiClient } from "@/services/api";
import { Image, ImageListResponse } from "@/types/image";
import { BackendImage } from "@/components/ui/backend-image";
import { getImageUrl } from "@/lib/media";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";

export function MyImagesClient() {
  const { currentUser } = useAuth();
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      if (!currentUser) return;
      try {
        setIsLoading(true);
        // Fetch images uploaded by the current user
        const response = await apiClient.get<ImageListResponse>(`/images?ownerId=${currentUser.id}&limit=50`);
        setImages(response.data.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch images");
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[var(--radius-card)] border border-red-200 bg-red-50 p-6 text-center text-red-600">
        <p>Error loading your images.</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <EmptyState
        title="No images uploaded"
        description="You haven't uploaded any images yet."
        actionLabel="Upload Image"
        actionHref="/upload"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {images.map((image) => (
        <div key={image.id} className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-card shadow-sm flex flex-col">
          <div className="relative aspect-video bg-muted">
            <BackendImage
              src={getImageUrl(image as any)}
              alt={image.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-2 right-2">
              {image.moderationStatus === "PENDING" && (
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800 shadow-sm backdrop-blur-sm">
                  <Clock className="h-3 w-3" /> Pending Review
                </span>
              )}
              {image.moderationStatus === "APPROVED" && (
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur-sm">
                  <CheckCircle2 className="h-3 w-3" /> Approved
                </span>
              )}
              {image.moderationStatus === "REJECTED" && (
                <span className="inline-flex items-center gap-1 rounded-md bg-red-100 px-2 py-1 text-xs font-semibold text-red-800 shadow-sm backdrop-blur-sm">
                  <AlertCircle className="h-3 w-3" /> Rejected
                </span>
              )}
            </div>
          </div>
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="font-semibold text-lg line-clamp-1">{image.title}</h3>
            {image.moderationStatus === "REJECTED" && image.moderationNote && (
              <div className="mt-3 rounded-md bg-red-50 p-3 text-sm text-red-800 border border-red-100">
                <span className="font-semibold block mb-1 text-red-900 text-xs uppercase tracking-wider">Rejection Note:</span>
                {image.moderationNote}
              </div>
            )}
            {image.moderationStatus === "PENDING" && (
              <div className="mt-3 text-sm text-muted-foreground">
                Your image is currently waiting for a moderator to review it.
              </div>
            )}
            {image.moderationStatus === "APPROVED" && (
              <div className="mt-3 text-sm text-muted-foreground flex justify-between">
                <span>{image._count?.likes || 0} Likes</span>
                <span>{image._count?.downloads || 0} Downloads</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
