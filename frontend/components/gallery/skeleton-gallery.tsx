"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

interface SkeletonGalleryProps {
  count?: number;
  className?: string;
}

export function SkeletonGallery({ count = 8, className }: SkeletonGalleryProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="animate-pulse">
            <div className="aspect-[4/3] w-full bg-muted" />
            <div className="space-y-3 p-4">
              <div className="h-5 w-3/4 rounded-lg bg-muted" />
              <div className="h-4 w-1/2 rounded-lg bg-muted" />
              <div className="flex items-center justify-between pt-2">
                <div className="h-4 w-16 rounded-lg bg-muted" />
                <div className="h-4 w-16 rounded-lg bg-muted" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
