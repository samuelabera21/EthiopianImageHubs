"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { discoveryService, SearchSuggestion } from "@/services/discovery.service";

interface SearchBarProps {
  placeholder: string;
  className?: string;
  ariaLabel: string;
}

export function SearchBar({ placeholder, className, ariaLabel }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      const results = await discoveryService.getSearchSuggestions(query);
      setSuggestions(results);
    };

    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setIsOpen(false);
    
    // If it's a category, we might want to filter by category ID, but for now we search by text
    router.push(`/search?q=${encodeURIComponent(suggestion.text)}`);
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <form onSubmit={handleSearch} className="w-full">
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
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />
        </label>
      </form>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full overflow-hidden rounded-xl border border-border bg-surface shadow-elevated z-[400]">
          <ul className="py-2">
            {suggestions.map((suggestion, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted focus:bg-muted focus:outline-none flex items-center justify-between"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="truncate">{suggestion.text}</span>
                  <span className="text-xs text-muted-foreground uppercase">{suggestion.type}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
