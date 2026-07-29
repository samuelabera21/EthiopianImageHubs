"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AuthServiceError } from "@/services/auth.service";
import { useAuth } from "@/features/authentication/provider/AuthProvider";
import { loginSchema, type LoginFormValues } from "@/features/authentication/login/login.schema";

export function LoginForm() {
  const { login, currentUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
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
      return "Signing in";
    }

    if (success) {
      return "Login completed";
    }

    return "Login";
  }, [isSubmitting, success]);

  async function onSubmit(values: LoginFormValues) {
    setApiError(null);

    try {
      await login(values);
      setSuccess(true);
    } catch (error) {
      if (error instanceof AuthServiceError) {
        if (error.fieldErrors.length > 0) {
          error.fieldErrors.forEach((fieldError) => {
            if (fieldError.field === "email" || fieldError.field === "password") {
              setError(fieldError.field, {
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

      setApiError("We could not sign you in right now. Please try again.");
    }
  }

  if (success) {
    return (
      <Card className="p-6 sm:p-8">
        <div className="space-y-6" aria-live="polite">
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-card">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Login successful</p>
              <p className="text-sm leading-6 text-emerald-900">Your session has been prepared for backend integration.</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-secondary shadow-card">
              Welcome back
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Hello, {currentUser?.username}.
            </h2>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              You are signed in as {currentUser?.email}.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button href="/" size="lg">
              Continue to home
            </Button>
            <Button href="/login" size="lg" variant="outline">
              Login another account
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-surface-raised p-4 text-sm leading-6 text-muted-foreground">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
              <p>This success state is reusable for Register and Forgot Password flows once those routes are added.</p>
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
            Secure access
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Login to your EthiopiaHub Images account.
          </h1>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Continue where you left off, manage your saved work, and keep exploring Ethiopian photography.
          </p>
        </div>

        {apiError ? (
          <div className="rounded-2xl border border-danger/20 bg-danger/10 p-4 text-sm leading-6 text-danger" role="alert">
            {apiError}
          </div>
        ) : null}

        <div className="space-y-5">
          <Input
            autoComplete="email"
            error={errors.email?.message}
            helperText="Use the email address attached to your EthiopiaHub Images account."
            label="Email address"
            placeholder="samuel@example.com"
            type="email"
            {...register("email")}
            leftElement={<Mail className="h-4 w-4" aria-hidden="true" />}
          />

          <Input
            autoComplete="current-password"
            error={errors.password?.message}
            helperText="Enter the password you created during registration."
            label="Password"
            placeholder="Your password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            leftElement={<LockKeyhole className="h-4 w-4" aria-hidden="true" />}
            rightElement={
              <Button
                ariaLabel={showPassword ? "Hide password" : "Show password"}
                className="h-10 w-10 rounded-full px-0"
                onClick={() => setShowPassword((currentValue) => !currentValue)}
                size="sm"
                type="button"
                variant="ghost"
              >
                {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
              </Button>
            }
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link className="text-sm font-medium text-secondary transition-colors hover:text-secondary/80" href="/forgot-password">
            Forgot your password?
          </Link>
          <Link className="text-sm font-medium text-foreground transition-colors hover:text-secondary" href="/register">
            Create an account
          </Link>
        </div>

        <Button className="w-full" disabled={isSubmitting} isLoading={isSubmitting} size="lg" type="submit">
          {submitLabel}
        </Button>
      </form>
    </Card>
  );
}