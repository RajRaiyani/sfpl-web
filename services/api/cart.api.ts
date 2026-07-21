import http from "@/services/http";
import { persistGuestCartIdFromResponse, setGuestCartId } from "@/lib/auth-storage";
import type { ApiResponse, CartResponse } from "@/types/store";

export async function getCart() {
  const response = await http.get<unknown, ApiResponse<CartResponse>>("/storefront/cart");
  persistGuestCartIdFromResponse(response);
  return response;
}

export async function updateCartItem(deviceId: string, quantity: number) {
  const response = await http.put<unknown, ApiResponse<{ device_id: string; quantity: number; guest_cart_id?: string }>>(
    `/storefront/cart/${deviceId}`,
    { quantity },
  );

  if (response.data?.guest_cart_id) {
    setGuestCartId(response.data.guest_cart_id);
  } else {
    persistGuestCartIdFromResponse(response);
  }

  return response;
}