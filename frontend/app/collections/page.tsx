"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderPlus, Globe, Lock, Plus, Layers } from "lucide-react";
import { AuthHeader } from "@/components/ui/auth-header";
import { Footer } from "@/components/ui/footer";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { BackendImage } from "@/components/ui/backend-image";
import { collectionService } from "@/services/collection.service";
import { Collection } from "@/types/collection";
import { useAuth } from "@/features/authentication/provider/AuthProvider";
import { getImageUrl } from "@/lib/media";

export default function CollectionsPage() {
  const { currentUser } = useAuth();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Create form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const fetchCollections = async () => {
    try {
      setIsLoading(true);
      const response = await collectionService.getCollections({ limit: 50 });
      setCollections(response.data);
    } catch (err) {
      console.error("Failed to load collections", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsCreating(true);
      await collectionService.createCollection({
        name: name.trim(),
        description: description.trim() || undefined,
        isPublic,
      });
      setShowCreateModal(false);
      setName("");
      setDescription("");
      fetchCollections();
    } catch (err) {
      console.error("Failed to create collection", err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      <main className="flex-grow">
        <SectionWrapper>
          <Container>
            <div className="space-y-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <SectionTitle
                  eyebrow="Curated Collections"
                  title="Explore and organize photography"
                  description="Discover public image collections created by the community or curate your own."
                />

                {currentUser && (
                  <Button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 self-start sm:self-auto"
                  >
                    <Plus className="h-4 w-4" /> Create Collection
                  </Button>
                )}
              </div>

              {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                  <LoadingSpinner />
                </div>
              ) : collections.length === 0 ? (
                <EmptyState
                  title="No collections yet"
                  description="Be the first to create a public collection!"
                  actionLabel={currentUser ? "Create Collection" : "Sign in"}
                  actionHref={currentUser ? "#" : "/login"}
                />
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {collections.map((col) => {
                    const coverImages = col.images || [];
                    const firstItem = coverImages[0];
                    const coverImg = firstItem?.image || (firstItem?.storageKey ? firstItem : null);

                    return (
                      <Link
                        key={col.id}
                        href={`/collections/${col.id}`}
                        className="group overflow-hidden rounded-[var(--radius-card)] border border-border/70 bg-card p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          {/* Preview Grid */}
                          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted/50 flex">
                            {coverImg ? (
                              <BackendImage
                                src={getImageUrl(coverImg as any)}
                                alt={col.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-surface-raised text-muted-foreground">
                                <Layers className="h-10 w-10 stroke-[1.5]" />
                              </div>
                            )}
                            <div className="absolute top-2 right-2 rounded-md bg-black/60 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-md flex items-center gap-1">
                              {col.isPublic ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                              <span>{col.isPublic ? "Public" : "Private"}</span>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                              {col.name}
                            </h3>
                            {col.description && (
                              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                                {col.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground">
                          <span>by {col.owner?.profile?.displayName || col.owner?.username || "Unknown"}</span>
                          <span className="font-medium">{col._count?.images ?? 0} items</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </Container>
        </SectionWrapper>
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <FolderPlus className="h-5 w-5 text-primary" /> Create New Collection
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-surface hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCollection} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Collection Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Wildlife of Simien"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Description (optional)</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What is this collection about?"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                />
                <span>Make collection public (visible to everyone)</span>
              </label>

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating} className="flex-1">
                  {isCreating ? "Creating..." : "Create Collection"}
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
