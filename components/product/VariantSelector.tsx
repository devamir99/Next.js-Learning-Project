"use client";

import { useState } from "react";

type VariantSelectorProps = {
  colorLabel: string;
  sizeLabel: string;
  colors: string[];
  sizes: string[];
};

export function VariantSelector({
  colorLabel,
  sizeLabel,
  colors,
  sizes,
}: VariantSelectorProps) {
  const [color, setColor] = useState(colors[0]);
  const [size, setSize] = useState(sizes[0]);

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">{colorLabel}</p>
        <div className="flex flex-wrap gap-2">
          {colors.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setColor(item)}
              className={`rounded-lg border px-3 py-1.5 text-sm capitalize transition-colors ${color === item ? "border-primary bg-accent-soft text-primary" : "border-border text-muted-foreground"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">{sizeLabel}</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSize(item)}
              className={`rounded-lg border px-3 py-1.5 text-sm uppercase transition-colors ${size === item ? "border-primary bg-accent-soft text-primary" : "border-border text-muted-foreground"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
