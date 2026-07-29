import { cn } from "@/lib/cn";

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return <div className={cn("animate-pulse rounded-[var(--radius-card)] bg-muted", className)} />;
}
