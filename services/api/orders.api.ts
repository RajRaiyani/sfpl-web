import http from "@/services/http";
import type {
  ApiResponse,
  StoreAccountDetails,
  StoreAddress,
  StoreInvoice,
  StoreOrder,
  StoreState,
} from "@/types/store";

export type CreateOrderPayload = {
  full_name: string;
  phone_number: string;
  organization_name?: string;
  gst_number?: string;
  pan_number?: string;
  shipping_address: string;
  shipping_state_id: string;
  shipping_city: string;
  shipping_postal_code: string;
  billing_address: string;
  billing_state_id: string;
  billing_city: string;
  billing_postal_code: string;
};

export async function listStates() {
  return http.get<unknown, ApiResponse<StoreState[]>>("/storefront/states");
}

export async function getAddresses() {
  return http.get<unknown, ApiResponse<StoreAddress[]>>("/storefront/addresses");
}

export async function getAccountDetails() {
  return http.get<unknown, ApiResponse<StoreAccountDetails>>("/storefront/account-details");
}

export async function upsertAccountDetails(payload: StoreAccountDetails) {
  return http.put<unknown, ApiResponse<StoreAccountDetails>>("/storefront/account-details", payload);
}

export async function upsertAddress(
  type: "billing" | "shipping",
  payload: {
    address: string;
    city: string;
    state_id: string;
    postal_code: string;
  },
) {
  return http.put<unknown, ApiResponse<StoreAddress>>(`/storefront/addresses/${type}`, payload);
}

export async function createOrder(payload: CreateOrderPayload) {
  return http.post<
    unknown,
    ApiResponse<{
      order: StoreOrder;
      payment: { id: string; amount: number; currency: string } | null;
      razorpay_key_id: string | null;
    }>
  >("/storefront/orders", payload);
}

export async function verifyOrder(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature?: string;
}) {
  return http.post<unknown, ApiResponse<StoreOrder>>("/storefront/orders/verify", payload);
}

export async function listOrders(params?: { offset?: number; limit?: number }) {
  return http.get<unknown, ApiResponse<StoreOrder[]>>("/storefront/orders", { params });
}

export async function getOrder(orderId: string) {
  return http.get<unknown, ApiResponse<StoreOrder>>(`/storefront/orders/${orderId}`);
}

export async function getOrderInvoice(orderId: string) {
  return http.get<unknown, ApiResponse<StoreInvoice>>(
    `/storefront/orders/${orderId}/invoice`,
  );
}
