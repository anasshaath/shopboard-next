import { Suspense } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { ShoppingHelp } from "@/components/shopping-help";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProducts, type Category } from "@/lib/products";

type ProductsPageProps = PageProps<"/products">;
const categories: Category[] = ["Bags", "Shoes", "Accessories"];

function getQuery(value: string | string[] | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

function getCategory(value: string | string[] | undefined) {
  return typeof value === "string" && categories.includes(value as Category)
    ? (value as Category)
    : "all";
}

async function ProductCatalog({ searchParams }: Pick<ProductsPageProps, "searchParams">) {
  const params = await searchParams;
  const query = getQuery(params.q);
  const category = getCategory(params.category);
  const products = await getProducts();
  const shownProducts = products.filter(
    (product) =>
      (category === "all" || product.category === category) &&
      product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );

  return (
    <>
      <form action="/products" className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="product-search">Search products</label>
          <Input defaultValue={query} id="product-search" name="q" placeholder="Try tote or sneakers" type="search" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="product-category">Category</label>
          <select className="w-full rounded-control border border-line bg-panel px-3 py-2 font-sans text-base text-ink transition-colors focus-visible:border-focus focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus" defaultValue={category} id="product-category" name="category">
            <option value="all">All categories</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <div className="flex items-end gap-3"><Button type="submit">Apply</Button><Link className={buttonVariants({ variant: "ghost" })} href="/products">Clear</Link></div>
      </form>
      {products.length === 0 ? <p className="mt-10 rounded-card border border-line bg-panel p-6 text-muted">No products are available right now.</p> : null}
      {products.length > 0 && shownProducts.length === 0 ? <p className="mt-10 rounded-card border border-line bg-panel p-6 text-muted">No products match these filters. <Link className="font-semibold text-accent underline underline-offset-4" href="/products">Clear filters</Link></p> : null}
      {shownProducts.length > 0 ? <ul className="mt-10 grid grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">{shownProducts.map((product) => <li key={product.id} className="min-w-0"><ProductCard product={product} /></li>)}</ul> : null}
    </>
  );
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <section className="py-12 sm:py-16">
      <p className="text-xs font-bold tracking-widest text-accent">SHOPBOARD COLLECTION</p>
      <h1 className="mt-3 text-4xl font-black tracking-tighter text-ink sm:text-5xl">The collection</h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted">A concise collection of useful things for carrying, walking, and getting through the day well.</p>
      <div className="mt-6"><ShoppingHelp /></div>
      <Suspense fallback={<p className="mt-10 text-muted">Filtering the collection…</p>}><ProductCatalog searchParams={searchParams} /></Suspense>
    </section>
  );
}
