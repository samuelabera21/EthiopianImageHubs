import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
