export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartState = CartItem[];

export const CART_STORAGE_KEY = "nova-cart-v2";
export const LEGACY_CART_STORAGE_KEY = "nova-cart";

export const FREE_SHIPPING_THRESHOLD = 50;
export const SHIPPING_FEE = 5.99;
