import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { CollectionItem } from "@/lib/home-data";

interface CollectionCardProps {
  collection: CollectionItem;
  className?: string;
}

export function CollectionCard({ collection, className }: CollectionCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-card transition-all duration-150 ease-out hover:-translate-y-1 hover:shadow-elevated",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          alt={collection.imageAlt}
          className="object-cover"
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          src={collection.imageSrc}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-5 p-5">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            {collection.title}
          </h3>
          <p className="text-sm leading-6 text-muted-foreground">
            {collection.description}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
          <div>
            <p className="font-medium text-foreground">{collection.imageCount}</p>
            <p>{collection.curator}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-secondary" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}
