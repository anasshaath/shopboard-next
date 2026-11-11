import { ApiError, fetchJson } from "@/lib/api";
import { type Category, type Product } from "@/lib/product-types";

export { formatPrice, type Category, type Product } from "@/lib/product-types";
interface ApiProduct { id: number; title: string; category_name: string; price_cents: number; in_stock: boolean; }
interface ApiProductsResponse { items: ApiProduct[]; total: number; }

function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null; }
function decodeCategory(value: unknown): Category {
  if (value === "Bags" || value === "Shoes" || value === "Accessories") return value;
  throw new Error("The ShopBoard API returned an unsupported product category.");
}
function decodeApiProduct(value: unknown): ApiProduct {
  if (!isRecord(value)) throw new Error("The ShopBoard API returned an invalid product.");
  const { id, title, category_name, price_cents, in_stock } = value;
  if (typeof id !== "number" || !Number.isSafeInteger(id) || id <= 0) throw new Error("The ShopBoard API returned an invalid product ID.");
  if (typeof title !== "string" || !title.trim()) throw new Error("The ShopBoard API returned an invalid product title.");
  if (typeof price_cents !== "number" || !Number.isSafeInteger(price_cents) || price_cents < 0) throw new Error("The ShopBoard API returned an invalid product price.");
  if (typeof in_stock !== "boolean") throw new Error("The ShopBoard API returned an invalid stock status.");
  return { id, title, category_name: decodeCategory(category_name), price_cents, in_stock };
}
function decodeProductsResponse(value: unknown): ApiProductsResponse {
  if (!isRecord(value)) throw new Error("The ShopBoard API returned an invalid product catalog.");
  const { items, total } = value;
  if (!Array.isArray(items) || typeof total !== "number" || !Number.isSafeInteger(total)) throw new Error("The ShopBoard API returned an invalid product catalog.");
  return { items: items.map(decodeApiProduct), total };
}
function toProduct(product: ApiProduct): Product { return { id: product.id, name: product.title, category: decodeCategory(product.category_name), price: product.price_cents / 100, inStock: product.in_stock }; }
export function parseProductId(value: string): number | null { if (!/^[1-9]\d*$/.test(value)) return null; const id = Number(value); return Number.isSafeInteger(id) ? id : null; }
export async function getProducts(): Promise<Product[]> { return (await fetchJson("products", decodeProductsResponse)).items.map(toProduct); }
export async function getProduct(id: number): Promise<Product | null> { try { return toProduct(await fetchJson(`products/${id}`, decodeApiProduct)); } catch (error) { if (error instanceof ApiError && error.status === 404) return null; throw error; } }
