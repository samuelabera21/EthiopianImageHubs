export const IMAGE_VISIBILITY_OPTIONS = [
  { value: "PUBLIC", label: "Public" },
  { value: "PRIVATE", label: "Private" },
  { value: "UNLISTED", label: "Unlisted" },
] as const;

export const IMAGE_STATUS_OPTIONS = [
  { value: "ACTIVE", label: "Active" },
  { value: "DELETED", label: "Deleted" },
] as const;

export const IMAGE_SORT_OPTIONS = [
  { value: "createdAt", label: "Latest" },
  { value: "title", label: "Title" },
  { value: "fileSize", label: "File size" },
] as const;

export const IMAGE_SORT_ORDER_OPTIONS = [
  { value: "desc", label: "Descending" },
  { value: "asc", label: "Ascending" },
] as const;

export const DEFAULT_IMAGES_LIMIT = 20;
export const MAX_IMAGES_LIMIT = 100;

export const ALLOWED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
