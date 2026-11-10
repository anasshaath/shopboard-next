import { Suspense } from "react";
import { CartPage } from "@/components/cart/cart-page";
import { getProducts } from "@/lib/products";

export default function CartRoute() {
  return <Suspense fallback={<p className="py-12 text-muted">Loading your cart…</p>}><CartData /></Suspense>;
}

async function CartData() {
  return <CartPage products={await getProducts()} />;
}
