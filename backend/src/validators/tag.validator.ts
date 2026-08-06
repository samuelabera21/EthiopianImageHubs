import { z } from "zod";

export const tagParamsSchema = z.object({
  id: z.string().uuid("Invalid tag ID"),
});

export const createTagSchema = z.object({
  name: z.string().trim().min(1, "Tag name is required").max(80, "Tag name must be under 80 characters"),
});

export const updateTagSchema = z.object({
  name: z.string().trim().min(1, "Tag name is required").max(80, "Tag name must be under 80 characters"),
});

export type CreateTagInput = z.infer<typeof createTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
