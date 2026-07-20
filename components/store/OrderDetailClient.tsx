"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderStatusTimeline from "@/components/store/OrderStatusTimeline";
import {
  formatOrderDate,
  formatOrderDisplaySerial,
  formatPaisa,
  formatPaymentStatus,
  parseOrderAddress,
  type OrderAddress,
} from "@/lib/format";
import { buildConnectLoginUrl, hasUserSession } from "@/lib/auth-storage";
import { useOrder } from "@/hooks/use-orders";
import OrderDownloadActions from "@/components/store/OrderDownloadActions";

type OrderDetailClientProps = {
  orderId: string;
};

function PaymentBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  const className =
    normalized === "paid"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : normalized === "failed"
        ? "bg-red-50 text-red-700 ring-red-200"
        : "bg-amber-50 text-amber-700 ring-amber-200";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ring-inset ${className}`}
    >
      {formatPaymentStatus(status)}
    </span>
  );
}

function AddressField({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}

function OrderAddressDisplay({
  address,
}: {
  address?: Record<string, unknown> | string | null;
}) {
  const parsed = parseOrderAddress(address);

  if (!parsed || !hasAddressContent(parsed)) {
    return <p className="mt-3 text-sm text-gray-500">No address provided.</p>;
  }

  const cityState = [parsed.city, parsed.state_name].filter(Boolean).join(", ");

  return (
    <div className="mt-4 space-y-3 rounded-xl bg-gray-50 p-4">
      <AddressField label="Street address" value={parsed.address} />
      <AddressField label="City & state" value={cityState} />
      <AddressField
        label="PIN code"
        value={
          parsed.postal_code ? `PIN CODE ${parsed.postal_code}` : undefined
        }
      />
    </div>
  );
}

function hasAddressContent(address: OrderAddress) {
  return Boolean(
    address.address ||
    address.city ||
    address.state_name ||
    address.postal_code,
  );
}

export default function OrderDetailClient({ orderId }: OrderDetailClientProps) {
  const { data, isLoading, isError } = useOrder(orderId);

  useEffect(() => {
    if (!hasUserSession()) {
      window.location.href = buildConnectLoginUrl(
        `${window.location.origin}/orders/${orderId}`,
      );
    }
  }, [orderId]);

  const order = data?.data;
  const billingAddress = parseOrderAddress(order?.billing_address);
  const shippingAddress = parseOrderAddress(order?.shipping_address);
  const addressesMatch =
    billingAddress &&
    shippingAddress &&
    billingAddress.address === shippingAddress.address &&
    billingAddress.city === shippingAddress.city &&
    billingAddress.state_name === shippingAddress.state_name &&
    billingAddress.postal_code === shippingAddress.postal_code;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="h-64 animate-pulse rounded-2xl bg-gray-50" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-600">Order not found.</p>
        <Button asChild className="mt-4">
          <Link href="/orders">Back to orders</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button
        asChild
        variant="ghost"
        className="mb-6 -ml-2 h-8 px-2 text-gray-600 hover:text-gray-900"
      >
        <Link href="/orders" className="inline-flex items-center gap-1.5">
          <ArrowLeft className="h-4 w-4" />
          Back to orders
        </Link>
      </Button>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-red-600">
            Order
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {formatOrderDisplaySerial(order)}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {formatOrderDate(order.created_at)}
          </p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="text-right">
            <p className="text-2xl font-bold text-red-600">
              {formatPaisa(order.total_amount_in_paisa)}
            </p>
            <div className="mt-2 flex justify-end">
              <PaymentBadge status={order.payment_status} />
            </div>
          </div>
          <OrderDownloadActions order={order} layout="detail" />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <OrderStatusTimeline status={order.status} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 font-bold text-gray-900">
            <Package className="h-5 w-5 text-red-600" />
            Items
          </h2>
          <div className="mt-4 space-y-4">
            {(order.items ?? []).length === 0 ? (
              <p className="text-sm text-gray-500">No items found.</p>
            ) : (
              (order.items ?? []).map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                    {item.image?.url ? (
                      <Image
                        src={item.image.url}
                        alt={item.device_name}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900">
                      {item.device_name}
                    </p>
                    {item.hsn_sac ? (
                      <p className="text-xs text-gray-500">
                        HSN/SAC {item.hsn_sac}
                      </p>
                    ) : null}
                    <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                    <p className="mt-1 text-sm font-semibold text-red-600">
                      {formatPaisa(item.price_in_paisa * item.quantity)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 font-bold text-gray-900">
              <MapPin className="h-5 w-5 text-red-600" />
              Billing address
            </h2>
            <OrderAddressDisplay address={order.billing_address} />
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 font-bold text-gray-900">
                <MapPin className="h-5 w-5 text-red-600" />
                Shipping address
              </h2>
              {addressesMatch ? (
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                  Same as billing
                </span>
              ) : null}
            </div>
            <OrderAddressDisplay address={order.shipping_address} />
          </div>
        </div>
      </div>
    </div>
  );
}
