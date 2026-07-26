import multer from "multer";

const memoryStorage = multer.memoryStorage();

export const upload = multer({
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
      return callback(
        new Error("Unsupported image format"),
      );
    }

    callback(null, true);
  },
});