import {
  Cloud,
  Wifi,
  Smartphone,
  Shield,
  AlertTriangle,
  Activity,
  Database,
  Zap,
  Globe,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Radio,
  Eye,
} from "lucide-react";
import Link from "next/link";

export default function Tech() {
  const iotSolutions = [
    {
      icon: Radio,
      title: "Smart Fire Detection Sensors",
      description:
        "Advanced IoT sensors that continuously monitor temperature, smoke, and gas levels in real-time, providing instant alerts before fire incidents occur.",
      features: [
        "Real-time temperature monitoring",
        "Smoke and gas detection",
        "Wireless connectivity",
        "Low power consumption",
        "Weather-resistant design",
      ],
    },
    {
      icon: Activity,
      title: "Intelligent Monitoring Systems",
      description:
        "24/7 automated monitoring of fire safety equipment and systems, ensuring optimal performance and immediate detection of any anomalies.",
      features: [
        "Continuous equipment monitoring",
        "Predictive maintenance alerts",
        "System health tracking",
        "Automated reporting",
        "Remote diagnostics",
      ],
    },
    {
      icon: Smartphone,
      title: "Mobile-First Alerts",
      description:
        "Instant notifications delivered directly to your mobile device, enabling rapid response and coordination during emergency situations.",
      features: [
        "Push notifications",
        "SMS alerts",
        "Multi-user support",
        "Emergency contact chains",
        "Location-based alerts",
      ],
    },
  ];

  const cloudSolutions = [
    {
      icon: Cloud,
      title: "Cloud-Based Fire Safety Platform",
      description:
        "Centralized cloud platform that aggregates data from all connected devices, providing comprehensive insights and control from anywhere.",
      features: [
        "Centralized data management",
        "Scalable infrastructure",
        "Secure data storage",
        "Multi-location support",
        "API integrations",
      ],
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description:
        "Advanced analytics engine that processes fire safety data to identify patterns, predict risks, and generate actionable insights.",
      features: [
        "Real-time dashboards",
        "Historical trend analysis",
        "Risk assessment reports",
        "Compliance tracking",
        "Customizable reports",
      ],
    },
    {
      icon: Database,
      title: "Data Intelligence",
      description:
        "AI-powered data processing that learns from patterns to improve fire prevention strategies and reduce false alarms.",
      features: [
        "Machine learning algorithms",
        "Pattern recognition",
        "Anomaly detection",
        "Predictive analytics",
        "Continuous improvement",
      ],
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Prevent Fires Before They Start",
      description:
        "Early detection and proactive monitoring help identify potential fire hazards before they escalate into dangerous situations.",
    },
    {
      icon: AlertTriangle,
      title: "Reduce Accidental Deaths",
      description:
        "Instant alerts and automated response systems ensure rapid evacuation and emergency response, saving lives.",
    },
    {
      icon: Eye,
      title: "24/7 Monitoring",
      description:
        "Round-the-clock surveillance means no fire risk goes unnoticed, even during off-hours or unoccupied periods.",
    },
    {
      icon: Zap,
      title: "Faster Response Times",
      description:
        "Real-time alerts and automated notifications enable faster emergency response, minimizing damage and risk.",
    },
    {
      icon: Globe,
      title: "Remote Management",
      description:
        "Monitor and manage fire safety systems from anywhere in the world through our cloud-based platform.",
    },
    {
      icon: Cpu,
      title: "Smart Automation",
      description:
        "Intelligent systems that automatically activate suppression systems and coordinate emergency responses.",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Sensor Deployment",
      description:
        "IoT sensors are strategically installed throughout your facility to monitor fire safety parameters continuously.",
    },
    {
      step: "02",
      title: "Data Collection",
      description:
        "Sensors collect real-time data and transmit it securely to our cloud platform via wireless connectivity.",
    },
    {
      step: "03",
      title: "AI Analysis",
      description:
        "Our cloud-based AI engine analyzes the data to detect anomalies, predict risks, and identify potential hazards.",
    },
    {
      step: "04",
      title: "Instant Alerts",
      description:
        "When a threat is detected, instant alerts are sent to designated personnel via mobile app, SMS, and email.",
    },
    {
      step: "05",
      title: "Automated Response",
      description:
        "The system can automatically activate suppression systems, unlock emergency exits, and coordinate with emergency services.",
    },
    {
      step: "06",
      title: "Continuous Learning",
      description:
        "The system learns from each incident to improve accuracy and reduce false alarms over time.",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20 md:py-28 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">
                Innovation in Fire Safety
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              Digital & IoT Solutions
              <span className="block mt-2">for Fire Prevention</span>
            </h1>
            <p className="text-lg md:text-xl text-red-50 max-w-3xl mx-auto leading-relaxed">
              Harnessing the power of IoT sensors, cloud computing, and
              artificial intelligence to prevent fires and save lives before
              emergencies occur.
            </p>
          </div>
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Prevent Fires & Save Lives
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our technology-driven approach ensures early detection, rapid
              response, and continuous protection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* IoT Solutions Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
              <Radio className="w-5 h-5 text-red-600" />
              <span className="text-sm font-semibold text-red-600">
                IoT Solutions
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Smart Connected Devices
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced IoT sensors and monitoring systems that keep you informed
              and protected 24/7
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {iotSolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden group"
                >
                  <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 text-white">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                    <p className="text-red-50 text-sm leading-relaxed">
                      {solution.description}
                    </p>
                  </div>

                  <div className="p-6">
                    <ul className="space-y-3">
                      {solution.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">
                            {feature}
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
      </div>

      {/* Cloud Solutions Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
              <Cloud className="w-5 h-5 text-red-600" />
              <span className="text-sm font-semibold text-red-600">
                Cloud Platform
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cloud-Based Intelligence
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful cloud infrastructure that processes, analyzes, and stores
              fire safety data securely
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cloudSolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div
                  key={index}
                  className="relative bg-gradient-to-br from-white to-red-50/30 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-red-100 overflow-hidden group"
                >
                  {/* Decorative background element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

                  {/* Icon Badge */}
                  <div className="relative p-6 pb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 mb-4">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-700 transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {solution.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="px-6 pb-6">
                    <ul className="space-y-2.5">
                      {solution.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3 text-gray-700 group/item"
                        >
                          <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-red-600 transition-colors">
                            <CheckCircle2 className="w-3.5 h-3.5 text-red-600 group-hover/item:text-white transition-colors" />
                          </div>
                          <span className="text-sm leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A seamless integration of IoT devices, cloud computing, and AI to
              create a comprehensive fire prevention system
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {howItWorks.map((step, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Integration Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
              {/* Background Pattern */}
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

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                    <Wifi className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Seamless Integration
                  </h2>
                </div>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Our IoT and cloud solutions integrate seamlessly with your
                  existing fire safety infrastructure. Whether you have
                  traditional fire alarm systems, sprinklers, or suppression
                  systems, our technology enhances and extends their
                  capabilities with smart monitoring and automated responses.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span>Compatible with existing fire safety systems</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span>Easy installation and setup</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span>Scalable from single building to enterprise</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span>24/7 technical support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Section - Red Background */}
              <div className="bg-red-600 p-8 md:p-12 text-white">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Ready to Transform Your Fire Safety?
                </h2>
                <p className="text-md md:text-lg opacity-90 leading-relaxed">
                  Discover how our IoT and cloud solutions can prevent fires and
                  save lives. Schedule a consultation to see how we can
                  integrate smart technology into your fire safety strategy.
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
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
                    <a
                      href="tel:+919512570090"
                      className="text-base sm:text-lg md:text-xl hover:text-red-500 transition-colors text-center sm:text-left"
                    >
                      +91 9512570090
                    </a>
                    <span className="hidden sm:inline text-lg md:text-xl opacity-70">
                      |
                    </span>
                    <a
                      href="mailto:contact@specificfire.com"
                      className="text-base sm:text-lg md:text-xl hover:text-red-500 transition-colors text-center sm:text-left break-all"
                    >
                      contact@specificfire.com
                    </a>
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
                        Schedule a Demo
                      </span>
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
