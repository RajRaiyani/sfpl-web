"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { formatPaisa } from "@/lib/format";
import type { StoreDevice } from "@/types/store";

type StoreDeviceCardProps = {
  device: StoreDevice;
};

export function StoreDeviceCard({ device }: StoreDeviceCardProps) {
  const outOfStock = !device.in_stock;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={`/connect/devices/${device.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          {device.image?.url ? (
            <Image
              src={device.image.url}
              alt={device.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              No image
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/connect/devices/${device.slug}`}>
          <h3 className="text-lg font-extrabold text-gray-900 transition-colors group-hover:text-red-600">
            {device.name}
          </h3>
        </Link>
        {device.short_description ? (
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">{device.short_description}</p>
        ) : null}
        <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xl font-bold text-red-600">{formatPaisa(device.price_in_paisa)}</p>
          <div className="flex flex-wrap gap-2">
            <AddToCartButton
              deviceId={device.id}
              deviceName={device.name}
              disabled={outOfStock}
            />
            <Button asChild size="sm" variant="outline">
              <Link href={`/connect/devices/${device.slug}`}>
                {outOfStock ? "Out of stock" : "View"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
