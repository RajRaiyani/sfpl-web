import { useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getCart, mergeGuestCart, updateCartItem } from "@/services/api/cart.api";
import {
  clearGuestCartId,
  getGuestCartId,
  hasUserSession,
} from "@/lib/auth-storage";

export const cartKeys = {
  all: ["cart"] as const,
};

/** Merge guest cart (if any) and refresh cart cache after login redirect. */
export async function syncCartAfterLogin(queryClient: QueryClient) {
  if (!hasUserSession()) return;

  const guestCartId = getGuestCartId();
  if (guestCartId) {
    try {
      await mergeGuestCart(guestCartId);
      clearGuestCartId();
    } catch {
      // Still refresh customer cart even if merge fails (e.g. expired guest cart).
    }
  }

  await queryClient.invalidateQueries({ queryKey: cartKeys.all });
  await queryClient.refetchQueries({ queryKey: cartKeys.all });
}

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

export function useMergeGuestCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const guestCartId = getGuestCartId();
      if (!guestCartId) return null;
      const result = await mergeGuestCart(guestCartId);
      clearGuestCartId();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
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

/** Merge guest cart into customer cart once after login (e.g. on /cart). */
export function useMergeGuestCartOnce() {
  const queryClient = useQueryClient();
  const hasAttemptedRef = useRef(false);

  useEffect(() => {
    if (hasAttemptedRef.current) return;
    if (!hasUserSession()) return;

    const guestCartId = getGuestCartId();
    if (!guestCartId) return;

    hasAttemptedRef.current = true;

    void mergeGuestCart(guestCartId)
      .then(() => {
        clearGuestCartId();
        return queryClient.invalidateQueries({ queryKey: cartKeys.all });
      })
      .catch(() => {
        hasAttemptedRef.current = false;
      });
  }, [queryClient]);
}
