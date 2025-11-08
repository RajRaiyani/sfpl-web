"use client";

import {
  FileCheck,
  DraftingCompass,
  ClipboardCheck,
  Wrench,
  AlertTriangle,
  Droplets,
  Flame,
  ArrowRight,
  Shield,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Services() {
  const mainServices = [
    {
      icon: FileCheck,
      title: "Statutory Compliance, Auditing & Consultancy",
      image: "/images/pages/service/fire-audit.png",
      description:
        "Comprehensive fire safety audits, risk assessments, and regulatory compliance services.",
      highlights: ["Fire Safety Audit", "Risk Assessment", "Compliance"],
    },
    {
      icon: DraftingCompass,
      title: "Design & Engineering",
      image: "/images/pages/service/fire-planning.png",
      description:
        "Professional fire protection system design and engineering solutions.",
      highlights: ["System Architecture", "Code Compliance", "Fire Modeling"],
    },
    {
      icon: ClipboardCheck,
      title: "Inspection, Testing & Maintenance",
      image: "/images/pages/service/fire-testing.png",
      description:
        "Regular ITM services to ensure your fire protection systems remain operational.",
      highlights: ["Quarterly Inspection", "Flow Testing", "Compliance"],
    },
    {
      icon: Wrench,
      title: "Installation & Commissioning",
      image: "/images/pages/service/fire-system-installation.png",
      description:
        "Complete system installation and commissioning with quality assurance.",
      highlights: ["Commissioning", "Acceptance Testing", "BMS Integration"],
    },
  ];

  const systemServices = [
    {
      icon: AlertTriangle,
      title: "Detection Systems",
      description: "Advanced fire detection technology",
    },
    {
      icon: Droplets,
      title: "Suppression Systems",
      description: "Comprehensive fire suppression solutions",
    },
    {
      icon: Flame,
      title: "Active Fire Protection",
      description: "Fire hydrants, pumps & control systems",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 relative inline-block">
            <span className="text-gray-800 ml-2">Our</span>&nbsp;
            <span className="text-red-600">Services</span>
            <span className="block h-1 w-16 ms-auto bg-red-600 mt-2 rounded"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive fire protection solutions from design to maintenance
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mainServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                href="/services"
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1 cursor-pointer group"
              >
                {/* Image Section */}
                <div className="relative h-48 bg-gray-50 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Icon Badge */}
                  <div className="absolute top-3 right-3 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md z-10 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title.split(",")[0]}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.highlights.slice(0, 2).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold py-4 px-8 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
