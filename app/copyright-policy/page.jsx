import Link from "next/link";
import {
  Copyright,
  Image as ImageIcon,
  Type,
  Palette,
  FileCheck2,
  AlertCircle,
  Mail,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Copyright Policy | SFPL",
  description:
    "Copyright and intellectual property policy for SFPL website content, including image sources, fonts, and brand theme usage.",
  path: "/copyright-policy",
});

const sections = [
  {
    id: "ownership",
    icon: Copyright,
    title: "Ownership of website content",
    body: (
      <>
        <p>
          Specific Fire Protection Limited (&ldquo;SFPL&rdquo;) owns the original
          content on this website, including brand elements, written copy,
          layout structure, UI patterns, and proprietary materials, unless
          otherwise stated.
        </p>
        <p className="mt-4">
          Unauthorized copying, republication, redistribution, or commercial
          reuse of protected content is not permitted without written
          authorization from SFPL.
        </p>
      </>
    ),
  },
  {
    id: "images",
    icon: ImageIcon,
    title: "Image usage and sources",
    body: (
      <>
        <p>Images used across this website follow these source categories:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>AI-generated visuals</li>
          <li>Free stock images with permitted usage terms</li>
        </ul>
        <p className="mt-4">
          SFPL has not used paid stock images on this website. Where third-party
          free assets are used, usage is subject to the corresponding source
          license terms.
        </p>
      </>
    ),
  },
  {
    id: "fonts",
    icon: Type,
    title: "Font licensing",
    body: (
      <p>
        All fonts used on this website are free-to-use fonts under their
        applicable open or free commercial licenses. SFPL does not use paid font
        licenses for this website at this time.
      </p>
    ),
  },
  {
    id: "brand",
    icon: Palette,
    title: "Brand theme and color system",
    body: (
      <>
        <p>
          This website uses SFPL brand styling, including our proprietary color
          combinations, typography hierarchy, and design language.
        </p>
        <p className="mt-4">
          Reproduction of SFPL visual identity in a manner that implies
          affiliation, endorsement, or brand imitation is prohibited without
          prior permission.
        </p>
      </>
    ),
  },
  {
    id: "permitted-use",
    icon: FileCheck2,
    title: "Permitted and restricted use",
    body: (
      <>
        <p>
          You may browse, view, and reference this website for informational
          purposes. You may not:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Republish substantial parts of content as your own</li>
          <li>Use SFPL logos/brand assets without permission</li>
          <li>Resell or commercially exploit content without authorization</li>
        </ul>
      </>
    ),
  },
  {
    id: "updates",
    icon: AlertCircle,
    title: "Policy updates",
    body: (
      <p>
        SFPL may update this Copyright Policy from time to time. Revised
        versions become effective when published on this page unless otherwise
        noted.
      </p>
    ),
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact for permissions and concerns",
    body: (
      <div className="rounded-xl border border-red-100 bg-red-50/50 p-5 text-gray-800">
        <p>
          For copyright permissions, attribution questions, or infringement
          concerns, contact us:
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
          You can also reach us through the{" "}
          <Link href="/contact" className="text-red-600 hover:underline">
            contact page
          </Link>
          .
        </p>
      </div>
    ),
  },
];

export default function CopyrightPolicyPage() {
  return (
    <>
      <section className="relative container mx-auto px-4 pt-10 md:pt-12">
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-100 bg-white/90 p-6 shadow-sm md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-700">
            <Copyright className="h-4 w-4" aria-hidden />
            <span>SFPL legal</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Copyright Policy
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
            Guidelines for content ownership, image/font usage, and SFPL brand
            theme protections.
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
