"use client";

import { useCallback, useState } from "react";
import { Download, FileText, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getOrderInvoice } from "@/services/api/orders.api";
import type { StoreOrder } from "@/types/store";
import {
  generateOrderInvoicePdf,
  getOrderInvoiceFileName,
} from "@/lib/store-order-invoice-pdf";

type OrderInvoiceDownloadButtonProps = {
  order: StoreOrder;
  layout?: "detail" | "compact";
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
};

const detailButtonClassName =
  "h-9 gap-2 rounded-lg border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-700";

const compactButtonClassName =
  "h-8 gap-1.5 rounded-lg border-gray-200 bg-white px-3 text-xs font-semibold text-gray-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-700";

export default function OrderInvoiceDownloadButton({
  order,
  layout = "detail",
  variant = "outline",
  size = "sm",
  className,
}: OrderInvoiceDownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const isCompact = layout === "compact";

  const handleDownload = useCallback(async () => {
    if (!order.serial) {
      toast.error("Invoice is not available for this order.");
      return;
    }
    setLoading(true);
    try {
      const { data: invoice } = await getOrderInvoice(order.id);
      const blob = await generateOrderInvoicePdf(invoice);
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = getOrderInvoiceFileName(invoice.serial);
      anchor.click();
      URL.revokeObjectURL(objectUrl);
      toast.success("Invoice downloaded.");
    } catch {
      toast.error("Could not generate invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [order]);

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(
        isCompact ? compactButtonClassName : detailButtonClassName,
        className,
      )}
      disabled={loading}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void handleDownload();
      }}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : isCompact ? (
        <FileText className="h-3.5 w-3.5" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {loading ? "Preparing…" : isCompact ? "Invoice" : "Download invoice"}
    </Button>
  );
}
