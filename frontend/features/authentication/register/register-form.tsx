"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Sparkles, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AuthServiceError } from "@/services/register.service";
import { useAuth } from "@/features/authentication/provider/AuthProvider";
import { registerSchema, type RegisterFormValues } from "@/features/authentication/register/register.schema";

export function RegisterForm() {
  const { register: registerAccount, currentUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
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
      return "Creating account";
    }

    if (success) {
      return "Account created";
    }

    return "Create account";
  }, [isSubmitting, success]);

  async function onSubmit(values: RegisterFormValues) {
    setApiError(null);

    try {
      await registerAccount(values);
      setSuccess(true);
    } catch (error) {
      if (error instanceof AuthServiceError) {
        if (error.fieldErrors.length > 0) {
          error.fieldErrors.forEach((fieldError) => {
            if (fieldError.field === "username" || fieldError.field === "email" || fieldError.field === "password") {
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

      setApiError("We could not create your account right now. Please try again.");
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
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Account created</p>
              <p className="text-sm leading-6 text-emerald-900">Check your email to verify your account before logging in.</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-secondary shadow-card">
              Welcome to EthiopiaHub Images
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Account created for {currentUser?.username}.
            </h2>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              A verification email has been sent to {currentUser?.email}. Please check your inbox and click the verification link to activate your account.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface-raised p-4 text-sm leading-6 text-muted-foreground">
            <div className="space-y-2">
              <p className="font-medium text-foreground">Next steps:</p>
              <ul className="list-inside list-disc space-y-1 text-xs">
                <li>Check your email for the verification link</li>
                <li>Click the link to confirm your email address</li>
                <li>Return here to login with your email and password</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button href="/login" size="lg">
              Go to login
            </Button>
            <Button href="/" size="lg" variant="outline">
              Back to home
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-surface-raised p-4 text-sm leading-6 text-muted-foreground">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
              <p>This success state and verification flow pattern is reusable for Forgot Password and other registration-related features.</p>
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
            Join EthiopiaHub Images.
          </h1>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Create an account to upload, organize, and share Ethiopian photography with our community.
          </p>
        </div>

        {apiError ? (
          <div className="rounded-2xl border border-danger/20 bg-danger/10 p-4 text-sm leading-6 text-danger" role="alert">
            {apiError}
          </div>
        ) : null}

        <div className="space-y-5">
          <Input
            autoComplete="username"
            error={errors.username?.message}
            helperText="Choose a unique name for your profile. 3-50 characters."
            label="Username"
            placeholder="e.g., amanuel_photography"
            type="text"
            {...register("username")}
            leftElement={<User className="h-4 w-4" aria-hidden="true" />}
          />

          <Input
            autoComplete="email"
            error={errors.email?.message}
            helperText="We'll send a verification email to this address."
            label="Email address"
            placeholder="samuel@example.com"
            type="email"
            {...register("email")}
            leftElement={<Mail className="h-4 w-4" aria-hidden="true" />}
          />

          <Input
            autoComplete="new-password"
            error={errors.password?.message}
            helperText="Must be at least 8 characters long for account security."
            label="Password"
            placeholder="Create a secure password"
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

        <div className="space-y-3">
          <div className="rounded-2xl border border-border bg-surface-raised p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Password requirements</p>
            <ul className="mt-3 space-y-2 text-xs leading-6 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                <span>At least 8 characters</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                <span>A mix of uppercase and lowercase letters</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                <span>At least one number or special character</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-xs leading-6 text-muted-foreground">
            <p>
              By creating an account, you agree to our{" "}
              <Link className="font-medium text-secondary transition-colors hover:text-secondary/80" href="/terms">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="font-medium text-secondary transition-colors hover:text-secondary/80" href="/privacy">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link className="font-medium text-foreground transition-colors hover:text-secondary" href="/login">
                Login here
              </Link>
            </p>
          </div>
        </div>

        <Button className="w-full" disabled={isSubmitting} isLoading={isSubmitting} size="lg" type="submit">
          {submitLabel}
        </Button>
      </form>
    </Card>
  );
}
