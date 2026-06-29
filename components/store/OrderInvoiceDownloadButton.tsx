"use client";

import { useCallback, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import type { StoreOrder } from "@/types/store";
import {
  generateOrderInvoicePdf,
  getOrderInvoiceFileName,
} from "@/lib/store-order-invoice-pdf";

type OrderInvoiceDownloadButtonProps = {
  order: StoreOrder;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
};

export default function OrderInvoiceDownloadButton({
  order,
  variant = "outline",
  size = "sm",
  className,
}: OrderInvoiceDownloadButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!order.serial) {
      toast.error("Invoice is not available for this order.");
      return;
    }
    setLoading(true);
    try {
      const blob = await generateOrderInvoicePdf(order);
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = getOrderInvoiceFileName(order.serial);
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
      className={className}
      disabled={loading}
      onClick={() => void handleDownload()}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Download className="mr-2 h-4 w-4" />
      )}
      {loading ? "Preparing…" : "Download invoice"}
    </Button>
  );
}
