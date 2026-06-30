"use client";

import { isOrderInvoiceAvailable } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { StoreOrder } from "@/types/store";
import OrderInvoiceDownloadButton from "@/components/store/OrderInvoiceDownloadButton";
import OrderReceiptDownloadButton from "@/components/store/OrderReceiptDownloadButton";

type OrderDownloadActionsProps = {
  order: StoreOrder;
  layout?: "list" | "detail";
  className?: string;
};

export default function OrderDownloadActions({
  order,
  layout = "detail",
  className,
}: OrderDownloadActionsProps) {
  const showReceipt = Boolean(order.is_paid && order.serial);
  const showInvoice = Boolean(isOrderInvoiceAvailable(order.status) && order.serial);

  if (!showReceipt && !showInvoice) return null;

  if (layout === "list") {
    return (
      <div className={cn("min-w-0 flex-1", className)}>
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
          Documents
        </p>
        <div className="flex flex-wrap gap-2">
          {showReceipt ? (
            <OrderReceiptDownloadButton order={order} layout="compact" />
          ) : null}
          {showInvoice ? (
            <OrderInvoiceDownloadButton order={order} layout="compact" />
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {showReceipt ? <OrderReceiptDownloadButton order={order} layout="detail" /> : null}
      {showInvoice ? <OrderInvoiceDownloadButton order={order} layout="detail" /> : null}
    </div>
  );
}
