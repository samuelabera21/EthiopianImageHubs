import { z } from "zod";

/**
 * Apply for Contributor Validation Schema
 */
export const applyContributorSchema = z.object({
  message: z
    .string()
    .max(1000, "Message cannot exceed 1000 characters")
    .optional(),
});

/**
 * Review Contributor Application Validation Schema
 */
export const reviewApplicationSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
  adminNote: z
    .string()
    .max(1000, "Admin note cannot exceed 1000 characters")
    .optional(),
});
