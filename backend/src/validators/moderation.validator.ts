import { z } from "zod";

export const approveImageSchema = z.object({
  moderationNote: z.string().max(2000).optional(),
});

export const rejectImageSchema = z.object({
  moderationNote: z.string().min(1, "A reason for rejection must be provided").max(2000),
});
