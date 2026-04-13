import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { deviceFaqs, portalFaqs } from "@/data/iot-faq-items";
import { buildPageMetadata } from "@/lib/seo";
import { FaqAccordion } from "./faq-accordion";

export const metadata = buildPageMetadata({
  title: "IoT device & monitoring portal — FAQ",
  description:
    "Frequently asked questions about the SFPL IoT field device and the monitoring portal: hardware, inputs, connectivity, sign-in, projects, devices, and support.",
  path: "/tech/iot-faq",
  image: "/logo-full-black.svg",
});

const toc = [
  { id: "iot-device", label: "IoT device" },
  { id: "monitoring-portal", label: "Monitoring portal" },
] as const;

export default function IotFaqPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="font-mono text-xs text-gray-500 sm:text-sm">
            <Link href="/" className="transition-colors hover:text-red-600">
              Home
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <Link href="/tech" className="transition-colors hover:text-red-600">
              Tech
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-900">FAQ</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="mx-auto max-w-6xl lg:flex lg:items-start lg:gap-10">
          <aside className="mb-8 lg:mb-0 lg:w-52 lg:shrink-0 xl:w-56">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-24">
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-red-600">
                On this page
              </p>
              <ul className="space-y-2 font-mono text-xs text-gray-600">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block rounded px-1 py-0.5 transition-colors hover:bg-red-50 hover:text-red-700"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="border-t border-gray-100 pt-2 mt-2">
                  <Link
                    href="/tech/iot-device-spec"
                    className="block rounded px-1 py-0.5 transition-colors hover:bg-red-50 hover:text-red-700"
                  >
                    Device specification
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          <article className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white shadow-sm">
            <header
              id="top"
              className="border-b border-gray-100 bg-gray-50/80 px-6 py-6 sm:px-8 sm:py-8"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded border border-red-200 bg-red-50 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-red-700">
                <HelpCircle className="h-3.5 w-3.5" aria-hidden />
                Help
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Frequently asked questions
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
                Answers about the SFPL IoT field device and the monitoring
                portal. For certified hardware documentation, see the technical
                specification.
              </p>
            </header>

            <div className="space-y-10 px-6 py-8 sm:px-8 sm:py-10">
              <section id="iot-device" className="scroll-mt-24">
                <h2 className="mb-6 border-b border-gray-100 pb-2 text-xl font-semibold text-gray-900">
                  IoT device
                </h2>
                <FaqAccordion items={deviceFaqs} />
              </section>

              <section id="monitoring-portal" className="scroll-mt-24">
                <h2 className="mb-6 border-b border-gray-100 pb-2 text-xl font-semibold text-gray-900">
                  Monitoring portal
                </h2>
                <FaqAccordion items={portalFaqs} />
              </section>
            </div>

            <footer className="border-t border-gray-100 bg-gray-50/50 px-6 py-4 sm:px-8">
              <p className="font-mono text-[10px] text-gray-500">
                Still need help?{" "}
                <Link
                  href="/contact"
                  className="text-red-600 underline-offset-2 hover:text-red-700 hover:underline"
                >
                  Contact SFPL
                </Link>
                {" · "}
                <Link
                  href="/tech/iot-device-spec"
                  className="text-red-600 underline-offset-2 hover:text-red-700 hover:underline"
                >
                  IoT device specification
                </Link>
              </p>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
}
