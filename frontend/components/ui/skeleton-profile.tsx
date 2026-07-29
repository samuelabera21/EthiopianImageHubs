import { Card } from "@/components/ui/card";

export function SkeletonProfile() {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="p-6 sm:p-8">
        <div className="space-y-4">
          <div className="h-32 w-32 animate-pulse rounded-full bg-muted" />
          <div className="h-8 w-40 animate-pulse rounded-lg bg-muted" />
          <div className="h-6 w-32 animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-48 animate-pulse rounded-lg bg-muted" />
        </div>
      </Card>

      {/* Account Info */}
      <Card className="p-6 sm:p-8">
        <div className="space-y-4">
          <div className="h-6 w-40 animate-pulse rounded-lg bg-muted" />
          <div className="space-y-3 border-t border-border pt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-10 w-10 flex-shrink-0 animate-pulse rounded-lg bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 animate-pulse rounded-lg bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded-lg bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Status Card */}
      <Card className="p-6 sm:p-8">
        <div className="space-y-4">
          <div className="h-6 w-40 animate-pulse rounded-lg bg-muted" />
          <div className="space-y-2 border-t border-border pt-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="h-4 w-32 animate-pulse rounded-lg bg-muted" />
                <div className="h-4 w-20 animate-pulse rounded-lg bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
