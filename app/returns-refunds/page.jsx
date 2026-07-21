import Link from "next/link";
import {
  ReceiptText,
  PackageX,
  Truck,
  ClipboardList,
  Ban,
  Mail,
  ArrowLeftRight,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Returns and Refunds | SFPL CONNECT",
  description:
    "Return and refund policy for SFPL CONNECT hardware: eligibility, claim process, and exclusions.",
  path: "/returns-refunds",
});

const sections = [
  {
    id: "overview",
    icon: ReceiptText,
    title: "Overview",
    body: (
      <>
        <p>
          This policy applies to purchases of SFPL CONNECT hardware from Specific
          Fire Protection Limited (&ldquo;SFPL&rdquo;). It explains when returns
          or refunds may be considered and how to raise a claim.
        </p>
        <p className="mt-4">
          For warranty coverage on manufacturing defects, see the{" "}
          <Link
            href="/connect-o1-warranty"
            className="font-medium text-red-600 hover:underline"
          >
            Connect O1 Warranty
          </Link>{" "}
          page.
        </p>
      </>
    ),
  },
  {
    id: "general-policy",
    icon: PackageX,
    title: "General policy",
    body: (
      <p>
        SFPL does not offer return or refund on devices once sold, except in
        the limited situations described below. This helps us maintain stock
        integrity and support traceability for safety-related equipment.
      </p>
    ),
  },
  {
    id: "eligible-cases",
    icon: ArrowLeftRight,
    title: "When a return or refund may apply",
    body: (
      <>
        <p>A return or refund may be considered only if:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>
            The device has a <strong>manufacturing defect</strong> confirmed
            after inspection by SFPL or an authorized representative
          </li>
          <li>
            The device was <strong>damaged in transit</strong> and the issue is
            reported promptly with supporting evidence
          </li>
        </ul>
        <p className="mt-4">
          All other reasons—including change of mind, incorrect ordering by the
          customer, or damage after delivery—are not covered under this policy.
        </p>
      </>
    ),
  },
  {
    id: "shipping-damage",
    icon: Truck,
    title: "Shipping damage",
    body: (
      <>
        <p>
          If you receive a device that appears damaged, notify SFPL as soon as
          possible—ideally within <strong>48 hours</strong> of delivery—and
          before installing or powering the unit.
        </p>
        <p className="mt-4">
          Keep the original packaging, shipping labels, and all contents. Photos
          or video showing the outer carton, inner packing, and the device help
          us verify the claim with the carrier.
        </p>
      </>
    ),
  },
  {
    id: "how-to-claim",
    icon: ClipboardList,
    title: "How to submit a claim",
    body: (
      <>
        <p>Contact SFPL with the following information:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Order or invoice number and date of purchase</li>
          <li>Device model and serial number (if available)</li>
          <li>Description of the defect or shipping damage</li>
          <li>Photos, videos, or shipment details as applicable</li>
        </ul>
        <p className="mt-4">
          SFPL will review your submission and respond with next steps, which
          may include inspection, replacement, repair under warranty, or
          refund—depending on the outcome of verification.
        </p>
        <p className="mt-4">
          If your claim is valid, we will replace your item within{" "}
          <strong>7 working days</strong> of approval.
        </p>
      </>
    ),
  },
  {
    id: "exclusions",
    icon: Ban,
    title: "What is not covered",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Improper installation, misuse, or unauthorized modification</li>
        <li>Accidental damage, neglect, or normal wear and tear</li>
        <li>
          Damage from environmental extremes, power surges, or external
          electrical faults
        </li>
        <li>Issues reported outside the applicable claim or warranty window</li>
      </ul>
    ),
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact us",
    body: (
      <div className="rounded-xl border border-red-100 bg-red-50/50 p-5 text-gray-800">
        <p>For return or refund requests, contact SFPL through:</p>
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
          You may also use the{" "}
          <Link href="/contact" className="text-red-600 hover:underline">
            contact page
          </Link>
          .           Related:{" "}
          <Link
            href="/terms-conditions"
            className="text-red-600 hover:underline"
          >
            Terms and Conditions
          </Link>
          {" · "}
          <Link
            href="/connect-o1-warranty"
            className="text-red-600 hover:underline"
          >
            Connect O1 Warranty
          </Link>
          .
        </p>
      </div>
    ),
  },
];

export default function ReturnsRefundsPage() {
  return (
    <>
      <section className="relative container mx-auto px-4 pt-10 md:pt-12">
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-100 bg-white/90 p-6 shadow-sm md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-700">
            <ReceiptText className="h-4 w-4" aria-hidden />
            <span>SFPL CONNECT</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Returns and Refunds
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
            Eligibility, claim process, and exclusions for SFPL CONNECT device
            purchases.
          </p>
          <p className="mt-4 text-xs text-gray-500 md:text-sm">
            Last updated: <time dateTime="2026-04-13">13 April 2026</time>
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
