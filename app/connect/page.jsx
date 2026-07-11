import {
  Cpu,
  Cloud,
  LayoutDashboard,
  MapPin,
  Building2,
  Factory,
  Droplets,
  Bell,
  Zap,
  ArrowRight,
  Gauge,
  Plug,
  Power,
  Radio,
  Battery,
  Send,
  Code2,
  KeyRound,
  Webhook,
  HelpCircle,
  Download,
  FileText,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FaqAccordion } from "@/app/iot-faq/faq-accordion";
import HowItWorksSteps from "@/components/connect/HowItWorksSteps";
import CloudPlatformShowcase from "@/components/connect/CloudPlatformShowcase";
import ConnectStoreCatalog from "@/components/store/ConnectStoreCatalog";
import { deviceFaqs, portalFaqs } from "@/data/iot-faq-items";
import { buildPageMetadata } from "@/lib/seo";

/** Single list: hardware first, then portal (ids stay unique across both arrays). */
const connectFaqPreview = [
  ...deviceFaqs.slice(0, 5),
  ...portalFaqs.slice(0, 5),
];

export const metadata = buildPageMetadata({
  title: "SFPL Connect | IoT Monitoring & Real-Time Dashboard",
  description:
    "SFPL Connect - IoT devices with multi-pin input, real-time admin portal, live monitoring dashboards, integrated map, custom calibration and alerts. Highly modular and customizable.",
  path: "/connect",
  image: "/images/pages/connect/banner1.png",
});

export default function Product() {
  const cloudFeatures = [
    {
      icon: LayoutDashboard,
      title: "Real-time admin portal",
      description:
        "Manage devices and projects from a single, intuitive dashboard.",
    },
    {
      icon: Bell,
      title: "Custom alerts",
      description:
        "Set custom alerts at project and device level. Get notified when thresholds are crossed.",
    },
    {
      icon: Gauge,
      title: "Live monitoring dashboard",
      description:
        "Real-time dashboards for each device with live data visualization.",
    },
    {
      icon: MapPin,
      title: "Integrated map",
      description:
        "View all devices on an integrated map for location-based monitoring.",
    },
  ];

  const useCases = [
    {
      icon: Factory,
      title: "Manufacturing",
      description:
        "Track machine load, panel health, and production utility signals in real time.",
    },
    {
      icon: Building2,
      title: "Buildings",
      description:
        "Residential, Hospital, Educational, Institutional, Commercial, Hotel, Industrial, etc...",
    },
    {
      icon: Droplets,
      title: "Water & Utilities",
      description:
        "Capture tank level, flow, and pump status with instant threshold-based alerts.",
    },
    {
      icon: Gauge,
      title: "Energy Monitoring",
      description:
        "Measure phase-wise voltage/current and optimize usage with historical trends.",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <div className="relative h-[750px] w-full bg-gradient-to-br from-gray-900 via-gray-800 to-primary/20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/pages/connect/banner1.png"
            alt="SFPL Connect device banner"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/40" />
        <div className="container absolute px-4 z-10 bottom-1/3 left-1/2 -translate-x-1/2">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
              SFPL <span className="text-primary">Connect</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              End-to-end IoT solution: hardware that captures multi-pin input
              and sends data to the cloud, plus a real-time admin portal with
              live dashboards, integrated map, and custom calibration and
              alerts.
            </p>
          </div>
        </div>
        <div className="absolute z-20 bottom-8 right-4 sm:right-8">
          <a
            href="https://specificfire.s3.ap-south-1.amazonaws.com/public/SFPL+CONNECT+Brochure.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl border border-red-100/60 bg-white/95 px-4 py-2.5 text-sm font-semibold text-gray-900 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200/70 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
            aria-label="Download SFPL Connect brochure"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-colors group-hover:bg-red-100">
              <Download className="h-4 w-4" aria-hidden />
            </span>
            <span>Download Brochure</span>
          </a>
        </div>
      </div>

      {/* ── Architecture visual strip ── */}
      <section className="mt-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #ef4444 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-center">
                End-to-End Solution
              </h2>

              {/* Flow */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
                {/* Sensors */}
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center">
                    <Plug className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-300 text-center">
                    Physical Sensors
                  </p>
                  <p className="text-xs text-gray-500 text-center max-w-[100px]">
                    Any type, any count
                  </p>
                </div>

                <ArrowRight className="text-red-500 w-6 h-6 rotate-90 md:rotate-0 flex-shrink-0" />

                {/* Device */}
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-16 h-16 bg-red-700 rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/50">
                    <Cpu className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-white text-center">
                    SFPL Connect Device
                  </p>
                  <p className="text-xs text-gray-400 text-center max-w-[100px]">
                    Multi-input IoT unit
                  </p>
                </div>

                <ArrowRight className="text-red-500 w-6 h-6 rotate-90 md:rotate-0 flex-shrink-0" />

                {/* Cloud */}
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-16 h-16 bg-red-700 rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/50">
                    <Cloud className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-white text-center">
                    SFPL Cloud
                  </p>
                  <p className="text-xs text-gray-400 text-center max-w-[100px]">
                    Secure real-time ingestion
                  </p>
                </div>

                <ArrowRight className="text-red-500 w-6 h-6 rotate-90 md:rotate-0 flex-shrink-0" />

                {/* Portal */}
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center">
                    <LayoutDashboard className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-300 text-center">
                    Admin Portal
                  </p>
                  <p className="text-xs text-gray-500 text-center max-w-[100px]">
                    Monitor, alert & analyse
                  </p>
                </div>

                <ArrowRight className="text-red-500 w-6 h-6 rotate-90 md:rotate-0 flex-shrink-0" />

                {/* User */}
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center">
                    <Bell className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-300 text-center">
                    Your Team
                  </p>
                  <p className="text-xs text-gray-500 text-center max-w-[100px]">
                    Instant alerts & insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          {/* Section header */}
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-200">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold tracking-widest uppercase text-red-600">
                  System Overview
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                How SFPL Connect{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">works</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-red-100 -z-0 rounded" />
                </span>
              </h2>
            </div>
            <p className="text-gray-500 text-base leading-relaxed max-w-sm md:text-right">
              From physical sensors on the ground to live insights on any screen
              — the entire pipeline, seamlessly connected.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 via-slate-700 to-red-950 ring-1 ring-red-900/40 p-2">
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 60%, #ef444455 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #b91c1c33 0%, transparent 50%)",
                }}
              />
              <Image
                src="/images/pages/connect/about.png"
                alt="SFPL Connect system overview — sensors, IoT device, cloud, and user"
                width={760}
                height={560}
                className="relative z-10 w-full h-auto object-cover rounded-2xl"
              />
            </div>

            {/* Steps — animated on scroll */}
            <HowItWorksSteps />
          </div>
        </div>
      </section>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* ── Hardware Deep-Dive ── */}
      <section
        className="py-24 bg-white relative"
        style={{
          backgroundImage:
            "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #F5F5F4 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-200">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold tracking-widest uppercase text-red-600">
                  The Hardware
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                What to{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">wire</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-red-100 -z-0 rounded" />
                </span>{" "}
                to each pin
              </h2>
            </div>
            <p className="text-gray-500 text-base leading-relaxed max-w-sm md:text-right">
              Match your field cables to the right terminal group — voltage,
              current, or sensor — then power the unit and read live values in
              the portal.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mx-auto">
            {/* Spec breakdown */}
            <div className="space-y-5">
              <p className="text-gray-600 text-base leading-relaxed">
                Connect is a compact DIN-rail IoT unit with screw-terminal
                blocks. Seventeen inputs are grouped by signal type so you can
                wire a three-phase panel, clamp-on CTs, and DC field sensors on
                the same device.
              </p>

              {/* Pin groups — aligned with /iot-device-spec */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  How to use the 17 inputs
                </p>

                {/* Power supply */}
                <Link
                  href="/iot-device-spec#power-supply"
                  className="block rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-md transition-all hover:border-red-200 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <Power className="w-5 h-5 text-gray-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1 gap-2">
                        <p className="font-bold text-gray-900 text-sm">
                          Power the device
                        </p>
                        <span className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full shrink-0">
                          1 pin · 6–24&nbsp;V DC
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        <span className="font-semibold text-gray-700">
                          Wire:
                        </span>{" "}
                        an external DC supply (6–24&nbsp;V) into the power
                        terminal. This runs the electronics and cellular radio —
                        it is not a measurement input.
                      </p>
                    </div>
                  </div>
                </Link>

                {/* AC high-voltage */}
                <Link
                  href="/iot-device-spec#ac-high"
                  className="block rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-md transition-all hover:border-red-200 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1 gap-2">
                        <p className="font-bold text-gray-900 text-sm">
                          Measure phase voltage
                        </p>
                        <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full shrink-0">
                          3 pins · up to 300&nbsp;V AC
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed mb-2">
                        <span className="font-semibold text-gray-700">
                          Wire:
                        </span>{" "}
                        each phase line from your distribution or branch panel
                        (R, Y, B) into{" "}
                        <span className="font-mono text-gray-700">VR</span>,{" "}
                        <span className="font-mono text-gray-700">VY</span>, and{" "}
                        <span className="font-mono text-gray-700">VB</span>.
                        Isolated channels read mains-level AC voltage directly.
                      </p>
                      <p className="text-gray-500 text-xs leading-relaxed mb-3">
                        <span className="font-semibold text-gray-700">
                          Use for:
                        </span>{" "}
                        supply health, phase presence / loss, and three-phase
                        voltage monitoring on feeders.
                      </p>
                      <div className="flex gap-2">
                        {["R", "Y", "B"].map((phase, i) => (
                          <span
                            key={phase}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold text-white ${
                              i === 0
                                ? "bg-red-500"
                                : i === 1
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                            }`}
                          >
                            {`V${phase}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* AC low-voltage (CT) */}
                <Link
                  href="/iot-device-spec#ac-low"
                  className="block rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-md transition-all hover:border-red-200 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Gauge className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1 gap-2">
                        <p className="font-bold text-gray-900 text-sm">
                          Measure phase current (via CT)
                        </p>
                        <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full shrink-0">
                          3 pins · up to 5&nbsp;V AC
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed mb-2">
                        <span className="font-semibold text-gray-700">
                          Wire:
                        </span>{" "}
                        the low-voltage output of a current transformer (CT)
                        clamped around each phase cable into{" "}
                        <span className="font-mono text-gray-700">IR</span>,{" "}
                        <span className="font-mono text-gray-700">IY</span>, and{" "}
                        <span className="font-mono text-gray-700">IB</span>. Do
                        not connect mains here — only the CT secondary signal
                        (up to 5&nbsp;V AC).
                      </p>
                      <p className="text-gray-500 text-xs leading-relaxed mb-3">
                        <span className="font-semibold text-gray-700">
                          Use for:
                        </span>{" "}
                        load / amperage per phase (typically up to ~80&nbsp;A
                        depending on the CT), energy monitoring, and overload
                        alerts.
                      </p>
                      <div className="flex gap-2">
                        {["R", "Y", "B"].map((n) => (
                          <span
                            key={n}
                            className="w-9 h-8 rounded-lg flex items-center justify-center text-[10px] font-extrabold text-white bg-blue-600"
                          >
                            {`I${n}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Analog DC */}
                <Link
                  href="/iot-device-spec#analog"
                  className="block rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-md transition-all hover:border-red-200 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Plug className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1 gap-2">
                        <p className="font-bold text-gray-900 text-sm">
                          Connect field sensors
                        </p>
                        <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full shrink-0">
                          9 pins · 0–30&nbsp;V DC
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed mb-2">
                        <span className="font-semibold text-gray-700">
                          Wire:
                        </span>{" "}
                        the DC signal output from each sensor into{" "}
                        <span className="font-mono text-gray-700">A1</span>–
                        <span className="font-mono text-gray-700">A9</span>{" "}
                        (0–30&nbsp;V per channel). One sensor per pin.
                      </p>
                      <p className="text-gray-500 text-xs leading-relaxed mb-3">
                        <span className="font-semibold text-gray-700">
                          Use for:
                        </span>{" "}
                        pressure, tank level, temperature, flow, and other
                        process transmitters. Map volts to engineering units
                        with per-channel calibration in the portal.
                      </p>
                      <div className="grid grid-cols-5 sm:grid-cols-9 gap-1">
                        {Array.from({ length: 9 }, (_, i) => (
                          <span
                            key={i}
                            className="h-7 rounded-md bg-green-600 flex items-center justify-center text-[9px] font-bold text-white"
                          >
                            A{i + 1}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Cellular */}
                <Link
                  href="/iot-device-spec#hardware"
                  className="block rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-md transition-all hover:border-red-200 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                      <Radio className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1 gap-2">
                        <p className="font-bold text-gray-900 text-sm">
                          Send data to the cloud
                        </p>
                        <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full shrink-0">
                          2G · integrated antenna
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Built-in GSM (2G) with an integrated antenna uploads
                        readings to the SFPL portal — no separate modem or
                        external antenna required in covered areas.
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Battery backup */}
                <Link
                  href="/iot-device-spec#hardware"
                  className="block rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-md transition-all hover:border-red-200 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                      <Battery className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1 gap-2">
                        <p className="font-bold text-gray-900 text-sm">
                          Keep running on outage
                        </p>
                        <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full shrink-0">
                          7.4&nbsp;V · 2600&nbsp;mAh
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Internal two-cell pack (7.4&nbsp;V, 2600&nbsp;mAh)
                        bridges short supply interruptions so the device can
                        keep reporting through brief power dips.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Blueprint image + tech spec CTA */}
            <div className="relative flex flex-col gap-5">
              <div className="relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(#93c5fd22 1px, transparent 1px), linear-gradient(90deg, #93c5fd22 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <Image
                  src="/images/pages/connect/hardware-graphic.png"
                  alt="SFPL Connect hardware exploded view — enclosure, PCB, terminals, DIN rail"
                  width={700}
                  height={560}
                  className="relative z-10 w-full h-auto object-contain"
                />
              </div>

              <Link
                href="/iot-device-spec"
                className="group relative z-10 flex items-center gap-4 rounded-2xl border-2 border-red-200 bg-red-50 p-4 shadow-sm transition-all hover:border-red-400 hover:bg-red-100 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 shadow-md shadow-red-200">
                  <FileText className="h-5 w-5 text-white" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-red-700 group-hover:text-red-800">
                    IoT device technical specification
                  </p>
                  <p className="mt-0.5 text-xs text-red-600/80">
                    Full ratings, pin diagrams, and wiring reference
                  </p>
                </div>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-red-500 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>

              <Link
                href="/iot-user-manual"
                className="group relative z-10 flex items-center gap-4 rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-red-200 hover:bg-red-50 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-900 shadow-md">
                  <BookOpen className="h-5 w-5 text-white" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-gray-900 group-hover:text-red-800">
                    IoT device user manual
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500 group-hover:text-red-600/80">
                    DC power, AC voltage, CTs, and sensors — step by step
                  </p>
                </div>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-red-500"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cloud Platform ── */}
      <section className="py-15 bg-white relative overflow-hidden">
        {/* subtle background accents */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gray-100 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-200">
                  <Cloud className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold tracking-widest uppercase text-red-600">
                  Cloud Platform
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                Your data,{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">live</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-red-100 -z-0 rounded" />
                </span>{" "}
                on every screen
              </h2>
            </div>
            <p className="text-gray-500 text-base leading-relaxed max-w-sm md:text-right">
              One portal to manage every device, project, and alert — with
              real-time dashboards you can act on instantly.
            </p>
          </div>

          {/* Feature pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {cloudFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                    <Icon className="w-4 h-4 text-red-600" />
                  </div>
                  <p className="font-bold text-gray-900 text-sm mb-1">
                    {feature.title}
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <CloudPlatformShowcase />
        </div>
      </section>

      {/* ── Developer ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-50 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-200">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold tracking-widest uppercase text-red-600">
                  Developers
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                Integrate SFPL Connect{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">your way</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-red-100 -z-0 rounded" />
                </span>
              </h2>
            </div>
            <p className="text-gray-500 text-base leading-relaxed max-w-sm md:text-right">
              Use API keys for secure access to your projects and subscribe to
              webhooks for real-time events.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: developer-first layout */}
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-[2rem] opacity-60 blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 20%, rgba(239,68,68,0.22) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(15,23,42,0.22) 0%, transparent 60%)",
                }}
              />

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* API Key */}
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-200">
                          <KeyRound className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-bold tracking-widest uppercase text-gray-500">
                            Auth
                          </p>
                          <p className="font-extrabold text-gray-900 leading-tight">
                            API key access
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Generate API keys per project and control access to
                        devices, readings, alerts, and dashboards.
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[10px] font-extrabold tracking-widest uppercase text-red-700">
                      server-to-server
                    </span>
                  </div>

                  <div className="mt-5 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">
                      Header
                    </p>
                    <div className="mt-2 font-mono text-xs text-gray-800">
                      <span className="text-gray-500">x-api-key:</span>{" "}
                      <span className="font-semibold">
                        sfpl_live_••••••••••
                      </span>
                    </div>
                  </div>
                </div>

                {/* Webhooks */}
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-gray-900 flex items-center justify-center shadow-lg shadow-gray-300">
                      <Webhook className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase text-gray-500">
                        Events
                      </p>
                      <p className="font-extrabold text-gray-900 leading-tight">
                        Webhooks
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    Subscribe to events and handle automation in your own
                    system—CRM, ERP, WhatsApp, alerts, anything.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "reading.created",
                      "alert.triggered",
                      "device.status",
                      "pin.calibrated",
                    ].map((evt) => (
                      <span
                        key={evt}
                        className="inline-flex items-center rounded-full bg-gray-900 text-white px-3 py-1 text-[11px] font-mono"
                      >
                        {evt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mini console / endpoints */}
                <div className="md:col-span-2 rounded-3xl overflow-hidden bg-gray-900 text-white shadow-2xl ring-1 ring-black/10">
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                      backgroundSize: "22px 22px",
                    }}
                  />
                  <div className="relative px-6 py-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      </div>
                      <p className="text-sm font-extrabold tracking-tight">
                        sfpl-connect / quickstart
                      </p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                      curl
                    </span>
                  </div>

                  <div className="relative px-6 py-6 space-y-4">
                    <div className="font-mono text-xs leading-relaxed text-white/90">
                      <p className="text-white/60 mb-2">
                        # fetch latest readings
                      </p>
                      <p>
                        <span className="text-red-200">$</span> curl -H{" "}
                        <span className="text-white">
                          &quot;x-api-key: sfpl_live_••••••&quot;
                        </span>{" "}
                        <span className="text-white/80">
                          https://api.sfplconnect.com/v1/readings?device_id=dev_456
                        </span>
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { k: "Auth", v: "API key" },
                        { k: "Format", v: "JSON" },
                        { k: "Events", v: "Webhooks" },
                      ].map((s) => (
                        <div
                          key={s.k}
                          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3"
                        >
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                            {s.k}
                          </p>
                          <p className="text-sm font-extrabold text-white mt-1">
                            {s.v}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                      <p className="text-white/70 text-xs leading-relaxed">
                        Build custom dashboards, automations, and integrations
                        on top of SFPL Connect.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: example payload */}
            <div className="rounded-3xl overflow-hidden bg-gray-900 text-white shadow-2xl ring-1 ring-black/10">
              <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
                <p className="text-sm font-extrabold tracking-tight">
                  Webhook event example
                </p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                  JSON
                </span>
              </div>
              <pre className="px-6 py-6 text-xs leading-relaxed overflow-auto">
                {`{
  "event": "alert.triggered",
  "timestamp": "2026-03-18T10:25:13.222Z",
  "project_id": "proj_123",
  "device_id": "dev_456",
  "data": {
    "pin": "P3",
    "metric": "temperature",
    "value": 78.4,
    "threshold": 75,
    "severity": "high"
  }
}`}
              </pre>
              <div className="px-6 py-5 border-t border-white/10">
                <p className="text-white/70 text-xs leading-relaxed">
                  Typical events include{" "}
                  <span className="text-white font-bold">reading.created</span>,{" "}
                  <span className="text-white font-bold">alert.triggered</span>,
                  and{" "}
                  <span className="text-white font-bold">device.status</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Inquiry / Contact ── */}

      {/* ── Use Cases / Industries ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-200">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold tracking-widest uppercase text-red-600">
                  Use cases / Industries
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                Built for{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">real-world</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-red-100 -z-0 rounded" />
                </span>{" "}
                operations
              </h2>
            </div>
            <p className="text-gray-500 text-base leading-relaxed max-w-sm md:text-right">
              SFPL Connect adapts to different sectors where live monitoring and
              fast response matter.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative">
              <div className="absolute -inset-5 bg-gradient-to-br from-red-100/40 via-transparent to-gray-200/40 blur-2xl rounded-[2rem]" />
              <div className="relative space-y-4">
                <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 text-white p-6 shadow-xl ring-1 ring-black/10">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-red-200">
                      Cross-industry platform
                    </p>
                    <span className="rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/80">
                      Multi-site ready
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold leading-tight tracking-tight">
                    One platform. Many operations.
                  </h3>
                  <p className="mt-3 text-sm text-white/75 leading-relaxed">
                    Deploy the same SFPL Connect stack across plants, utilities,
                    and facilities while keeping dashboards and alerts tailored
                    per site.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "Live telemetry",
                      "Custom alerts",
                      "Pin-level calibration",
                    ].map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {useCases.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className={`rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 ${
                          i % 2 === 0
                            ? "bg-white border-gray-100 shadow-md hover:shadow-lg"
                            : "bg-gray-50 border-red-100 shadow-sm hover:shadow-md"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
                          <Icon className="w-5 h-5 text-red-600" />
                        </div>
                        <p className="font-extrabold text-gray-900 text-sm mb-2">
                          {item.title}
                        </p>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <Image
                src="/images/pages/connect/usercase.png"
                alt="SFPL Connect use cases across multiple buildings and industry sites"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <ConnectStoreCatalog />

      {/* FAQ — matches Cloud / hardware section rhythm */}
    </section>
  );
}
