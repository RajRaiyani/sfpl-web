import Image from "next/image";
import { Smartphone, Bell, ShieldCheck, Radio } from "lucide-react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.specificfire.sfpl&pcampaignid=web_share";
const APP_STORE_URL =
  "https://apps.apple.com/vn/app/specific-fire/id6761681939";

const APP_SCREENSHOTS = [
  {
    src: "/images/pages/connect/app/1.webp",
    alt: "Specific Fire app — live sensor monitoring",
  },
  {
    src: "/images/pages/connect/app/2.webp",
    alt: "Specific Fire app — device status overview",
  },
  {
    src: "/images/pages/connect/app/3.webp",
    alt: "Specific Fire app — real-time alerts",
  },
  {
    src: "/images/pages/connect/app/4.webp",
    alt: "Specific Fire app — facility monitoring",
  },
];

const APP_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Secure login",
    description: "Authorized persons only — no public registration.",
  },
  {
    icon: Radio,
    title: "Live sensor data",
    description: "Read-only status and readings from connected facilities.",
  },
  {
    icon: Bell,
    title: "Instant alerts",
    description: "Real-time notifications when safety events are detected.",
  },
];

function PlayStoreBadge({ href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 rounded-xl bg-gray-900 px-4 py-3 text-white shadow-lg shadow-gray-300/60 transition-all hover:-translate-y-0.5 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
      aria-label="Get Specific Fire on Google Play"
    >
      <svg
        className="h-7 w-7 shrink-0"
        viewBox="0 0 24 24"
        aria-hidden
        fill="currentColor"
      >
        <path d="M3.6 2.3c-.3.2-.5.6-.5 1.1v17.2c0 .5.2.9.5 1.1l.1.1 9.6-9.6v-.3L3.7 2.2l-.1.1zm12.2 7L12.5 12l3.3 2.7 3.9-2.2c1.1-.6 1.1-1.6 0-2.2l-3.9-2zM4.1 21.6l9.1-9.1 2.7 2.7-10.5 6c-.5.3-1 .2-1.3.4zm9.1-10.1L4.1 2.4c.3.1.8 0 1.3.3l10.5 6-2.7 2.8z" />
      </svg>
      <span className="text-left leading-tight">
        <span className="block text-[10px] font-medium uppercase tracking-wide text-white/70">
          Get it on
        </span>
        <span className="block text-sm font-bold tracking-tight">
          Google Play
        </span>
      </span>
    </a>
  );
}

function AppStoreBadge({ href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 rounded-xl bg-gray-900 px-4 py-3 text-white shadow-lg shadow-gray-300/60 transition-all hover:-translate-y-0.5 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
      aria-label="Download Specific Fire on the App Store"
    >
      <svg
        className="h-7 w-7 shrink-0"
        viewBox="0 0 24 24"
        aria-hidden
        fill="currentColor"
      >
        <path d="M18.7 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9-.7 0-1.9-.8-3.1-.8-1.6 0-3.1 1-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.6.8 1.1 1.7 2.4 3 2.3 1.2-.1 1.6-.7 3.1-.7s1.8.7 3.1.7c1.3 0 2.1-1.1 2.9-2.2.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.5-1-2.7-3.3zm-2.5-7.4c.6-.8 1.1-1.9.9-3-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-.9 2.9 1 .1 2-.5 2.6-1.3z" />
      </svg>
      <span className="text-left leading-tight">
        <span className="block text-[10px] font-medium uppercase tracking-wide text-white/70">
          Download on the
        </span>
        <span className="block text-sm font-bold tracking-tight">
          App Store
        </span>
      </span>
    </a>
  );
}

export default function MobileAppSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gray-100 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-200">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold tracking-widest text-red-600">
                Mobile Application
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Monitor on the{" "}
              <span className="relative inline-block">
                <span className="relative z-10">go</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-red-100 -z-0 rounded" />
              </span>
            </h2>
          </div>
          <p className="text-gray-500 text-base leading-relaxed max-w-sm md:text-right">
            Live fire safety sensor status and instant alerts — right from your
            phone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* App info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl shadow-xl shadow-red-200/60 ring-1 ring-black/5">
                <Image
                  src="/logos/app-logo.svg"
                  alt="Specific Fire app icon"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-red-600 mb-1">
                  Available now
                </p>
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  Specific Fire
                </h3>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                  Official mobile companion for SFPL CONNECT monitoring.
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-base leading-relaxed">
              Take SFPL CONNECT with you — live sensor readings and instant
              alerts on your phone, so you can monitor fire safety systems from
              anywhere, anytime.
            </p>

            <div className="space-y-3">
              {APP_FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4"
                  >
                    <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        {feature.title}
                      </p>
                      <p className="text-gray-500 text-xs leading-relaxed mt-0.5">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              <PlayStoreBadge href={PLAY_STORE_URL} />
              <AppStoreBadge href={APP_STORE_URL} />
            </div>
          </div>

          {/* Screenshots */}
          <div className="lg:col-span-7">
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-red-100/60 via-transparent to-gray-100/60 blur-2xl -z-10 pointer-events-none" />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 items-end">
                {APP_SCREENSHOTS.map((shot, idx) => (
                  <div
                    key={shot.src}
                    className={`rounded-[1.75rem] bg-gray-900 p-1.5 shadow-2xl shadow-gray-300/80 ring-1 ring-black/10 ${
                      idx % 2 === 1 ? "sm:translate-y-6" : ""
                    }`}
                  >
                    <div className="relative rounded-[1.4rem] overflow-hidden bg-black">
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-black/80 rounded-full z-10" />
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={460}
                        height={996}
                        className="w-full h-auto object-cover"
                        sizes="(min-width: 1024px) 12vw, 40vw"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
