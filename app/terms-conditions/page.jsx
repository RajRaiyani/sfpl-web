import Link from "next/link";
import {
  ShieldCheck,
  Cpu,
  UserRound,
  Lock,
  Scale,
  FlaskConical,
  Headset,
  ReceiptText,
  TriangleAlert,
  Mail,
  Database,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Terms and Conditions | SFPL Connect",
  description:
    "Terms and Conditions for SFPL Connect IoT device, monitoring portal, warranty, support commitments, data handling, and refund policy.",
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
          This section explains what is covered when you use SFPL Connect. These
          Terms apply to the device, the portal, and support provided by
          Specific Fire Protection Limited (&ldquo;SFPL&rdquo;).
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Purchase and use of SFPL Connect hardware devices</li>
          <li>Access to the SFPL Connect monitoring portal</li>
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
          SFPL provides a <strong>one (1) year manufacturing warranty</strong>{" "}
          on the Device from the date of delivery or installation (as
          applicable).
        </p>
        <p className="mt-4">
          This warranty covers manufacturing defects in materials or workmanship
          under normal and intended usage conditions.
        </p>
        <p className="mt-4">
          The warranty does not cover damage resulting from improper
          installation, misuse, unauthorized modifications, accidental damage,
          environmental extremes, or external electrical faults, unless
          explicitly agreed in writing.
        </p>
      </>
    ),
  },
  {
    id: "data-collected",
    icon: UserRound,
    title: "Information collected through the portal",
    body: (
      <>
        <p>For account setup and service operation, SFPL may collect:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
        </ul>
        <p className="mt-4">
          You are responsible for ensuring this information is accurate and kept
          up to date.
        </p>
      </>
    ),
  },
  {
    id: "privacy",
    icon: Lock,
    title: "Privacy and confidentiality commitments",
    body: (
      <>
        <p>
          SFPL does <strong>not</strong> sell user personal information to third
          parties under any circumstances.
        </p>
        <p className="mt-4">
          SFPL also does not disclose customer operational metadata (including,
          but not limited to, number of devices, number of projects,
          configurations, usage patterns, or similar account-level details) to
          third parties, except where required by law.
        </p>
      </>
    ),
  },
  {
    id: "legal-disclosure",
    icon: Scale,
    title: "Lawful disclosure",
    body: (
      <p>
        If required by applicable law, legal process, or lawful government
        request, SFPL may disclose relevant user or system data to authorized
        authorities. Such disclosure will be limited to the extent legally
        required.
      </p>
    ),
  },
  {
    id: "r-and-d",
    icon: FlaskConical,
    title: "Use of device data for improvement",
    body: (
      <p>
        SFPL may use data collected from connected devices for internal
        research, analytics, quality improvement, and product development to
        improve reliability, performance, and future features.
      </p>
    ),
  },
  {
    id: "data-retention",
    icon: Database,
    title: "Data retention period",
    body: (
      <>
        <p>SFPL retains the following operational records for SFPL Connect:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>
            <strong>Raw device data logs:</strong> up to{" "}
            <strong>2 years</strong>
          </li>
          <li>
            <strong>Generated alerts:</strong> up to <strong>3 years</strong>
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
          <li>
            <strong>Issue resolution target:</strong> within 72 working hours
            from query/ticket receipt, subject to issue complexity and
            dependencies.
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
    id: "returns-refunds",
    icon: ReceiptText,
    title: "Return and refund policy",
    body: (
      <>
        <p>
          SFPL does not provide return or refund for devices once sold, except
          in the following cases:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Device is defective due to manufacturing fault</li>
          <li>Device is damaged during shipping and verified promptly</li>
        </ul>
        <p className="mt-4">
          Customers must report such issues within the applicable claim window
          and provide reasonable evidence (for example photos/videos, shipment
          details, and order information) for verification.
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
          Use of SFPL Connect must comply with applicable laws, local electrical
          codes, and safe installation practices. The customer/integrator is
          responsible for proper deployment conditions and compliant usage.
        </p>
        <p className="mt-4">
          SFPL may update these Terms from time to time. Revised Terms become
          effective upon publication unless otherwise stated.
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
          <a href="tel:+919512570090" className="text-red-600 hover:underline">
            +91 9512570090
          </a>
        </p>
        <p className="mt-3 text-sm text-gray-600">
          You may also use the{" "}
          <Link href="/contact" className="text-red-600 hover:underline">
            contact page
          </Link>
          .
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
            <span>SFPL Connect</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Terms and Conditions
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
            Clear terms for device use, portal access, warranty, support, and
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
