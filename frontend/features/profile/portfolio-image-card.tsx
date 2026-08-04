"use client";

import NextImage from "next/image";
import Link from "next/link";
import { Download, Heart } from "lucide-react";
import { cn } from "@/lib/cn";
import { BackendImage } from "@/components/ui/backend-image";
import type { PortfolioImage } from "@/types/profile";

interface PortfolioImageCardProps {
  image: PortfolioImage;
  className?: string;
}

export function PortfolioImageCard({ image, className }: PortfolioImageCardProps) {
  // Use BackendImage if it points to localhost/127.0.0.1, else NextImage
  const isLocalBackend = image.thumbnailUrl.includes("localhost") || image.thumbnailUrl.includes("127.0.0.1");

  return (
    <Link href={`/images/${image.id}`}>
      <article
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-border/50 bg-surface shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer",
          className,
        )}
      >
        <div className="relative w-full overflow-hidden bg-muted/40 aspect-[4/5]">
          {isLocalBackend ? (
            <BackendImage
              alt={image.title}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              src={image.thumbnailUrl}
            />
          ) : (
            <NextImage
              alt={image.title}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              src={image.thumbnailUrl}
            />
          )}

          <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/85 via-black/30 to-black/40 p-4 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-focus-within:opacity-100">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md border border-white/20 shadow-sm">
                {image.category}
              </span>
            </div>

            <div className="space-y-2 text-white">
              <h3 className="text-base font-semibold tracking-tight text-white line-clamp-1 drop-shadow-sm">
                {image.title}
              </h3>
              <div className="flex items-center gap-4 text-xs font-medium text-white/85">
                <div className="flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5" />
                  <span>{image.likes}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Download className="h-3.5 w-3.5" />
                  <span>{image.downloads}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
