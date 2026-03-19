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
  Wifi,
  Gauge,
  Plug,
  Send,
  Code2,
  KeyRound,
  Webhook,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import HowItWorksSteps from "@/components/connect/HowItWorksSteps";
import CloudPlatformShowcase from "@/components/connect/CloudPlatformShowcase";

export const metadata = {
  title: "SFPL Connect | IoT Monitoring & Real-Time Dashboard",
  description:
    "SFPL Connect - IoT devices with multi-pin input, real-time admin portal, live monitoring dashboards, integrated map, custom calibration and alerts. Highly modular and customizable.",
};

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
      title: "Commercial Buildings",
      description:
        "Monitor DG/UPS, HVAC metrics, and critical electrical parameters across sites.",
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
                End-to-End Architecture
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
                Built for{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">industrial-grade</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-red-100 -z-0 rounded" />
                </span>{" "}
                input
              </h2>
            </div>
            <p className="text-gray-500 text-base leading-relaxed max-w-sm md:text-right">
              Every pin, slot, and connector is purposefully designed to handle
              real-world electrical environments with precision.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mx-auto">
            {/* Spec breakdown */}
            <div className="space-y-5">
              <p className="text-gray-600 text-base leading-relaxed">
                The SFPL Connect device is a compact, DIN-rail mountable IoT
                unit. Inside the rugged enclosure sits a custom PCB with
                screw-terminal I/O blocks, making field wiring fast and
                reliable.
              </p>

              {/* Pin groups */}
              <div className="space-y-3">
                {/* AC Voltage */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-gray-900 text-sm">
                          AC Voltage Input
                        </p>
                        <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          3 pins
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed mb-3">
                        Three-phase monitoring (R · Y · B) for AC voltage
                        measurement across all phases simultaneously.
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
                            {phase}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* AC Current */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Gauge className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-gray-900 text-sm">
                          AC Current Input
                        </p>
                        <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                          6 pins
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed mb-3">
                        Six current input pins covering two full three-phase
                        sets (R · Y · B × 2) for dual-circuit or multi-load
                        current monitoring.
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {["R1", "Y1", "B1", "R2", "Y2", "B2"].map((pin, i) => (
                          <span
                            key={pin}
                            className={`w-9 h-8 rounded-lg flex items-center justify-center text-[10px] font-extrabold text-white ${
                              i % 3 === 0
                                ? "bg-red-500"
                                : i % 3 === 1
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                            }`}
                          >
                            {pin}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* General Purpose */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Plug className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-gray-900 text-sm">
                          General Purpose Pins
                        </p>
                        <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          8 pins
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed mb-3">
                        Eight configurable input pins for any sensor type —
                        pressure, level, temperature, flow, and more. Each pin
                        supports custom calibration in the portal.
                      </p>
                      <div className="grid grid-cols-8 gap-1">
                        {Array.from({ length: 8 }, (_, i) => (
                          <span
                            key={i}
                            className="h-7 rounded-md bg-green-600 flex items-center justify-center text-[9px] font-bold text-white"
                          >
                            P{i + 1}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connectivity */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                      <Wifi className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-gray-900 text-sm">
                          Cellular Connectivity
                        </p>
                        <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                          SIM + Antenna
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Built-in SIM card slot and external antenna port for
                        reliable cellular internet — no local Wi-Fi or Ethernet
                        required. Works anywhere with mobile signal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blueprint image */}
            <div className="relative overflow-hidden ">
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
                className="relative z-10 w-full h-auto object-contain "
              />
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
      <section
        className="py-10 relative overflow-hidden bg-white"
        style={{
          backgroundSize: "32px 32px",
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto">
            <div className="relative overflow-hidden">
              {/* unique “cut” header strip */}
              <div className="relative rounded-3xl bg-gray-900 text-white">
                <div
                  className="absolute inset-0 opacity-[0.18]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 18% 28%, #ef4444 1px, transparent 1px), radial-gradient(circle at 78% 42%, #ffffff 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />
                <div className="relative px-8 sm:px-10 py-10 sm:py-12">
                  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-900/30">
                          <Send className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-bold tracking-widest uppercase text-red-200">
                          Get in touch
                        </span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight">
                        Tell us what you want to{" "}
                        <span className="text-red-200">monitor</span>.
                      </h2>
                      <p className="mt-4 text-white/75 text-sm sm:text-base leading-relaxed max-w-2xl">
                        Share your site details and sensor needs — we’ll
                        recommend the right device configuration and set you up
                        with a live portal walkthrough.
                      </p>
                    </div>

                    <div className="flex flex-col items-start lg:items-end gap-4">
                      <div className="flex flex-wrap gap-2">
                        {[
                          { k: "Response", v: "≤ 1 business day" },
                          { k: "Setup", v: "Guided onboarding" },
                          { k: "Scale", v: "Single to multi-site" },
                        ].map((s) => (
                          <div
                            key={s.k}
                            className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur px-4 py-3"
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

                      <Link
                        href="/contact"
                        className="relative inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-extrabold py-4 sm:py-5 px-7 sm:px-10 rounded-2xl transition-all duration-200 text-base sm:text-lg w-full  hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                      >
                        <span className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-[radial-gradient(ellipse_at_top,#ffffff2a,transparent_55%)]" />
                        Inquiry now
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </section>
  );
}
