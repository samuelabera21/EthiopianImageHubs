const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

export function getBackendOrigin(): string {
  return API_BASE_URL.replace(/\/api\/v1$/, "");
}

export function getImageUrl(image: {
  storageProvider: "LOCAL" | "CLOUDINARY";
  storedFilename: string;
  storageKey: string;
}): string {
  if (image.storageProvider === "CLOUDINARY") {
    return image.storageKey;
  }

  const normalizedKey = image.storageKey.replace(/\\/g, "/");
  
  const url = `${getBackendOrigin()}/${normalizedKey}`;
  
  return url;
}
