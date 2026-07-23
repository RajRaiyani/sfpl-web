import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="bg-white pb-16 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-primary p-8 md:p-12 text-white">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Start a Project
              </h2>
              <p className="text-md md:text-lg opacity-90 leading-relaxed">
                Every successful project begins with a clear understanding of
                our clients' needs. If you'd like to learn more about our work
                and the approach behind our fire safety solutions, we'd be happy
                to discuss your project. With no obligation on your part, it's
                the perfect opportunity to explore how we can help and decide
                whether you'd like to take the next step with us.
              </p>
            </div>

            <div className="bg-gray-900 p-8 md:p-12 text-white relative">
              <div className="absolute inset-0 opacity-5">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #ef4444 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
                  <a
                    href="tel:+919033050415"
                    className="inline-flex items-center gap-2 text-base sm:text-lg md:text-xl hover:text-red-500 transition-colors text-center sm:text-left"
                  >
                    <Phone
                      className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                      aria-hidden
                    />
                    +91 9033050415
                  </a>
                  <span className="hidden sm:inline text-lg md:text-xl opacity-70">
                    |
                  </span>
                  <a
                    href="mailto:contact@specificfire.com"
                    className="inline-flex items-center gap-2 text-base sm:text-lg md:text-xl hover:text-red-500 transition-colors text-center sm:text-left break-all"
                  >
                    <Mail
                      className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                      aria-hidden
                    />
                    contact@specificfire.com
                  </a>
                </div>

                <div className="flex gap-2 items-center justify-center py-2">
                  <span className="bg-gradient-to-r from-gray-900 to-white w-full h-0.5"></span>
                  <span className="text-sm opacity-70">(or)</span>
                  <span className="bg-gradient-to-l from-gray-900 to-white w-full h-0.5"></span>
                </div>

                <div className="flex items-center justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-between w-fit gap-4 bg-white text-gray-900 font-bold py-4 px-6 rounded-full hover:bg-gray-100 transition-all duration-200 border border-gray-200 group"
                  >
                    <span className="uppercase tracking-wide">
                      Arrange a Call
                    </span>
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:bg-primary/90 transition-colors">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
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
