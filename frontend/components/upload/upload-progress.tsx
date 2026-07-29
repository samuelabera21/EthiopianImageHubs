"use client";

import { cn } from "@/lib/cn";

interface UploadProgressProps {
  progress: number;
  status: "idle" | "uploading" | "paused" | "completed" | "failed";
  fileName?: string;
  className?: string;
}

export function UploadProgress({
  progress,
  status,
  fileName,
  className,
}: UploadProgressProps) {
  const statusLabel = {
    idle: "Waiting",
    uploading: "Uploading...",
    paused: "Paused",
    completed: "Completed",
    failed: "Failed",
  }[status];

  return (
    <div className={cn("w-full space-y-2", className)} role="status" aria-live="polite">
      {fileName && (
        <p className="text-sm font-medium text-foreground">{fileName}</p>
      )}
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300 ease-out",
              status === "failed" ? "bg-danger" : "bg-primary",
            )}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <span className="min-w-[3rem] text-right text-sm text-muted-foreground">
          {Math.round(progress)}%
        </span>
      </div>
      <p className="text-xs text-muted-foreground">{statusLabel}</p>
    </div>
  );
}
