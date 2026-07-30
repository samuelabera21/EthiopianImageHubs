import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  "aria-label"?: string;
  title?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-card hover:-translate-y-0.5 hover:shadow-elevated",
  secondary:
    "bg-secondary text-secondary-foreground shadow-card hover:-translate-y-0.5 hover:shadow-elevated",
  ghost: "bg-transparent text-foreground hover:bg-muted",
  outline:
    "border border-border bg-surface text-foreground hover:bg-muted shadow-none",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10 p-0",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ariaLabel,
  "aria-label": ariaLabelAttr,
  title,
  disabled = false,
  isLoading = false,
  onClick,
}: ButtonProps) {
  const effectiveAriaLabel = ariaLabel || ariaLabelAttr;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    const linkClasses = cn(
      classes,
      disabled || isLoading ? "pointer-events-none opacity-40" : null,
    );

    return (
      <Link
        aria-disabled={disabled || isLoading}
        aria-label={effectiveAriaLabel}
        title={title}
        className={linkClasses}
        href={href}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      aria-busy={isLoading}
      aria-label={effectiveAriaLabel}
      title={title}
      className={classes}
      disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
