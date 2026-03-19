"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const DESKTOP_SCREENS = [
  {
    id: "live",
    title: "Live Dashboard",
    subtitle: "Real-time metrics & status",
    badge: { text: "Connected", tone: "success" },
    src: "/images/pages/connect/admin-portal-1.png",
    alt: "SFPL Connect admin portal — live dashboard with real-time metrics",
  },
  {
    id: "history",
    title: "Pin History",
    subtitle: "Trends, charts & timelines",
    badge: { text: "Charts", tone: "neutral" },
    src: "/images/pages/connect/admin-portal-2.png",
    alt: "SFPL Connect admin portal — device detail with pin history charts",
  },
  {
    id: "manage",
    title: "Projects & Devices",
    subtitle: "Organize, configure and scale",
    badge: { text: "Manage", tone: "neutral" },
    src: "/images/pages/connect/admin-portal-3.png",
    alt: "SFPL Connect admin portal — device management and configuration",
  },
];

const MOBILE_SCREENS = [
  {
    src: "/images/pages/connect/admin-portal-mobile-1.png",
    alt: "SFPL Connect mobile — live dashboard",
  },
  {
    src: "/images/pages/connect/admin-portal-mobile-2.png",
    alt: "SFPL Connect mobile — pin history chart",
  },
];

function Badge({ text, tone }) {
  const cls =
    tone === "success"
      ? "text-green-700 bg-green-50 border-green-100"
      : "text-gray-600 bg-white/70 border-gray-200";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${cls}`}
    >
      {tone === "success" && (
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      )}
      {text}
    </span>
  );
}

export default function CloudPlatformShowcase() {
  const [activeId, setActiveId] = useState(DESKTOP_SCREENS[0].id);

  const active = useMemo(
    () => DESKTOP_SCREENS.find((s) => s.id === activeId) || DESKTOP_SCREENS[0],
    [activeId],
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Desktop spotlight */}
      <div className="lg:col-span-8">
        <div className="relative">
          {/* glow */}
          <div className="absolute -inset-8 bg-gradient-to-r from-red-100/70 via-transparent to-red-50/70 blur-2xl -z-10 pointer-events-none" />

          <div className="rounded-3xl border border-gray-200 bg-white shadow-[0_30px_90px_-45px_rgba(0,0,0,0.35)] overflow-hidden">
            {/* browser top bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-gray-400 font-medium">
                {active.title}
              </span>
              <span className="ml-auto">
                <Badge text={active.badge.text} tone={active.badge.tone} />
              </span>
            </div>

            {/* image stage */}
            <div className="relative bg-gray-100">
              {/* fixed stage to prevent layout shift across different image sizes */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/10]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 10, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.99 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={active.src}
                      alt={active.alt}
                      fill
                      className="object-cover object-top"
                      sizes="(min-width: 1024px) 60vw, 92vw"
                      priority={false}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* selectors */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DESKTOP_SCREENS.map((s) => {
              const isActive = s.id === activeId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveId(s.id)}
                  className={`group text-left rounded-2xl border p-3 transition-all duration-200 ${
                    isActive
                      ? "border-red-200 bg-red-50/60 shadow-md"
                      : "border-gray-200 bg-white hover:bg-gray-50 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative w-16 h-11 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                      <Image
                        src={s.src}
                        alt=""
                        fill
                        className="object-cover object-top"
                        sizes="64px"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-extrabold text-gray-900 truncate">
                          {s.title}
                        </p>
                        <span className="hidden sm:inline-flex">
                          <Badge text={s.badge.text} tone={s.badge.tone} />
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                        {s.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile mockups */}
      <div className="lg:col-span-4">
        <div className="mb-5">
          <p className="text-xs font-bold tracking-widest uppercase text-red-600">
            Mobile ready
          </p>
          <h3 className="text-2xl font-extrabold text-gray-900 mt-2 leading-tight">
            Dashboards and charts on the go
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mt-2">
            Tap-friendly screens with the same SFPL Connect portal experience.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 items-end">
          {MOBILE_SCREENS.map((m, idx) => (
            <div
              key={m.src}
              className={`rounded-[2rem] bg-gray-900 p-2 shadow-2xl shadow-gray-200 border border-gray-200 ${
                idx === 1 ? "translate-y-6" : ""
              }`}
            >
              <div className="relative rounded-[1.65rem] overflow-hidden bg-black">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black/70 rounded-full z-10" />
                <Image
                  src={m.src}
                  alt={m.alt}
                  width={520}
                  height={1040}
                  className="w-full h-auto object-cover"
                  sizes="(min-width: 1024px) 16vw, 44vw"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3">
          {[
            "Responsive dashboards and charts",
            "Instant alerts and status overview",
            "Fast navigation across devices & projects",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white/70 backdrop-blur px-4 py-3 shadow-sm"
            >
              <div className="mt-0.5 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
