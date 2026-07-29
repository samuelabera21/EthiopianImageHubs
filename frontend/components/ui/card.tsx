import { cn } from "@/lib/cn";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "article" | "section";
}

export function Card({ as: Component = "div", className, children, ...props }: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-[var(--radius-card)] border border-border bg-surface shadow-card",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}