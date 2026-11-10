"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice, type Product } from "@/lib/products";

export function CheckoutPage({ products }: { products: Product[] }) {
  const { clear, hasHydrated, items } = useCart();
  const [complete, setComplete] = useState(false);
  const productsById = new Map(products.map((product) => [product.id, product]));
  const unavailable = items.some((item) => {
    const product = productsById.get(item.id);
    return !product || !product.inStock;
  });
  const total = items.reduce((sum, item) => sum + (productsById.get(item.id)?.price ?? 0) * item.qty, 0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clear();
    setComplete(true);
  }

  if (!hasHydrated) return <CheckoutStatus message="Loading your saved cart…" />;
  if (complete) return <CheckoutStatus heading="Thank you" message="Your demo order was accepted locally. No payment was taken and no order was sent to a server."><Link className={buttonVariants({ size: "lg", className: "mt-8" })} href="/products">Continue shopping</Link></CheckoutStatus>;
  if (items.length === 0 || unavailable) return <CheckoutStatus message={unavailable ? "Remove unavailable items before checkout." : "Your cart is empty."}><Link className={buttonVariants({ size: "lg", className: "mt-8" })} href="/cart">Return to cart</Link></CheckoutStatus>;

  return (
    <section className="max-w-xl py-12 sm:py-16">
      <h1 className="text-4xl font-black tracking-tighter text-ink sm:text-5xl">Checkout</h1>
      <p className="mt-5 leading-7 text-muted">Demo only — no payment or order is sent to a server. Total: {formatPrice(total)}.</p>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <Field id="name" label="Name" minLength={2} />
        <Field id="email" label="Email" type="email" />
        <Field id="address" label="Address" minLength={5} />
        <Button type="submit">Place demo order</Button>
      </form>
    </section>
  );
}

function Field({ id, label, ...props }: React.ComponentProps<typeof Input> & { id: string; label: string }) {
  return <div><label className="mb-2 block text-sm font-semibold text-ink" htmlFor={id}>{label}</label><Input id={id} name={id} required {...props} /></div>;
}

function CheckoutStatus({ children, heading = "Checkout", message }: { children?: React.ReactNode; heading?: string; message: string }) {
  return <section className="max-w-xl py-12 sm:py-16" aria-live="polite"><h1 className="text-4xl font-black tracking-tighter text-ink sm:text-5xl">{heading}</h1><p className="mt-5 leading-7 text-muted">{message}</p>{children}</section>;
}
