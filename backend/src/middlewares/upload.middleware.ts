import { upload } from "../config/multer.config";

export const uploadSingleImage =
  upload.single("image");