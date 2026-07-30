"use client";

import { useMemo } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

interface ImagePreviewProps {
  file: File;
  onRemove: () => void;
  className?: string;
}

export function ImagePreview({ file, onRemove, className }: ImagePreviewProps) {
  const previewUrl = useMemo(() => URL.createObjectURL(file), [file]);

  return (
    <div className={cn("relative overflow-hidden rounded-3xl border border-border/60 bg-muted/30 p-4 shadow-card dark:border-neutral-800 dark:bg-neutral-900/60 sm:p-6", className)}>
      <div className="relative flex min-h-[320px] max-h-[65vh] w-full items-center justify-center overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={file.name}
          className="max-h-[62vh] w-auto h-auto max-w-full rounded-xl object-contain shadow-lg transition-all duration-300"
          src={previewUrl}
        />
      </div>
      <div className="flex w-full items-center justify-between pt-4 mt-3 border-t border-border/40">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{file.name}</p>
          <p className="text-xs text-muted-foreground font-mono">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
        <Button
          aria-label={`Remove ${file.name}`}
          title="Remove file"
          size="icon"
          variant="ghost"
          className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
          onClick={onRemove}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
