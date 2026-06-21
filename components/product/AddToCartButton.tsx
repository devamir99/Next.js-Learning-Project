"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";

type AddToCartButtonProps = {
  productId: string;
  quantity?: number;
  disabled?: boolean;
  addLabel: string;
  addedLabel: string;
};

export function AddToCartButton({
  productId,
  quantity = 1,
  disabled = false,
  addLabel,
  addedLabel,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    if (disabled) return;

    addItem(productId, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <Button
      type="button"
      size="lg"
      disabled={disabled}
      onClick={handleClick}
      className="w-full sm:w-auto"
    >
      {added ? addedLabel : addLabel}
    </Button>
  );
}
