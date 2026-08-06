"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Mail, Badge, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SkeletonProfile } from "@/components/ui/skeleton-profile";
import { useAuth } from "@/features/authentication/provider/AuthProvider";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

function getInitials(username: string): string {
  return username
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ProfileContent() {
  const { currentUser, isLoading, logout } = useAuth();
  useProtectedRoute();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (isLoading) {
    return <SkeletonProfile />;
  }

  if (!currentUser) {
    return null; // Will redirect to /login
  }

  const initials = getInitials(currentUser.username);
  const joinedDate = formatDate(currentUser.createdAt);
  const isActive = currentUser.status === "ACTIVE";

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push("/");
    } catch {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card className="p-6 sm:p-8">
        <div className="space-y-6">
          {/* User Avatar */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-white shadow-card">
              {initials}
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {currentUser.username}
              </h1>

              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <p className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-secondary shadow-card">
                  {currentUser.role}
                </p>

                {isActive && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                    Active
                  </span>
                )}
                {!isActive && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {currentUser.status}
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                Joined {joinedDate}
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex gap-3">
            <Button
              href="/profile/edit"
              size="lg"
              variant="outline"
              className="flex-1"
            >
              Edit Profile
            </Button>
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              isLoading={isLoggingOut}
              size="lg"
              variant="outline"
              className="flex-1"
            >
              <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
              {isLoggingOut ? "Signing out..." : "Sign out"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Account Information Card */}
      <Card className="p-6 sm:p-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Account Information
          </h2>

          <div className="space-y-4 border-t border-border pt-4">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-raised">
                <Mail className="h-5 w-5 text-secondary" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Email Address
                </p>
                <p className="mt-1 break-all text-sm text-foreground">
                  {currentUser.email}
                </p>
                {currentUser.emailVerified && (
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-700">
                    <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                    Verified
                  </p>
                )}
              </div>
            </div>

            {/* Role */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-raised">
                <Badge className="h-5 w-5 text-secondary" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Account Role
                </p>
                <p className="mt-1 text-sm text-foreground">
                  {currentUser.role}
                </p>
              </div>
            </div>

            {/* Joined Date */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-raised">
                <Calendar className="h-5 w-5 text-secondary" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Joined Date
                </p>
                <p className="mt-1 text-sm text-foreground">
                  {joinedDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Account Status Card */}
      <Card className="p-6 sm:p-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Account Status
          </h2>

          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className={`inline-flex items-center gap-1 font-semibold ${
                isActive ? "text-emerald-700" : "text-amber-700"
              }`}>
                {isActive ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Active
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4" aria-hidden="true" />
                    {currentUser.status}
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Email Verified</span>
              <span className={`inline-flex items-center gap-1 font-semibold ${
                currentUser.emailVerified ? "text-emerald-700" : "text-amber-700"
              }`}>
                {currentUser.emailVerified ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Yes
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4" aria-hidden="true" />
                    No
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button href="/" size="lg" variant="outline" className="flex-1">
          Back to home
        </Button>
        <Button
          onClick={handleLogout}
          disabled={isLoggingOut}
          isLoading={isLoggingOut}
          size="lg"
          className="flex-1"
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
