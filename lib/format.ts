export function formatPaisa(paisa: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paisa / 100);
}

export function formatRupee(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatOrderDate(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatPaymentStatus(status: string) {
  const normalized = status.toLowerCase();
  if (normalized === "paid") return "Paid";
  if (normalized === "failed") return "Failed";
  return "Pending";
}

export function paymentStatusClassName(status: string) {
  const normalized = status.toLowerCase();
  if (normalized === "paid") return "text-green-600";
  if (normalized === "failed") return "text-red-600";
  return "text-amber-600";
}

export type OrderAddress = {
  address?: string;
  city?: string;
  state_name?: string;
  state_id?: string;
  state_gst_code?: string;
  postal_code?: string;
};

export function parseOrderAddress(
  address?: Record<string, unknown> | string | null,
): OrderAddress | null {
  if (!address) return null;

  let value: Record<string, unknown> | null = null;
  if (typeof address === "string") {
    try {
      const parsed = JSON.parse(address) as Record<string, unknown>;
      value = parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  } else if (typeof address === "object") {
    value = address;
  }

  if (!value) return null;

  return {
    address: typeof value.address === "string" ? value.address.trim() : "",
    city: typeof value.city === "string" ? value.city.trim() : "",
    state_name: typeof value.state_name === "string" ? value.state_name.trim() : "",
    state_id: typeof value.state_id === "string" ? value.state_id.trim() : "",
    state_gst_code:
      typeof value.state_gst_code === "string" ? value.state_gst_code.trim() : "",
    postal_code: typeof value.postal_code === "string" ? value.postal_code.trim() : "",
  };
}

export function formatOrderAddress(address?: Record<string, unknown> | string | null) {
  const parsed = parseOrderAddress(address);
  if (!parsed) return "—";

  const lines = [
    parsed.address,
    [parsed.city, parsed.state_name].filter(Boolean).join(", "),
    parsed.postal_code ? `PIN CODE ${parsed.postal_code}` : null,
  ].filter((line) => typeof line === "string" && line.trim());

  return lines.length ? lines.join("\n") : "—";
}

export function formatFulfillmentStatus(status: string) {
  return status
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatOrderDisplaySerial(order: {
  serial?: string | null;
  payment_status?: string;
}) {
  if (order.serial) return order.serial;
  return "Payment pending";
}

export function isOrderInvoiceAvailable(status: string) {
  const normalized = status.toLowerCase();
  return (
    normalized === "out_for_delivery" ||
    normalized === "delivered" ||
    normalized === "complete"
  );
}
