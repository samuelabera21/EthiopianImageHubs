"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ShieldCheck, Sparkles, ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AuthServiceError } from "@/services/auth.service";
import { resetPasswordUser } from "@/services/reset-password.service";
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/features/authentication/reset-password/reset-password.schema";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successResponse, setSuccessResponse] = useState<boolean>(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      password: "",
      confirmPassword: "",
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
      return "Resetting password";
    }

    if (successResponse) {
      return "Password reset complete";
    }

    return "Reset password";
  }, [isSubmitting, successResponse]);

  async function onSubmit(values: ResetPasswordFormValues) {
    setApiError(null);
    setSuccessResponse(false);

    try {
      await resetPasswordUser(values);
      setSuccessResponse(true);
    } catch (error) {
      if (error instanceof AuthServiceError) {
        if (error.fieldErrors.length > 0) {
          error.fieldErrors.forEach((fieldError) => {
            if (fieldError.field === "token" || fieldError.field === "password" || fieldError.field === "confirmPassword") {
              setError(fieldError.field as "token" | "password" | "confirmPassword", {
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

      setApiError("We could not reset your password right now. Please try again.");
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
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Password reset successful</p>
              <p className="text-sm leading-6 text-emerald-900">Your password has been updated securely.</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-secondary shadow-card">
              Security update
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Password reset complete.
            </h2>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Your new password is now active. You can sign in with your new password immediately.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button href="/login" size="lg">
              Return to login
            </Button>
            <Button href="/" size="lg" variant="outline">
              Go to home
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-surface-raised p-4 text-sm leading-6 text-muted-foreground">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
              <p>If you did not request this password reset, please contact our support team immediately.</p>
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
            Password recovery
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Create a new password.
          </h1>
          <p className="text-sm leading-6 text-muted-foreground sm:text-base">
            Enter a strong password to secure your EthiopiaHub Images account.
          </p>
        </div>

        {apiError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900" role="alert">
            {apiError}
          </div>
        )}

        <div className="space-y-4">
          <Input
            {...register("password")}
            aria-invalid={!!errors.password}
            autoComplete="new-password"
            error={errors.password?.message}
            id="password"
            label="New password"
            placeholder="Enter at least 8 characters"
            rightElement={
              <Button
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="h-auto p-0"
                onClick={() => setShowPassword(!showPassword)}
                size="sm"
                type="button"
                variant="ghost"
              >
                {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
              </Button>
            }
            type={showPassword ? "text" : "password"}
          />

          <Input
            {...register("confirmPassword")}
            aria-invalid={!!errors.confirmPassword}
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            id="confirmPassword"
            label="Confirm password"
            placeholder="Re-enter your new password"
            rightElement={
              <Button
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                className="h-auto p-0"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                size="sm"
                type="button"
                variant="ghost"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
              </Button>
            }
            type={showConfirmPassword ? "text" : "password"}
          />
        </div>

        <div className="space-y-3 rounded-2xl border border-border bg-surface-raised p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">Password requirements:</p>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden="true" />
              Minimum 8 characters
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden="true" />
              Maximum 100 characters
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden="true" />
              Must match confirmation field
            </li>
          </ul>
        </div>

        <Button className="w-full" disabled={isSubmitting} isLoading={isSubmitting} size="lg" type="submit">
          {submitLabel}
        </Button>

        <div className="pt-2">
          <Link className="inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-secondary/80" href="/login">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to login
          </Link>
        </div>
      </form>
    </Card>
  );
}
