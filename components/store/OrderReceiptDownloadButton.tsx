"use client";

import { useCallback, useState } from "react";
import { Download, Loader2, Receipt } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { resolveStoreOrderForPdf } from "@/lib/resolve-store-order-for-pdf";
import type { StoreOrder } from "@/types/store";
import {
  generateOrderReceiptPdf,
  getOrderReceiptFileName,
} from "@/lib/store-order-receipt-pdf";

type OrderReceiptDownloadButtonProps = {
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

export default function OrderReceiptDownloadButton({
  order,
  layout = "detail",
  variant = "outline",
  size = "sm",
  className,
}: OrderReceiptDownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const isCompact = layout === "compact";

  const handleDownload = useCallback(async () => {
    if (!order.serial) {
      toast.error("Receipt is available after payment is completed.");
      return;
    }
    setLoading(true);
    try {
      const fullOrder = await resolveStoreOrderForPdf(order);
      const blob = await generateOrderReceiptPdf(fullOrder);
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = getOrderReceiptFileName(fullOrder.serial!);
      anchor.click();
      URL.revokeObjectURL(objectUrl);
      toast.success("Receipt downloaded.");
    } catch {
      toast.error("Could not generate receipt. Please try again.");
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
        <Receipt className="h-3.5 w-3.5" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {loading ? "Preparing…" : isCompact ? "Receipt" : "Download receipt"}
    </Button>
  );
}
