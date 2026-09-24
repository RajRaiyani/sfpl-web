import Image from "next/image";
import { Download } from "lucide-react";

const SFPL_BROCHURE_URL =
  "https://specificfire.s3.ap-south-1.amazonaws.com/public/SFPL+Brochure.pdf";

const brochureHighlights = [
  "Fire Safety Products & Systems",
  "Design, Installation & Maintenance",
  "Compliance & Project Execution",
  "Service & Support",
];

export default function SfplBrochureSection() {
  return (
    <section
      aria-labelledby="brochure-heading"
      className="bg-white py-14 sm:py-16 md:py-20"
    >
      <div className="container mx-auto px-4">
        <div className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-lg sm:rounded-3xl sm:p-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-10">
            <div className="flex shrink-0 justify-center lg:justify-start">
              <div className="w-[180px] overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 sm:w-[240px] lg:w-[280px]">
                <Image
                  src="/images/pages/home/sfpl-brochure-banner.png"
                  alt="SFPL company brochure cover"
                  width={724}
                  height={1024}
                  className="h-auto w-full"
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 280px"
                />
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center gap-5 lg:py-2">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
                <div className="flex flex-col gap-4">
                  <p className="inline-flex items-center self-start rounded-full border border-red-100 bg-red-50 px-4 py-1.5 text-xs font-bold tracking-widest text-red-700 uppercase">
                    Company Brochure
                  </p>

                  <h2
                    id="brochure-heading"
                    className="text-2xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl"
                  >
                    SFPL brochure —{" "}
                    <span className="text-primary">Products &amp; Services</span>
                  </h2>

                  <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                    Download the latest SFPL brochure for an overview of our
                    fire safety solutions, capabilities and project execution
                    approach.
                  </p>

                  <div className="pt-1">
                    <a
                      href={SFPL_BROCHURE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-xl border border-red-100/60 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200/70 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
                      aria-label="Download SFPL brochure (PDF opens in a new tab)"
                    >
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-colors group-hover:bg-red-100">
                        <Download className="h-4 w-4" aria-hidden />
                      </span>
                      <span>Download Brochure</span>
                    </a>
                  </div>
                </div>

                <div className="flex flex-col justify-center rounded-2xl border border-gray-100 bg-gray-50 p-5 sm:p-6">
                  <p className="mb-4 text-sm font-extrabold text-gray-900">
                    What&apos;s inside the brochure
                  </p>
                  <ul className="space-y-3">
                    {brochureHighlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-600"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
