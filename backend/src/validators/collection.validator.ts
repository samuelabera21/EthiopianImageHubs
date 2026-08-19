import { z } from "zod";

export const createCollectionSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "Collection name is required")
      .max(150, "Collection name cannot exceed 150 characters"),
    description: z
      .string()
      .max(1000, "Description cannot exceed 1000 characters")
      .optional(),
    isPublic: z.boolean().default(true),
  }),
});

export const updateCollectionSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "Collection name cannot be empty")
      .max(150, "Collection name cannot exceed 150 characters")
      .optional(),
    description: z
      .string()
      .max(1000, "Description cannot exceed 1000 characters")
      .optional(),
    isPublic: z.boolean().optional(),
  }),
});

export const addImageToCollectionSchema = z.object({
  body: z.object({
    imageId: z
      .string()
      .min(1, "Image ID is required")
      .uuid("Invalid image ID format"),
  }),
});

export type CreateCollectionInput = z.infer<typeof createCollectionSchema>["body"];
export type UpdateCollectionInput = z.infer<typeof updateCollectionSchema>["body"];
export type AddImageToCollectionInput = z.infer<typeof addImageToCollectionSchema>["body"];
