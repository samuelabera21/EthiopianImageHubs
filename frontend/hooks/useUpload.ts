"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/services/image.service";
import type { CreateImageRequest } from "@/types/image";
import type { MetadataFormValues } from "@/components/upload/metadata-form";

export function useUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadMutation = useMutation({
    mutationFn: async (payload: CreateImageRequest) => uploadImage(payload, setUploadProgress),
    onSuccess: () => {
      setSelectedFile(null);
      setUploadProgress(0);
    },
  });

  const handleUpload = async (metadata: MetadataFormValues) => {
    if (!selectedFile) return;
    setUploadProgress(0);

    await uploadMutation.mutateAsync({
      file: selectedFile,
      categoryId: metadata.categoryId,
      title: metadata.title,
      description: metadata.description || undefined,
      location: metadata.location || undefined,
      visibility: metadata.visibility,
      tagIds: metadata.tagIds,
    });
  };

  return {
    selectedFile,
    setSelectedFile,
    uploadMutation,
    handleUpload,
    isUploading: uploadMutation.isPending,
    uploadProgress,
  };
}
