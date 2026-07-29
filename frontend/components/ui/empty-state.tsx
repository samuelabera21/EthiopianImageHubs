import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-4 rounded-[var(--radius-card)] border border-dashed border-border bg-surface p-8 text-left",
        className,
      )}
    >
      <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
      <p className="max-w-2xl text-base leading-7 text-muted-foreground">
        {description}
      </p>
      {actionLabel && actionHref ? (
        <Button href={actionHref} variant="secondary">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
