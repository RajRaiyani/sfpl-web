import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  getAccountDetails,
  getAddresses,
  listStates,
  upsertAccountDetails,
  upsertAddress,
} from "@/services/api/orders.api";
import type { StoreAccountDetails } from "@/types/store";

export const storeProfileKeys = {
  accountDetails: ["store-account-details"] as const,
  addresses: ["store-addresses"] as const,
  states: ["store-states"] as const,
};

export function useStoreStates() {
  return useQuery({
    queryKey: storeProfileKeys.states,
    queryFn: listStates,
  });
}

export function useStoreAccountDetails(enabled = true) {
  return useQuery({
    queryKey: storeProfileKeys.accountDetails,
    queryFn: getAccountDetails,
    enabled,
  });
}

export function useStoreAddresses(enabled = true) {
  return useQuery({
    queryKey: storeProfileKeys.addresses,
    queryFn: getAddresses,
    enabled,
  });
}

export function useUpsertStoreAccountDetails() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StoreAccountDetails) => upsertAccountDetails(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: storeProfileKeys.accountDetails });
      toast.success("Account details saved");
    },
    onError: (error: { message?: string }) => {
      toast.error(error?.message || "Failed to save account details");
    },
  });
}

export function useUpsertStoreAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      type,
      payload,
    }: {
      type: "billing" | "shipping";
      payload: {
        address: string;
        city: string;
        state_id: string;
        postal_code: string;
      };
    }) => upsertAddress(type, payload),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: storeProfileKeys.addresses });
      toast.success(
        variables.type === "billing" ? "Billing address saved" : "Shipping address saved",
      );
    },
    onError: (error: { message?: string }) => {
      toast.error(error?.message || "Failed to save address");
    },
  });
}
