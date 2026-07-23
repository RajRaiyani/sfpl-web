import Link from "next/link";
import type { ReactNode } from "react";
import {
  ShieldCheck,
  Wrench,
  ClipboardList,
  Ban,
  AlertTriangle,
  Mail,
  Package,
  type LucideIcon,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Connect O1 Warranty | SFPL CONNECT",
  description:
    "One-year manufacturing warranty for the SFPL Connect O1 device: coverage, claim process, and exclusions.",
  path: "/connect-o1-warranty",
});

const sections: {
  id: string;
  icon: LucideIcon;
  title: string;
  body: ReactNode;
}[] = [
  {
    id: "overview",
    icon: ShieldCheck,
    title: "Overview",
    body: (
      <>
        <p>
          Thank you for choosing SFPL CONNECT. Specific Fire Protection Limited
          (&ldquo;SFPL&rdquo;) warrants this product against defects in
          materials and workmanship for <strong>one (1) year</strong> from the
          date of purchase, subject to the terms below.
        </p>
        <p className="mt-4">
          This warranty applies to the <strong>CONNECT O1</strong> hardware
          device. It covers manufacturing defects under normal operating
          conditions only.
        </p>
      </>
    ),
  },
  {
    id: "product-info",
    icon: Package,
    title: "Product information",
    body: (
      <>
        <p>
          Keep a record of your device details for warranty claims. You may note
          them here or keep your invoice and packing slip:
        </p>
        <dl className="mt-4 grid gap-3 rounded-xl border border-gray-100 bg-gray-50/80 p-5 font-mono text-sm text-gray-700 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-400">
              Model
            </dt>
            <dd className="mt-1 text-gray-900">Connect O1</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-400">
              Serial No.
            </dt>
            <dd className="mt-1 text-gray-500">As printed on the device</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-400">
              Purchase date
            </dt>
            <dd className="mt-1 text-gray-500">See invoice / order</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-400">
              Install date
            </dt>
            <dd className="mt-1 text-gray-500">Record at commissioning</dd>
          </div>
        </dl>
      </>
    ),
  },
  {
    id: "coverage",
    icon: Wrench,
    title: "Warranty coverage",
    body: (
      <>
        <p>During the warranty period, SFPL will, at its sole discretion:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Repair the defective product, or</li>
          <li>
            Replace the defective product with the same or an equivalent model
          </li>
        </ul>
        <p className="mt-4">
          This warranty covers manufacturing defects under normal operating
          conditions only.
        </p>
      </>
    ),
  },
  {
    id: "claim-process",
    icon: ClipboardList,
    title: "Warranty claim process",
    body: (
      <ol className="list-decimal space-y-3 pl-5">
        <li>
          <strong>Contact support:</strong> Reach out to your authorized dealer
          or SFPL Support.
        </li>
        <li>
          <strong>Verification:</strong> Provide the product serial number and
          proof of purchase.
        </li>
        <li>
          <strong>Diagnose:</strong> Describe the issue in detail.
        </li>
        <li>
          <strong>Inspection:</strong> Return the product in secure packaging if
          requested for approval.
        </li>
      </ol>
    ),
  },
  {
    id: "not-covered",
    icon: Ban,
    title: "Not covered (void if)",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Water ingress, flooding, or moisture short circuit</li>
        <li>High voltage, surges, lightning, or incorrect power</li>
        <li>Improper installation, misuse, or modifications</li>
        <li>Physical damage, fire, accidents, or natural disasters</li>
        <li>Tampering, opening the enclosure, or unauthorized repair</li>
        <li>Wiring errors or use outside specified product documentation</li>
      </ul>
    ),
  },
  {
    id: "important",
    icon: AlertTriangle,
    title: "Important",
    body: (
      <p>
        This warranty covers the <strong>hardware device only</strong>. It does
        not cover installation charges, site wiring, sensors, third-party
        accessories, or consequential losses resulting from equipment failure.
      </p>
    ),
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact us",
    body: (
      <div className="rounded-xl border border-red-100 bg-red-50/50 p-5 text-gray-800">
        <p>For warranty claims or questions, contact SFPL:</p>
        <p className="mt-3">
          Email:{" "}
          <a
            href="mailto:contact@specificfire.com"
            className="text-red-600 hover:underline"
          >
            contact@specificfire.com
          </a>
        </p>
        <p className="mt-2">
          Phone:{" "}
          <a href="tel:+919033050415" className="text-red-600 hover:underline">
            +91 9033050415
          </a>
        </p>

        <p className="mt-3 text-sm text-gray-600">
          Related:{" "}
          <Link
            href="/terms-conditions"
            className="text-red-600 hover:underline"
          >
            Terms and Conditions
          </Link>
          {" · "}
          <Link
            href="/returns-refunds"
            className="text-red-600 hover:underline"
          >
            Returns and Refunds
          </Link>
          {" · "}
          <Link href="/contact" className="text-red-600 hover:underline">
            Contact
          </Link>
        </p>
      </div>
    ),
  },
];

export default function ConnectO1WarrantyPage() {
  return (
    <>
      <section className="relative container mx-auto px-4 pt-10 md:pt-12">
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-100 bg-white/90 p-6 shadow-sm md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-700">
            <ShieldCheck className="h-4 w-4" aria-hidden />
            <span>SFPL CONNECT</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Connect O1 Warranty
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
            One-year manufacturing warranty for Connect O1 — coverage, how to
            claim, and what is not covered.
          </p>
          <p className="mt-4 text-xs text-gray-500 md:text-sm">
            Last updated: <time dateTime="2026-07-21">21 July 2026</time>
          </p>
        </div>
      </section>

      <section className="w-full bg-white py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <nav
              aria-label="On this page"
              className="mb-12 rounded-2xl border border-gray-100 bg-gray-50/80 p-5 md:p-6"
            >
              <p className="mb-3 text-sm font-semibold text-gray-900">
                On this page
              </p>
              <ul className="grid gap-2 text-sm sm:grid-cols-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-gray-600 transition-colors hover:text-red-600"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-12 md:space-y-16">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <article
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 border-b border-gray-100 pb-12 last:border-0 last:pb-0 md:pb-16"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {section.title}
                        </h2>
                        <div className="mt-4 space-y-4 leading-relaxed text-gray-700">
                          {section.body}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
