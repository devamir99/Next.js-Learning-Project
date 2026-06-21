"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type AddToCartButtonProps = {
  productId: string;
  disabled?: boolean;
  addLabel: string;
  addedLabel: string;
};

export function AddToCartButton({
  productId,
  disabled = false,
  addLabel,
  addedLabel,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  function handleClick() {
    if (disabled) return;

    const existing = JSON.parse(localStorage.getItem("nova-cart") ?? "[]") as string[];
    if (!existing.includes(productId)) {
      localStorage.setItem("nova-cart", JSON.stringify([...existing, productId]));
    }

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
