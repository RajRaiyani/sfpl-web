import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";

export default function FinalCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="bg-white pb-14 sm:pb-16 md:pb-24"
    >
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-2xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-primary p-6 text-white sm:p-8 md:p-12">
              <h2
                id="cta-heading"
                className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl"
              >
                Start a Project
              </h2>
              <p className="text-sm leading-relaxed opacity-90 sm:text-base md:text-lg">
                Every successful project begins with a clear understanding of
                our clients&apos; needs. If you&apos;d like to learn more about
                our work and the approach behind our fire safety solutions,
                we&apos;d be happy to discuss your project — with no obligation.
              </p>
            </div>

            <div className="relative bg-gray-900 p-6 text-white sm:p-8 md:p-12">
              <div className="absolute inset-0 opacity-5" aria-hidden>
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #ef4444 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <a
                    href="tel:+919033050415"
                    className="inline-flex items-center gap-2 text-center text-base transition-colors hover:text-red-400 sm:text-left sm:text-lg md:text-xl"
                  >
                    <Phone
                      className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                      aria-hidden
                    />
                    <span>+91 9033050415</span>
                  </a>
                  <span
                    className="hidden text-lg opacity-70 sm:inline md:text-xl"
                    aria-hidden
                  >
                    |
                  </span>
                  <a
                    href="mailto:contact@specificfire.com"
                    className="inline-flex items-center gap-2 break-all text-center text-base transition-colors hover:text-red-400 sm:text-left sm:text-lg md:text-xl"
                  >
                    <Mail
                      className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                      aria-hidden
                    />
                    <span>contact@specificfire.com</span>
                  </a>
                </div>

                <div
                  className="flex items-center justify-center gap-2 py-2"
                  aria-hidden
                >
                  <span className="h-0.5 w-full bg-gradient-to-r from-gray-900 to-white" />
                  <span className="shrink-0 text-sm opacity-70">(or)</span>
                  <span className="h-0.5 w-full bg-gradient-to-l from-gray-900 to-white" />
                </div>

                <div className="flex items-center justify-center">
                  <Link
                    href="/contact"
                    className="group inline-flex w-fit items-center justify-between gap-4 rounded-full border border-gray-200 bg-white px-6 py-4 font-bold text-gray-900 transition-all duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                  >
                    <span className="tracking-wide uppercase">
                      Arrange a Call
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary transition-colors group-hover:bg-primary/90">
                      <ArrowRight className="h-4 w-4 text-white" aria-hidden />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
