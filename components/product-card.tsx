import Link from "next/link";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";

interface ProductCardProps { product: Product; }

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex h-full min-w-0 flex-col">
      <CardHeader>
        <Badge variant="category">{product.category}</Badge>
        <h2 className="mt-3 break-words text-2xl font-bold tracking-tight text-ink">
          <Link
            className="rounded-control transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            href={`/products/${product.id}`}
          >
            {product.name}
          </Link>
        </h2>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold text-ink">{formatPrice(product.price)}</p>
        <p className="mt-3">
          <Badge variant={product.inStock ? "available" : "unavailable"}>
            {product.inStock ? "In stock" : "Out of stock"}
          </Badge>
        </p>
      </CardContent>
      <CardFooter className="mt-auto grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          href={`/products/${product.id}`}
        >
          View product
        </Link>
        <AddToCartButton inStock={product.inStock} productId={product.id} />
      </CardFooter>
    </Card>
  );
}
