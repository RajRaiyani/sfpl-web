import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/connect", label: "SFPL CONNECT" },
  { href: "/services", label: "Services" },
  { href: "/tech", label: "Tech" },
  { href: "/about", label: "About Us" },
  { href: "/jobs", label: "Careers" },
  { href: "/contact", label: "Contact Us" },
] as const;

const CONNECT_LINKS = [
  { href: "/iot-device-spec", label: "IoT device docs" },
  { href: "/iot-user-manual", label: "IoT user manual" },
  { href: "/iot-faq", label: "IoT & portal FAQ" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-conditions", label: "Terms & Conditions" },
  { href: "/returns-refunds", label: "Returns & Refunds" },
  { href: "/connect-o1-warranty", label: "Connect O1 Warranty" },
] as const;

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/specific-fire/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "https://www.instagram.com/specificfire",
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: "https://www.facebook.com/specific.fire",
    label: "Facebook",
    Icon: Facebook,
  },
  {
    href: "https://www.youtube.com/@SPECIFIC_FIRE",
    label: "YouTube",
    Icon: Youtube,
  },
] as const;

const linkClass =
  "block text-xs sm:text-sm text-gray-600 transition-colors hover:text-primary";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-100 bg-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-6 grid grid-cols-1 gap-6 sm:mb-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-5">
          <div className="space-y-3 sm:col-span-2 sm:space-y-4 lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-full-black.svg"
                alt="Specific Fire Protection Limited"
                width={200}
                height={50}
                className="h-auto w-36 sm:w-40 md:w-44"
              />
            </Link>
            <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
              Specific Fire Protection Limited
              <br className="hidden sm:block" />
              <span className="font-bold text-primary">
                Let&apos;s make fire safe India.
              </span>
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className="rounded-lg bg-gray-100 p-2 text-gray-600 transition-all duration-200 hover:bg-primary hover:text-white"
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Quick links" className="space-y-3 sm:space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
              Quick links
            </h2>
            <ul className="space-y-2">
              {QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="SFPL CONNECT" className="space-y-3 sm:space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
              SFPL CONNECT
            </h2>
            <ul className="space-y-2">
              {CONNECT_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
              Contact Us
            </h2>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-center space-x-2 sm:space-x-3">
                <Phone
                  className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5"
                  aria-hidden
                />
                <a
                  href="tel:+919033050415"
                  className="break-words text-xs text-gray-600 transition-colors hover:text-primary sm:text-sm"
                >
                  +91 9033050415
                </a>
              </li>
              <li className="flex items-center space-x-2 sm:space-x-3">
                <Mail
                  className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5"
                  aria-hidden
                />
                <a
                  href="mailto:contact@specificfire.com"
                  className="break-all text-xs text-gray-600 transition-colors hover:text-primary sm:text-sm"
                >
                  contact@specificfire.com
                </a>
              </li>
              <li className="flex items-start space-x-2 sm:space-x-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5"
                  aria-hidden
                />
                <a
                  href="https://maps.app.goo.gl/rFC89FrPRnd9196g9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-words text-xs text-gray-600 transition-colors hover:text-primary sm:text-sm"
                >
                  Office No. 2, Tower - 4, Shreeji Apartment, Mahatma Gandhi
                  Road, Kandivali West, Mumbai 400067 (HQ)
                </a>
              </li>
              <li className="flex items-start space-x-2 sm:space-x-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5"
                  aria-hidden
                />
                <a
                  href="https://maps.app.goo.gl/2RYxPfe4o69tCfy69"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-words text-xs text-gray-600 transition-colors hover:text-primary sm:text-sm"
                >
                  105, IIT Gandhinagar Research Park, Gandhinagar, Gujarat
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 sm:pt-6">
          <div className="flex flex-col flex-wrap items-center justify-center gap-2 sm:flex-row sm:justify-between sm:gap-4">
            <Link
              href="/copyright-policy"
              className="order-2 text-center text-xs text-gray-500 transition-colors hover:text-primary sm:order-1 sm:text-left sm:text-sm"
            >
              © {year} Specific Fire Protection Limited. All rights reserved.
            </Link>
            <nav
              aria-label="Legal"
              className="order-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:order-2 sm:text-sm"
            >
              <Link
                href="/privacy-policy"
                className="text-gray-500 transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-conditions"
                className="text-gray-500 transition-colors hover:text-primary"
              >
                Terms &amp; Conditions
              </Link>
              <Link
                href="/returns-refunds"
                className="text-gray-500 transition-colors hover:text-primary"
              >
                Returns &amp; Refunds
              </Link>
              <Link
                href="/connect-o1-warranty"
                className="text-gray-500 transition-colors hover:text-primary"
              >
                Connect O1 Warranty
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
