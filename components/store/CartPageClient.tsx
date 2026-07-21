"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { formatPaisa } from "@/lib/format";
import { buildConnectLoginUrl, hasUserSession } from "@/lib/auth-storage";
import {
  useCart,
  useUpdateCartItem,
  cartHasOutOfStockItems,
} from "@/hooks/use-cart";

export default function CartPageClient() {
  const router = useRouter();
  const { data: cart, isLoading, refetch, isFetching } = useCart();
  const updateCart = useUpdateCartItem();

  const items = cart?.items ?? [];
  const total = cart?.total_amount_in_paisa ?? 0;
  const hasOutOfStockItems = cartHasOutOfStockItems(items);

  const handleCheckout = async () => {
    if (!hasUserSession()) {
      window.location.href = buildConnectLoginUrl(
        `${window.location.origin}/checkout`,
      );
      return;
    }

    const { data: freshCart } = await refetch();
    if (cartHasOutOfStockItems(freshCart?.items)) {
      toast.error("Remove out-of-stock items from your cart before checkout.");
      return;
    }

    router.push("/checkout");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 h-64 animate-pulse bg-gray-50 rounded-2xl" />
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900">Your cart</h1>

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-10 text-center">
          <p className="text-gray-600">Your cart is empty.</p>
          <Button asChild className="mt-4 bg-red-600 hover:bg-red-700">
            <Link href="/connect#connect-devices">Browse devices</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.device_id}
                className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                  {item.image?.url ? (
                    <Image
                      src={item.image.url}
                      alt={item.device_name}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/connect/devices/${item.slug}`}
                      className="font-semibold text-gray-900 hover:text-red-600"
                    >
                      {item.device_name}
                    </Link>
                    {!item.in_stock ? (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-700">
                        Out of stock
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm font-bold text-red-600">
                    {formatPaisa(item.price_in_paisa)}
                  </p>
                  <div className="mt-auto flex items-center gap-3">
                    <div className="flex items-center rounded-lg border border-gray-200">
                      <button
                        type="button"
                        className="px-2 py-1"
                        onClick={() =>
                          void updateCart.mutateAsync({
                            deviceId: item.device_id,
                            quantity: Math.max(0, item.quantity - 1),
                          })
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="px-2 py-1"
                        disabled={!item.in_stock || item.quantity >= 100}
                        onClick={() =>
                          void updateCart.mutateAsync({
                            deviceId: item.device_id,
                            quantity: item.quantity + 1,
                          })
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-red-600"
                      onClick={() =>
                        void updateCart.mutateAsync({
                          deviceId: item.device_id,
                          quantity: 0,
                        })
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">Order summary</h2>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">{formatPaisa(total)}</span>
            </div>
            <Button
              className="mt-6 w-full bg-red-600 hover:bg-red-700"
              size="lg"
              disabled={isFetching}
              onClick={() => void handleCheckout()}
            >
              {isFetching ? "Checking cart..." : "Proceed to checkout"}
            </Button>
            {hasOutOfStockItems ? (
              <p className="mt-2 text-center text-xs text-red-600">
                Remove out-of-stock items to continue to checkout.
              </p>
            ) : null}
            {/* <DeliveryChargesNotice /> */}
          </div>
        </div>
      )}
    </div>
  );
}
