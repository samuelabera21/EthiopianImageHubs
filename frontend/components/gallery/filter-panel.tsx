"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { IMAGE_VISIBILITY_OPTIONS, IMAGE_SORT_OPTIONS, IMAGE_SORT_ORDER_OPTIONS } from "@/constants/image";

export interface FilterState {
  search: string;
  categoryId: string;
  visibility: string;
  sortBy: string;
  sortOrder: string;
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: { id: string; name: string }[];
  className?: string;
}

export function FilterPanel({
  filters,
  onFilterChange,
  categories,
  className,
}: FilterPanelProps) {
  const updateFilter = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      search: "",
      categoryId: "",
      visibility: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  };

  const hasActiveFilters = filters.categoryId || filters.visibility || filters.search;

  return (
    <aside className={cn("w-full space-y-6", className)} aria-label="Filters">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            <X className="mr-1 h-4 w-4" aria-hidden="true" />
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="filter-search" className="text-sm font-medium text-foreground">
            Search
          </label>
          <input
            className="h-10 w-full rounded-xl border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20"
            id="filter-search"
            placeholder="Search images..."
            type="search"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="filter-category" className="text-sm font-medium text-foreground">
            Category
          </label>
          <select
            className="h-10 w-full rounded-xl border border-border bg-surface px-3 text-sm text-foreground focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20"
            id="filter-category"
            value={filters.categoryId}
            onChange={(e) => updateFilter("categoryId", e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="filter-visibility" className="text-sm font-medium text-foreground">
            Visibility
          </label>
          <select
            className="h-10 w-full rounded-xl border border-border bg-surface px-3 text-sm text-foreground focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20"
            id="filter-visibility"
            value={filters.visibility}
            onChange={(e) => updateFilter("visibility", e.target.value)}
          >
            <option value="">All</option>
            {IMAGE_VISIBILITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="filter-sort" className="text-sm font-medium text-foreground">
            Sort by
          </label>
          <select
            className="h-10 w-full rounded-xl border border-border bg-surface px-3 text-sm text-foreground focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20"
            id="filter-sort"
            value={filters.sortBy}
            onChange={(e) => updateFilter("sortBy", e.target.value)}
          >
            {IMAGE_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="filter-order" className="text-sm font-medium text-foreground">
            Order
          </label>
          <select
            className="h-10 w-full rounded-xl border border-border bg-surface px-3 text-sm text-foreground focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20"
            id="filter-order"
            value={filters.sortOrder}
            onChange={(e) => updateFilter("sortOrder", e.target.value)}
          >
            {IMAGE_SORT_ORDER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
}
