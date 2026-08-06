"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getTags, createTag, updateTag, deleteTag, Tag } from "@/services/tag.service";

export function TagsClient() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setIsLoading(true);
      const data = await getTags();
      setTags(data);
    } catch (err: any) {
      setError(err.message || "Failed to load tags.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newName) return;
    try {
      await createTag(newName);
      setIsCreating(false);
      setNewName("");
      fetchTags();
    } catch (err: any) {
      setError(err.message || "Failed to create tag.");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateTag(id, editName);
      setIsEditing(null);
      fetchTags();
    } catch (err: any) {
      setError(err.message || "Failed to update tag.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tag?")) return;
    try {
      await deleteTag(id);
      fetchTags();
    } catch (err: any) {
      setError(err.message || "Failed to delete tag.");
    }
  };

  if (isLoading) return <div>Loading tags...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tags</h2>
        <Button onClick={() => setIsCreating(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" /> New Tag
        </Button>
      </div>

      {error && <div className="text-red-500 bg-red-50 p-3 rounded-lg text-sm">{error}</div>}

      {isCreating && (
        <Card className="p-4 bg-surface-raised space-y-4">
          <h3 className="font-semibold text-sm">Create Tag</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Tag Name"
              className="h-9 rounded-md border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-focus"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)}>Cancel</Button>
            <Button size="sm" onClick={handleCreate}>Save</Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tags.map((tag) => (
          <Card key={tag.id} className="p-4 flex items-center justify-between">
            {isEditing === tag.id ? (
              <div className="flex-1 mr-4">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="h-8 w-full rounded-md border border-border px-2 text-sm"
                />
              </div>
            ) : (
              <p className="font-medium text-foreground truncate mr-2">{tag.name}</p>
            )}
            
            <div className="flex gap-2 shrink-0">
              {isEditing === tag.id ? (
                <>
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(null)}>Cancel</Button>
                  <Button size="sm" onClick={() => handleUpdate(tag.id)}>Save</Button>
                </>
              ) : (
                <>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setIsEditing(tag.id);
                      setEditName(tag.name);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(tag.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
