import { Suspense } from "react";
import Link from "next/link";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { formatPrice, getProduct, parseProductId } from "@/lib/products";

export default function ProductPage(props: PageProps<"/products/[id]">) {
  return <Suspense fallback={<p className="py-12 text-muted">Loading product…</p>}><ProductData params={props.params} /></Suspense>;
}

async function ProductData({ params }: Pick<PageProps<"/products/[id]">, "params">) {
  const { id: rawId } = await params;
  const id = parseProductId(rawId);

  if (id === null) {
    notFound();
  }

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <article className="max-w-2xl py-12 sm:py-16">
      <Link className={buttonVariants({ variant: "ghost", size: "sm" })} href="/products">
        ← Products
      </Link>
      <div className="mt-10">
        <Badge variant="category">{product.category}</Badge>
      </div>
      <h1 className="mt-4 break-words text-4xl font-black tracking-tighter text-ink sm:text-6xl">
        {product.name}
      </h1>
      <p className="mt-6 text-2xl font-bold text-ink">
        {formatPrice(product.price)}
      </p>
      <div className="mt-4">
        <Badge variant={product.inStock ? "available" : "unavailable"}>
          {product.inStock ? "In stock" : "Out of stock"}
        </Badge>
      </div>
      <p className="mt-5 leading-7 text-muted">
        {product.inStock
          ? "In stock and ready for the everyday."
          : "Currently out of stock. Please check back soon."}
      </p>
      <div className="mt-8">
        <AddToCartButton inStock={product.inStock} productId={product.id} />
      </div>
    </article>
  );
}
