"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice, type Product } from "@/lib/product-types";

export function CheckoutPage({ products }: { products: Product[] }) {
  const { clear, hasHydrated, items } = useCart();
  const [complete, setComplete] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const productsById = new Map(products.map((product) => [product.id, product]));
  const unavailable = items.some((item) => {
    const product = productsById.get(item.id);
    return !product || !product.inStock;
  });
  const total = items.reduce((sum, item) => sum + (productsById.get(item.id)?.price ?? 0) * item.qty, 0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateCheckout(new FormData(event.currentTarget));
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
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
      <form className="mt-8 space-y-5" noValidate onSubmit={handleSubmit}>
        <Field error={errors.name} id="name" label="Name" minLength={2} />
        <Field error={errors.email} id="email" label="Email" type="email" />
        <Field error={errors.address} id="address" label="Address" minLength={5} />
        <Button type="submit">Place demo order</Button>
      </form>
    </section>
  );
}

function validateCheckout(formData: FormData): Record<string, string> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Enter a name with at least 2 characters.";
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email address.";
  if (address.length < 5) errors.address = "Enter an address with at least 5 characters.";
  return errors;
}

function Field({ error, id, label, ...props }: React.ComponentProps<typeof Input> & { error?: string; id: string; label: string }) {
  const errorId = `${id}-error`;
  return <div><label className="mb-2 block text-sm font-semibold text-ink" htmlFor={id}>{label}</label><Input aria-describedby={error ? errorId : undefined} aria-invalid={Boolean(error)} id={id} name={id} required {...props} />{error ? <p className="mt-2 text-sm text-danger" id={errorId} role="alert">{error}</p> : null}</div>;
}

function CheckoutStatus({ children, heading = "Checkout", message }: { children?: React.ReactNode; heading?: string; message: string }) {
  return <section className="max-w-xl py-12 sm:py-16" aria-live="polite"><h1 className="text-4xl font-black tracking-tighter text-ink sm:text-5xl">{heading}</h1><p className="mt-5 leading-7 text-muted">{message}</p>{children}</section>;
}
