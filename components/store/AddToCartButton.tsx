"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { updateCartItem } from "@/services/api/cart.api";
import { useInvalidateCart } from "@/hooks/use-cart";

type AddToCartButtonProps = {
  deviceId: string;
  deviceName: string;
  quantity?: number;
  disabled?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
};

export function AddToCartButton({
  deviceId,
  deviceName,
  quantity = 1,
  disabled = false,
  size = "sm",
  className,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const invalidateCart = useInvalidateCart();

  async function handleAddToCart(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (isLoading || disabled) return;

    setIsLoading(true);
    try {
      await updateCartItem(deviceId, quantity);
      invalidateCart();
      toast.success(`Added ${deviceName} to cart`);
    } catch (error: { message?: string }) {
      toast.error(error?.message || "Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      type="button"
      size={size}
      className={className ?? "bg-red-600 hover:bg-red-700"}
      disabled={disabled || isLoading}
      onClick={(event) => void handleAddToCart(event)}
      aria-label={`Add ${deviceName} to cart`}
    >
      {isLoading ? (
        "Adding…"
      ) : (
        <>
          <ShoppingCart className="mr-1 h-4 w-4" />
          Add to cart
        </>
      )}
    </Button>
  );
}
