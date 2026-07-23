import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  createOrder,
  getOrder,
  getOrderInvoice,
  listOrders,
  verifyOrder,
  type CreateOrderPayload,
} from "@/services/api/orders.api";
import { cartKeys } from "@/hooks/use-cart";

export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  list: (params?: { offset?: number; limit?: number }) =>
    [...orderKeys.lists(), params ?? {}] as const,
  detail: (orderId: string) => [...orderKeys.all, "detail", orderId] as const,
  invoice: (orderId: string) => [...orderKeys.all, "invoice", orderId] as const,
};

export function useOrders(params?: { offset?: number; limit?: number }) {
  return useQuery({
    queryKey: orderKeys.list(params),
    queryFn: () => listOrders(params),
  });
}

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: orderKeys.detail(orderId),
    queryFn: () => getOrder(orderId),
    enabled: Boolean(orderId),
  });
}

export function useOrderInvoice(orderId: string, enabled = true) {
  return useQuery({
    queryKey: orderKeys.invoice(orderId),
    queryFn: () => getOrderInvoice(orderId),
    enabled: Boolean(orderId) && enabled,
  });
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload),
    onError: (error: { message?: string }) => {
      toast.error(error?.message || "Failed to create order");
    },
  });
}

export function useVerifyOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
    onError: (error: { message?: string }) => {
      toast.error(error?.message || "Payment verification failed");
    },
  });
}
