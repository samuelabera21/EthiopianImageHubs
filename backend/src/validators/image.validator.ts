import { z } from "zod";

export const uploadImageSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200),

  description: z
    .string()
    .trim()
    .max(5000)
    .optional(),

  location: z
    .string()
    .trim()
    .max(200)
    .optional(),

  categoryId: z
    .string()
    .uuid("Invalid category ID"),

  visibility: z.enum([
    "PUBLIC",
    "PRIVATE",
    "UNLISTED",
  ]),

  tagIds: z
    .array(
      z.string().uuid(),
    )
    .optional(),
});

/**
 * Update Image Validation
 */
export const updateImageSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200)
    .optional(),

  description: z
    .string()
    .trim()
    .max(5000)
    .optional(),

  location: z
    .string()
    .trim()
    .max(200)
    .optional(),

  categoryId: z
    .string()
    .uuid("Invalid category ID")
    .optional(),

  visibility: z
    .enum([
      "PUBLIC",
      "PRIVATE",
      "UNLISTED",
    ])
    .optional(),

  tagIds: z
    .array(
      z.string().uuid(),
    )
    .optional(),
});


export type UploadImageInput =
  z.infer<typeof uploadImageSchema>;

export type UpdateImageInput =
  z.infer<typeof updateImageSchema>;

export interface GetImagesQuery {
  page?: number;
  limit?: number;

  categoryId?: string;
  ownerId?: string;

  visibility?: "PUBLIC" | "PRIVATE" | "UNLISTED";

  status?: "ACTIVE" | "DELETED";

  search?: string;

  location?: string;
  
  region?: string;
  city?: string;

  orientation?: "landscape" | "portrait" | "square";

  tagId?: string;

  sortBy?:
    | "createdAt"
    | "title"
    | "fileSize"
    | "relevance"
    | "newest"
    | "oldest"
    | "downloads"
    | "likes"
    | "trending";

  sortOrder?:
    | "asc"
    | "desc";
}