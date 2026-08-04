export type ImageVisibility = "PUBLIC" | "PRIVATE" | "UNLISTED";
export type ImageStatus = "ACTIVE" | "DELETED";

export interface UserSummary {
  id: string;
  username: string;
  email: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  id: string;
  owner: UserSummary;
  category: Category;
  title: string;
  description: string | null;
  location: string | null;
  storageProvider: "LOCAL" | "CLOUDINARY";
  originalFilename: string;
  storedFilename: string;
  storageKey: string;
  mimeType: string;
  extension: string;
  fileSize: number;
  width: number;
  height: number;
  checksum: string | null;
  dominantColor: string | null;
  cameraModel: string | null;
  visibility: ImageVisibility;
  status: ImageStatus;
  tags: Tag[];
  isLiked?: boolean;
  isFavorited?: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ImageListResponse {
  success: boolean;
  message: string;
  data: Image[];
  pagination: Pagination;
}

export interface ImageResponse {
  success: boolean;
  message: string;
  data: Image;
}

export interface SuccessResponse {
  success: boolean;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: ApiFieldError[];
}

export interface ApiFieldError {
  field: string;
  message: string;
}

export interface CreateImageRequest {
  file: File;
  categoryId: string;
  title: string;
  description?: string;
  location?: string;
  visibility: ImageVisibility;
  tagIds?: string[];
}

export interface UpdateImageRequest {
  categoryId?: string;
  title?: string;
  description?: string;
  location?: string;
  visibility?: ImageVisibility;
  tagIds?: string[];
}

export interface GetImagesQuery {
  page?: number;
  limit?: number;
  categoryId?: string;
  ownerId?: string;
  visibility?: ImageVisibility;
  status?: ImageStatus;
  search?: string;
  location?: string;
  tagId?: string;
  sortBy?: "createdAt" | "title" | "fileSize";
  sortOrder?: "asc" | "desc";
}
