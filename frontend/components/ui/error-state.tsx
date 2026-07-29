import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ErrorStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title,
  message,
  actionLabel = "Go to home",
  actionHref = "/",
  onRetry,
}: ErrorStateProps) {
  return (
    <Card className="p-6 sm:p-8">
      <div className="space-y-6">
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-950">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600 text-white shadow-card">
            <AlertCircle className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
              Error
            </p>
            <p className="text-sm leading-6 text-red-900">{message}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
        </div>

        <div className="flex gap-3">
          {onRetry && (
            <Button onClick={onRetry} size="lg" className="flex-1">
              Try again
            </Button>
          )}
          <Button href={actionHref} size="lg" variant="outline" className="flex-1">
            {actionLabel}
          </Button>
        </div>
      </div>
    </Card>
  );
}
