"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AuthServiceError } from "@/services/auth-errors";
import { verifyEmailUser } from "@/services/verify-email.service";

type VerificationState = "loading" | "success" | "invalid" | "error";

export function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [state, setState] = useState<VerificationState>("loading");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function verify() {
      if (!token) {
        setState("invalid");
        setMessage("No verification token provided. Please check your email link.");
        return;
      }

      try {
        const response = await verifyEmailUser(token);
        setState("success");
        setMessage(response.message || "Your email has been verified successfully.");
      } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : String(error);
        if (errMsg.toLowerCase().includes("already verified")) {
          setState("success");
          setMessage("Your email address is already verified.");
          return;
        }

        if (error instanceof AuthServiceError) {
          if (error.status === 400) {
            setState("invalid");
            setMessage(error.message || "This verification token is invalid or has expired.");
          } else {
            setState("error");
            setMessage(error.message || "Something went wrong. Please try again later.");
          }
        } else {
          setState("error");
          setMessage("Unable to verify email. Please try again later.");
        }
      }
    }

    verify();
  }, [token]);

  if (state === "loading") {
    return (
      <Card className="flex min-h-[20rem] items-center justify-center p-6 sm:p-8">
        <LoadingSpinner size="lg" message="We're verifying your email address..." />
      </Card>
    );
  }

  if (state === "success") {
    return (
      <Card className="p-6 sm:p-8">
        <div className="space-y-6" aria-live="polite">
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-card">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Email verified
              </p>
              <p className="text-sm leading-6 text-emerald-900">{message}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              You&apos;re all set.
            </h2>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Your email address is now verified. You can log in to your EthiopiaHub Images
              account and start browsing our collection of stunning Ethiopian photography.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button href="/login" size="lg">
              <CheckCircle2 className="mr-2 h-4 w-4" aria-hidden="true" />
              Go to login
            </Button>
            <Button href="/" size="lg" variant="outline">
              <Home className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to home
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (state === "invalid") {
    return (
      <Card className="p-6 sm:p-8">
        <div className="space-y-6" aria-live="polite">
          <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-card">
              <AlertCircle className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                Invalid or expired link
              </p>
              <p className="text-sm leading-6 text-amber-900">{message}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Verification link expired.
            </h2>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Email verification links expire after a certain period. Create a new account or
              request a new verification email to proceed.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button href="/register" size="lg">
              Create new account
            </Button>
            <Button href="/" size="lg" variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to home
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-surface-raised p-4 text-sm leading-6 text-muted-foreground">
            <p>
              If you believe you should have access, please{" "}
              <Link href="/" className="font-medium text-secondary hover:underline">
                contact support
              </Link>
              .
            </p>
          </div>
        </div>
      </Card>
    );
  }

  // state === "error"
  return (
    <ErrorState
      title="Something went wrong."
      message={message}
      onRetry={() => window.location.reload()}
    />
  );
}
