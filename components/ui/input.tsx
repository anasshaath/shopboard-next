import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";

export type InputProps = ComponentPropsWithRef<"input">;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-control border border-line bg-panel px-3 py-2 font-sans text-base text-ink placeholder:text-muted transition-colors focus-visible:border-focus focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-2 aria-invalid:ring-danger",
        className,
      )}
      {...props}
    />
  );
}
