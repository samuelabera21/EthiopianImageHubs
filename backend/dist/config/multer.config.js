"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const memoryStorage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({
    storage: memoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
    },
    fileFilter(req, file, callback) {
        const allowedMimeTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return callback(new Error("Unsupported image format"));
        }
        callback(null, true);
    },
});
