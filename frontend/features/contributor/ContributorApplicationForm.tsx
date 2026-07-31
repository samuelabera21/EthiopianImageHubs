"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContributorApplication } from "@/hooks/useContributorApplication";
import { ApiErrorResponse } from "@/types/auth"; // For error typing

export function ContributorApplicationForm() {
  const router = useRouter();
  const { apply, isApplying, error } = useContributorApplication();
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (message.length > 1000) {
      setValidationError("Message cannot exceed 1000 characters.");
      return;
    }

    try {
      await apply({ message: message.trim() || undefined });
      router.push("/contributors/status");
    } catch (err: any) {
      // Error is handled by displaying it below
    }
  };

  const getErrorMessage = () => {
    if (validationError) return validationError;
    if (error) {
      const apiError = error as any;
      return apiError.response?.data?.message || "Failed to submit application. Please try again.";
    }
    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-foreground">
          Why do you want to become a contributor? (Optional)
        </label>
        <textarea
          id="message"
          rows={5}
          className="w-full rounded-2xl border border-border bg-surface p-4 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20"
          placeholder="Tell us a bit about your photography and why you'd like to share it here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={!!errorMessage}
        />
        {errorMessage && (
          <p className="text-sm font-medium text-danger" role="alert">
            {errorMessage}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" isLoading={isApplying} disabled={isApplying}>
          Submit Application
        </Button>
        <Button variant="ghost" href="/" disabled={isApplying}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
