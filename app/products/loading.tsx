import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProductsLoading() {
  return (
    <section className="py-12 sm:py-16" aria-busy="true" aria-live="polite">
      <p className="sr-only">Loading products…</p>
      <div className="h-3 w-40 animate-pulse rounded-control bg-line" />
      <div className="mt-4 h-12 max-w-md animate-pulse rounded-control bg-line" />
      <div className="mt-5 h-6 max-w-2xl animate-pulse rounded-control bg-accent-soft" />
      <ul className="mt-10 grid grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <li key={index}>
            <Card className="h-64 animate-pulse">
              <CardHeader>
                <div className="h-3 w-20 rounded-badge bg-line" />
                <div className="mt-5 h-8 w-3/4 rounded-control bg-line" />
              </CardHeader>
              <CardContent>
                <div className="h-6 w-1/3 rounded-control bg-line" />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
