import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { IotUserManualPdfDownloadButton } from "@/components/iot-user-manual/iot-user-manual-pdf-download";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "IoT device — user manual",
  description:
    "Simple wiring guide for the SFPL Connect device: 12 V to 24 V power, AC voltage, CT current, and liquid level sensor.",
  path: "/tech/iot-user-manual",
  image: "/logo-full-black.svg",
});

const toc = [
  { id: "document", label: "Overview" },
  { id: "diagrams", label: "Device diagrams" },
  { id: "what-you-need", label: "What you need" },
  { id: "step-1", label: "1. Power (12 V to 24 V)" },
  { id: "step-2", label: "2. AC voltage" },
  { id: "step-3", label: "3. CT current" },
  { id: "step-4", label: "4. Level sensor" },
  { id: "safety", label: "Safety" },
] as const;

const overviewSteps = [
  { n: "1", label: "Power", detail: "12 V to 24 V DC → + / −" },
  { n: "2", label: "Voltage", detail: "AC supply → N B Y R" },
  { n: "3", label: "Current", detail: "CTs on motor lines" },
  { n: "4", label: "Sensor", detail: "Level probe → A1 / A2" },
] as const;

const checklist = [
  "12 V to 24 V DC power supply (adapter)",
  "Access to AC Neutral + 3 phases (if monitoring voltage)",
  "3× CT clamps (if monitoring motor / pump current)",
  "Liquid level sensor (or other 0–30 V DC analog sensor)",
  "Screwdriver for the green terminal screws",
] as const;

const steps = [
  {
    id: "step-1",
    number: "1",
    title: "Connect 12 V to 24 V power",
    plain: "Give the device power first. Without this, nothing else works.",
    image: "/images/pages/docs/d1.svg",
    imageAlt: "12 V to 24 V power supply wired to the + and − terminals",
    aspect: "2195/1449",
    doThis: [
      {
        label: "Find the terminals",
        text: "Look at the far right of the green strip — the last two screws are marked + and −.",
      },
      {
        label: "Connect the adapter",
        text: "Red wire → +. Black wire → −. Tighten both screws.",
      },
      {
        label: "Check",
        text: "This only powers the device. Do not use these pins to measure anything.",
      },
    ],
    warning: null as string | null,
  },
  {
    id: "step-2",
    number: "2",
    title: "Connect AC voltage (optional)",
    plain:
      "Want to see if the AC supply is healthy? Wire Neutral and the three phases here.",
    image: "/images/pages/docs/d2.svg",
    imageAlt: "AC power supply wired to N, B, Y, and R terminals",
    aspect: "2713/1696",
    doThis: [
      {
        label: "Keep power on",
        text: "Leave the supply from Step 1 connected.",
      },
      {
        label: "Match the labels",
        text: "Connect Neutral to N, then Blue / Yellow / Red phases to B, Y, and R.",
      },
      {
        label: "What this does",
        text: "Connect reads supply voltage (up to 300 V AC). It does not power the device.",
      },
    ],
    warning:
      "Mains voltage — switch off / isolate the circuit before connecting. Qualified electrician only.",
  },
  {
    id: "step-3",
    number: "3",
    title: "Connect CTs for motor / pump current (optional)",
    plain:
      "To measure how much current a motor or pump draws, clamp CTs on its power cables.",
    image: "/images/pages/docs/d3.svg",
    imageAlt: "Three CTs on motor lines wired to the Connect current terminals",
    aspect: "2634/2924",
    doThis: [
      {
        label: "Clamp the cables",
        text: "Put one CT around each of the three phase wires going to the motor / pump (not around Neutral).",
      },
      {
        label: "Wire the CT leads",
        text: "Each CT has two thin wires. Connect all six wires to the current terminals in the middle-left group.",
      },
      {
        label: "What this does",
        text: "Connect reads current from the CT secondaries only (low voltage, max 5 V AC).",
      },
    ],
    warning:
      "Never connect mains / phase voltage into the CT terminals — only the small wires from the CT clamps.",
  },
  {
    id: "step-4",
    number: "4",
    title: "Connect a liquid level sensor (optional)",
    plain:
      "To monitor tank or sump level, wire a liquid level sensor to the analog inputs.",
    image: "/images/pages/docs/d4.svg",
    imageAlt: "Liquid level sensor wired to the leftmost analog terminals",
    aspect: "2194/2014",
    doThis: [
      {
        label: "Place the sensor",
        text: "Install the probe in the tank / sump as the sensor maker recommends.",
      },
      {
        label: "Connect two wires",
        text: "Connect black wire to ground and red wire to any general purpose group (1-9) (voltage range: 0V - 30V DC).",
      },
      {
        label: "In the portal",
        text: "After power-up, open SFPL Connect and calibrate the channel (volts → level). Set alerts if needed.",
      },
    ],
    warning: null as string | null,
  },
] as const;

export default function IotUserManualPage() {
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
            <span className="text-gray-900">IoT user manual</span>
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
                <li className="mt-2 border-t border-gray-100 pt-2">
                  <Link
                    href="/iot-device-spec"
                    className="block rounded px-1 py-0.5 transition-colors hover:bg-red-50 hover:text-red-700"
                  >
                    Full tech specs →
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          <article className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white shadow-sm">
            <header
              id="document"
              className="scroll-mt-24 border-b border-gray-100 bg-gray-50/80 px-6 py-6 sm:px-8 sm:py-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div className="min-w-0">
                  <div className="mb-4 inline-flex items-center gap-2 rounded border border-red-200 bg-red-50 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-red-700">
                    <BookOpen className="h-3.5 w-3.5" aria-hidden />
                    How to wire Connect
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Connect wiring guide
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
                    Four simple steps to wire your SFPL Connect device. Follow
                    the pictures — each step adds one connection.
                  </p>
                </div>
                <div className="shrink-0 sm:pt-1">
                  <IotUserManualPdfDownloadButton />
                </div>
              </div>

              <ol className="mt-6 grid gap-2 border-t border-gray-200 pt-6 sm:grid-cols-2 lg:grid-cols-4">
                {overviewSteps.map((s) => (
                  <li key={s.n}>
                    <a
                      href={`#step-${s.n}`}
                      className="flex h-full flex-col rounded-lg border border-gray-200 bg-white px-3 py-3 transition-colors hover:border-red-200 hover:bg-red-50/50"
                    >
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-red-600">
                        Step {s.n}
                      </span>
                      <span className="mt-1 text-sm font-semibold text-gray-900">
                        {s.label}
                      </span>
                      <span className="mt-0.5 font-mono text-[11px] text-gray-500">
                        {s.detail}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </header>

            <div className="px-6 py-6 sm:px-8 sm:py-8">
              <section
                id="diagrams"
                className="scroll-mt-24 border-b border-gray-100 pb-8"
              >
                <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                  Know your device
                </h2>
                <p className="mt-2 mb-6 text-sm text-gray-600">
                  Look at these first so you can find the green terminal strip
                  and pin groups before you start wiring.
                </p>
                <div className="not-prose space-y-8">
                  <figure className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 sm:p-5">
                    <div className="relative mx-auto aspect-[2142/1566] w-full max-h-[min(72vh,560px)]">
                      <Image
                        src="/images/pages/docs/diagram-1.svg"
                        alt="Connect device enclosure and terminal layout"
                        fill
                        className="object-contain object-top"
                        sizes="(max-width: 768px) 100vw, min(896px, 90vw)"
                        unoptimized
                      />
                    </div>
                    <figcaption className="mt-3 border-t border-gray-200 pt-3 text-sm text-gray-600">
                      <span className="font-mono text-[11px] text-gray-500">
                        Diagram A —
                      </span>{" "}
                      Front view: green terminal strip and labeled pin groups
                    </figcaption>
                  </figure>
                  <figure className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 sm:p-5">
                    <div className="relative mx-auto aspect-[2183/2059] w-full max-h-[min(72vh,560px)]">
                      <Image
                        src="/images/pages/docs/diagram-2.svg"
                        alt="Connect device connectivity overview"
                        fill
                        className="object-contain object-top"
                        sizes="(max-width: 768px) 100vw, min(896px, 90vw)"
                        unoptimized
                      />
                    </div>
                    <figcaption className="mt-3 border-t border-gray-200 pt-3 text-sm text-gray-600">
                      <span className="font-mono text-[11px] text-gray-500">
                        Diagram B —
                      </span>{" "}
                      How power, sensors, and cellular connect to the unit
                    </figcaption>
                  </figure>
                </div>
              </section>

              <section
                id="what-you-need"
                className="scroll-mt-24 border-b border-gray-100 py-8"
              >
                <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                  What you need
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Gather these before you open the panel. Steps 2–4 are optional
                  — only wire what you want to monitor.
                </p>
                <ul className="mt-4 space-y-2">
                  {checklist.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-gray-700"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-gray-500">
                  Need exact voltage limits and pin counts? See the{" "}
                  <Link
                    href="/iot-device-spec"
                    className="font-semibold text-red-600 hover:text-red-800"
                  >
                    technical specification
                  </Link>
                  .
                </p>
              </section>

              {steps.map((step) => (
                <section
                  key={step.id}
                  id={step.id}
                  className="scroll-mt-24 border-b border-gray-100 py-8 last:border-b-0"
                >
                  <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-red-600">
                    Step {step.number} of 4
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                    {step.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 sm:text-base">
                    {step.plain}
                  </p>

                  {step.warning ? (
                    <div className="not-prose mt-4 flex gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-950">
                      <AlertTriangle
                        className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
                        aria-hidden
                      />
                      <p>{step.warning}</p>
                    </div>
                  ) : null}

                  <div className="not-prose mt-6 overflow-hidden rounded-lg border border-gray-200 bg-gray-50/50 p-4 sm:p-5">
                    <div
                      className="relative mx-auto w-full max-h-[min(72vh,560px)]"
                      style={{ aspectRatio: step.aspect }}
                    >
                      <Image
                        src={step.image}
                        alt={step.imageAlt}
                        fill
                        className="object-contain object-top"
                        sizes="(max-width: 768px) 100vw, min(896px, 90vw)"
                        unoptimized
                      />
                    </div>
                    <p className="mt-3 border-t border-gray-200 pt-3 font-mono text-[11px] text-gray-500">
                      Figure {step.number} — {step.title}
                    </p>
                  </div>

                  <ol className="mt-6 space-y-4">
                    {step.doThis.map((item, i) => (
                      <li key={item.label} className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 font-mono text-xs font-bold text-white">
                          {i + 1}
                        </span>
                        <div className="min-w-0 pt-0.5">
                          <p className="text-sm font-semibold text-gray-900">
                            {item.label}
                          </p>
                          <p className="mt-0.5 text-sm text-gray-600">
                            {item.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}

              <section
                id="safety"
                className="scroll-mt-24 border-t border-gray-100 pt-8 pb-2"
              >
                <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                  Safety
                </h2>
                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  <li className="flex gap-2.5">
                    <AlertTriangle
                      className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
                      aria-hidden
                    />
                    <span>
                      AC voltage (N / B / Y / R) is live mains. Isolate power
                      and use a qualified electrician.
                    </span>
                  </li>
                  <li className="flex gap-2.5">
                    <AlertTriangle
                      className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
                      aria-hidden
                    />
                    <span>
                      CT terminals take only the thin wires from CT clamps —
                      never phase / mains cables.
                    </span>
                  </li>
                  <li className="flex gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
                      aria-hidden
                    />
                    <span>
                      Full ratings and pin map:{" "}
                      <Link
                        href="/iot-device-spec"
                        className="font-semibold text-red-600 hover:text-red-800"
                      >
                        technical specification
                      </Link>
                      . Help:{" "}
                      <Link
                        href="/contact"
                        className="font-semibold text-red-600 hover:text-red-800"
                      >
                        Contact
                      </Link>{" "}
                      or{" "}
                      <Link
                        href="/iot-faq"
                        className="font-semibold text-red-600 hover:text-red-800"
                      >
                        FAQ
                      </Link>
                      .
                    </span>
                  </li>
                </ul>
                <p className="mt-6">
                  <Link
                    href="/iot-device-spec"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-800"
                  >
                    Open technical specification
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </p>
              </section>
            </div>

            <footer className="border-t border-gray-100 bg-gray-50/50 px-6 py-4 sm:px-8">
              <p className="font-mono text-[10px] text-gray-500">
                Specific Fire Protection Limited — Connect wiring guide. For
                certified drawings,{" "}
                <Link
                  href="/contact"
                  className="text-red-600 hover:text-red-700 underline-offset-2 hover:underline"
                >
                  contact us
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
