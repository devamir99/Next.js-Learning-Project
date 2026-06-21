import type { ReactElement } from "react";
import type { QuickAccessIcon } from "@/lib/data/types";

type QuickAccessIconProps = {
  icon: QuickAccessIcon;
  className?: string;
};

export function QuickAccessIconSvg({ icon, className = "h-6 w-6" }: QuickAccessIconProps) {
  const paths: Record<QuickAccessIcon, ReactElement> = {
    shop: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7h18l-2 12H5L3 7Zm3-3h12l1 3H5l1-3Z"
      />
    ),
    sale: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 14l6-6M9.5 8.5h.01M14.5 13.5h.01M7 3l3 3-3 3 3 3-3 3 3 3"
      />
    ),
    fashion: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 7h10l-1 14H8L7 7Zm5-4 3 4M12 3 9 7"
      />
    ),
    mobile: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 3h6v18H9V3Zm3 15h.01"
      />
    ),
    blog: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 4h12v16H6V4Zm3 4h6M9 12h6M9 16h4"
      />
    ),
    cart: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7h2l2 10h10l2-7H7M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      />
    ),
    beauty: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3c2 3 4 5 4 8a4 4 0 0 1-8 0c0-3 2-5 4-8Z"
      />
    ),
    sports: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-4 9h8M12 7v10"
      />
    ),
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      {paths[icon]}
    </svg>
  );
}
