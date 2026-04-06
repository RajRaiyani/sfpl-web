import Image from "next/image";
import { Shield, Target, Star, CalendarDays, Rocket } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import JourneyTimeline from "@/components/pages/about/JourneyTimeline";

export const metadata = buildPageMetadata({
  title: "About SFPL | Specific Fire Protection Limited",
  description:
    "Specific Fire Protection Limited (SFPL) delivers end-to-end, intelligent, and compliant fire safety solutions across India.",
  path: "/about",
  image: "/images/pages/about/about-hero.png",
});

const timeline = [
  {
    year: "2016",
    title: "Foundation and Specialization",
    description:
      "SFPL began with a specialized focus on fire detection systems, building deep technical understanding and execution capabilities.",
  },
  {
    year: "2019",
    title: "Expansion to Integrated Systems",
    description:
      "We expanded into fire system design and hydrant systems to deliver integrated fire protection for commercial, residential, industrial, and healthcare projects.",
  },
  {
    year: "2024",
    title: "Data-Driven Safety Evolution",
    description:
      "Experienced professionals joined our team and we analyzed root causes of fire incidents, advancing toward preventive and data-driven fire safety strategies.",
  },
  {
    year: "2025",
    title: "IIT Gandhinagar",
    description:
      "SFPL is excited to announce that it has obtained a space at the IIT Research Park in Gandhinagar, where we will be developing an innovative, end-to-end fire safety solution. This solution will integrate intelligent hardware and software, and we look forward to conducting successful real-world deployments for testing and refinement.",
  },
  {
    year: "2026",
    title: "National Launch Milestone",
    description:
      "After field validation, SFPL is set to launch its innovative solution for stronger early detection, real-time monitoring, and rapid response.",
  },
];

export default function About() {
  return (
    <>
      <section className="relative w-full min-h-[520px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/pages/about/about-hero.png"
          alt="Specific Fire Protection Limited fire safety systems"
          fill
          className="object-cover object-center z-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-10" />
        <div className="relative z-20 container mx-auto px-4 py-20 flex flex-col items-center justify-center gap-5 text-center text-white">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-sm">
            <Shield className="h-5 w-5 text-red-400" />
            <span className="text-sm md:text-base font-medium tracking-wide">
              Specific Fire Protection Limited
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow">
            Engineering Fire Safety
            <span className="block text-red-400">For a Safer India</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/90 max-w-4xl drop-shadow">
            End-to-end fire protection solutions powered by technical expertise,
            innovation, and national compliance.
          </p>
        </div>
      </section>

      <section className="w-full bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
              About Us
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-6" />
            <p className="text-lg text-gray-700 leading-relaxed">
              Specific Fire Protection Limited (SFPL) is a forward-thinking fire
              safety engineering company committed to delivering end-to-end fire
              protection solutions across India. With a strong foundation built
              on technical expertise, innovation, and compliance with national
              fire safety standards, SFPL aims to redefine how fire safety is
              implemented and managed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-xl border border-gray-200 p-5 bg-gray-50 hover:border-red-300 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <CalendarDays className="h-5 w-5 text-red-600" />
                <p className="text-sm font-semibold text-gray-900">
                  Established
                </p>
              </div>
              <p className="text-3xl font-bold text-gray-900">2016</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-5 bg-gray-50 hover:border-red-300 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Rocket className="h-5 w-5 text-red-600" />
                <p className="text-sm font-semibold text-gray-900">
                  Major Launch
                </p>
              </div>
              <p className="text-3xl font-bold text-gray-900">2026</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-5 bg-gray-50 hover:border-red-300 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-5 w-5 text-red-600" />
                <p className="text-sm font-semibold text-gray-900">Approach</p>
              </div>
              <p className="text-base font-medium text-gray-700">
                Preventive and data-driven
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-5 bg-gray-50 hover:border-red-300 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Target className="h-5 w-5 text-red-600" />
                <p className="text-sm font-semibold text-gray-900">Focus</p>
              </div>
              <p className="text-base font-medium text-gray-700">
                End-to-end fire protection
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
              Our Journey
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full" />
          </div>

          <JourneyTimeline timeline={timeline} />
        </div>
      </section>

      <section className="w-full bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Vision & <span className="text-red-600">Mission</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Our Vision
                </h3>
              </div>
              <p className="text-gray-700 text-center leading-relaxed">
                To become India&apos;s most trusted and innovative fire safety
                company, ensuring every building is equipped with intelligent
                and reliable fire protection systems.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-700 text-center leading-relaxed">
                To deliver advanced, compliant, and end-to-end fire safety
                solutions that prevent fire incidents, protect lives, and
                support our commitment:
              </p>
              <p className="text-center mt-4 text-lg font-semibold text-red-600">
                &ldquo;Let&apos;s Make Fire Safe India.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/90 text-xl md:text-2xl font-medium">
            At SFPL, we don&apos;t just install systems - we engineer safety.
          </p>
        </div>
      </section>
    </>
  );
}
