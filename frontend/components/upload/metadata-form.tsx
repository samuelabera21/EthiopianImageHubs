"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { IMAGE_VISIBILITY_OPTIONS } from "@/constants/image";

const metadataFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be at most 200 characters"),
  description: z
    .string()
    .trim()
    .max(5000, "Description must be at most 5000 characters")
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .trim()
    .max(200, "Location must be at most 200 characters")
    .optional()
    .or(z.literal("")),
  categoryId: z.string().uuid("Please select a valid category"),
  visibility: z.enum(["PUBLIC", "PRIVATE", "UNLISTED"]),
  tagIds: z.array(z.string().uuid()).optional(),
});

export type MetadataFormValues = z.infer<typeof metadataFormSchema>;

interface MetadataFormProps {
  onSubmit: (values: MetadataFormValues) => void;
  defaultValues?: Partial<MetadataFormValues>;
  categories: { id: string; name: string }[];
  isSubmitting?: boolean;
  className?: string;
}

export function MetadataForm({
  onSubmit,
  defaultValues,
  categories,
  isSubmitting = false,
  className,
}: MetadataFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MetadataFormValues>({
    resolver: zodResolver(metadataFormSchema),
    mode: "onChange",
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      location: defaultValues?.location ?? "",
      categoryId: defaultValues?.categoryId ?? "",
      visibility: defaultValues?.visibility ?? "PUBLIC",
      tagIds: defaultValues?.tagIds ?? [],
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-6", className)}
      noValidate
    >
      <Input
        label="Title"
        error={errors.title?.message}
        {...register("title")}
      />

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-foreground">
          Description
        </label>
        <textarea
          aria-describedby={errors.description ? "description-error" : undefined}
          aria-invalid={Boolean(errors.description)}
          className={cn(
            "h-32 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20",
            errors.description && "border-danger focus:border-danger focus:ring-danger/20",
          )}
          id="description"
          maxLength={5000}
          placeholder="Describe your image..."
          {...register("description")}
        />
        {errors.description && (
          <p id="description-error" className="text-sm font-medium text-danger" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      <Input
        label="Location"
        error={errors.location?.message}
        placeholder="e.g. Addis Ababa, Ethiopia"
        {...register("location")}
      />

      <div className="space-y-2">
        <label htmlFor="categoryId" className="text-sm font-medium text-foreground">
          Category
        </label>
        <select
          aria-describedby={errors.categoryId ? "categoryId-error" : undefined}
          aria-invalid={Boolean(errors.categoryId)}
          className={cn(
            "h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm text-foreground shadow-sm transition-colors focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20",
            errors.categoryId && "border-danger focus:border-danger focus:ring-danger/20",
          )}
          id="categoryId"
          {...register("categoryId")}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p id="categoryId-error" className="text-sm font-medium text-danger" role="alert">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="visibility" className="text-sm font-medium text-foreground">
          Visibility
        </label>
        <select
          className="h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm text-foreground shadow-sm transition-colors focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20"
          id="visibility"
          {...register("visibility")}
        >
          {IMAGE_VISIBILITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <Button disabled={!isValid || isSubmitting} isLoading={isSubmitting} type="submit" className="w-full">
        Continue
      </Button>
    </form>
  );
}
