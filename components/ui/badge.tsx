import type { ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded-badge px-2.5 py-1 font-sans text-xs font-bold tracking-wider",
  {
    variants: {
      variant: {
        category: "bg-accent-soft text-accent",
        available: "bg-positive-soft text-positive",
        unavailable: "bg-danger-soft text-danger",
      },
    },
    defaultVariants: { variant: "category" },
  },
);

export interface BadgeProps
  extends ComponentPropsWithRef<"span">,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
