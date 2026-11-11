export type Category = "Bags" | "Shoes" | "Accessories";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  inStock: boolean;
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
