"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductById } from "@/lib/data/products";
import type { LocalizedProduct } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/config";
import {
  calculateShipping,
  getCartItemCount,
  getCartSubtotal,
  readCartFromStorage,
  writeCartToStorage,
} from "@/lib/cart/storage";
import type { CartItem, CartState } from "@/lib/cart/types";

type CartContextValue = {
  items: CartState;
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  isReady: boolean;
  addItem: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getProduct: (productId: string) => LocalizedProduct | undefined;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartProviderProps = {
  locale: Locale;
  children: ReactNode;
};

export function CartProvider({ locale, children }: CartProviderProps) {
  const [items, setItems] = useState<CartState>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setItems(readCartFromStorage());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    writeCartToStorage(items);
  }, [items, isReady]);

  const getProduct = useCallback(
    (productId: string) => getProductById(productId, locale),
    [locale]
  );

  const getPrice = useCallback(
    (productId: string) => getProduct(productId)?.price,
    [getProduct]
  );

  const addItem = useCallback((productId: string, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId);

      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...current, { productId, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) =>
        current.filter((item) => item.productId !== productId)
      );
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) =>
      current.filter((item) => item.productId !== productId)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const subtotal = useMemo(
    () => getCartSubtotal(items, getPrice),
    [items, getPrice]
  );
  const shipping = useMemo(() => calculateShipping(subtotal), [subtotal]);
  const total = subtotal + shipping;
  const itemCount = getCartItemCount(items);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      shipping,
      total,
      isReady,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      getProduct,
    }),
    [
      items,
      itemCount,
      subtotal,
      shipping,
      total,
      isReady,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      getProduct,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}

export type { CartItem };
