"use client";

interface BackendImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

export function BackendImage({ src, alt, className, fill, sizes, priority }: BackendImageProps) {
  const combinedClassName = fill
    ? "object-cover " + (className || "")
    : className;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={combinedClassName}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      sizes={sizes}
      src={src}
      style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%" } : undefined}
    />
  );
}
