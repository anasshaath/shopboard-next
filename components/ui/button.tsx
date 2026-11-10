import type { ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-control font-sans text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-action text-action-foreground hover:bg-action-hover",
        secondary: "border border-line bg-panel text-ink hover:bg-accent-soft",
        ghost: "text-ink hover:bg-accent-soft",
      },
      size: {
        sm: "px-3 py-1.5",
        md: "px-4 py-2",
        lg: "px-5 py-3",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends ComponentPropsWithRef<"button">,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      type={type}
      {...props}
    />
  );
}
