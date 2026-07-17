"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { MarkdownContent } from "@/components/store/MarkdownContent";
import { formatPaisa } from "@/lib/format";
import { useStoreDevice } from "@/hooks/use-store-devices";
import { useInvalidateCart, useUpdateCartItem } from "@/hooks/use-cart";

type DeviceDetailClientProps = {
  slug: string;
};

export default function DeviceDetailClient({ slug }: DeviceDetailClientProps) {
  const { data, isLoading, isError } = useStoreDevice(slug);
  const updateCart = useUpdateCartItem();
  const invalidateCart = useInvalidateCart();
  const [quantity, setQuantity] = useState(1);

  const device = data?.data;
  const outOfStock = !device || !device.in_stock;

  useEffect(() => {
    if (!device?.in_stock) {
      setQuantity(1);
    }
  }, [device?.in_stock]);

  const handleAddToCart = async () => {
    if (!device || outOfStock) return;
    try {
      await updateCart.mutateAsync({ deviceId: device.id, quantity });
      invalidateCart();
      toast.success("Added to cart");
    } catch {
      // toast handled in hook
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 animate-pulse h-96 bg-gray-50 rounded-2xl" />
    );
  }

  if (isError || !device) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-600">Device not found.</p>
        <Button asChild className="mt-4">
          <Link href="/connect#connect-devices">Back to devices</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6 text-sm text-gray-500">
        <Link href="/connect" className="hover:text-red-600">
          SFPL CONNECT
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{device.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
          {device.image?.url ? (
            <Image
              src={device.image.url}
              alt={device.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
            {device.name}
          </h1>
          {device.short_description ? (
            <p className="mt-4 text-base text-gray-600">
              {device.short_description}
            </p>
          ) : null}
          <p className="mt-6 text-3xl font-bold text-red-600">
            {formatPaisa(device.price_in_paisa)}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {outOfStock ? "Out of stock" : "In stock"}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-gray-200">
              <button
                type="button"
                className="px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                disabled={quantity <= 1 || outOfStock}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-10 text-center font-semibold">
                {quantity}
              </span>
              <button
                type="button"
                className="px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                disabled={outOfStock || quantity >= 100}
                onClick={() => setQuantity((q) => Math.min(100, q + 1))}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700"
              disabled={outOfStock || updateCart.isPending}
              onClick={() => void handleAddToCart()}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to cart
            </Button>
          </div>

          {device.description_md ? (
            <div className="mt-10 border-t border-gray-100 pt-8">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Details</h2>
              <MarkdownContent content={device.description_md} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
