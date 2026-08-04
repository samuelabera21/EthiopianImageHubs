"use client";

import { useContributorProfile, useContributorPortfolio } from "@/hooks/useProfile";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";

import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "@/lib/utils";
import { Heart, Download, UploadCloud, Calendar, ExternalLink } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { PortfolioImageCard } from "./portfolio-image-card";

interface ContributorProfileClientProps {
  username: string;
}

export function ContributorProfileClient({ username }: ContributorProfileClientProps) {
  const { profile, isLoading: profileLoading, isError: profileError } = useContributorProfile(username);
  const { portfolio, isLoading: portfolioLoading } = useContributorPortfolio(username);

  if (profileLoading) {
    return <LoadingSkeleton className="h-64 w-full" />;
  }

  if (profileError || !profile) {
    return (
      <ErrorState
        title="Contributor not found"
        message="The profile you are looking for does not exist or has been removed."
        actionLabel="Back to Home"
        actionHref="/"
      />
    );
  }

  return (
    <div className="space-y-12">
      {/* Profile Header */}
      <Card className="overflow-hidden border-border/50 shadow-card">
        <div className="h-32 w-full bg-gradient-to-r from-primary/20 to-primary/5 dark:from-primary/10 dark:to-background"></div>
        <div className="px-6 sm:px-10 pb-10 relative">
          <div className="flex flex-col sm:flex-row gap-6 sm:items-end -mt-12 sm:-mt-16 mb-6">
            <div className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background shadow-md rounded-full overflow-hidden bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.displayName} className="h-full w-full object-cover" />
              ) : (
                profile.displayName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex-1 space-y-1.5">
              <h1 className="text-3xl font-bold tracking-tight">{profile.displayName}</h1>
              <p className="text-muted-foreground font-medium">@{profile.username}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {profile.bio && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">About</h3>
                  <p className="text-foreground leading-relaxed">{profile.bio}</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {formatDistanceToNow(new Date(profile.joinedAt))} ago</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Community Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <StatCard icon={<UploadCloud className="h-4 w-4" />} label="Uploads" value={profile.statistics.totalUploads} />
                <StatCard icon={<Download className="h-4 w-4" />} label="Downloads" value={profile.statistics.totalDownloads} />
                <StatCard icon={<Heart className="h-4 w-4" />} label="Likes" value={profile.statistics.totalLikes} />
                <StatCard icon={<ExternalLink className="h-4 w-4" />} label="Favorites" value={profile.statistics.totalFavorites} />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Portfolio Grid */}
      <div className="space-y-6">
        <SectionTitle title="Portfolio" description={`Images published by ${profile.displayName}`} />
        
        {portfolioLoading ? (
          <LoadingSkeleton className="h-96 w-full" />
        ) : portfolio.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No public images yet.</p>
          </div>
        ) : (
          <div className="columns-1 gap-4.5 sm:columns-2 md:columns-3 lg:columns-4 2xl:columns-5 space-y-4.5">
            {portfolio.map((img) => (
              <div key={img.id} className="break-inside-avoid">
                <PortfolioImageCard image={img} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-xl border border-border/40 text-center">
      <div className="text-primary mb-2 bg-primary/10 p-2 rounded-full">{icon}</div>
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium mt-1">{label}</span>
    </div>
  );
}
