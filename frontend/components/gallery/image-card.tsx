"use client";

import NextImage from "next/image";
import { Download, Bookmark, Eye, Heart } from "lucide-react";
import { cn } from "@/lib/cn";
import { getImageUrl, getImageFilename, downloadImageFile, getAbsoluteUrl } from "@/lib/media";
import { formatFileSize } from "@/lib/utils";
import { BackendImage } from "@/components/ui/backend-image";
import { Button } from "@/components/ui/button";
import type { Image } from "@/types/image";

interface GalleryImageCardProps {
  image: Image;
  onClick?: (image: Image) => void;
  className?: string;
}

export function GalleryImageCard({ image, onClick, className }: GalleryImageCardProps) {
  const imageUrl = getAbsoluteUrl(getImageUrl(image));
  const isLocalBackend = imageUrl.includes("localhost") || imageUrl.includes("127.0.0.1");

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const filename = getImageFilename(image);
    downloadImageFile(imageUrl, filename);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert("Save to collection coming soon");
  };

  // Calculate raw aspect ratio and clamp to balanced bounds (0.72 min portrait limit, 1.65 max landscape limit)
  const rawRatio =
    image.width && image.height ? image.width / image.height : 1;
  const clampedRatio = Math.max(0.72, Math.min(1.65, rawRatio));

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/50 bg-surface shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
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
      aria-label={onClick ? `View ${image.title} by ${image.owner.username}` : undefined}
    >
      <div
        className="relative w-full overflow-hidden bg-muted/40"
        style={{ aspectRatio: clampedRatio }}
      >
        {isLocalBackend ? (
          <BackendImage
            alt={image.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={imageUrl}
          />
        ) : (
          <NextImage
            alt={image.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={imageUrl}
          />
        )}

        {/* Professional Unsplash / Pexels Hover Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/85 via-black/30 to-black/40 p-4 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-focus-within:opacity-100">
          {/* Top Row: Category & Visibility badges (left), Action buttons (right) */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md border border-white/20 shadow-sm">
                {image.category.name}
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold shadow-sm backdrop-blur-md",
                  image.visibility === "PUBLIC" && "bg-emerald-500/80 text-white",
                  image.visibility === "PRIVATE" && "bg-amber-500/80 text-white",
                  image.visibility === "UNLISTED" && "bg-blue-500/80 text-white",
                )}
              >
                {image.visibility}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-md transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 shadow-sm"
                onClick={handleDownload}
                aria-label={`Download ${image.title}`}
                title="Download image"
                type="button"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-md transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 shadow-sm"
                onClick={handleSave}
                aria-label={`Bookmark ${image.title}`}
                title="Save to collection"
                type="button"
              >
                <Bookmark className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Bottom Row: Metadata info */}
          <div className="space-y-1 text-white">
            <h3 className="text-base font-semibold tracking-tight text-white line-clamp-1 drop-shadow-sm">
              {image.title}
            </h3>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-white/85 line-clamp-1">
                by {image.owner.profile?.displayName || image.owner.username}
              </p>
              {image._count && (
                <div className="flex items-center gap-2 text-[11px] font-semibold text-white/90">
                  <div className="flex items-center gap-0.5" title={`${image._count.downloads} Downloads`}>
                    <Download className="h-3 w-3" />
                    <span>{image._count.downloads}</span>
                  </div>
                  <div className="flex items-center gap-0.5" title={`${image._count.likes} Likes`}>
                    <Heart className="h-3 w-3" />
                    <span>{image._count.likes}</span>
                  </div>
                  <div className="flex items-center gap-0.5" title={`${image._count.favorites} Favorites`}>
                    <Bookmark className="h-3 w-3" />
                    <span>{image._count.favorites}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-white/20 pt-2 text-[11px] text-white/75 font-mono">
              <span>{image.width} × {image.height} px</span>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" aria-hidden="true" />
                <span>{formatFileSize(image.fileSize)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
