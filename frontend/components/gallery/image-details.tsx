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
  const isLocalBackend = imageUrl.includes("localhost:5000");

  return (
    <div className={cn("space-y-8", className)}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-2xl bg-muted">
            {isLocalBackend ? (
              <BackendImage
                alt={image.title}
                className="object-cover"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 66vw"
                src={imageUrl}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={image.title}
                className="object-cover"
                decoding="async"
                loading="eager"
                sizes="(max-width: 768px) 100vw, 66vw"
                src={imageUrl}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              />
            )}
          </div>
        </div>
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                {image.title}
              </h1>
              {image.description && (
                <p className="text-sm leading-6 text-muted-foreground">
                  {image.description}
                </p>
              )}
              <div className="flex items-center gap-3 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Camera className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {image.owner.username}
                  </p>
                  <p className="text-xs text-muted-foreground">Photographer</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Image Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <FolderOpen className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium text-foreground">{image.category.name}</span>
                </div>
                {image.location && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium text-foreground">{image.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <Camera className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">Dimensions:</span>
                  <span className="font-medium text-foreground">{image.width} x {image.height}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Tag className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">File size:</span>
                  <span className="font-medium text-foreground">{formatFileSize(image.fileSize)}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">Uploaded:</span>
                  <span className="font-medium text-foreground">
                    {formatDistanceToNow(new Date(image.createdAt))}
                  </span>
                </div>
                {image.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {image.tags.map((tag: ImageType["tags"][number]) => (
                      <span
                        key={tag.id}
                        className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button onClick={onDownload} className="flex-1">
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Download
            </Button>
            <Button variant="outline" onClick={onLike} className="flex-1">
              <Heart className="mr-2 h-4 w-4" aria-hidden="true" />
              Like
            </Button>
            <Button variant="ghost" onClick={onShare} aria-label="Share">
              <Share2 className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button variant="ghost" onClick={onSave} aria-label="Save">
              <Bookmark className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
