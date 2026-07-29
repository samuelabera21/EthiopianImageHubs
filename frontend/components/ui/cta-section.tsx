import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface CTASectionProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  className?: string;
}

export function CTASection({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "rounded-[calc(var(--radius-card)+0.5rem)] border border-border bg-[linear-gradient(135deg,rgba(46,139,87,0.12),rgba(248,231,212,0.8))] p-6 shadow-elevated sm:p-8 lg:p-10",
        className,
      )}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_auto] lg:items-center">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="max-w-2xl text-base leading-7 text-foreground/80 sm:text-lg">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Button href={primaryHref} size="lg">
            {primaryLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button href={secondaryHref} size="lg" variant="outline">
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
