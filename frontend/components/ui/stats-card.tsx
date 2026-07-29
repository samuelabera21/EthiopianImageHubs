import { cn } from "@/lib/cn";
import type { CommunityStat } from "@/lib/home-data";

interface StatsCardProps {
  stat: CommunityStat;
  className?: string;
}

export function StatsCard({ stat, className }: StatsCardProps) {
  return (
    <article
      className={cn(
        "rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-card",
        className,
      )}
    >
      <p className="text-3xl font-semibold tracking-tight text-foreground">
        {stat.value}
      </p>
      <h3 className="mt-3 text-base font-semibold text-foreground">
        {stat.label}
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{stat.description}</p>
    </article>
  );
}
