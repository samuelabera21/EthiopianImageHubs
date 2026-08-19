"use client";

import { useEffect, useState } from "react";
import { X, Plus, FolderPlus, Check, Lock, Globe, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { collectionService } from "@/services/collection.service";
import { Collection } from "@/types/collection";
import { useAuth } from "@/features/authentication/provider/AuthProvider";

interface AddToCollectionModalProps {
  imageId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AddToCollectionModal({ imageId, isOpen, onClose }: AddToCollectionModalProps) {
  const { currentUser } = useAuth();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [selectedDropdownId, setSelectedDropdownId] = useState<string>("");

  // Create collection state
  const [showCreate, setShowCreate] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDesc, setNewCollectionDesc] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!isOpen || !currentUser) return;

    async function fetchUserCollections() {
      try {
        setIsLoading(true);
        const response = await collectionService.getCollections({
          ownerId: currentUser!.id,
          limit: 50,
        });
        const userCols = response.data;
        setCollections(userCols);

        // Pre-populate addedIds by checking which collections already contain imageId
        const initialAdded = new Set<string>();
        userCols.forEach((col) => {
          if (
            col.images &&
            col.images.some((img: any) => img.id === imageId || img.imageId === imageId)
          ) {
            initialAdded.add(col.id);
          }
        });
        setAddedIds(initialAdded);
        if (userCols.length > 0) {
          setSelectedDropdownId(userCols[0].id);
        }
      } catch (err: any) {
        console.error("Failed to load collections", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserCollections();
    setMessage(null);
    setShowCreate(false);
    setNewCollectionName("");
    setNewCollectionDesc("");
  }, [isOpen, currentUser, imageId]);

  if (!isOpen) return null;

  const handleToggleCollection = async (colId: string) => {
    const isCurrentlyAdded = addedIds.has(colId);
    try {
      setProcessingId(colId);
      setMessage(null);

      if (isCurrentlyAdded) {
        await collectionService.removeImageFromCollection(colId, imageId);
        setAddedIds((prev) => {
          const next = new Set(prev);
          next.delete(colId);
          return next;
        });
        setCollections((prev) =>
          prev.map((c) =>
            c.id === colId
              ? { ...c, _count: { images: Math.max(0, (c._count?.images ?? 1) - 1) } }
              : c
          )
        );
        setMessage({ type: "success", text: "Removed from collection" });
      } else {
        await collectionService.addImageToCollection(colId, imageId);
        setAddedIds((prev) => new Set(prev).add(colId));
        setCollections((prev) =>
          prev.map((c) =>
            c.id === colId
              ? { ...c, _count: { images: (c._count?.images ?? 0) + 1 } }
              : c
          )
        );
        setMessage({ type: "success", text: "Added to collection!" });
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update collection",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleCreateAndAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;

    try {
      setIsCreating(true);
      setMessage(null);
      const createdRes = await collectionService.createCollection({
        name: newCollectionName.trim(),
        description: newCollectionDesc.trim() || undefined,
        isPublic,
      });

      const newCol = createdRes.data;
      setCollections((prev) => [newCol, ...prev]);

      // Add image to newly created collection
      await collectionService.addImageToCollection(newCol.id, imageId);
      setAddedIds((prev) => new Set(prev).add(newCol.id));

      setMessage({ type: "success", text: `Collection "${newCol.name}" created & image added!` });
      setShowCreate(false);
      setNewCollectionName("");
      setNewCollectionDesc("");
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to create collection",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <FolderPlus className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Save to Collection</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-surface hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {message && (
          <div
            className={`rounded-lg p-3 text-sm font-medium ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {!currentUser ? (
          <div className="py-6 text-center text-sm text-muted-foreground space-y-4">
            <p>Please log in to save images to your collections.</p>
            <Button href="/login" className="w-full">
              Log in
            </Button>
          </div>
        ) : (
          <>
            {!showCreate ? (
              <div className="space-y-4">
                {/* Dropdown Quick Selection */}
                {collections.length > 0 && (
                  <div className="space-y-1 bg-surface-raised p-3 rounded-xl border border-border">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                      Select Collection (Dropdown)
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={selectedDropdownId}
                        onChange={(e) => setSelectedDropdownId(e.target.value)}
                        className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {collections.map((col) => (
                          <option key={col.id} value={col.id}>
                            {col.name} ({addedIds.has(col.id) ? "Added ✓" : "Not added"})
                          </option>
                        ))}
                      </select>
                      <Button
                        size="sm"
                        variant={addedIds.has(selectedDropdownId) ? "destructive" : "primary"}
                        disabled={!selectedDropdownId || processingId === selectedDropdownId}
                        onClick={() => handleToggleCollection(selectedDropdownId)}
                      >
                        {processingId === selectedDropdownId ? (
                          "Processing..."
                        ) : addedIds.has(selectedDropdownId) ? (
                          "Remove"
                        ) : (
                          "Add"
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => setShowCreate(true)}
                  variant="outline"
                  className="w-full justify-start gap-2 border-dashed"
                >
                  <Plus className="h-4 w-4" /> Create new collection
                </Button>

                {/* Collection List */}
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                  {isLoading ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                      Loading collections...
                    </div>
                  ) : collections.length === 0 ? (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      You don&apos;t have any collections yet. Create your first one above!
                    </div>
                  ) : (
                    collections.map((col) => {
                      const isAdded = addedIds.has(col.id);
                      return (
                        <div
                          key={col.id}
                          className="flex items-center justify-between rounded-xl border border-border bg-surface p-3 hover:bg-muted transition-colors"
                        >
                          <div className="flex-1 min-w-0 pr-3">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-foreground truncate">
                                {col.name}
                              </span>
                              {col.isPublic ? (
                                <Globe className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              ) : (
                                <Lock className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {col._count?.images ?? 0} items
                            </span>
                          </div>

                          <Button
                            size="sm"
                            variant={isAdded ? "secondary" : "primary"}
                            disabled={processingId === col.id}
                            onClick={() => handleToggleCollection(col.id)}
                            className="flex-shrink-0 group/btn"
                            title={isAdded ? "Click to remove from collection" : "Click to add to collection"}
                          >
                            {processingId === col.id ? (
                              "Updating..."
                            ) : isAdded ? (
                              <span className="flex items-center gap-1 text-emerald-600 group-hover/btn:text-red-600">
                                <Check className="h-3.5 w-3.5 group-hover/btn:hidden" />
                                <Trash2 className="h-3.5 w-3.5 hidden group-hover/btn:inline" />
                                <span className="group-hover/btn:hidden">Added</span>
                                <span className="hidden group-hover/btn:inline">Remove</span>
                              </span>
                            ) : (
                              "Add"
                            )}
                          </Button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateAndAdd} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Collection Name *</label>
                  <input
                    type="text"
                    required
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="e.g. Ethiopian Architecture"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Description (optional)</label>
                  <textarea
                    rows={2}
                    value={newCollectionDesc}
                    onChange={(e) => setNewCollectionDesc(e.target.value)}
                    placeholder="Brief description of this collection..."
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
                  <span>Make collection public</span>
                </label>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreate(false)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button type="submit" disabled={isCreating} className="flex-1">
                    {isCreating ? "Creating..." : "Create & Add"}
                  </Button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
