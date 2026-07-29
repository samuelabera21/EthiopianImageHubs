"use client";

import { useCallback, useState, useRef } from "react";
import { UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { MAX_FILE_SIZE_BYTES, ALLOWED_IMAGE_MIME_TYPES } from "@/constants/image";

interface UploadDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  selectedFiles: File[];
  onRemoveFile: (file: File) => void;
  className?: string;
}

export function UploadDropzone({
  onFilesSelected,
  selectedFiles,
  onRemoveFile,
  className,
}: UploadDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFiles = useCallback((files: FileList | File[]) => {
    setError(null);
    const validFiles: File[] = [];

    Array.from(files).forEach((file) => {
      if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type)) {
        setError(`${file.name} is not a supported image format.`);
        return;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError(`${file.name} exceeds the 10MB size limit.`);
        return;
      }
      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  }, [onFilesSelected]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateFiles(e.dataTransfer.files);
    }
  }, [validateFiles]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateFiles(e.target.files);
      e.target.value = "";
    }
  }, [validateFiles]);

  const handleButtonClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <div className={cn("w-full", className)}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-colors duration-150 ease-out",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-border bg-surface hover:border-primary/50",
        )}
      >
        <input
          accept={ALLOWED_IMAGE_MIME_TYPES.join(",")}
          aria-label="Upload images"
          className="sr-only"
          id="upload-dropzone"
          multiple
          onChange={handleInputChange}
          ref={inputRef}
          type="file"
        />
        <UploadCloud className={cn("h-10 w-10 text-muted-foreground", isDragOver && "text-primary")} aria-hidden="true" />
        <p className="mt-4 text-base font-medium text-foreground">
          Drag and drop images here, or click to browse
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          JPEG, PNG, WebP, GIF, SVG up to 10MB
        </p>
        <Button onClick={handleButtonClick} size="sm" variant="secondary" className="mt-4">
          Choose files
        </Button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-danger" role="alert">
          {error}
        </p>
      )}

      {selectedFiles.length > 0 && (
        <ul className="mt-4 space-y-2" aria-label="Selected files">
          {selectedFiles.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-xl border border-border bg-surface p-3 text-sm"
            >
              <span className="truncate text-foreground">{file.name}</span>
              <span className="ml-4 text-muted-foreground">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </span>
              <button
                aria-label={`Remove ${file.name}`}
                className="ml-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => onRemoveFile(file)}
                type="button"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
