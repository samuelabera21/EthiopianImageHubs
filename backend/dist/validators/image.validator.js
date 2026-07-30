"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateImageSchema = exports.uploadImageSchema = void 0;
const zod_1 = require("zod");
exports.uploadImageSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(200),
    description: zod_1.z
        .string()
        .trim()
        .max(5000)
        .optional(),
    location: zod_1.z
        .string()
        .trim()
        .max(200)
        .optional(),
    categoryId: zod_1.z
        .string()
        .uuid("Invalid category ID"),
    visibility: zod_1.z.enum([
        "PUBLIC",
        "PRIVATE",
        "UNLISTED",
    ]),
    tagIds: zod_1.z
        .array(zod_1.z.string().uuid())
        .optional(),
});
/**
 * Update Image Validation
 */
exports.updateImageSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(200)
        .optional(),
    description: zod_1.z
        .string()
        .trim()
        .max(5000)
        .optional(),
    location: zod_1.z
        .string()
        .trim()
        .max(200)
        .optional(),
    categoryId: zod_1.z
        .string()
        .uuid("Invalid category ID")
        .optional(),
    visibility: zod_1.z
        .enum([
        "PUBLIC",
        "PRIVATE",
        "UNLISTED",
    ])
        .optional(),
    tagIds: zod_1.z
        .array(zod_1.z.string().uuid())
        .optional(),
});
