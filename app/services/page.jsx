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

export default function Services() {
  const mainServices = [
    {
      icon: FileCheck,
      title: "Statutory Compliance, Auditing & Consultancy",
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
            OUR SERVICES
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
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-primary to-primary/90 p-6 text-white">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <ArrowRight className="w-5 h-5" />
                          <h3 className="text-xl font-bold">{service.title}</h3>
                        </div>
                      </div>
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
                  <div className="bg-gradient-to-r from-primary to-primary/90 p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <ArrowRight className="w-5 h-5" />
                      <h3 className="text-xl font-bold">{service.title}</h3>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm mt-4">
                      <Icon className="w-7 h-7" />
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
        <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Protect Your Business?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Get in touch with our fire safety experts to discuss your
            requirements and find the perfect solution for your needs.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Contact Us Today
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
