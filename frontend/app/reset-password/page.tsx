import { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { ResetPasswordForm } from "@/features/authentication/reset-password/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Create a new password for your EthiopiaHub Images account.",
};

function ResetPasswordLoading() {
  return (
    <div className="w-full max-w-md">
      <div className="space-y-4 rounded-2xl border border-border bg-surface-raised p-6 sm:p-8">
        <div className="h-10 w-24 animate-pulse rounded-full bg-muted" />
        <div className="h-12 w-full animate-pulse rounded-lg bg-muted" />
        <div className="h-10 w-3/4 animate-pulse rounded-lg bg-muted" />
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <>
      <Header variant="minimal" />
      <main className="flex min-h-screen items-center justify-center px-4 py-12">
        <Suspense fallback={<ResetPasswordLoading />}>
          <ResetPasswordForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
