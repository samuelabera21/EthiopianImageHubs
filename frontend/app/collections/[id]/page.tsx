"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, Lock, Share2, Trash2, Edit3, ArrowLeft, X, Layers } from "lucide-react";
import { AuthHeader } from "@/components/ui/auth-header";
import { Footer } from "@/components/ui/footer";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorState } from "@/components/ui/error-state";
import { GalleryImageCard } from "@/components/gallery/image-card";
import { collectionService } from "@/services/collection.service";
import { Collection } from "@/types/collection";
import { Image } from "@/types/image";
import { useAuth } from "@/features/authentication/provider/AuthProvider";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CollectionDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { currentUser } = useAuth();

  const [collection, setCollection] = useState<Collection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit modal
  const [showEdit, setShowEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editPublic, setEditPublic] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Notifications
  const [toast, setToast] = useState<string | null>(null);

  const fetchCollection = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await collectionService.getCollectionById(id);
      setCollection(res.data);
      setEditName(res.data.name);
      setEditDesc(res.data.description || "");
      setEditPublic(res.data.isPublic);
    } catch (err: any) {
      setError(err.response?.data?.message || "Collection not found or access denied.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, [id]);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const isOwner = currentUser && collection && currentUser.id === collection.ownerId;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: collection?.name, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      showNotification("Collection link copied to clipboard!");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;

    try {
      setIsUpdating(true);
      await collectionService.updateCollection(id, {
        name: editName.trim(),
        description: editDesc.trim() || undefined,
        isPublic: editPublic,
      });
      setShowEdit(false);
      showNotification("Collection updated successfully!");
      fetchCollection();
    } catch (err: any) {
      showNotification(err.response?.data?.message || "Failed to update collection.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this collection? Images in it will not be deleted.")) {
      return;
    }

    try {
      await collectionService.deleteCollection(id);
      router.push("/collections");
    } catch (err: any) {
      showNotification(err.response?.data?.message || "Failed to delete collection.");
    }
  };

  const handleRemoveImage = async (imageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await collectionService.removeImageFromCollection(id, imageId);
      showNotification("Image removed from collection.");
      fetchCollection();
    } catch (err: any) {
      showNotification(err.response?.data?.message || "Failed to remove image.");
    }
  };

  const handleImageClick = (image: Image) => {
    router.push(`/images/${image.id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AuthHeader />
        <main className="flex-grow flex items-center justify-center">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="min-h-screen flex flex-col">
        <AuthHeader />
        <main className="flex-grow flex items-center justify-center p-6">
          <ErrorState
            title="Collection Not Found"
            message={error || "The collection you are looking for does not exist or is private."}
            actionLabel="Back to Collections"
            actionHref="/collections"
          />
        </main>
        <Footer />
      </div>
    );
  }

  const collectionImages = collection.images || [];

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      <main className="flex-grow">
        <SectionWrapper>
          <Container>
            <div className="space-y-8">
              {/* Back Button & Toast */}
              <div className="flex items-center justify-between">
                <Button
                  onClick={() => router.back()}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>

                {toast && (
                  <div className="rounded-lg bg-foreground text-background px-4 py-2 text-xs font-semibold shadow-lg animate-in fade-in slide-in-from-top-2">
                    {toast}
                  </div>
                )}
              </div>

              {/* Collection Header Banner */}
              <div className="rounded-3xl border border-border/80 bg-surface p-6 sm:p-10 shadow-card space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {collection.name}
                      </h1>
                      <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
                        {collection.isPublic ? (
                          <>
                            <Globe className="h-3 w-3 text-emerald-600" /> Public
                          </>
                        ) : (
                          <>
                            <Lock className="h-3 w-3 text-amber-600" /> Private
                          </>
                        )}
                      </span>
                    </div>

                    {collection.description && (
                      <p className="text-muted-foreground text-base max-w-2xl">
                        {collection.description}
                      </p>
                    )}

                    <div className="pt-2 text-xs text-muted-foreground flex items-center gap-4">
                      <span>Curated by <strong className="text-foreground">{collection.owner?.profile?.displayName || collection.owner?.username}</strong></span>
                      <span>•</span>
                      <span>{collectionImages.length} images</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-start">
                    <Button onClick={handleShare} variant="outline" size="sm" className="gap-2">
                      <Share2 className="h-4 w-4" /> Share
                    </Button>

                    {isOwner && (
                      <>
                        <Button onClick={() => setShowEdit(true)} variant="outline" size="sm" className="gap-2">
                          <Edit3 className="h-4 w-4" /> Edit
                        </Button>
                        <Button onClick={handleDelete} variant="destructive" size="sm" className="gap-2">
                          <Trash2 className="h-4 w-4" /> Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Images Grid */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" /> Images in Collection
                </h2>

                {collectionImages.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground space-y-2">
                    <p className="font-semibold text-foreground">No images in this collection yet.</p>
                    <p className="text-sm">Browse the gallery and click &quot;Save to collection&quot; on any photo to add it here!</p>
                    <Button href="/gallery" className="mt-4">
                      Explore Gallery
                    </Button>
                  </div>
                ) : (
                  <div className="columns-1 gap-4 space-y-4 sm:columns-2 xl:columns-3 2xl:columns-4">
                    {collectionImages.map((image) => (
                      <div key={image.id} className="relative group break-inside-avoid pb-4">
                        <GalleryImageCard image={image} onClick={handleImageClick} />
                        {isOwner && (
                          <button
                            onClick={(e) => handleRemoveImage(image.id, e)}
                            title="Remove from collection"
                            className="absolute top-3 right-3 z-30 inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-red-700 focus:outline-none"
                          >
                            <X className="h-3.5 w-3.5" /> Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </SectionWrapper>
      </main>

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-primary" /> Edit Collection
              </h2>
              <button
                onClick={() => setShowEdit(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-surface hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Collection Name *</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Description (optional)</label>
                <textarea
                  rows={3}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={editPublic}
                  onChange={(e) => setEditPublic(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                />
                <span>Make collection public</span>
              </label>

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEdit(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdating} className="flex-1">
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
