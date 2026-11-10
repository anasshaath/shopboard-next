"use client";

import {
  useEffect,
  useId,
  useRef,
  type ComponentPropsWithRef,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const modalVariants = cva(
  "m-auto w-11/12 overflow-hidden rounded-card border border-line bg-panel p-0 font-sans text-ink shadow-xl",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type NativeDialogProps = Omit<
  ComponentPropsWithRef<"dialog">,
  | "aria-describedby"
  | "aria-labelledby"
  | "children"
  | "onCancel"
  | "onClose"
  | "open"
  | "ref"
  | "title"
>;

export interface ModalProps
  extends NativeDialogProps,
    VariantProps<typeof modalVariants> {
  children: ReactNode;
  description?: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  title: string;
}

export function Modal({
  children,
  className,
  description,
  onOpenChange,
  open,
  size,
  title,
  ...props
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const isMountedRef = useRef(false);
  const controlledOpenRef = useRef(open);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    controlledOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;

    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;

      if (dialog?.open) {
        dialog.close();
      }
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    let frame: number | undefined;

    if (open && !dialog.open) {
      openerRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      dialog.showModal();
      frame = window.requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    } else if (!open && dialog.open) {
      dialog.close();
    }

    return () => {
      if (frame !== undefined) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [open]);

  function restoreOpenerFocus() {
    const opener = openerRef.current;
    openerRef.current = null;

    if (opener?.isConnected) {
      opener.focus();
    }
  }

  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    onOpenChange(false);
  }

  function handleClose(event: SyntheticEvent<HTMLDialogElement>) {
    if (!isMountedRef.current || event.currentTarget.open) {
      return;
    }

    if (controlledOpenRef.current) {
      onOpenChange(false);
    }

    restoreOpenerFocus();
  }

  return (
    <dialog
      aria-describedby={description ? descriptionId : undefined}
      aria-labelledby={titleId}
      className={cn(
        modalVariants({ size }),
        "max-h-dvh flex-col open:flex",
        className,
      )}
      onCancel={handleCancel}
      onClose={handleClose}
      ref={dialogRef}
      {...props}
    >
      <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <h2
            className="break-words text-xl font-semibold text-ink"
            id={titleId}
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-2 text-sm leading-6 text-muted" id={descriptionId}>
              {description}
            </p>
          ) : null}
        </div>
        <Button
          aria-label="Close dialog"
          onClick={() => onOpenChange(false)}
          ref={closeButtonRef}
          size="sm"
          variant="ghost"
        >
          Close
        </Button>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
        {children}
      </div>
    </dialog>
  );
}
