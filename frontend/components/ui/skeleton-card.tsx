import { Card } from "@/components/ui/card";

interface SkeletonCardProps {
  lines?: number;
  showAvatar?: boolean;
}

export function SkeletonCard({ lines = 3, showAvatar = false }: SkeletonCardProps) {
  return (
    <Card className="p-6 sm:p-8">
      <div className="space-y-4">
        {showAvatar && <div className="h-32 w-32 animate-pulse rounded-full bg-muted" />}
        
        <div className="h-8 w-40 animate-pulse rounded-lg bg-muted" />
        
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={`animate-pulse rounded-lg bg-muted ${
                i === lines - 1 ? "h-6 w-3/4" : "h-6 w-full"
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
