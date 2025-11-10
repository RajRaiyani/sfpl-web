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
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Services() {
  const mainServices = [
    {
      icon: FileCheck,
      title: "Statutory Compliance, Auditing & Consultancy",
      image: "/images/pages/service/fire-audit.png",
      services: [
        "Fire Safety Audit (FSA)",
        "Fire Risk Assessment (FRA)",
        "Due Diligence Audits",
        "Gap Analysis against regulatory standards",
        "Emergency Response Plan (ERP) Development",
      ],
    },
    {
      icon: DraftingCompass,
      title: "Design & Engineering",
      image: "/images/pages/service/fire-planning.png",
      services: [
        "Risk Analysis",
        "Performance-Based Design (PBD)",
        "System Architecture",
        "Code Compliance (BIS, NBC, NFPA)",
        "Fire load calculation",
        "Hydraulic calculation (for sprinkler systems)",
        "Occupant Load Calculation",
        "Fire Modeling",
        "Piping and Instrumentation Diagrams (P&ID)",
        "System Integration",
      ],
    },
    {
      icon: ClipboardCheck,
      title: "Inspection, Testing, and Maintenance (ITM)",
      image: "/images/pages/service/fire-testing.png",
      services: [
        "BIS, NBC, NFPA, Local State Regulation Standard Compliance",
        "Quarterly/Annual Inspection, Testing, and Maintenance (ITM)",
        "Integrity Testing (for gaseous systems)",
        "Flow Testing",
        "Backflow Prevention Device Testing",
        "Deficiency Tagging and Rectification",
      ],
    },
    {
      icon: Wrench,
      title: "System Installation & Commissioning",
      image: "/images/pages/service/fire-system-installation.png",
      services: [
        "Commissioning",
        "System Acceptance Testing",
        "Hydrostatic Testing",
        "Seamless Integration with existing Building Management Systems (BMS)",
        "Project Lifecycle Management",
        "Adherence to Manufacturer Specifications",
      ],
    },
  ];

  const systemServices = [
    {
      icon: AlertTriangle,
      title: "Detection Systems",
      services: [
        "Addressable/Conventional Fire Alarm Systems",
        "Early Warning Systems (e.g., VESDA - Very Early Smoke Detection Apparatus)",
        "Aspiration Smoke Detection",
        "Linear Heat Detection Cable (LHD)",
      ],
    },
    {
      icon: Droplets,
      title: "Suppression Systems",
      services: [
        "Automatic Sprinkler Systems (Wet Pipe, Dry Pipe, Pre-Action, Deluge)",
        "Gaseous Fire Suppression Systems (e.g., FM-200, Novec 1230, CO2)",
        "Foam Suppression Systems (High/Medium Expansion)",
        "Clean Agent Systems (for data centers, server rooms)",
        "Kitchen Hood Suppression Systems (e.g., UL 300 compliant)",
      ],
    },
    {
      icon: Flame,
      title: "Active Fire Protection (AFP)",
      services: [
        "Fire Hydrant & Fire Hose Reel Systems",
        "Fire Pumps (Electric, Diesel, Jockey)",
        "Fire Command Centre/Control Panel",
      ],
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 relative inline-block">
            <span className="text-gray-800">Our</span>&nbsp;
            <span className="text-red-600">Services</span>
            <span className="block h-1 w-16 bg-red-600 mt-2 rounded mx-auto"></span>
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Comprehensive fire protection solutions designed to keep you safe.
            From compliance and design to installation and maintenance, we
            provide end-to-end fire safety services.
          </p>
        </div>

        {/* Main Services Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Core Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden group"
                >
                  {/* Image Section */}
                  <div className="relative h-64 bg-gray-50 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Icon Badge */}
                    <div className="absolute top-4 right-4 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg z-20 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <ArrowRight className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>

                    <ul className="space-y-3">
                      {service.services.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-base leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Systems & Equipment Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Detection & Suppression Systems
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced fire detection and suppression technologies to protect
              your assets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {systemServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
                >
                  <div className="bg-primary p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-7 h-7" />
                      <h3 className="text-xl font-bold">{service.title}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <ul className="space-y-3">
                      {service.services.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Section - Red Background */}
            <div className="bg-primary p-8 md:p-12 text-white">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Start a Project
              </h2>
              <p className="text-md md:text-lg opacity-90 leading-relaxed">
                Understanding of our clients&apos; needs. If you&apos;d like to
                learn more about our work and the thinking behind our approach,
                we&apos;d be happy to discuss your project. With no obligation
                on your part, it&apos;s the perfect way to see if you&apos;d
                like us to take things further.
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
