import Link from "next/link";
import {
  ShieldCheck,
  Cpu,
  Headset,
  TriangleAlert,
  Mail,
  Database,
  Lock,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Terms and Conditions | SFPL CONNECT",
  description:
    "Terms and Conditions for SFPL CONNECT IoT device, monitoring portal, warranty, support commitments, and data handling.",
  path: "/terms",
});

const sections = [
  {
    id: "scope",
    icon: Cpu,
    title: "Scope of services",
    body: (
      <>
        <p>
          This section explains what is covered when you use SFPL CONNECT. These
          Terms apply to the device, the portal and support provided by Specific
          Fire Protection Limited (&ldquo;SFPL&rdquo;).
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Purchase and use of SFPL CONNECT hardware devices</li>
          <li>Access to the SFPL CONNECT monitoring portal</li>
          <li>Support for device and portal-related issues</li>
        </ul>
      </>
    ),
  },
  {
    id: "warranty",
    icon: ShieldCheck,
    title: "Device warranty",
    body: (
      <>
        <p>
          Your Connect O1 device comes with a{" "}
          <strong>1-year warranty</strong> from the date you buy it or install
          it—whichever comes first. If a manufacturing fault appears in that
          time, SFPL will repair or replace the unit.
        </p>
        <p className="mt-4">
          This covers problems caused by how the device was made, when used as
          intended. It does <strong>not</strong> cover damage from water, power
          surges, wrong installation, misuse, opening or modifying the unit,
          accidents, or using it outside the product instructions. The warranty
          is for the Connect device itself only—not installation work, field
          wiring, sensors, or other accessories.
        </p>
        <p className="mt-4">
          For the full warranty details and how to raise a claim, see the{" "}
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
    id: "privacy-user-data",
    icon: Lock,
    title: "Privacy and user data",
    body: (
      <>
        <p>
          When you create an account, place an order, or use SFPL CONNECT, we
          may collect personal and business details you provide—such as name,
          email, phone number, address, company information, and tax identifiers
          (for example PAN or GSTIN)—to operate your account, process orders,
          and deliver support.
        </p>
        <p className="mt-4">
          We use this information only for the purposes described in our
          Privacy Policy. We do not sell your personal information. How we
          collect, use, store, and protect your data—and your choices
          regarding it—is explained in full in our{" "}
          <Link
            href="/privacy-policy"
            className="font-medium text-red-600 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    icon: Database,
    title: "Data retention period",
    body: (
      <>
        <p>SFPL retains the following operational records for SFPL CONNECT:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>
            <strong>Raw device data logs:</strong> up to <strong>1 year</strong>
          </li>
          <li>
            <strong>Generated alerts:</strong> up to <strong>3 months</strong>
          </li>
        </ul>
        <p className="mt-4">
          After these retention periods, data may be deleted, anonymized, or
          archived in accordance with our internal data lifecycle and legal
          compliance requirements.
        </p>
      </>
    ),
  },
  {
    id: "support-sla",
    icon: Headset,
    title: "Support response and resolution targets",
    body: (
      <>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Initial response target:</strong> within 24 working hours of
            receiving a user query/ticket.
          </li>
        </ul>
        <p className="mt-4">
          These are service targets and may vary in exceptional situations,
          including major outages, force majeure events, or where additional
          information/access is required from the customer.
        </p>
      </>
    ),
  },
  {
    id: "general-conditions",
    icon: TriangleAlert,
    title: "General conditions and limitations",
    body: (
      <>
        <p>
          Use of SFPL CONNECT must comply with applicable laws, local electrical
          codes and safe installation practices. The customer/integrator is
          responsible for proper deployment conditions and compliant usage.
        </p>
        <p className="mt-4">
          We may update these Terms occasionally. When we do, we will post the
          new version on this page. The updated Terms apply from the date they
          are published, unless we say otherwise.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact us",
    body: (
      <div className="rounded-xl border border-red-100 bg-red-50/50 p-5 text-gray-800">
        <p>
          For questions about these Terms, please contact SFPL through official
          support channels.
        </p>
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
          . For returns and refunds, see our{" "}
          <Link
            href="/returns-refunds"
            className="text-red-600 hover:underline"
          >
            Returns and Refunds
          </Link>{" "}
          policy.
        </p>
      </div>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="relative container mx-auto px-4 pt-10 md:pt-12">
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-100 bg-white/90 p-6 shadow-sm md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-700">
            <ShieldCheck className="h-4 w-4" aria-hidden />
            <span>SFPL CONNECT</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Terms and Conditions
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
            Clear terms for device use, portal access, warranty, support and
            data handling.
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
