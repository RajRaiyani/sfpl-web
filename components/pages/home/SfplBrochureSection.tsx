"use client";

import Image from "next/image";
import { Download } from "lucide-react";

const SFPL_BROCHURE_URL =
  "https://specificfire.s3.ap-south-1.amazonaws.com/public/SFPL+Brochure.pdf";

const brochureHighlights = [
  "Fire safety products & systems",
  "Design, installation & maintenance",
  "Compliance & project execution",
  "Service & support",
];

export default function SfplBrochureSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="w-full rounded-3xl border border-gray-100 bg-white shadow-lg p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-10">
            <div className="shrink-0 flex justify-center lg:justify-start">
              <div className="w-[200px] sm:w-[240px] lg:w-[280px] rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5">
                <Image
                  src="/images/pages/home/sfpl-brochure-banner.png"
                  alt="SFPL brochure cover"
                  width={724}
                  height={1024}
                  className="h-auto w-full"
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 280px"
                />
              </div>
            </div>

            <div className="flex flex-1 min-w-0 flex-col justify-center gap-5 lg:py-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                <div className="flex flex-col gap-4">
                  <div className="inline-flex items-center self-start rounded-full border border-red-100 bg-red-50 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-red-700">
                    Company Brochure
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
                    SFPL brochure —{" "}
                    <span className="text-red-600">products & services</span>
                  </h2>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Download the latest SFPL brochure for an overview of our fire
                    safety solutions, capabilities, and project execution
                    approach.
                  </p>

                  <div className="pt-1">
                    <a
                      href={SFPL_BROCHURE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-xl border border-red-100/60 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200/70 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      aria-label="Download SFPL brochure"
                    >
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-colors group-hover:bg-red-100">
                        <Download className="h-4 w-4" aria-hidden />
                      </span>
                      <span>Download Brochure</span>
                    </a>
                  </div>

                  <p className="text-xs text-gray-500">PDF opens in a new tab.</p>
                </div>

                <div className="flex flex-col justify-center rounded-2xl border border-gray-100 bg-gray-50 p-6">
                  <p className="text-sm font-extrabold text-gray-900 mb-4">
                    What&apos;s inside the brochure
                  </p>
                  <ul className="space-y-3">
                    {brochureHighlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
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
