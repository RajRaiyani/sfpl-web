import {
  FileCheck,
  DraftingCompass,
  ClipboardCheck,
  Wrench,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface MainService {
  icon: LucideIcon;
  title: string;
  shortTitle: string;
  image: string;
  description: string;
  highlights: string[];
}

const mainServices: MainService[] = [
  {
    icon: FileCheck,
    title: "Statutory Compliance, Auditing & Consultancy",
    shortTitle: "Statutory Compliance",
    image: "/images/pages/service/fire-audit.png",
    description:
      "Comprehensive fire safety audits, risk assessments and regulatory compliance services.",
    highlights: ["Fire Safety Audit", "Risk Assessment", "Compliance"],
  },
  {
    icon: DraftingCompass,
    title: "Design & Engineering",
    shortTitle: "Design & Engineering",
    image: "/images/pages/service/fire-planning.png",
    description:
      "Professional fire protection system design and engineering solutions.",
    highlights: ["System Architecture", "Code Compliance", "Fire Modeling"],
  },
  {
    icon: Wrench,
    title: "Installation & Commissioning",
    shortTitle: "Installation & Commissioning",
    image: "/images/pages/service/fire-system-installation.png",
    description:
      "Complete system installation and commissioning with quality assurance.",
    highlights: ["Commissioning", "Acceptance Testing", "BMS Integration"],
  },
  {
    icon: ClipboardCheck,
    title: "AMC, Testing & Maintenance",
    shortTitle: "AMC, Testing & Maintenance",
    image: "/images/pages/service/fire-testing.png",
    description:
      "Regular AMC services to ensure your fire protection systems remain operational.",
    highlights: ["Quarterly Inspection", "Flow Testing", "Compliance"],
  },
];

export default function Services() {
  return (
    <section
      aria-labelledby="services-heading"
      className="bg-white py-14 sm:py-16 md:py-20"
    >
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center sm:mb-12">
          <h2
            id="services-heading"
            className="mb-4 inline-block text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl"
          >
            <span className="text-gray-800">Our</span>&nbsp;
            <span className="text-primary">Services</span>
            <span className="ms-auto mt-2 block h-1 w-16 rounded bg-primary" />
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
            Comprehensive fire protection solutions from design to maintenance
          </p>
        </div>

        <ul className="mb-10 grid grid-cols-1 gap-5 sm:mb-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {mainServices.map((service) => {
            const Icon = service.icon;
            return (
              <li key={service.title}>
                <Link
                  href="/services"
                  className="group block h-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <div className="relative h-44 overflow-hidden bg-gray-50 sm:h-48">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-white/95 shadow-md backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5 text-primary" aria-hidden />
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="mb-3 text-lg leading-tight font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary">
                      {service.shortTitle}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-gray-600">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.highlights.slice(0, 2).map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-bold text-white shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:py-4"
          >
            View All Services
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
