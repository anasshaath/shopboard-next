import Link from "next/link";
import { CartLink } from "@/components/cart/cart-link";

export function Navbar() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <Link className="rounded-sm text-xl font-extrabold tracking-tight text-ink transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus" href="/">
          ShopBoard
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-1">
          <Link className="rounded-sm px-2 py-2 text-sm font-semibold text-ink transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus" href="/products">
            Products
          </Link>
          <CartLink />
        </nav>
      </div>
    </header>
  );
}
