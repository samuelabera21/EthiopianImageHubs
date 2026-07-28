import { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { VerifyEmailContent } from "@/features/authentication/verify-email/verify-email-content";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your EthiopiaHub Images account email address.",
};

function VerifyEmailLoading() {
  return (
    <div className="w-full max-w-md">
      <div className="space-y-4 rounded-2xl border border-border bg-surface-raised p-6 sm:p-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted" />
        <div className="h-10 w-32 animate-pulse rounded-full bg-muted" />
        <div className="h-8 w-full animate-pulse rounded-lg bg-muted" />
        <div className="h-6 w-3/4 animate-pulse rounded-lg bg-muted" />
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <>
      <Header variant="minimal" />
      <main className="flex min-h-screen items-center justify-center px-4 py-12">
        <Suspense fallback={<VerifyEmailLoading />}>
          <VerifyEmailContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
