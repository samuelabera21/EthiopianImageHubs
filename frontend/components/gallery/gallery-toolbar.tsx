"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface GalleryToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount?: number;
  onToggleFilters: () => void;
  showFilters: boolean;
  className?: string;
}

export function GalleryToolbar({
  searchQuery,
  onSearchChange,
  resultCount,
  onToggleFilters,
  showFilters,
  className,
}: GalleryToolbarProps) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", className)}>
      <div className="flex-1 max-w-xl">
        <label className="flex w-full items-center gap-3 rounded-full border border-border bg-surface px-4 py-3 shadow-card transition-shadow duration-150 ease-out focus-within:shadow-elevated">
          <svg className="h-5 w-5 text-muted-foreground" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            aria-label="Search images"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            placeholder="Search images by title, description, or location..."
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </label>
      </div>
      <div className="flex items-center gap-3">
        {resultCount !== undefined && (
          <p className="text-sm text-muted-foreground">
            {resultCount} {resultCount === 1 ? "result" : "results"}
          </p>
        )}
        <Button
          variant={showFilters ? "secondary" : "outline"}
          size="sm"
          onClick={onToggleFilters}
          aria-pressed={showFilters}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" aria-hidden="true" />
          Filters
        </Button>
      </div>
    </div>
  );
}
