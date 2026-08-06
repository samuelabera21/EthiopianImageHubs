import { z } from "zod";

export const profileParamsSchema = z.object({
  username: z.string().min(1),
});

export const portfolioQuerySchema = z.object({
  page: z.preprocess((val) => (val ? Number(val) : 1), z.number().int().min(1).default(1)),
  pageSize: z.preprocess((val) => (val ? Number(val) : 20), z.number().int().min(1).max(100).default(20)),
});

export const updateProfileSchema = z.object({
  displayName: z.string().trim().max(100).optional(),
  bio: z.string().trim().max(1000).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
