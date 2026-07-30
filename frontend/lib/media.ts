const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

export function getBackendOrigin(): string {
  return API_BASE_URL.replace(/\/api\/v1\/?$/, "");
}

export function getImageUrl(image: {
  storageProvider: "LOCAL" | "CLOUDINARY";
  storedFilename: string;
  storageKey: string;
}): string {
  if (!image) return "";

  if (image.storageProvider === "CLOUDINARY") {
    return image.storageKey;
  }

  if (!image.storageKey) {
    return "";
  }

  const normalizedKey = image.storageKey.replace(/\\/g, "/");
  const cleanKey = normalizedKey.startsWith("/") ? normalizedKey.slice(1) : normalizedKey;
  
  const url = `${getBackendOrigin()}/${cleanKey}`;
  
  return url;
}

export function getImageFilename(image: {
  id: string;
  title: string;
  originalFilename?: string | null;
  extension?: string | null;
}): string {
  if (image.originalFilename && image.originalFilename.trim()) {
    return image.originalFilename;
  }
  const ext = image.extension || "jpg";
  const cleanTitle = image.title ? image.title.replace(/[^a-zA-Z0-9_\-\s]/g, "").trim().replace(/\s+/g, "_") : "";
  if (cleanTitle) {
    return `${cleanTitle}.${ext}`;
  }
  return `${image.id}.${ext}`;
}

export async function downloadImageFile(imageUrl: string, filename: string): Promise<void> {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename;
    link.target = "_self";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
