import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <div className="rounded-2xl container mx-auto my-10 shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Section - Red Background */}
        <div className="bg-primary p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Start a Project
          </h2>
          <p className="text-md md:text-lg opacity-90 leading-relaxed">
            Understanding of our clients&apos; needs. If you&apos;d like to
            learn more about our work and the thinking behind our approach,
            we&apos;d be happy to discuss your project. With no obligation on
            your part, it&apos;s the perfect way to see if you&apos;d like us to
            take things further.
          </p>
        </div>

        {/* Right Section - Dark Grey Background */}
        <div className="bg-gray-900 p-8 md:p-12 text-white relative">
          {/* Subtle pattern overlay */}
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
            {/* Contact Information */}
            <div className="flex gap-4 justify-center">
              <div className="text-lg md:text-xl">
                <a
                  href="tel:+919512570090"
                  className="hover:text-red-500 transition-colors"
                >
                  +91 9512570090
                </a>
              </div>
              <span className="text-lg md:text-xl opacity-70">|</span>
              <div className="text-lg md:text-xl">
                <a
                  href="mailto:contact@specificfire.com"
                  className="hover:text-red-500 transition-colors"
                >
                  contact@specificfire.com
                </a>
              </div>
            </div>

            {/* Separator */}
            <div className="flex gap-2 items-center justify-center py-2">
              <span className="bg-gradient-to-r from-gray-900 to-white w-full h-0.5"></span>
              <span className="text-sm opacity-70">(or)</span>
              <span className="bg-gradient-to-l from-gray-900 to-white w-full h-0.5"></span>
            </div>

            {/* CTA Button */}
            <div className="flex items-center justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-between w-fit gap-4 bg-white text-gray-900 font-bold py-4 px-6 rounded-full hover:bg-gray-100 transition-all duration-200 border border-gray-200 group"
              >
                <span className="uppercase tracking-wide">Arrange a Call</span>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:bg-primary/90 transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
