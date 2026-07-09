"use client";

import { Clock, Cpu } from "lucide-react";

export function ComingSoonPlansCard() {
  return (
    <div className="rounded-3xl border border-red-100 bg-gradient-to-br from-white via-white to-red-50/50 p-8 sm:p-10 shadow-sm">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 shadow-lg shadow-red-200">
          <Cpu className="h-7 w-7 text-white" />
        </div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-700">
          <Clock className="h-3.5 w-3.5" />
          Coming Soon
        </div>

        <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Connect device plans are on the way
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
          We are preparing SFPL Connect hardware plans for online purchase.
          Check back soon for pricing, availability, and ordering options.
        </p>
      </div>
    </div>
  );
}
