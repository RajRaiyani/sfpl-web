"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ChevronRight, Package, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderStatusTimeline from "@/components/store/OrderStatusTimeline";
import {
  formatFulfillmentStatus,
  formatOrderDate,
  formatPaisa,
  formatPaymentStatus,
} from "@/lib/format";
import { buildConnectLoginUrl, hasUserSession } from "@/lib/auth-storage";
import { useOrders } from "@/hooks/use-orders";

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

export default function OrdersPageClient() {
  const { data, isLoading, isError } = useOrders({ limit: 30 });

  useEffect(() => {
    if (!hasUserSession()) {
      window.location.href = buildConnectLoginUrl("/orders");
    }
  }, []);

  const orders = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="h-64 animate-pulse rounded-2xl bg-gray-50" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-red-600">Store</p>
          <h1 className="text-3xl font-extrabold text-gray-900">My orders</h1>
          <p className="mt-1 text-sm text-gray-500">Track your hardware orders and delivery status.</p>
        </div>
        {orders.length > 0 ? (
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{orders.length}</span> orders
          </p>
        ) : null}
      </div>

      {isError ? (
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          Failed to load orders. Please try again later.
        </div>
      ) : orders.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-10 text-center">
          <Package className="mx-auto h-10 w-10 text-gray-300" />
          <p className="mt-4 font-medium text-gray-700">No orders yet</p>
          <p className="mt-1 text-sm text-gray-500">
            Browse devices and place your first order to see it here.
          </p>
          <Button asChild className="mt-5 bg-red-600 hover:bg-red-700">
            <Link href="/connect#connect-devices">Browse devices</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="group block rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-red-100 hover:shadow-md"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900">{order.serial}</p>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {formatOrderDate(order.created_at)}
                    </p>
                    {order.total_item_count ? (
                      <p className="mt-1 text-xs text-gray-400">
                        {order.total_item_count} item{order.total_item_count === 1 ? "" : "s"}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-red-600">
                    {formatPaisa(order.total_amount_in_paisa)}
                  </p>
                  <div className="mt-1.5">
                    <PaymentBadge status={order.payment_status} />
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-gray-50 p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                  {formatFulfillmentStatus(order.status)}
                </p>
                <OrderStatusTimeline status={order.status} compact />
              </div>

              <div className="mt-3 flex items-center justify-end gap-1 text-xs font-medium text-red-600">
                View order details
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
