import { Metadata } from "next";
import { TagsClient } from "@/features/admin/tags-client";

export const metadata: Metadata = {
  title: "Manage Tags | Admin",
  description: "Manage tags for EthiopiaHub Images",
};

export default function AdminTagsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Tags</h2>
        <p className="text-muted-foreground">Add, edit, and organize image tags.</p>
      </div>
      <TagsClient />
    </div>
  );
}
