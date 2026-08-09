"use client";

import { useState, useEffect } from "react";
import { moderationService } from "@/services/moderation.service";
import { Image } from "@/types/image";
import { Button } from "@/components/ui/button";
import { BackendImage } from "@/components/ui/backend-image";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { getImageUrl } from "@/lib/media";

export function ModerationClient() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectionNote, setRejectionNote] = useState("");
  const [notification, setNotification] = useState<{message: string, type: "success" | "error"} | null>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await moderationService.getPendingImages();
      setImages(res.data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleApprove = async (imageId: string) => {
    try {
      await moderationService.approveImage(imageId);
      setNotification({ message: "Image approved successfully", type: "success" });
      setImages(images.filter((img) => img.id !== imageId));
    } catch (err) {
      setNotification({ message: "Failed to approve image", type: "error" });
    }
  };

  const handleReject = async (imageId: string) => {
    if (!rejectionNote.trim()) {
      setNotification({ message: "Please provide a rejection reason", type: "error" });
      return;
    }
    
    try {
      await moderationService.rejectImage(imageId, rejectionNote);
      setNotification({ message: "Image rejected successfully", type: "success" });
      setImages(images.filter((img) => img.id !== imageId));
      setRejectingId(null);
      setRejectionNote("");
    } catch (err) {
      setNotification({ message: "Failed to reject image", type: "error" });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState title="Error" message={error.message} onRetry={fetchImages} />;
  
  if (images.length === 0) {
    return (
      <EmptyState
        title="All caught up!"
        description="There are currently no pending images waiting for moderation."
      />
    );
  }

  return (
    <div className="space-y-6">
      {notification && (
        <div className={`p-4 rounded-md text-sm ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {notification.message}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="border rounded-xl overflow-hidden shadow-sm bg-card flex flex-col">
            <div className="relative aspect-video bg-muted">
              <BackendImage
                src={getImageUrl(image)}
                alt={image.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="font-semibold text-lg line-clamp-1">{image.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2 flex-grow">
                {image.description || "No description provided."}
              </p>
              
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{image.category?.name || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contributor:</span>
                  <span className="font-medium">{image.owner?.username || "Unknown"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Uploaded:</span>
                  <span className="font-medium">{new Date(image.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {rejectingId === image.id ? (
                <div className="mt-4 pt-4 border-t space-y-3">
                  <div className="flex items-center text-sm font-medium text-destructive">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Reason for Rejection
                  </div>
                  <textarea
                    className="w-full text-sm p-2 border rounded-md min-h-[80px]"
                    placeholder="Provide a clear reason..."
                    value={rejectionNote}
                    onChange={(e) => setRejectionNote(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setRejectingId(null);
                        setRejectionNote("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleReject(image.id)}
                    >
                      Confirm Reject
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      setRejectingId(image.id);
                      setRejectionNote("");
                    }}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleApprove(image.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
