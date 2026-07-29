"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { forgotPasswordUser, AuthServiceError } from "@/services/forgot-password.service";
import type { ForgotPasswordResponse } from "@/types/auth";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/features/authentication/forgot-password/forgot-password.schema";

export function ForgotPasswordForm() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [successResponse, setSuccessResponse] = useState<ForgotPasswordResponse | null>(null);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const submitLabel = useMemo(() => {
    if (isSubmitting) {
      return "Sending reset link";
    }

    if (successResponse) {
      return "Reset link sent";
    }

    return "Send reset link";
  }, [isSubmitting, successResponse]);

  async function onSubmit(values: ForgotPasswordFormValues) {
    setApiError(null);
    setSuccessResponse(null);

    try {
      const response = await forgotPasswordUser(values);
      setSuccessResponse(response);
    } catch (error) {
      if (error instanceof AuthServiceError) {
        if (error.fieldErrors.length > 0) {
          error.fieldErrors.forEach((fieldError) => {
            if (fieldError.field === "email") {
              setError("email", {
                type: "server",
                message: fieldError.message,
              });
              return;
            }

            setApiError(fieldError.message);
          });
        } else {
          setApiError(error.message);
        }

        return;
      }

      setApiError("We could not process your request right now. Please try again.");
    }
  }

  if (successResponse) {
    return (
      <Card className="p-6 sm:p-8">
        <div className="space-y-6" aria-live="polite">
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-card">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Check your email</p>
              <p className="text-sm leading-6 text-emerald-900">Password reset instructions have been sent.</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-secondary shadow-card">
              Password recovery
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Check your inbox.</h2>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              We&apos;ve sent a password reset link to the email address associated with your account. Click the link in your email to create a new password.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface-raised p-4 text-sm leading-6 text-muted-foreground">
            <div className="space-y-2">
              <p className="font-medium text-foreground">What&apos;s next:</p>
              <ul className="list-inside list-disc space-y-1 text-xs">
                <li>Check your email inbox (or spam folder)</li>
                <li>Click the password reset link in the email</li>
                <li>Create a new password and confirm it</li>
                <li>Return here to login with your new password</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button href="/login" size="lg">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to login
            </Button>
            <Button href="/" size="lg" variant="outline">
              Return to home
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-surface-raised p-4 text-sm leading-6 text-muted-foreground">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
              <p>This success state pattern is reused for Verify Email and Reset Password confirmation screens.</p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-2">
          <p className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-secondary shadow-card">
            Account recovery
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Reset your password.
          </h1>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Enter the email address associated with your EthiopiaHub Images account, and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        {apiError ? (
          <div className="rounded-2xl border border-danger/20 bg-danger/10 p-4 text-sm leading-6 text-danger" role="alert">
            {apiError}
          </div>
        ) : null}

        <Input
          autoComplete="email"
          error={errors.email?.message}
          helperText="We'll send a password reset link to this email address."
          label="Email address"
          placeholder="samuel@example.com"
          type="email"
          {...register("email")}
          leftElement={<Mail className="h-4 w-4" aria-hidden="true" />}
        />

        <div className="space-y-4">
          <Button className="w-full" disabled={isSubmitting} isLoading={isSubmitting} size="lg" type="submit">
            {submitLabel}
          </Button>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link className="text-sm font-medium text-secondary transition-colors hover:text-secondary/80" href="/login">
              <ArrowLeft className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
              Back to login
            </Link>
            <Link className="text-sm font-medium text-foreground transition-colors hover:text-secondary" href="/register">
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>
      </form>
    </Card>
  );
}
