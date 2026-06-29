"use client";

import { useCallback, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import type { StoreOrder } from "@/types/store";
import {
  generateOrderReceiptPdf,
  getOrderReceiptFileName,
} from "@/lib/store-order-receipt-pdf";

type OrderReceiptDownloadButtonProps = {
  order: StoreOrder;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
};

export default function OrderReceiptDownloadButton({
  order,
  variant = "outline",
  size = "sm",
  className,
}: OrderReceiptDownloadButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!order.serial) {
      toast.error("Receipt is available after payment is completed.");
      return;
    }
    setLoading(true);
    try {
      const blob = await generateOrderReceiptPdf(order);
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = getOrderReceiptFileName(order.serial!);
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
      className={className}
      disabled={loading}
      onClick={() => void handleDownload()}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Download className="mr-2 h-4 w-4" />
      )}
      {loading ? "Preparing…" : "Download receipt"}
    </Button>
  );
}
