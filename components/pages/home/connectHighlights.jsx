"use client";

import Image from "next/image";
import {
  Bell,
  Gauge,
  LayoutDashboard,
  MapPin,
  ArrowRight,
  Cpu,
  Monitor,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

export default function ConnectHighlights() {
  const highlights = [
    {
      icon: LayoutDashboard,
      title: "Real-time admin portal",
      description: "Manage devices and projects from one unified dashboard.",
    },
    {
      icon: Bell,
      title: "Custom alerts",
      description:
        "Set threshold-based alerts per device and project for faster response.",
    },
    {
      icon: Gauge,
      title: "Live monitoring",
      description:
        "Track telemetry in real time with continuously updating data.",
    },
    {
      icon: MapPin,
      title: "Integrated map view",
      description:
        "Visualize distributed devices and sites through location-aware monitoring.",
    },
  ];
  const platformPillars = [
    {
      icon: Cpu,
      title: "Hardware",
      description: "Rugged IoT device with multi-pin sensor input.",
    },
    {
      icon: Monitor,
      title: "Web Portal",
      description: "Live dashboards, map tracking, and project controls.",
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "On-the-go monitoring and instant alert visibility.",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-gray-200/60 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="relative mb-12 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 text-white shadow-2xl ring-1 ring-black/10">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #ef4444 1px, transparent 1px), radial-gradient(circle at 80% 70%, #ffffff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-red-100 mb-5">
                <Cpu className="w-3.5 h-3.5" />
                Smart Monitoring Platform
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
                SFPL Connect{" "}
                <span className="text-red-200">in one powerful view</span>
              </h2>
              <p className="mt-4 text-white/80 text-sm md:text-base leading-relaxed max-w-xl">
                Industrial IoT hardware + secure cloud stack with live
                telemetry, project-wise control, map visibility, and instant
                alerts.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Live telemetry",
                  "Threshold alerts",
                  "Site mapping",
                  "Project dashboards",
                ].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {platformPillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur px-4 py-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center mb-2">
                        <Icon className="w-4 h-4 text-red-200" />
                      </div>
                      <p className="text-xs font-extrabold tracking-wide uppercase text-white">
                        {pillar.title}
                      </p>
                      <p className="mt-1 text-[11px] text-white/75 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7">
                <Link
                  href="/connect"
                  className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-7 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Explore SFPL Connect
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black/20 min-h-[390px] p-4 md:p-5">
              <div
                className="absolute inset-0 opacity-35"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, #ef444466 0%, transparent 45%), radial-gradient(circle at 80% 75%, #ffffff22 0%, transparent 40%)",
                }}
              />

              <div className="relative h-full">
                <div className="absolute top-0 left-0 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white/85">
                  Web Portal Mockup
                </div>

                <div className="absolute top-8 left-0 right-14 rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-slate-950">
                  <div className="h-4 px-3 bg-black/70 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    </div>

                    <span className="w-10" />
                  </div>
                  <Image
                    src="/images/pages/connect/admin-portal-1.png"
                    alt="SFPL Connect web portal dashboard mockup"
                    width={1200}
                    height={760}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>

                <div className="absolute bottom-2 right-0 w-[36%] max-w-[170px] rounded-lg overflow-hidden border border-white/20 shadow-2xl bg-slate-950">
                  <div className="h-4 bg-black/70" />
                  <Image
                    src="/images/pages/connect/admin-portal-mobile-1.png"
                    alt="SFPL Connect mobile app mockup"
                    width={420}
                    height={900}
                    className="w-full h-auto object-cover"
                    sizes="180px"
                  />
                </div>

                <div className="absolute bottom-8 right-[26%] w-[30%] max-w-[140px] rounded-lg overflow-hidden border border-white/15 shadow-xl bg-slate-950">
                  <div className="h-3.5 bg-black/60" />
                  <Image
                    src="/images/pages/connect/admin-portal-mobile-2.png"
                    alt="SFPL Connect mobile alerts mockup"
                    width={420}
                    height={900}
                    className="w-full h-auto object-cover"
                    sizes="150px"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 pt-14">
                  <div className="rounded-xl border border-white/15 bg-black/35 backdrop-blur px-4 py-3">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-red-200 mb-1">
                      Hardware + Web + Mobile
                    </p>
                    <p className="text-sm font-semibold text-white/95">
                      Device -&gt; Cloud -&gt; Web Portal &amp; Mobile App
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  index % 2 === 0
                    ? "bg-white border-gray-100 shadow-md hover:shadow-xl"
                    : "bg-gray-50 border-red-100 shadow-sm hover:shadow-lg"
                }`}
              >
                <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                  <Icon className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-base font-extrabold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
