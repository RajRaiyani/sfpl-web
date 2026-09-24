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
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

interface HighlightItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface PlatformPillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

const highlights: HighlightItem[] = [
  {
    icon: LayoutDashboard,
    title: "Real-time Admin Portal",
    description: "Manage devices and projects from one unified dashboard.",
  },
  {
    icon: Bell,
    title: "Custom Alerts",
    description:
      "Set threshold-based alerts per device and project for faster response.",
  },
  {
    icon: Gauge,
    title: "Live Monitoring",
    description:
      "Track telemetry in real time with continuously updating data.",
  },
  {
    icon: MapPin,
    title: "Integrated Map View",
    description:
      "Visualize distributed devices and sites through location-aware monitoring.",
  },
];

const platformPillars: PlatformPillar[] = [
  {
    icon: Cpu,
    title: "Hardware",
    description: "Rugged IoT device with multi-pin sensor input.",
  },
  {
    icon: Monitor,
    title: "Web Portal",
    description: "Live dashboards, map tracking and project controls.",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "On-the-go monitoring and instant alert visibility.",
  },
];

export default function ConnectHighlights() {
  return (
    <section
      aria-labelledby="connect-heading"
      className="relative overflow-hidden bg-white py-14 sm:py-16 md:py-20"
    >
      <div
        className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-gray-200/60 blur-3xl"
        aria-hidden
      />

      <div className="container mx-auto px-4">
        <div className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 text-white shadow-2xl ring-1 ring-black/10 sm:mb-12 sm:rounded-3xl">
          <div
            className="absolute inset-0 opacity-20"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #ef4444 1px, transparent 1px), radial-gradient(circle at 80% 70%, #ffffff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative grid grid-cols-1 gap-8 p-6 sm:p-8 md:p-10 lg:grid-cols-2">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest text-red-100 uppercase">
                <Cpu className="h-3.5 w-3.5" aria-hidden />
                Smart Monitoring Platform
              </p>
              <h2
                id="connect-heading"
                className="text-3xl leading-tight font-extrabold tracking-tight md:text-5xl"
              >
                SFPL CONNECT{" "}
                <span className="text-red-200">in one powerful view</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                Industrial IoT hardware + secure cloud stack with live
                telemetry, project-wise control, map visibility and instant
                alerts.
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {[
                  "Live telemetry",
                  "Threshold alerts",
                  "Site mapping",
                  "Project dashboards",
                ].map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90"
                  >
                    {chip}
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {platformPillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur"
                    >
                      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                        <Icon className="h-4 w-4 text-red-200" aria-hidden />
                      </div>
                      <p className="text-xs font-extrabold tracking-wide text-white uppercase">
                        {pillar.title}
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed text-white/75">
                        {pillar.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7">
                <Link
                  href="/connect"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3 font-bold text-white shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                >
                  Explore SFPL CONNECT
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[280px] overflow-hidden rounded-2xl bg-black/20 p-4 ring-1 ring-white/10 sm:min-h-[340px] md:min-h-[390px] md:p-5">
              <div
                className="absolute inset-0 opacity-35"
                aria-hidden
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, #ef444466 0%, transparent 45%), radial-gradient(circle at 80% 75%, #ffffff22 0%, transparent 40%)",
                }}
              />

              <div className="relative h-full">
                <p className="absolute top-0 left-0 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold tracking-widest text-white/85 uppercase">
                  Web Portal Mockup
                </p>

                <div className="absolute top-8 right-14 left-0 overflow-hidden rounded-xl border border-white/15 bg-slate-950 shadow-2xl">
                  <div
                    className="flex h-4 items-center justify-between border-b border-white/10 bg-black/70 px-3"
                    aria-hidden
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    </div>
                    <span className="w-10" />
                  </div>
                  <Image
                    src="/images/pages/connect/admin-portal-1.png"
                    alt="SFPL CONNECT web portal dashboard"
                    width={1200}
                    height={760}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>

                <div className="absolute right-0 bottom-2 w-[36%] max-w-[170px] overflow-hidden rounded-lg border border-white/20 bg-slate-950 shadow-2xl">
                  <div className="h-4 bg-black/70" aria-hidden />
                  <Image
                    src="/images/pages/connect/admin-portal-mobile-1.png"
                    alt="SFPL CONNECT mobile app"
                    width={420}
                    height={900}
                    className="h-auto w-full object-cover"
                    sizes="180px"
                  />
                </div>

                <div className="absolute right-[26%] bottom-8 w-[30%] max-w-[140px] overflow-hidden rounded-lg border border-white/15 bg-slate-950 shadow-xl">
                  <div className="h-3.5 bg-black/60" aria-hidden />
                  <Image
                    src="/images/pages/connect/admin-portal-mobile-2.png"
                    alt="SFPL CONNECT mobile alerts"
                    width={420}
                    height={900}
                    className="h-auto w-full object-cover"
                    sizes="150px"
                  />
                </div>

                <div className="absolute right-0 bottom-0 left-0 pt-14">
                  <div className="rounded-xl border border-white/15 bg-black/35 px-4 py-3 backdrop-blur">
                    <p className="mb-1 text-[10px] font-bold tracking-widest text-red-200 uppercase">
                      Hardware + Web + Mobile
                    </p>
                    <p className="text-sm font-semibold text-white/95">
                      Device → Cloud → Web Portal &amp; Mobile App
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className={`group rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 sm:p-6 ${
                  index % 2 === 0
                    ? "border-gray-100 bg-white shadow-md hover:shadow-xl"
                    : "border-red-100 bg-gray-50 shadow-sm hover:shadow-lg"
                }`}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-red-100 bg-red-50 transition-colors group-hover:bg-red-100">
                  <Icon
                    className="h-5 w-5 text-red-600 transition-transform group-hover:scale-110"
                    aria-hidden
                  />
                </div>
                <h3 className="mb-2 text-base font-extrabold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
