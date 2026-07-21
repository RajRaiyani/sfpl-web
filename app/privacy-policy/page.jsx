import Link from "next/link";
import {
  Shield,
  Smartphone,
  User,
  Mail,
  Phone,
  Lock,
  Scale,
  FlaskConical,
  Building2,
  MapPin,
  FileText,
  Hash,
  Globe,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Privacy Policy | SFPL Mobile App & Services",
  description:
    "How Specific Fire Protection Limited collects, uses and protects personal and business information when you use our mobile application, portal and related services.",
  path: "/privacy-policy",
});

const collectedFields = [
  {
    icon: User,
    label: "Name",
    description:
      "To identify you and personalize your experience (for example, greetings and account records).",
  },
  {
    icon: Mail,
    label: "Email address",
    description:
      "For account access, important notices and support-related communication where applicable.",
  },
  {
    icon: Phone,
    label: "Phone number",
    description:
      "For verification, account security and contacting you about services you request or updates relevant to your use of our services.",
  },
  {
    icon: FileText,
    label: "PAN number",
    description:
      "For billing, invoicing and tax compliance where required for purchases or business accounts.",
  },
  {
    icon: Hash,
    label: "GSTIN number",
    description:
      "For GST-compliant invoicing and tax records when you provide a GST-registered business identity.",
  },
  {
    icon: MapPin,
    label: "Address",
    description:
      "For delivery, billing and service location records associated with your account or orders.",
  },
  {
    icon: MapPin,
    label: "City",
    description:
      "Part of your address details for delivery and account records.",
  },
  {
    icon: MapPin,
    label: "State",
    description:
      "Part of your address details for delivery and account records.",
  },
  {
    icon: Globe,
    label: "Country",
    description:
      "Part of your address details for delivery and account records.",
  },
  {
    icon: Hash,
    label: "Postal code",
    description:
      "Part of your address details for delivery and account records.",
  },
  {
    icon: Building2,
    label: "Company name",
    description:
      "To associate your account or orders with an organization and support business billing.",
  },
  {
    icon: Building2,
    label: "Company address",
    description:
      "For business billing, invoicing and correspondence related to your organization.",
  },
];

const sections = [
  {
    id: "overview",
    icon: Shield,
    title: "Overview",
    body: (
      <>
        <p>
          Specific Fire Protection Limited (&ldquo;SFPL,&rdquo;
          &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects
          your privacy. This Privacy Policy explains how we handle personal
          information when you use our mobile application and any related
          websites or services that link to this policy.
        </p>
        <p className="mt-4">
          We invite you to read this policy carefully. By continuing to use our
          services or sharing your information with us, you acknowledge that you
          understand how we handle your data. If you prefer not to proceed on
          these terms, in that case we respect your decision and you must not
          continue to our services.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    icon: Smartphone,
    title: "Information we collect",
    body: (
      <>
        <p>
          When you register, place an order, or interact with our app, portal,
          or related services, we may collect the following personal and
          business information that you choose to provide:
        </p>
        <ul className="mt-4 space-y-3">
          {collectedFields.map((field) => {
            const Icon = field.icon;
            return (
              <li
                key={field.label}
                className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50/80 p-4"
              >
                <Icon
                  className="h-5 w-5 shrink-0 text-red-600 mt-0.5"
                  aria-hidden
                />
                <span>
                  <strong className="text-gray-900">{field.label}</strong>
                  <span className="mt-1 block text-gray-600">
                    {field.description}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          We may also collect limited technical data automatically (such as
          device type, app version and diagnostic logs) as needed to operate,
          secure and improve our services. We do not sell your personal
          information.
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
        research, analytics, quality improvement and product development to
        improve reliability, performance and future features.
      </p>
    ),
  },
  {
    id: "how-we-use",
    icon: Lock,
    title: "How we use your information",
    body: (
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>To create and maintain your account and profile</li>
        <li>To process orders, billing, invoicing and tax compliance</li>
        <li>To provide, operate and improve our products and services</li>
        <li>
          To communicate with you about your account, requests, or updates
        </li>
        <li>To protect against fraud, abuse and security risks</li>
        <li>To comply with legal obligations and enforce our terms</li>
      </ul>
    ),
  },

  {
    id: "security",
    icon: Shield,
    title: "Security",
    body: (
      <p>
        We implement appropriate technical and organizational measures designed
        to protect your information against unauthorized access, alteration,
        disclosure, or destruction. No method of transmission or storage is
        completely secure; we encourage you to use strong credentials and
        protect your devices.
      </p>
    ),
  },

  {
    id: "contact",
    icon: Mail,
    title: "Contact us",
    body: (
      <>
        <p>
          For privacy-related requests or questions about this policy, contact
          Specific Fire Protection Limited:
        </p>
        <div className="mt-4 rounded-xl border border-red-100 bg-red-50/50 p-5 text-gray-800">
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:contact@specificfire.com"
              className="text-red-600 hover:underline"
            >
              contact@specificfire.com
            </a>
          </p>
          <p className="mt-2">
            <strong>Phone:</strong>{" "}
            <a
              href="tel:+919033050415"
              className="text-red-600 hover:underline"
            >
              +91 9033050415
            </a>
          </p>
          <p className="mt-4 text-sm text-gray-600">
            You may also reach us through our{" "}
            <Link href="/contact" className="text-red-600 hover:underline">
              contact page
            </Link>
            .
          </p>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-red-950">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(220,38,38,0.25), transparent 45%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.06), transparent 40%)",
          }}
        />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-red-400" aria-hidden />
              <span>SFPL mobile app &amp; services</span>
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-white/85 md:text-xl leading-relaxed">
              How we handle the personal and business information you share with
              us—and how you can reach us with questions.
            </p>
            <p className="mt-6 text-sm text-white/60">
              Last updated: <time dateTime="2026-04-05">5 April 2026</time>
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <nav
              aria-label="On this page"
              className="mb-12 rounded-2xl border border-gray-100 bg-gray-50/80 p-5 md:p-6"
            >
              <p className="text-sm font-semibold text-gray-900 mb-3">
                On this page
              </p>
              <ul className="grid gap-2 sm:grid-cols-2 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-12 md:space-y-16">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <article
                    key={s.id}
                    id={s.id}
                    className="scroll-mt-28 border-b border-gray-100 pb-12 md:pb-16 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {s.title}
                        </h2>
                        <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
                          {s.body}
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
