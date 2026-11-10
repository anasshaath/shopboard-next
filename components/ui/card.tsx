import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";

export type CardProps = ComponentPropsWithRef<"article">;
export type CardSectionProps = ComponentPropsWithRef<"div">;

export function Card({ className, ...props }: CardProps) {
  return (
    <article
      className={cn("rounded-card border border-line bg-panel shadow-sm", className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardSectionProps) {
  return <div className={cn("p-5 sm:p-6", className)} {...props} />;
}

export function CardContent({ className, ...props }: CardSectionProps) {
  return <div className={cn("px-5 pb-5 sm:px-6 sm:pb-6", className)} {...props} />;
}

export function CardFooter({ className, ...props }: CardSectionProps) {
  return <div className={cn("flex items-center px-5 pb-5 sm:px-6 sm:pb-6", className)} {...props} />;
}
