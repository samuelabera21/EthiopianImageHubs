import type { Pagination } from "./image";

export interface DownloadResponse {
  success: boolean;
  message: string;
  data: {
    downloadUrl: string;
    fileName: string;
    expiresAt: string;
  };
}

export interface DownloadHistoryItem {
  id: string;
  imageId: string;
  title: string;
  downloadedAt: string;
}

export interface DownloadHistoryResponse {
  success: boolean;
  message: string;
  data: {
    items: DownloadHistoryItem[];
    pagination: Pagination;
  };
}
