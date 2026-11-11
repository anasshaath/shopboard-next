export interface CartItem {
  id: number;
  qty: number;
}

export function addCartItem(items: CartItem[], id: number): CartItem[] {
  const existingItem = items.find((item) => item.id === id);

  if (!existingItem) return [...items, { id, qty: 1 }];

  return items.map((item) =>
    item.id === id ? { ...item, qty: item.qty + 1 } : item,
  );
}

export function changeCartItemQuantity(items: CartItem[], id: number, amount: number): CartItem[] {
  return items.map((item) => item.id === id ? { ...item, qty: item.qty + amount } : item).filter((item) => item.qty > 0);
}
