import Image from "next/image";
import { Heart, Eye } from "lucide-react";
import { cn } from "@/lib/cn";
import type { FeaturedImage } from "@/lib/home-data";

interface ImageCardProps {
  image: FeaturedImage;
  className?: string;
}

export function ImageCard({ image, className }: ImageCardProps) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-card transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-elevated",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden", image.aspectClassName)}>
        <Image
          alt={image.imageAlt}
          className="object-cover transition-transform duration-350 ease-out group-hover:scale-[1.03]"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={image.imageSrc}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-foreground/0 to-transparent opacity-0 transition-opacity duration-250 group-hover:opacity-100" />
        <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-card backdrop-blur-sm">
          {image.category}
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {image.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            by {image.photographer}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Heart className="h-4 w-4 text-secondary" aria-hidden="true" />
            <span>{image.likes}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="h-4 w-4 text-secondary" aria-hidden="true" />
            <span>{image.views}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
