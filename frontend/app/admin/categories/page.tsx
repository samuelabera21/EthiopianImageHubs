import { Metadata } from "next";
import { CategoriesClient } from "@/features/admin/categories-client";

export const metadata: Metadata = {
  title: "Manage Categories | Admin",
  description: "Manage categories for EthiopiaHub Images",
};

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Categories</h2>
        <p className="text-muted-foreground">Add, edit, and organize image categories.</p>
      </div>
      <CategoriesClient />
    </div>
  );
}
