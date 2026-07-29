import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoVariant = "default" | "compact" | "icon";

interface LogoProps {
  href?: string;
  className?: string;
  variant?: LogoVariant;
}

export function Logo({ href = "/", className, variant = "default" }: LogoProps) {
  const isIconOnly = variant === "icon";
  const badgeSize = variant === "compact" ? "h-10 w-10" : "h-11 w-11";

  return (
    <Link className={cn("inline-flex items-center gap-3", className)} href={href} aria-label="EthiopiaHub Images home">
      <span className={cn("flex items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground shadow-card", badgeSize)}>
        EH
      </span>
      {!isIconOnly ? (
        <span className="text-left">
          <span className={cn("block font-semibold uppercase tracking-[0.24em] text-secondary", variant === "compact" ? "text-[0.65rem]" : "text-sm")}>
            EthiopiaHub
          </span>
          <span className={cn("block font-medium text-foreground", variant === "compact" ? "text-sm" : "text-base")}>
            Images
          </span>
        </span>
      ) : null}
    </Link>
  );
}