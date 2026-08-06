"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, User, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SkeletonProfile } from "@/components/ui/skeleton-profile";
import { useAuth } from "@/features/authentication/provider/AuthProvider";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { profileService } from "@/services/profile.service";

export function ProfileEditContent() {
  const { currentUser, isLoading } = useAuth();
  useProtectedRoute();
  const router = useRouter();

  const [displayName, setDisplayName] = useState(currentUser?.profile?.displayName || "");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  if (isLoading) {
    return <SkeletonProfile />;
  }

  if (!currentUser) {
    return null; // Will redirect to /login
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      // 1. Update Profile Info
      await profileService.updateProfile({ displayName, bio });
      
      // 2. Upload Avatar if selected
      if (avatarFile) {
        await profileService.updateAvatar(avatarFile);
      }

      // Reload window to fetch updated user state
      window.location.href = "/profile";
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile. Please try again.");
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Edit Profile
            </h1>
            <p className="text-sm text-muted-foreground">
              Update your public profile details and avatar.
            </p>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="displayName" className="text-sm font-medium text-foreground flex items-center gap-2">
                <User className="h-4 w-4 text-secondary" />
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-base text-foreground placeholder:text-muted-foreground focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20"
                placeholder="Enter display name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="bio" className="text-sm font-medium text-foreground flex items-center gap-2">
                <User className="h-4 w-4 text-secondary" />
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="min-h-[120px] w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="avatar" className="text-sm font-medium text-foreground flex items-center gap-2">
                <FileImage className="h-4 w-4 text-secondary" />
                Avatar Image
              </label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                className="h-12 w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-white hover:file:opacity-90 border border-border bg-surface text-base text-foreground focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20 rounded-xl px-3"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => router.push("/profile")}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              className="flex-1"
              disabled={isSaving}
              isLoading={isSaving}
            >
              <Save className="mr-2 h-4 w-4" aria-hidden="true" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
