import { cn } from "@/lib/cn";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  tone?: "default" | "muted";
}

export function SectionWrapper({
  children,
  id,
  className,
  tone = "default",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        tone === "muted" ? "bg-surface-raised/80" : "bg-transparent",
        "py-16 sm:py-20 lg:py-24",
        className,
      )}
    >
      {children}
    </section>
  );
}
