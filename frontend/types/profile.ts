import type { Pagination } from "./image";

export interface PublicProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  joinedAt: string;
  statistics: {
    totalUploads: number;
    totalDownloads: number;
    totalLikes: number;
    totalFavorites: number;
  };
}

export interface PublicProfileResponse {
  success: boolean;
  message: string;
  data: {
    profile: PublicProfile;
  };
}

export interface PortfolioImage {
  id: string;
  title: string;
  thumbnailUrl: string;
  category: string;
  likes: number;
  downloads: number;
  createdAt: string;
}

export interface PortfolioResponse {
  success: boolean;
  message: string;
  data: {
    items: PortfolioImage[];
    pagination: Pagination;
  };
}
