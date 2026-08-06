import { z } from "zod";

export const getImagesQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  categoryId: z.string().optional(),
  ownerId: z.string().uuid().optional(),
  visibility: z.enum(["PUBLIC", "PRIVATE", "UNLISTED"]).optional(),
  status: z.enum(["ACTIVE", "DELETED"]).optional(),
  search: z.string().optional(),
  location: z.string().optional(),
  region: z.string().optional(),
  city: z.string().optional(),
  orientation: z.enum(["landscape", "portrait", "square"]).optional(),
  tagId: z.string().uuid().optional(),
  sortBy: z.enum(["createdAt", "title", "fileSize", "relevance", "newest", "oldest", "downloads", "likes", "trending"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const imageIdParamsSchema = z.object({
  imageId: z.string().uuid({ message: "Invalid image ID" }),
});

export const updateImageBodySchema = z.object({}).passthrough(); // Or define the full schema