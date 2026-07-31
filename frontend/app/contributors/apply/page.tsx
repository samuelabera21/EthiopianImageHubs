"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useContributorStatus } from "@/hooks/useContributorStatus";
import { Container } from "@/components/ui/container";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorState } from "@/components/ui/error-state";
import { AuthHeader } from "@/components/ui/auth-header";
import { Footer } from "@/components/ui/footer";
import { ContributorApplicationForm } from "@/features/contributor/ContributorApplicationForm";
import { SectionTitle } from "@/components/ui/section-title";

export default function ApplyPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useProtectedRoute();
  const router = useRouter();

  const {
    hasApplied,
    isLoading: isStatusLoading,
    error,
  } = useContributorStatus(isAuthenticated); // Only check status if authenticated

  useEffect(() => {
    if (hasApplied) {
      router.replace("/contributors/status");
    }
  }, [hasApplied, router]);

  if (isAuthLoading || isStatusLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <AuthHeader />
        <main className="flex flex-1 items-center justify-center">
          <LoadingSpinner size="lg" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <AuthHeader />
        <main className="flex flex-1 items-center justify-center">
          <ErrorState
            title="Unable to load"
            message="There was an error checking your application status."
            actionLabel="Go Home"
            actionHref="/"
          />
        </main>
        <Footer />
      </div>
    );
  }

  // Prevent flicker before redirect
  if (hasApplied || !isAuthenticated) {
    return null; 
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />
      <main className="flex-1 py-12 md:py-20">
        <Container className="max-w-3xl">
          <SectionTitle
            title="Become a Contributor"
            description="Join our community of photographers and share your unique perspective of Ethiopia."
            className="mb-12 text-center"
          />
          <div className="rounded-[var(--radius-card)] border border-border bg-surface p-8 shadow-card sm:p-12">
            <ContributorApplicationForm />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
