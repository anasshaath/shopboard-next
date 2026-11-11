"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatPrice, type Product } from "@/lib/product-types";

export function CartPage({ products }: { products: Product[] }) {
  const { changeQuantity, hasHydrated, items, remove } = useCart();
  const productsById = new Map(products.map((product) => [product.id, product]));
  const resolved = items.map((item) => ({ item, product: productsById.get(item.id) }));
  const unavailable = resolved.filter(({ product }) => !product || !product.inStock);
  const total = resolved.reduce(
    (sum, { item, product }) => sum + (product?.price ?? 0) * item.qty,
    0,
  );

  if (!hasHydrated) {
    return <CartStatus message="Loading your saved cart…" />;
  }

  if (items.length === 0) {
    return (
      <CartStatus message="Your cart is empty.">
        <Link className={buttonVariants({ size: "lg", className: "mt-8" })} href="/products">
          Browse products
        </Link>
      </CartStatus>
    );
  }

  return (
    <section className="max-w-3xl py-12 sm:py-16">
      <h1 className="text-4xl font-black tracking-tighter text-ink sm:text-5xl">Your cart</h1>
      {unavailable.length > 0 ? (
        <p className="mt-5 rounded-card border border-danger bg-danger-soft p-4 text-danger">
          Some saved items are unavailable. Remove them before checkout.
        </p>
      ) : null}
      <ul className="mt-8 space-y-4 p-0">
        {resolved.map(({ item, product }) => (
          <li key={item.id}>
            <Card>
              <CardContent className="pt-5 sm:pt-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-ink">
                      {product?.name ?? `Saved product #${item.id}`}
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      {product ? `${formatPrice(product.price)} × ${item.qty}` : `Quantity: ${item.qty}`}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button aria-label={`Decrease quantity for ${product?.name ?? `product ${item.id}`}`} onClick={() => changeQuantity(item.id, -1)} size="sm" variant="secondary">−</Button>
                    <span className="min-w-8 text-center font-semibold text-ink">{item.qty}</span>
                    <Button aria-label={`Increase quantity for ${product?.name ?? `product ${item.id}`}`} onClick={() => changeQuantity(item.id, 1)} size="sm" variant="secondary">+</Button>
                    <Button onClick={() => remove(item.id)} size="sm" variant="ghost">Remove</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xl font-bold text-ink">Total: {formatPrice(total)}</p>
      <Link className={cn(buttonVariants({ size: "lg" }), "mt-6")} href="/checkout">Checkout</Link>
    </section>
  );
}

function CartStatus({ children, message }: { children?: React.ReactNode; message: string }) {
  return (
    <section className="max-w-xl py-12 sm:py-16" aria-live="polite">
      <h1 className="text-4xl font-black tracking-tighter text-ink sm:text-5xl">Your cart</h1>
      <p className="mt-5 leading-7 text-muted">{message}</p>
      {children}
    </section>
  );
}
