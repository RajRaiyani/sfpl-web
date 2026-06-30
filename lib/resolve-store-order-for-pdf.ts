import { getOrder } from "@/services/api/orders.api";
import type { StoreOrder } from "@/types/store";

export function orderHasPdfDetails(order: StoreOrder) {
  return Boolean(order.items?.length && order.billing_address);
}

export async function resolveStoreOrderForPdf(order: StoreOrder): Promise<StoreOrder> {
  if (orderHasPdfDetails(order)) return order;
  const { data } = await getOrder(order.id);
  return data;
}
