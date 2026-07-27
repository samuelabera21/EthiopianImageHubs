export interface UploadFileOptions {
  file: Express.Multer.File;
}

export interface UploadedFile {
  storageProvider: "LOCAL" | "CLOUDINARY";

  originalFilename: string;

  storedFilename: string;

  storageKey: string;

  mimeType: string;

  extension: string;

  fileSize: number;

  width: number;

  height: number;
}

export interface Storage {
  upload(
    options: UploadFileOptions,
  ): Promise<UploadedFile>;

  delete(
    storageKey: string,
  ): Promise<void>;
}