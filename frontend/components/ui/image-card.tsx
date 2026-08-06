import NextImage from "next/image";
import { Heart, Download } from "lucide-react";
import { cn } from "@/lib/cn";
import { getImageUrl, getAbsoluteUrl } from "@/lib/media";
import { BackendImage } from "@/components/ui/backend-image";
import type { Image } from "@/types/image";

interface ImageCardProps {
  image: Image;
  className?: string;
}

export function ImageCard({ image, className }: ImageCardProps) {
  // Determine aspect ratio class based on dimensions
  const ratio = image.width / image.height;
  let aspectClassName = "aspect-square";
  if (ratio > 1.2) aspectClassName = "aspect-video"; // landscape
  else if (ratio < 0.8) aspectClassName = "aspect-[3/4]"; // portrait
  else aspectClassName = "aspect-square";

  const imageSrc = getAbsoluteUrl(getImageUrl(image));
  const isLocalBackend = imageSrc.includes("localhost") || imageSrc.includes("127.0.0.1");

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-card transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-elevated",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden", aspectClassName)}>
        {isLocalBackend ? (
          <BackendImage
            alt={image.title}
            className="object-cover transition-transform duration-350 ease-out group-hover:scale-[1.03]"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={imageSrc}
          />
        ) : (
          <NextImage
            alt={image.title}
            className="object-cover transition-transform duration-350 ease-out group-hover:scale-[1.03]"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={imageSrc}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-foreground/0 to-transparent opacity-0 transition-opacity duration-250 group-hover:opacity-100" />
        <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-card backdrop-blur-sm">
          {image.category?.name || "Uncategorized"}
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight text-foreground truncate">
            {image.title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            by {image.owner?.profile?.displayName || image.owner?.username || "Unknown"}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Heart className="h-4 w-4 text-secondary" aria-hidden="true" />
            <span>{image._count?.likes || 0}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Download className="h-4 w-4 text-secondary" aria-hidden="true" />
            <span>{image._count?.downloads || 0}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
