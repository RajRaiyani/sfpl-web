import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getCart, updateCartItem } from "@/services/api/cart.api";

export const cartKeys = {
  all: ["cart"] as const,
};

export function useCart() {
  return useQuery({
    queryKey: cartKeys.all,
    queryFn: async () => {
      const response = await getCart();
      return response.data;
    },
    retry: 1,
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ deviceId, quantity }: { deviceId: string; quantity: number }) =>
      updateCartItem(deviceId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
    onError: (error: { message?: string }) => {
      toast.error(error?.message || "Failed to update cart");
    },
  });
}

export function getCartItemCount(items: { quantity: number }[] = []) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartHasOutOfStockItems(items: { in_stock?: boolean }[] = []) {
  return items.some((item) => !item.in_stock);
}

export function useCartItemCount() {
  const { data } = useCart();
  return getCartItemCount(data?.items);
}

export function useInvalidateCart() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: cartKeys.all });
}
