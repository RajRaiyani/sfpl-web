import Link from "next/link";
import {
  Shield,
  Smartphone,
  User,
  Mail,
  Phone,
  Lock,
  Share2,
  Clock,
  FileQuestion,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Privacy Policy | SFPL Mobile App & Services",
  description:
    "How Specific Fire Protection Limited collects, uses, and protects your name, email, and phone number when you use our mobile application and related services.",
  path: "/privacy-policy",
});

const sections = [
  {
    id: "overview",
    icon: Shield,
    title: "Overview",
    body: (
      <>
        <p>
          Specific Fire Protection Limited (&ldquo;SFPL,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This
          Privacy Policy explains how we handle personal information when you
          use our mobile application and any related websites or services that
          link to this policy.
        </p>
        <p className="mt-4">
          By using our app or providing your information, you agree to the
          practices described here. If you do not agree, please do not use the
          app or submit personal data.
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
          When you register or interact with our mobile app, we may collect the
          following categories of personal information that you choose to
          provide:
        </p>
        <ul className="mt-4 space-y-3">
          <li className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50/80 p-4">
            <User
              className="h-5 w-5 shrink-0 text-red-600 mt-0.5"
              aria-hidden
            />
            <span>
              <strong className="text-gray-900">Name</strong>
              <span className="block text-gray-600 mt-1">
                To identify you and personalize your experience (for example,
                greetings and account records).
              </span>
            </span>
          </li>
          <li className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50/80 p-4">
            <Mail
              className="h-5 w-5 shrink-0 text-red-600 mt-0.5"
              aria-hidden
            />
            <span>
              <strong className="text-gray-900">Email address</strong>
              <span className="block text-gray-600 mt-1">
                For account access, important notices, and support-related
                communication where applicable.
              </span>
            </span>
          </li>
          <li className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50/80 p-4">
            <Phone
              className="h-5 w-5 shrink-0 text-red-600 mt-0.5"
              aria-hidden
            />
            <span>
              <strong className="text-gray-900">Phone number</strong>
              <span className="block text-gray-600 mt-1">
                For verification, account security, and contacting you about
                services you request or updates relevant to your use of the app.
              </span>
            </span>
          </li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          We may also collect limited technical data automatically (such as
          device type, app version, and diagnostic logs) as needed to operate,
          secure, and improve the app. We do not sell your personal
          information.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    icon: Lock,
    title: "How we use your information",
    body: (
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>To create and maintain your account and profile</li>
        <li>To provide, operate, and improve our products and services</li>
        <li>To communicate with you about your account, requests, or updates</li>
        <li>To protect against fraud, abuse, and security risks</li>
        <li>To comply with legal obligations and enforce our terms</li>
      </ul>
    ),
  },
  {
    id: "sharing",
    icon: Share2,
    title: "Sharing and disclosure",
    body: (
      <>
        <p>
          We may share personal information with service providers who assist us
          (for example, hosting, analytics, or communication tools) under
          contracts that require them to protect your data and use it only for
          the services they provide to us.
        </p>
        <p className="mt-4">
          We may disclose information if required by law, court order, or
          government request, or when we believe disclosure is necessary to
          protect our rights, your safety, or the safety of others.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    icon: Clock,
    title: "Retention",
    body: (
      <p>
        We keep personal information only as long as needed for the purposes
        described in this policy, unless a longer period is required or permitted
        by law. When data is no longer needed, we take reasonable steps to
        delete or anonymize it.
      </p>
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
    id: "your-rights",
    icon: FileQuestion,
    title: "Your choices and rights",
    body: (
      <>
        <p>
          Depending on applicable law, you may have the right to access,
          correct, or delete certain personal information, or to withdraw
          consent where processing is consent-based. You may also be able to
          object to or restrict certain processing.
        </p>
        <p className="mt-4">
          To exercise these rights or ask questions, contact us using the
          details below. We will respond in line with applicable requirements.
        </p>
      </>
    ),
  },
  {
    id: "children",
    icon: User,
    title: "Children",
    body: (
      <p>
        Our services are not directed at children under the age where parental
        consent is required under local law. We do not knowingly collect personal
        information from such children. If you believe we have collected data
        from a child inappropriately, please contact us and we will take
        appropriate steps.
      </p>
    ),
  },
  {
    id: "changes",
    icon: FileQuestion,
    title: "Changes to this policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. We will post the
        revised version on this page and update the &ldquo;Last updated&rdquo;
        date below. Where changes are material, we may provide additional notice
        (for example, through the app or by email). Continued use after changes
        means you accept the updated policy.
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
              href="tel:+919512570090"
              className="text-red-600 hover:underline"
            >
              +91 9512570090
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
              Clear information about how we handle your name, email, and phone
              number—and how you can reach us with questions.
            </p>
            <p className="mt-6 text-sm text-white/60">
              Last updated:{" "}
              <time dateTime="2026-04-05">5 April 2026</time>
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
