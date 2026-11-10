import { Suspense } from "react";
import { CheckoutPage } from "@/components/checkout/checkout-page";
import { getProducts } from "@/lib/products";

export default function CheckoutRoute() {
  return <Suspense fallback={<p className="py-12 text-muted">Loading checkout…</p>}><CheckoutData /></Suspense>;
}

async function CheckoutData() {
  return <CheckoutPage products={await getProducts()} />;
}
