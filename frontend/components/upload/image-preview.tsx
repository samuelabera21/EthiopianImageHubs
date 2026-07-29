"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

interface ImagePreviewProps {
  file: File;
  onRemove: () => void;
  className?: string;
}

export function ImagePreview({ file, onRemove, className }: ImagePreviewProps) {
  const previewUrl = URL.createObjectURL(file);

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-surface", className)}>
      <div className="relative aspect-video w-full">
        <Image
          alt={file.name}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          src={previewUrl}
        />
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
          <p className="text-xs text-muted-foreground">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
        <Button
          aria-label={`Remove ${file.name}`}
          size="icon"
          variant="ghost"
          onClick={onRemove}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
