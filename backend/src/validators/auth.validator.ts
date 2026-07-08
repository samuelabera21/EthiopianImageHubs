import { z } from "zod";

/**
 * Register Validation
 */
export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(50),

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100),
});

/**
 * Login Validation
 */
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

/**
 * Forgot Password Validation
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address"),
});

/**
 * Reset Password Validation
 */
export const resetPasswordSchema = z.object({
  token: z
    .string()
    .min(1, "Token is required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

/**
 * Email Verification Validation
 */
export const verifyEmailSchema = z.object({
  token: z
    .string()
    .min(1, "Token is required"),
});


/**
 * Refresh Token Validation
 */
export const refreshTokenSchema = z.object({
  refreshToken: z
    .string()
    .min(1, "Refresh token is required"),
});


export const logoutSchema = z.object({
  refreshToken: z
    .string()
    .min(1, "Refresh token is required"),
});


/**
 * Types
 */
export type RegisterInput = z.infer<typeof registerSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;

export type LogoutInput =  z.infer<typeof logoutSchema>;