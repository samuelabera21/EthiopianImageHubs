"use client";

import { Heart, Download, Share2, Bookmark, Camera, MapPin, Tag, FolderOpen, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow, formatFileSize } from "@/lib/utils";
import { getImageUrl } from "@/lib/media";
import { BackendImage } from "@/components/ui/backend-image";
import { cn } from "@/lib/cn";
import type { Image as ImageType } from "@/types/image";

interface ImageDetailsProps {
  image: ImageType;
  onDownload?: () => void;
  onLike?: () => void;
  onShare?: () => void;
  onSave?: () => void;
  className?: string;
}


export function ImageDetails({
  image,
  onDownload,
  onLike,
  onShare,
  onSave,
  className,
}: ImageDetailsProps) {
  const imageUrl = getImageUrl(image);
  const isLocalBackend = imageUrl.includes("localhost") || imageUrl.includes("127.0.0.1");

  return (
    <div className={cn("space-y-8", className)}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Main Image Showcase */}
        <div className="lg:col-span-2">
          <div className="relative flex min-h-[420px] max-h-[78vh] w-full items-center justify-center overflow-hidden rounded-3xl border border-border/60 bg-muted/30 p-4 shadow-card dark:border-neutral-800 dark:bg-neutral-900/60 sm:p-6">
            {isLocalBackend ? (
              <BackendImage
                alt={image.title}
                className="max-h-[72vh] w-auto h-auto max-w-full rounded-xl object-contain shadow-lg transition-all duration-300"
                priority
                sizes="(max-width: 768px) 100vw, 66vw"
                src={imageUrl}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={image.title}
                className="max-h-[72vh] w-auto h-auto max-w-full rounded-xl object-contain shadow-lg transition-all duration-300"
                decoding="async"
                loading="eager"
                sizes="(max-width: 768px) 100vw, 66vw"
                src={imageUrl}
              />
            )}
          </div>
        </div>

        {/* Right Column: Metadata & Actions Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 rounded-2xl border-border/60 shadow-card">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {image.title}
              </h1>
              {image.description && (
                <p className="text-sm leading-6 text-muted-foreground">
                  {image.description}
                </p>
              )}
              <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                  <Camera className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {image.owner.username}
                  </p>
                  <p className="text-xs text-muted-foreground">Photographer</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-border/60 shadow-card">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Image Information</h2>
              <div className="space-y-3.5">
                <div className="flex items-center gap-3 text-sm">
                  <FolderOpen className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-semibold text-foreground">{image.category.name}</span>
                </div>
                {image.location && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-semibold text-foreground">{image.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <Camera className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">Dimensions:</span>
                  <span className="font-semibold text-foreground font-mono">{image.width} × {image.height} px</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Tag className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">File size:</span>
                  <span className="font-semibold text-foreground font-mono">{formatFileSize(image.fileSize)}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">Uploaded:</span>
                  <span className="font-semibold text-foreground">
                    {formatDistanceToNow(new Date(image.createdAt))}
                  </span>
                </div>
                {image.tags && image.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40">
                    {image.tags.map((tagItem: { tag?: { id?: string; name?: string }; id?: string; tagId?: string; name?: string }, index: number) => {
                      const tagObj = tagItem.tag || tagItem;
                      const tagKey = tagObj.id || tagItem.tagId || `tag-${index}`;
                      const tagName = tagObj.name || tagItem.name;
                      if (!tagName) return null;

                      return (
                        <span
                          key={tagKey}
                          className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {tagName}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Unsplash/Pexels style Action Buttons */}
          <div className="flex items-center gap-3">
            <Button onClick={onDownload} className="flex-1 h-11 rounded-full font-semibold shadow-md">
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Download
            </Button>
            <Button variant="outline" onClick={onLike} className="flex-1 h-11 rounded-full font-semibold">
              <Heart className="mr-2 h-4 w-4" aria-hidden="true" />
              Like
            </Button>
            <Button variant="outline" onClick={onShare} aria-label="Share" title="Share link" className="h-11 w-11 rounded-full p-0">
              <Share2 className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button variant="outline" onClick={onSave} aria-label="Save" title="Save to collection" className="h-11 w-11 rounded-full p-0">
              <Bookmark className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
