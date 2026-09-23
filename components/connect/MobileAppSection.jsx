import Image from "next/image";
import {
  Smartphone,
  Bell,
  ShieldCheck,
  Radio,
  Download,
  ExternalLink,
  Share,
} from "lucide-react";

const PORTAL_URL = "https://connectio.specificfire.com";
const DOWNLOAD_URL = "https://connectio.specificfire.com/download";

const APP_SCREENSHOTS = [
  {
    src: "/images/pages/connect/app/1.webp",
    alt: "ConnectIO app — home overview",
  },
  {
    src: "/images/pages/connect/app/2.webp",
    alt: "ConnectIO app — device monitoring",
  },
  {
    src: "/images/pages/connect/app/3.webp",
    alt: "ConnectIO app — live dashboards",
  },
  {
    src: "/images/pages/connect/app/4.webp",
    alt: "ConnectIO app — map and alerts",
  },
];

const APP_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Secure login",
    description: "Sign in with your ConnectIO account — same credentials as the web portal.",
  },
  {
    icon: Radio,
    title: "Live sensor data",
    description: "Monitor device status and readings from connected facilities on the go.",
  },
  {
    icon: Bell,
    title: "Instant alerts",
    description: "Real-time notifications when safety events are detected.",
  },
];

export default function MobileAppSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-gray-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center shadow-lg shadow-teal-200">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold tracking-widest text-teal-700">
                Mobile Application
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Monitor on the{" "}
              <span className="relative inline-block">
                <span className="relative z-10">go</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-teal-100 -z-0 rounded" />
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
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[22%] ring-1 ring-black/5">
                <Image
                  src="/logos/connectio-icon.svg"
                  alt="ConnectIO app icon"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-teal-700 mb-1">
                  Available now
                </p>
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  Connect<span className="text-teal-700">IO</span>
                </h3>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                  Official mobile companion for SFPL CONNECT monitoring.
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-base leading-relaxed">
              Take ConnectIO with you — live sensor readings and instant alerts
              on your phone, so you can monitor fire safety systems from
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
                    <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-teal-700" />
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

            {/* Get started — download */}
            <div className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-teal-700 flex items-center justify-center">
                  <Download className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-extrabold text-gray-900">
                  Get started — install on phone
                </p>
              </div>
              <ol className="space-y-2.5 text-sm text-gray-600 leading-relaxed">
                <li className="flex gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-700 text-[10px] font-bold text-white">
                    1
                  </span>
                  <span>
                    On your phone, open{" "}
                    <a
                      href={DOWNLOAD_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-teal-700 hover:underline break-all"
                    >
                      connectio.specificfire.com/download
                    </a>
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-700 text-[10px] font-bold text-white">
                    2
                  </span>
                  <span className="flex flex-wrap items-center gap-x-1">
                    <span className="inline-flex items-center gap-1">
                      <strong className="font-semibold text-gray-800">iPhone:</strong>
                      Share
                      <Share className="inline h-3.5 w-3.5 text-teal-700" aria-hidden />
                      → Add to Home Screen
                    </span>
                    <span className="text-gray-400">·</span>
                    <span>
                      <strong className="font-semibold text-gray-800">Android:</strong>{" "}
                      Chrome menu → Install app
                    </span>
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-700 text-[10px] font-bold text-white">
                    3
                  </span>
                  <span>
                    Open ConnectIO from your home screen and sign in
                  </span>
                </li>
              </ol>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Download for mobile
                </a>
                <a
                  href={PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-teal-200 bg-white px-4 py-3 text-sm font-bold text-teal-800 transition-all hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2"
                >
                  Open web portal
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
          </div>

          {/* Screenshots */}
          <div className="lg:col-span-7">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-100/25 via-transparent to-gray-100/25 blur-xl -z-10 pointer-events-none" />

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
