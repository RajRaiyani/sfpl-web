"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ExternalLink, LogIn } from "lucide-react";

type BadgeTone = "success" | "neutral";

const PORTAL_URL = "https://connectio.specificfire.com";

const DESKTOP_SCREENS: {
  id: string;
  title: string;
  subtitle: string;
  badge: { text: string; tone: BadgeTone };
  src: string;
  alt: string;
}[] = [
  {
    id: "live",
    title: "Live Dashboard",
    subtitle: "Real-time metrics & widgets",
    badge: { text: "Connected", tone: "success" },
    src: "/images/pages/connect/admin-portal-1.png",
    alt: "ConnectIO portal — live firepump room dashboard with real-time metrics",
  },
  {
    id: "device",
    title: "Device Overview",
    subtitle: "Variables, status & location",
    badge: { text: "Live", tone: "success" },
    src: "/images/pages/connect/admin-portal-2.png",
    alt: "ConnectIO portal — device overview with live variables",
  },
  {
    id: "map",
    title: "Live Map",
    subtitle: "Locate every connected device",
    badge: { text: "Map", tone: "neutral" },
    src: "/images/pages/connect/admin-portal-3.png",
    alt: "ConnectIO portal — live map with device locations",
  },
];

const MOBILE_SCREENS: { src: string; alt: string }[] = [
  {
    src: "/images/pages/connect/admin-portal-mobile-1.png",
    alt: "ConnectIO mobile — device detail and variables",
  },
  {
    src: "/images/pages/connect/admin-portal-mobile-2.png",
    alt: "ConnectIO mobile — live monitoring view",
  },
];

interface BadgeProps {
  text: string;
  tone: BadgeTone;
}

function Badge({ text, tone }: BadgeProps) {
  const cls =
    tone === "success"
      ? "text-teal-700 bg-teal-50 border-teal-100"
      : "text-gray-600 bg-white/70 border-gray-200";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${cls}`}
    >
      {tone === "success" && (
        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
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
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Desktop spotlight */}
        <div className="lg:col-span-8">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-100/30 via-transparent to-teal-50/25 blur-xl -z-10 pointer-events-none" />

            <div className="rounded-3xl border border-gray-200 bg-white shadow-[0_30px_90px_-45px_rgba(0,0,0,0.35)] overflow-hidden">
              {/* browser top bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <div className="ml-2 flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1">
                  <Image
                    src="/logos/connectio-icon.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5 shrink-0 rounded-[3px]"
                  />
                  <span className="truncate text-xs text-gray-500 font-medium">
                    connectio.specificfire.com
                  </span>
                </div>
                <span className="ml-auto shrink-0">
                  <Badge text={active.badge.text} tone={active.badge.tone} />
                </span>
              </div>

              {/* image stage */}
              <div className="relative bg-gray-100">
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
                        ? "border-teal-200 bg-teal-50/60 shadow-md"
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
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/logos/connectio-icon.svg"
                alt="ConnectIO"
                width={40}
                height={40}
                className="h-10 w-10 rounded-[22%] ring-1 ring-black/5"
              />
              <div>
                <p className="text-xs font-bold tracking-widest text-teal-700">
                  ConnectIO Portal
                </p>
                <h3 className="text-xl font-extrabold text-gray-900 leading-tight">
                  Live on every screen
                </h3>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              The same ConnectIO experience on desktop and phone — dashboards,
              devices and alerts in one place.
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

          <div className="mt-10 space-y-3">
            {[
              "Responsive dashboards and charts",
              "Instant alerts and status overview",
              "Fast navigation across devices & projects",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white/70 backdrop-blur px-4 py-3 shadow-sm"
              >
                <div className="mt-0.5 w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width get started bar — balanced under the showcase */}
      <div className="rounded-2xl border border-teal-400 bg-teal-50 px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-teal-700 flex items-center justify-center flex-shrink-0">
              <LogIn className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-gray-900">
                Get started — web login
              </p>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                Open{" "}
                <a
                  href={PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-teal-700 hover:underline"
                >
                  connectio.specificfire.com
                </a>
                , sign in with email or Google, then open Dashboards, Devices or
                Map.
              </p>
            </div>
          </div>
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2"
          >
            Open ConnectIO
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
