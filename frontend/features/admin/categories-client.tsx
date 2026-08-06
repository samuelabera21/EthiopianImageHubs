"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCategories, createCategory, updateCategory, deleteCategory, Category } from "@/services/category.service";

export function CategoriesClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err.message || "Failed to load categories.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newName) return;
    try {
      await createCategory(newName, newSlug, newDescription);
      setIsCreating(false);
      setNewName("");
      setNewSlug("");
      setNewDescription("");
      fetchCategories();
    } catch (err: any) {
      setError(err.message || "Failed to create category.");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateCategory(id, editName, editSlug, editDescription);
      setIsEditing(null);
      fetchCategories();
    } catch (err: any) {
      setError(err.message || "Failed to update category.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (err: any) {
      setError(err.message || "Failed to delete category.");
    }
  };

  if (isLoading) return <div>Loading categories...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Categories</h2>
        <Button onClick={() => setIsCreating(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" /> New Category
        </Button>
      </div>

      {error && <div className="text-red-500 bg-red-50 p-3 rounded-lg text-sm">{error}</div>}

      {isCreating && (
        <Card className="p-4 bg-surface-raised space-y-4">
          <h3 className="font-semibold text-sm">Create Category</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <input
              type="text"
              placeholder="Name"
              className="h-9 rounded-md border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-focus"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Slug (optional)"
              className="h-9 rounded-md border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-focus"
              value={newSlug}
              onChange={(e) => setNewSlug(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description (optional)"
              className="h-9 rounded-md border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-focus"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)}>Cancel</Button>
            <Button size="sm" onClick={handleCreate}>Save</Button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {categories.map((category) => (
          <Card key={category.id} className="p-4 flex items-center justify-between">
            {isEditing === category.id ? (
              <div className="flex-1 mr-4 space-y-2">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="h-8 rounded-md border border-border px-2 text-sm"
                  />
                  <input
                    type="text"
                    value={editSlug}
                    onChange={(e) => setEditSlug(e.target.value)}
                    className="h-8 rounded-md border border-border px-2 text-sm"
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="h-8 rounded-md border border-border px-2 text-sm"
                  />
                </div>
              </div>
            ) : (
              <div>
                <p className="font-medium text-foreground">{category.name}</p>
                <p className="text-xs text-muted-foreground">/{category.slug}</p>
                {category.description && <p className="text-sm mt-1 text-muted-foreground">{category.description}</p>}
              </div>
            )}
            
            <div className="flex gap-2">
              {isEditing === category.id ? (
                <>
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(null)}>Cancel</Button>
                  <Button size="sm" onClick={() => handleUpdate(category.id)}>Save</Button>
                </>
              ) : (
                <>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setIsEditing(category.id);
                      setEditName(category.name);
                      setEditSlug(category.slug || "");
                      setEditDescription(category.description || "");
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(category.id)}>
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
