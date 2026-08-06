import { z } from "zod";

export const getSearchSuggestionsSchema = z.object({
  q: z.string().trim().min(1, "Query is required").max(100),
  limit: z.coerce.number().int().positive().max(50).default(5),
});

export const getRecommendedImagesSchema = z.object({
  limit: z.coerce.number().int().positive().max(50).default(10),
});

export type GetSearchSuggestionsQuery = z.infer<typeof getSearchSuggestionsSchema>;
export type GetRecommendedImagesQuery = z.infer<typeof getRecommendedImagesSchema>;
