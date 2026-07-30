"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutSchema = exports.refreshTokenSchema = exports.verifyEmailSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
/**
 * Register Validation
 */
exports.registerSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(50),
    email: zod_1.z
        .string()
        .trim()
        .email("Invalid email address"),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100),
});
/**
 * Login Validation
 */
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .trim()
        .email("Invalid email address"),
    password: zod_1.z
        .string()
        .min(1, "Password is required"),
});
/**
 * Forgot Password Validation
 */
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .trim()
        .email("Invalid email address"),
});
/**
 * Reset Password Validation
 */
exports.resetPasswordSchema = zod_1.z.object({
    token: zod_1.z
        .string()
        .min(1, "Token is required"),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters"),
});
/**
 * Email Verification Validation
 */
exports.verifyEmailSchema = zod_1.z.object({
    token: zod_1.z
        .string()
        .min(1, "Token is required"),
});
/**
 * Refresh Token Validation
 */
exports.refreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z
        .string()
        .min(1, "Refresh token is required"),
});
exports.logoutSchema = zod_1.z.object({
    refreshToken: zod_1.z
        .string()
        .min(1, "Refresh token is required"),
});
