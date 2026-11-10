"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const storageKey = "shopboard-cart";

export interface CartItem {
  id: number;
  qty: number;
}

export interface CartValue {
  add: (id: number) => void;
  changeQuantity: (id: number, amount: number) => void;
  clear: () => void;
  hasHydrated: boolean;
  itemCount: number;
  items: CartItem[];
  remove: (id: number) => void;
}

const CartContext = createContext<CartValue | null>(null);

function loadCart(): CartItem[] {
  try {
    const value: unknown = JSON.parse(
      window.localStorage.getItem(storageKey) ?? "[]",
    );

    return Array.isArray(value)
      ? value.filter(
          (item): item is CartItem =>
            typeof item === "object" &&
            item !== null &&
            "id" in item &&
            "qty" in item &&
            typeof item.id === "number" &&
            Number.isSafeInteger(item.id) &&
            item.id > 0 &&
            typeof item.qty === "number" &&
            Number.isSafeInteger(item.qty) &&
            item.qty > 0,
        )
      : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setItems(loadCart());
      setHasHydrated(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // Storage can be unavailable or full; keep the in-memory cart usable.
    }
  }, [hasHydrated, items]);

  const value = useMemo<CartValue>(
    () => ({
      add: (id) =>
        setItems((current) =>
          current.some((item) => item.id === id)
            ? current.map((item) =>
                item.id === id ? { ...item, qty: item.qty + 1 } : item,
              )
            : [...current, { id, qty: 1 }],
        ),
      changeQuantity: (id, amount) =>
        setItems((current) =>
          current
            .map((item) =>
              item.id === id ? { ...item, qty: item.qty + amount } : item,
            )
            .filter((item) => item.qty > 0),
        ),
      clear: () => setItems([]),
      hasHydrated,
      itemCount: items.reduce((count, item) => count + item.qty, 0),
      items,
      remove: (id) =>
        setItems((current) => current.filter((item) => item.id !== id)),
    }),
    [hasHydrated, items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error("CartProvider is missing.");
  }

  return value;
}
