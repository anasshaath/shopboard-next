import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="max-w-xl py-16 sm:py-24">
      <p className="text-xs font-bold tracking-widest text-accent">404</p>
      <h1 className="mt-3 text-4xl font-black tracking-tighter text-ink sm:text-5xl">
        We could not find that page.
      </h1>
      <p className="mt-5 leading-7 text-muted">
        That product or address is not part of the ShopBoard collection.
      </p>
      <Link className={buttonVariants({ size: "lg", className: "mt-8" })} href="/products">
        Return to products
      </Link>
    </section>
  );
}
