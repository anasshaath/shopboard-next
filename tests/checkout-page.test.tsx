import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { CheckoutPage } from "@/components/checkout/checkout-page";
import { CartProvider } from "@/components/cart-provider";
import type { Product } from "@/lib/products";

const products: Product[] = [{ id: 1, name: "Leather Tote Bag", price: 89, category: "Bags", inStock: true }];

it("shows accessible validation errors and prevents submitting an invalid checkout", async () => {
  window.localStorage.setItem("shopboard-cart", JSON.stringify([{ id: 1, qty: 1 }]));
  const user = userEvent.setup();
  render(<CartProvider><CheckoutPage products={products} /></CartProvider>);
  await user.type(await screen.findByLabelText("Name"), "Ada Lovelace");
  await user.type(screen.getByLabelText("Address"), "12 Analytical Engine Way");
  await user.click(await screen.findByRole("button", { name: "Place demo order" }));
  expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email address.");
  expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  expect(screen.queryByRole("heading", { name: "Thank you" })).not.toBeInTheDocument();
});
