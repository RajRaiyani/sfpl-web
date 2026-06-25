"use client";

import { Cpu } from "lucide-react";
import { StoreDeviceCard } from "@/components/store/StoreDeviceCard";
import { useStoreDevices } from "@/hooks/use-store-devices";

export default function ConnectStoreCatalog() {
  const { data, isLoading, isError } = useStoreDevices({ limit: 12 });

  const devices = data?.data ?? [];

  return (
    <section id="connect-devices" className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600">
                <Cpu className="h-5 w-5 text-white" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-red-600">
                Connect Devices
              </p>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
              Buy SFPL Connect hardware
            </h2>
            <p className="mt-3 max-w-2xl text-base text-gray-600">
              Order IoT devices directly and get started with real-time monitoring on SFPL Connect.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-2xl border border-gray-100 bg-gray-50"
              />
            ))}
          </div>
        ) : isError ? (
          <p className="text-sm text-red-600">Unable to load devices right now.</p>
        ) : devices.length === 0 ? (
          <p className="text-sm text-gray-500">No devices available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {devices.map((device) => (
              <StoreDeviceCard key={device.id} device={device} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
