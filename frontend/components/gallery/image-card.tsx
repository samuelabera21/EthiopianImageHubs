"use client";

import NextImage from "next/image";
import { Eye, Download, Share2, Bookmark } from "lucide-react";
import { cn } from "@/lib/cn";
import { getImageUrl } from "@/lib/media";
import { BackendImage } from "@/components/ui/backend-image";
import { Button } from "@/components/ui/button";
import type { Image } from "@/types/image";

interface GalleryImageCardProps {
  image: Image;
  onClick?: (image: Image) => void;
  className?: string;
}

export function GalleryImageCard({ image, onClick, className }: GalleryImageCardProps) {
  const imageUrl = getImageUrl(image);
  const isLocalBackend = imageUrl.includes("localhost:5000");

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-card transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-elevated",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={() => onClick?.(image)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(image);
        }
      }}
      tabIndex={0}
      role={onClick ? "button" : undefined}
      aria-label={onClick ? `View ${image.title}` : undefined}
    >
      <div className="relative aspect-video overflow-hidden">
        {isLocalBackend ? (
          <BackendImage
            alt={image.title}
            className="object-cover transition-transform duration-350 ease-out group-hover:scale-[1.03]"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={imageUrl}
          />
        ) : (
          <NextImage
            alt={image.title}
            className="object-cover transition-transform duration-350 ease-out group-hover:scale-[1.03]"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={imageUrl}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-foreground/0 to-transparent opacity-0 transition-opacity duration-250 group-hover:opacity-100" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-card backdrop-blur-sm">
            {image.category.name}
          </span>
          <span className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold shadow-card backdrop-blur-sm",
            image.visibility === "PUBLIC" && "bg-emerald-100 text-emerald-700",
            image.visibility === "PRIVATE" && "bg-amber-100 text-amber-700",
            image.visibility === "UNLISTED" && "bg-blue-100 text-blue-700",
          )}>
            {image.visibility}
          </span>
        </div>
        <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity duration-250 group-hover:opacity-100">
          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-background/90 text-foreground hover:bg-background" aria-label="Download">
            <Download className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-background/90 text-foreground hover:bg-background" aria-label="Save">
            <Bookmark className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-background/90 text-foreground hover:bg-background" aria-label="Share">
            <Share2 className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <h3 className="text-base font-semibold tracking-tight text-foreground line-clamp-1">
          {image.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          by {image.owner.username}
        </p>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Eye className="h-4 w-4" aria-hidden="true" />
            <span>{image.fileSize}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>{image.width} x {image.height}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
