"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { AuthHeader } from "@/components/ui/auth-header";
import { Footer } from "@/components/ui/footer";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { UploadDropzone } from "@/components/upload/upload-dropzone";
import { ImagePreview } from "@/components/upload/image-preview";
import { MetadataForm } from "@/components/upload/metadata-form";
import { UploadProgress } from "@/components/upload/upload-progress";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useUpload } from "@/hooks/useUpload";
import { useCategories } from "@/hooks/useCategories";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Button } from "@/components/ui/button";

type Step = "select" | "preview" | "metadata" | "publish";

const STEP_TITLES: Record<Step, string> = {
  select: "Choose Images",
  preview: "Preview",
  metadata: "Add Metadata",
  publish: "Publish",
};

export default function UploadPage() {
  useProtectedRoute();
  const router = useRouter();
  const [step, setStep] = useState<Step>("select");

  const { selectedFile, setSelectedFile, uploadMutation, handleUpload, isUploading, uploadProgress } =
    useUpload();
  const { categories } = useCategories();

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setStep("preview");
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setStep("select");
  };

  const handleMetadataSubmit = async (values: { categoryId: string; title: string; description?: string; location?: string; visibility: string }) => {
    await handleUpload({
      ...values,
      visibility: values.visibility as "PUBLIC" | "PRIVATE" | "UNLISTED",
    });
    setStep("publish");
  };

  const handlePublishComplete = () => {
    router.push("/gallery");
  };

  const renderStepContent = () => {
    switch (step) {
      case "select":
        return (
          <UploadDropzone
            onFilesSelected={handleFilesSelected}
            selectedFiles={selectedFile ? [selectedFile] : []}
            onRemoveFile={handleRemoveFile}
          />
        );
      case "preview":
        return selectedFile ? (
          <div className="space-y-4">
            <ImagePreview file={selectedFile} onRemove={handleRemoveFile} />
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("select")}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                Back
              </Button>
              <Button onClick={() => setStep("metadata")} className="flex-1">
                Continue
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        ) : null;
      case "metadata":
        return (
          <div className="space-y-4">
            <MetadataForm
              categories={categories}
              defaultValues={{
                title: selectedFile?.name.replace(/\.[^/.]+$/, "") ?? "",
              }}
              onSubmit={handleMetadataSubmit}
              isSubmitting={isUploading}
            />
            <Button
              variant="outline"
              onClick={() => setStep("preview")}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back
            </Button>
          </div>
        );
      case "publish":
        return (
          <div className="space-y-6 text-center">
            {uploadMutation.isSuccess ? (
              <>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="h-8 w-8" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-foreground">
                    Image published successfully
                  </h3>
                  <p className="text-muted-foreground">
                    Your image is now live and discoverable by the community.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button href="/gallery" variant="outline" className="flex-1">
                    View gallery
                  </Button>
                  <Button onClick={handlePublishComplete} className="flex-1">
                    Upload another
                  </Button>
                </div>
              </>
            ) : (
              <>
                <UploadProgress
                  fileName={selectedFile?.name}
                  progress={uploadProgress}
                  status={isUploading ? "uploading" : uploadMutation.isError ? "failed" : "completed"}
                />
                {uploadMutation.isError && (
                  <p className="text-sm text-danger" role="alert">
                    {uploadMutation.error instanceof Error
                      ? uploadMutation.error.message
                      : "Upload failed. Please try again."}
                  </p>
                )}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep("metadata")}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                    Back
                  </Button>
                  {uploadMutation.isError && (
                    <Button
                      onClick={() => setStep("metadata")}
                      className="flex-1"
                    >
                      Retry
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <AuthHeader />
      <main>
        <SectionWrapper>
          <Container>
            <div className="mx-auto max-w-2xl">
              <SectionTitle
                eyebrow="Upload Image"
                title={STEP_TITLES[step]}
                description="Share your photography with the EthiopiaHub community."
              />
              <div className="mt-10">
                {renderStepContent()}
              </div>
            </div>
          </Container>
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
}
