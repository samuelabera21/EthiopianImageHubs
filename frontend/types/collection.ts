import { Image, UserSummary } from "./image";

export interface Collection {
  id: string;
  ownerId: string;
  owner?: UserSummary;
  name: string;
  description: string | null;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  images?: any[];
  _count?: {
    images: number;
  };
}

export interface CollectionListResponse {
  success: boolean;
  message: string;
  data: Collection[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface CollectionResponse {
  success: boolean;
  message: string;
  data: Collection;
}

export interface CreateCollectionRequest {
  name: string;
  description?: string;
  isPublic?: boolean;
}

export interface UpdateCollectionRequest {
  name?: string;
  description?: string;
  isPublic?: boolean;
}
