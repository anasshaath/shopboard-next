"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export function CartLink() {
  const { itemCount } = useCart();

  return (
    <Link
      className="rounded-sm px-2 py-2 text-sm font-semibold text-ink transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
      href="/cart"
    >
      Cart ({itemCount})
    </Link>
  );
}
