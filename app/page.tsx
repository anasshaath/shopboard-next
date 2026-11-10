import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-2xl">
        <p className="text-xs font-bold tracking-widest text-accent">
          THE SMALL THINGS, WELL CHOSEN
        </p>
        <h1 className="mt-4 text-5xl font-black tracking-tighter text-ink sm:text-6xl lg:text-7xl">
          ShopBoard
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
          Useful goods for a well-lived day, picked for their everyday utility and enduring good looks.
        </p>
        <Link className={buttonVariants({ size: "lg", className: "mt-8" })} href="/products">
          Browse the collection
        </Link>
      </div>
    </section>
  );
}
