"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateImageBodySchema = exports.imageIdParamsSchema = exports.getImagesQuerySchema = void 0;
const zod_1 = require("zod");
exports.getImagesQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().optional(),
    limit: zod_1.z.coerce.number().int().positive().optional(),
    categoryId: zod_1.z.string().optional(),
    ownerId: zod_1.z.string().uuid().optional(),
    visibility: zod_1.z.enum(["PUBLIC", "PRIVATE", "UNLISTED"]).optional(),
    status: zod_1.z.enum(["ACTIVE", "DELETED"]).optional(),
    search: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    tagId: zod_1.z.string().uuid().optional(),
    sortBy: zod_1.z.enum(["createdAt", "title", "fileSize"]).optional(),
    sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
});
exports.imageIdParamsSchema = zod_1.z.object({
    imageId: zod_1.z.string().uuid({ message: "Invalid image ID" }),
});
exports.updateImageBodySchema = zod_1.z.object({}).passthrough(); // Or define the full schema
