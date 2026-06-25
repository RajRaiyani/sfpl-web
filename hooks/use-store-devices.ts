import { useQuery } from "@tanstack/react-query";
import { getStoreDeviceBySlug, listStoreDevices } from "@/services/api/store-devices.api";

export const storeDeviceKeys = {
  all: ["store-devices"] as const,
  lists: () => [...storeDeviceKeys.all, "list"] as const,
  list: (params?: { offset?: number; limit?: number }) =>
    [...storeDeviceKeys.lists(), params ?? {}] as const,
  detail: (slug: string) => [...storeDeviceKeys.all, "detail", slug] as const,
};

export function useStoreDevices(params?: { offset?: number; limit?: number }) {
  return useQuery({
    queryKey: storeDeviceKeys.list(params),
    queryFn: () => listStoreDevices(params),
    retry: 1,
  });
}

export function useStoreDevice(slug: string) {
  return useQuery({
    queryKey: storeDeviceKeys.detail(slug),
    queryFn: () => getStoreDeviceBySlug(slug),
    enabled: Boolean(slug),
  });
}
