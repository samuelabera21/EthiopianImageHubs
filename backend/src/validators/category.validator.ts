import { z } from "zod";

export const categoryParamsSchema = z.object({
  id: z.string().uuid("Invalid category ID"),
});

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required").max(100, "Category name must be under 100 characters"),
  description: z.string().trim().max(1000, "Description must be under 1000 characters").optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required").max(100, "Category name must be under 100 characters").optional(),
  description: z.string().trim().max(1000, "Description must be under 1000 characters").optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
