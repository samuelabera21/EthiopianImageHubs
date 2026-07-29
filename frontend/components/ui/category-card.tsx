import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { TrendingCategory } from "@/lib/home-data";

interface CategoryCardProps {
  category: TrendingCategory;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link
      className={cn(
        "group flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-card transition-all duration-150 ease-out hover:-translate-y-1 hover:shadow-elevated",
        className,
      )}
      href={category.href}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-foreground">
            {category.title}
          </h3>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-secondary transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <p className="text-sm leading-6 text-muted-foreground">
          {category.description}
        </p>
      </div>
      <p className="pt-6 text-sm font-medium text-secondary">{category.count}</p>
    </Link>
  );
}
