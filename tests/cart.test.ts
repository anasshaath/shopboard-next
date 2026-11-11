import { describe, expect, it } from "vitest";
import { addCartItem, changeCartItemQuantity } from "@/lib/cart";

describe("cart updates", () => {
  it("adds a new product with quantity 1", () => { expect(addCartItem([], 7)).toEqual([{ id: 7, qty: 1 }]); });
  it("increases the quantity when adding an existing product", () => { expect(addCartItem([{ id: 7, qty: 1 }], 7)).toEqual([{ id: 7, qty: 2 }]); });
  it("does not mutate the previous cart or its items when updating quantity", () => {
    const previous = [{ id: 7, qty: 1 }, { id: 8, qty: 2 }];
    const updated = changeCartItemQuantity(previous, 7, 1);
    expect(updated).toEqual([{ id: 7, qty: 2 }, { id: 8, qty: 2 }]);
    expect(updated).not.toBe(previous);
    expect(updated[0]).not.toBe(previous[0]);
    expect(previous).toEqual([{ id: 7, qty: 1 }, { id: 8, qty: 2 }]);
  });
});
