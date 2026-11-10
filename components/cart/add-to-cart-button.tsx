"use client";

import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  inStock: boolean;
  productId: number;
}

export function AddToCartButton({
  inStock,
  productId,
}: AddToCartButtonProps) {
  const { add } = useCart();

  return (
    <Button
      disabled={!inStock}
      onClick={() => add(productId)}
      variant="secondary"
    >
      {inStock ? "Add to cart" : "Out of stock"}
    </Button>
  );
}
