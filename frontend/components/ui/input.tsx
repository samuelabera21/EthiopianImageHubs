import { forwardRef } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    helperText,
    error,
    leftElement,
    rightElement,
    id,
    className,
    ...props
  },
  ref,
) {
  const inputId = id ?? props.name;
  const helperId = inputId ? `${inputId}-helper` : undefined;
  const errorId = inputId ? `${inputId}-error` : undefined;
  const describedBy = [error ? errorId : null, helperText ? helperId : null]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <label className="block space-y-2" htmlFor={inputId}>
      {label && <span className="text-sm font-medium text-foreground">{label}</span>}
      <div className="relative">
        {leftElement ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground">
            {leftElement}
          </div>
        ) : null}
        <input
          ref={ref}
          aria-describedby={describedBy}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20",
            leftElement ? "pl-11" : null,
            rightElement ? "pr-16" : null,
            error ? "border-danger focus:border-danger focus:ring-danger/20" : null,
            className,
          )}
          id={inputId}
          {...props}
        />
        {rightElement ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {rightElement}
          </div>
        ) : null}
      </div>
      {helperText ? (
        <p id={helperId} className="text-sm leading-6 text-muted-foreground">
          {helperText}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm font-medium text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </label>
  );
});

Input.displayName = "Input";