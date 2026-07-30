"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const sharp_1 = __importDefault(require("sharp"));
class LocalStorage {
    async upload(options) {
        const { file } = options;
        //------------------------------------
        // Upload directory
        //------------------------------------
        const uploadDir = path_1.default.join(process.cwd(), "uploads");
        await fs_1.default.promises.mkdir(uploadDir, {
            recursive: true,
        });
        //------------------------------------
        // Generate filename
        //------------------------------------
        const extension = path_1.default.extname(file.originalname);
        const filename = `${crypto_1.default.randomUUID()}${extension}`;
        const storageKey = path_1.default.join("uploads", filename).split(path_1.default.sep).join("/");
        const destination = path_1.default.join(uploadDir, filename);
        //------------------------------------
        // Save file
        //------------------------------------
        await fs_1.default.promises.writeFile(destination, file.buffer);
        //------------------------------------
        // Image metadata
        //------------------------------------
        const metadata = await (0, sharp_1.default)(file.buffer).metadata();
        //------------------------------------
        // Return
        //------------------------------------
        return {
            storageProvider: "LOCAL",
            originalFilename: file.originalname,
            storedFilename: filename,
            storageKey,
            mimeType: file.mimetype,
            extension: extension.replace(".", ""),
            fileSize: file.size,
            width: metadata.width ?? 0,
            height: metadata.height ?? 0,
        };
    }
    async delete(storageKey) {
        const filePath = path_1.default.join(process.cwd(), storageKey);
        try {
            await fs_1.default.promises.unlink(filePath);
        }
        catch {
            // Ignore if file does not exist
        }
    }
}
exports.LocalStorage = LocalStorage;
