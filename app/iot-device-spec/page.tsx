import Image from "next/image";
import Link from "next/link";
import { FileText, Radio, Battery } from "lucide-react";
import { IotDeviceSpecPdfDownloadButton } from "@/components/iot-device-spec/iot-device-spec-pdf-download";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "IoT device — technical specification",
  description:
    "Technical specification for the SFPL IoT monitoring device: enclosure, 17 input channels, connectivity, and power backup.",
  path: "/tech/iot-device-spec",
  image: "/logo-full-black.svg",
});

const toc = [
  { id: "document", label: "Document" },
  { id: "physical", label: "Physical" },
  { id: "pin-overview", label: "I/O overview" },
  { id: "figures", label: "Figures" },
  { id: "power-supply", label: "Power input" },
  { id: "ac-high", label: "AC high-voltage" },
  { id: "ac-low", label: "AC low-voltage (CT)" },
  { id: "analog", label: "Analog inputs" },
  { id: "hardware", label: "Hardware" },
] as const;

export default function IotDeviceSpecPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-xs sm:text-sm text-gray-500 font-mono">
            <Link href="/" className="hover:text-red-600 transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <Link href="/tech" className="hover:text-red-600 transition-colors">
              Tech
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-900">IoT device specification</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="mx-auto max-w-6xl lg:flex lg:items-start lg:gap-10">
          <aside className="mb-8 lg:mb-0 lg:w-52 lg:shrink-0 xl:w-56">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-24">
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-red-600">
                Index
              </p>
              <ul className="space-y-1 font-mono text-xs text-gray-600">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block rounded px-1 py-0.5 hover:bg-red-50 hover:text-red-700 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <article className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white shadow-sm">
            <header
              id="document"
              className="border-b border-gray-100 bg-gray-50/80 px-6 py-6 sm:px-8 sm:py-8 scroll-mt-24"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div className="min-w-0">
                  <div className="mb-4 inline-flex items-center gap-2 rounded border border-red-200 bg-red-50 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-red-700">
                    <FileText className="h-3.5 w-3.5" />
                    Technical specification
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    IoT monitoring device
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
                    Field monitoring unit for electrical and process signals.
                    This document summarizes mechanical, electrical I/O, and
                    core hardware characteristics.
                  </p>
                </div>
                <div className="shrink-0 sm:pt-1">
                  <IotDeviceSpecPdfDownloadButton />
                </div>
              </div>
              <dl className="mt-6 grid gap-3 border-t border-gray-200 pt-6 font-mono text-xs text-gray-600 sm:grid-cols-3">
                <div>
                  <dt className="text-gray-400">Product</dt>
                  <dd className="mt-0.5 text-gray-900">SFPL IoT device</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Revision</dt>
                  <dd className="mt-0.5 text-gray-900">Web — summary</dd>
                </div>
                <div>
                  <dt className="text-gray-400">I/O total</dt>
                  <dd className="mt-0.5 text-gray-900">17 inputs</dd>
                </div>
              </dl>
            </header>

            <div className="prose prose-sm max-w-none px-6 py-6 sm:px-8 sm:py-8 prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600">
              <section
                id="physical"
                className="scroll-mt-24 border-b border-gray-100 pb-8"
              >
                <h2 className="mb-4 text-lg sm:text-xl">
                  <span className="mr-2 font-mono text-sm font-semibold text-red-600">
                    1.
                  </span>
                  Physical specification
                </h2>
                <div className="overflow-x-auto rounded border border-gray-200 bg-gray-50/50 font-mono text-xs">
                  <table className="w-full min-w-[280px] text-left">
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <th className="whitespace-nowrap px-4 py-2.5 font-medium text-gray-500">
                          Enclosure
                        </th>
                        <td className="px-4 py-2.5 text-gray-900">ABS</td>
                      </tr>
                      <tr>
                        <th className="whitespace-nowrap px-4 py-2.5 font-medium text-gray-500">
                          Footprint (W × D X H)
                        </th>
                        <td className="px-4 py-2.5 text-gray-900">
                          165&nbsp;mm × 155&nbsp;mm × 36&nbsp;mm
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section
                id="pin-overview"
                className="scroll-mt-24 border-b border-gray-100 py-8"
              >
                <h2 className="mb-4 text-lg sm:text-xl">
                  <span className="mr-2 font-mono text-sm font-semibold text-red-600">
                    2.
                  </span>
                  Input pin overview
                </h2>
                <p>
                  The device exposes seventeen dedicated input connections,
                  grouped by signal type for supply, mains-level AC, low-level
                  AC (for external sensors such as CTs), and general-purpose DC
                  analog sensing.
                </p>
                <div className="not-prose mt-4 overflow-x-auto rounded border border-gray-200 font-mono text-xs">
                  <table className="w-full min-w-[320px] text-left">
                    <thead className="bg-gray-900 text-white">
                      <tr>
                        <th className="px-3 py-2 font-medium">Group</th>
                        <th className="px-3 py-2 font-medium">Count</th>
                        <th className="px-3 py-2 font-medium">Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="px-3 py-2 text-gray-900">Power</td>
                        <td className="px-3 py-2 text-gray-700">1</td>
                        <td className="px-3 py-2 text-gray-700">
                          Device supply (DC)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-gray-900">AC high</td>
                        <td className="px-3 py-2 text-gray-700">3</td>
                        <td className="px-3 py-2 text-gray-700">
                          Line / phase voltage
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-gray-900">AC low</td>
                        <td className="px-3 py-2 text-gray-700">3</td>
                        <td className="px-3 py-2 text-gray-700">
                          CT or low-AC sensing
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-gray-900">Analog DC</td>
                        <td className="px-3 py-2 text-gray-700">9</td>
                        <td className="px-3 py-2 text-gray-700">
                          0–30&nbsp;V sensors
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section
                id="figures"
                className="scroll-mt-24 border-b border-gray-100 py-8"
              >
                <p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-red-600">
                  Figures
                </p>
                <h2 className="mb-4 text-lg sm:text-xl">Reference diagrams</h2>
                <p className="mb-6">
                  Illustrations of the enclosure and interface layout. Use
                  together with the pin grouping table above when planning field
                  wiring.
                </p>
                <div className="not-prose space-y-8">
                  <figure className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 sm:p-5">
                    <div className="relative mx-auto aspect-[2142/1566] w-full max-h-[min(72vh,560px)]">
                      <Image
                        src="/images/pages/docs/diagram-1.svg"
                        alt="SFPL IoT device: enclosure and interface diagram 1"
                        fill
                        className="object-contain object-top"
                        sizes="(max-width: 768px) 100vw, min(896px, 90vw)"
                        priority
                        unoptimized
                      />
                    </div>
                    <figcaption className="mt-3 border-t border-gray-200 pt-3 font-mono text-[11px] text-gray-500">
                      Figure 1 — Device overview / interface layout
                    </figcaption>
                  </figure>
                  <figure className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 sm:p-5">
                    <div className="relative mx-auto aspect-[2183/2059] w-full max-h-[min(72vh,560px)]">
                      <Image
                        src="/images/pages/docs/diagram-2.svg"
                        alt="SFPL IoT device: enclosure and connectivity diagram 2"
                        fill
                        className="object-contain object-top"
                        sizes="(max-width: 768px) 100vw, min(896px, 90vw)"
                        unoptimized
                      />
                    </div>
                    <figcaption className="mt-3 border-t border-gray-200 pt-3 font-mono text-[11px] text-gray-500">
                      Figure 2 — Device overview (alternate view)
                    </figcaption>
                  </figure>
                </div>
              </section>

              <section
                id="power-supply"
                className="scroll-mt-24 border-b border-gray-100 py-8"
              >
                <h2 className="mb-4 text-lg sm:text-xl">
                  <span className="mr-2 font-mono text-sm font-semibold text-red-600">
                    3.
                  </span>
                  Input supply (1 pin)
                </h2>
                <p>
                  Powers the internal electronics and radio from an external DC
                  source.
                </p>
                <ul>
                  <li>
                    <strong className="text-gray-800">Rating:</strong>{" "}
                    6–24&nbsp;V DC nominal input range.
                  </li>
                  <li>
                    <strong className="text-gray-800">Usage:</strong> Single
                    supply rail for the complete device; select a source within
                    the rated range and appropriate current capability for your
                    installation.
                  </li>
                </ul>
              </section>

              <section
                id="ac-high"
                className="scroll-mt-24 border-b border-gray-100 py-8"
              >
                <h2 className="mb-4 text-lg sm:text-xl">
                  <span className="mr-2 font-mono text-sm font-semibold text-red-600">
                    4.
                  </span>
                  AC high-voltage inputs (3 pins)
                </h2>
                <p>
                  Isolated high-voltage channels for measuring AC potentials on
                  distribution or branch circuits.
                </p>
                <ul>
                  <li>
                    <strong className="text-gray-800">Rating:</strong> Up to
                    300&nbsp;V AC per channel (as specified for this design).
                  </li>
                  <li>
                    <strong className="text-gray-800">Typical usage:</strong>{" "}
                    Monitoring phase-to-neutral or line-to-line relationships on
                    three-phase supplies (for example R–Y–B phase voltages)
                    where direct mains measurement is required.
                  </li>
                </ul>
              </section>

              <section
                id="ac-low"
                className="scroll-mt-24 border-b border-gray-100 py-8"
              >
                <h2 className="mb-4 text-lg sm:text-xl">
                  <span className="mr-2 font-mono text-sm font-semibold text-red-600">
                    5.
                  </span>
                  AC low-voltage inputs (3 pins)
                </h2>
                <p>
                  Channels intended for low-amplitude AC signals from external
                  transducers rather than direct mains connection.
                </p>
                <ul>
                  <li>
                    <strong className="text-gray-800">Rating:</strong> Up to
                    5&nbsp;V AC at the input.
                  </li>
                  <li>
                    <strong className="text-gray-800">Typical usage:</strong>{" "}
                    Current transformers (CTs) or similar interfaces that
                    deliver a proportional low voltage representing AC current
                    on feeders or phases.
                  </li>
                </ul>
              </section>

              <section
                id="analog"
                className="scroll-mt-24 border-b border-gray-100 py-8"
              >
                <h2 className="mb-4 text-lg sm:text-xl">
                  <span className="mr-2 font-mono text-sm font-semibold text-red-600">
                    6.
                  </span>
                  Analog DC inputs (9 pins)
                </h2>
                <p>
                  General-purpose DC voltage inputs for industrial and building
                  instrumentation.
                </p>
                <ul>
                  <li>
                    <strong className="text-gray-800">Range:</strong>{" "}
                    0–30&nbsp;V DC measurable span (per channel specification).
                  </li>
                  <li>
                    <strong className="text-gray-800">Typical usage:</strong>{" "}
                    Pressure, level, temperature, flow, and other field devices
                    that present a DC voltage proportional to the measured
                    quantity.
                  </li>
                </ul>
              </section>

              <section id="hardware" className="scroll-mt-24 pt-2 pb-2">
                <h2 className="mb-4 text-lg sm:text-xl">
                  <span className="mr-2 font-mono text-sm font-semibold text-red-600">
                    7.
                  </span>
                  Core hardware
                </h2>
                <div className="not-prose space-y-4">
                  <div className="flex gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-700">
                      <Radio className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        Cellular
                      </h3>
                      <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                        GSM module with 2G connectivity and integrated antenna
                        for uplink in covered deployments.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-700">
                      <Battery className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        Battery backup
                      </h3>
                      <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                        Two 3.7&nbsp;V cells with 1700&nbsp;mAh pack capacity,
                        to help maintain operation through short supply
                        interruptions.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <footer className="border-t border-gray-100 bg-gray-50/50 px-6 py-4 sm:px-8">
              <p className="font-mono text-[10px] text-gray-500">
                Specific Fire Protection Limited — technical summary for web.
                For certified drawings or full compliance pack, request through{" "}
                <Link
                  href="/contact"
                  className="text-red-600 hover:text-red-700 underline-offset-2 hover:underline"
                >
                  Contact
                </Link>
                .
              </p>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
}
