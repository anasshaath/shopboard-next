import { expect, test } from "@playwright/test";

test("places a demo order from the Leather Tote Bag product page", async ({ page }) => {
  await page.addInitScript(() => window.localStorage.clear());
  await page.goto("/products");
  await page.getByRole("link", { name: "Leather Tote Bag", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Leather Tote Bag" })).toBeVisible();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.getByRole("link", { name: "Cart (1)" }).click();
  await expect(page.getByRole("heading", { name: "Your cart" })).toBeVisible();
  await page.getByRole("link", { name: "Checkout" }).click();
  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByLabel("Address").fill("12 Analytical Engine Way");
  await page.getByRole("button", { name: "Place demo order" }).click();
  await expect(page.getByRole("heading", { name: "Thank you" })).toBeVisible();
  await expect(page.getByText("Your demo order was accepted locally.")).toBeVisible();
});
