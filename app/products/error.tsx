"use client";

import { Button } from "@/components/ui/button";

interface ProductsErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function ProductsError({ error, retry }: ProductsErrorProps) {
  return (
    <section className="max-w-xl py-16 sm:py-24" aria-live="assertive">
      <p className="text-xs font-bold tracking-widest text-accent">
        CATALOG UNAVAILABLE
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tighter text-ink sm:text-5xl">
        We could not load the collection.
      </h1>
      <p className="mt-5 leading-7 text-muted">
        Please check your connection and try again.
      </p>
      <Button className="mt-8" onClick={retry}>
        Try again
      </Button>
      {error.digest ? <p className="mt-5 text-sm text-muted">Reference: {error.digest}</p> : null}
    </section>
  );
}
