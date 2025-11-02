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

export default function Services() {
  const mainServices = [
    {
      icon: FileCheck,
      title: "Statutory Compliance, Auditing & Consultancy",
      description:
        "Comprehensive fire safety audits, risk assessments, and regulatory compliance services.",
      highlights: ["Fire Safety Audit", "Risk Assessment", "Compliance"],
    },
    {
      icon: DraftingCompass,
      title: "Design & Engineering",
      description:
        "Professional fire protection system design and engineering solutions.",
      highlights: ["System Architecture", "Code Compliance", "Fire Modeling"],
    },
    {
      icon: ClipboardCheck,
      title: "Inspection, Testing & Maintenance",
      description:
        "Regular ITM services to ensure your fire protection systems remain operational.",
      highlights: ["Quarterly Inspection", "Flow Testing", "Compliance"],
    },
    {
      icon: Wrench,
      title: "Installation & Commissioning",
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Our Services
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
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {service.title.split(",")[0]}
                  </h3>
                </div>
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
              </Link>
            );
          })}
        </div>

        {/* Systems Overview */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Detection & Suppression Systems
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {systemServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={index}
                  href="/services"
                  className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {service.title}
                  </h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </Link>
              );
            })}
          </div>
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
