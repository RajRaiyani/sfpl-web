import http from "@/services/http";
import type { ApiResponse, StoreDevice } from "@/types/store";

export async function listStoreDevices(params?: { offset?: number; limit?: number }) {
  return http.get<unknown, ApiResponse<StoreDevice[]>>("/storefront/devices", { params });
}

export async function getStoreDeviceBySlug(slug: string) {
  return http.get<unknown, ApiResponse<StoreDevice>>(`/storefront/devices/${slug}`);
}
