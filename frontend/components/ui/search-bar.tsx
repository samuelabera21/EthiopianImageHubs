import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

interface SearchBarProps {
  placeholder: string;
  className?: string;
  ariaLabel: string;
}

export function SearchBar({ placeholder, className, ariaLabel }: SearchBarProps) {
  return (
    <label
      className={cn(
        "flex w-full items-center gap-3 rounded-full border border-border bg-surface px-4 py-3 shadow-card transition-shadow duration-150 ease-out focus-within:shadow-elevated",
        className,
      )}
    >
      <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
      <input
        aria-label={ariaLabel}
        className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        placeholder={placeholder}
        type="search"
      />
    </label>
  );
}
