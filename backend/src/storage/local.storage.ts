import fs from "fs";
import path from "path";
import crypto from "crypto";

import sharp from "sharp";

import {
  Storage,
  UploadFileOptions,
  UploadedFile,
} from "./storage.interface";

export class LocalStorage implements Storage {
  async upload(
    options: UploadFileOptions,
  ): Promise<UploadedFile> {
    const { file } = options;

    //------------------------------------
    // Upload directory
    //------------------------------------

    const uploadDir = path.join(
      process.cwd(),
      "uploads",
    );

    await fs.promises.mkdir(uploadDir, {
      recursive: true,
    });

    //------------------------------------
    // Generate filename
    //------------------------------------

    const extension =
      path.extname(file.originalname);

    const filename =
      `${crypto.randomUUID()}${extension}`;

    const storageKey =
      path.join("uploads", filename).split(path.sep).join("/");

    const destination =
      path.join(uploadDir, filename);

    //------------------------------------
    // Save file
    //------------------------------------

    await fs.promises.writeFile(
      destination,
      file.buffer,
    );

    //------------------------------------
    // Image metadata
    //------------------------------------

    const metadata =
      await sharp(file.buffer).metadata();

    //------------------------------------
    // Return
    //------------------------------------

    return {
      storageProvider: "LOCAL",

      originalFilename:
        file.originalname,

      storedFilename: filename,

      storageKey,

      mimeType: file.mimetype,

      extension:
        extension.replace(".", ""),

      fileSize: file.size,

      width: metadata.width ?? 0,

      height: metadata.height ?? 0,
    };
  }

  async delete(
    storageKey: string,
  ): Promise<void> {
    const filePath = path.join(
      process.cwd(),
      storageKey,
    );

    try {
      await fs.promises.unlink(filePath);
    } catch {
      // Ignore if file does not exist
    }
  }
}