"use client";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useContributorStatus } from "@/hooks/useContributorStatus";
import { Container } from "@/components/ui/container";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorState } from "@/components/ui/error-state";
import { AuthHeader } from "@/components/ui/auth-header";
import { Footer } from "@/components/ui/footer";
import { ApplicationStatusCard } from "@/features/contributor/ApplicationStatusCard";

export default function ApplicationStatusPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useProtectedRoute();
  const {
    application,
    isLoading: isStatusLoading,
    error,
    hasApplied,
  } = useContributorStatus(isAuthenticated);

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
            title="Failed to load status"
            message="We couldn't retrieve your application status at this time."
            actionLabel="Go Home"
            actionHref="/"
          />
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />
      <main className="flex-1 py-12 md:py-20">
        <Container className="max-w-2xl">
          {!hasApplied || !application ? (
            <ErrorState
              title="No Application Found"
              message="You haven't applied to become a contributor yet."
              actionLabel="Apply Now"
              actionHref="/contributors/apply"
            />
          ) : (
            <ApplicationStatusCard application={application} />
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
