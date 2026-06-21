import {
  CART_STORAGE_KEY,
  LEGACY_CART_STORAGE_KEY,
  type CartItem,
  type CartState,
} from "./types";

function isCartItem(value: unknown): value is CartItem {
  return (
    typeof value === "object" &&
    value !== null &&
    "productId" in value &&
    "quantity" in value &&
    typeof (value as CartItem).productId === "string" &&
    typeof (value as CartItem).quantity === "number"
  );
}

function parseCart(raw: string | null): CartState {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    if (parsed.every((item) => typeof item === "string")) {
      return parsed.map((productId) => ({
        productId,
        quantity: 1,
      }));
    }

    return parsed.filter(isCartItem).map((item) => ({
      productId: item.productId,
      quantity: Math.max(1, item.quantity),
    }));
  } catch {
    return [];
  }
}

export function readCartFromStorage(): CartState {
  if (typeof window === "undefined") {
    return [];
  }

  const current = parseCart(localStorage.getItem(CART_STORAGE_KEY));

  if (current.length > 0) {
    return current;
  }

  const legacy = parseCart(localStorage.getItem(LEGACY_CART_STORAGE_KEY));

  if (legacy.length > 0) {
    writeCartToStorage(legacy);
    localStorage.removeItem(LEGACY_CART_STORAGE_KEY);
  }

  return legacy;
}

export function writeCartToStorage(items: CartState): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function getCartItemCount(items: CartState): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartSubtotal(
  items: CartState,
  getPrice: (productId: string) => number | undefined
): number {
  return items.reduce((total, item) => {
    const price = getPrice(item.productId) ?? 0;
    return total + price * item.quantity;
  }, 0);
}

export function calculateShipping(subtotal: number): number {
  return subtotal >= 50 || subtotal === 0 ? 0 : 5.99;
}
