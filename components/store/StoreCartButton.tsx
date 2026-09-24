"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartItemCount } from "@/hooks/use-cart";

export default function StoreCartButton() {
  const count = useCartItemCount();

  return (
    <Link
      href="/cart"
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-50"
      aria-label={count > 0 ? `Cart, ${count} items` : "Cart"}
    >
      <ShoppingCart className="h-4 w-4" aria-hidden />
      {count > 0 ? (
        <span
          className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white"
          aria-hidden
        >          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
}
