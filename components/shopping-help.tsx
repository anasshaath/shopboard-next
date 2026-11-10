"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export function ShoppingHelp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="secondary">
        Shopping help
      </Button>
      <Modal
        description="A quick guide to finding the right item."
        onOpenChange={setIsOpen}
        open={isOpen}
        size="sm"
        title="Shopping help"
      >
        <div className="space-y-4 text-sm leading-6 text-muted">
          <p>Search the collection by product name, such as tote or sneakers.</p>
          <p>
            Open a product to see its details and current availability before you
            decide.
          </p>
        </div>
      </Modal>
    </>
  );
}
