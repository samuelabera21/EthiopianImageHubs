"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewApplicationSchema = exports.applyContributorSchema = void 0;
const zod_1 = require("zod");
/**
 * Apply for Contributor Validation Schema
 */
exports.applyContributorSchema = zod_1.z.object({
    message: zod_1.z
        .string()
        .max(1000, "Message cannot exceed 1000 characters")
        .optional(),
});
/**
 * Review Contributor Application Validation Schema
 */
exports.reviewApplicationSchema = zod_1.z.object({
    status: zod_1.z.enum(["APPROVED", "REJECTED"]),
    adminNote: zod_1.z
        .string()
        .max(1000, "Admin note cannot exceed 1000 characters")
        .optional(),
});
