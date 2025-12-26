import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
  Code,
  Database,
  Cloud,
  CheckCircle2,
  Briefcase,
} from "lucide-react";

const jobs = [
  {
    title: "Full Stack Software Engineer",
    positions: 1,
    description:
      "We are looking for a talented Full Stack Software Engineer to join our tech team and help build innovative IoT and cloud-based fire safety solutions. You'll work on developing scalable web applications, integrating IoT devices, and creating cloud platforms that help prevent fires and save lives.",
    location: "Ahmedabad, India (Remote/Hybrid)",
    type: "Full-time",
    experience: "2-5 years",
    // requirements: [
    //   "Strong proficiency in JavaScript/TypeScript and modern frontend frameworks (React, Next.js)",
    //   "Experience with backend development (Node.js, Express, or similar)",
    //   "Knowledge of database systems (PostgreSQL, MongoDB, or similar)",
    //   "Experience with cloud platforms (AWS, Azure, or GCP)",
    //   "Understanding of RESTful APIs and microservices architecture",
    //   "Familiarity with IoT protocols and device integration",
    //   "Experience with version control (Git) and CI/CD pipelines",
    //   "Strong problem-solving skills and attention to detail",
    //   "Good communication skills and ability to work in a team",
    // ],
    // responsibilities: [
    //   "Design and develop full-stack web applications for fire safety monitoring",
    //   "Build and maintain cloud-based platforms for IoT device management",
    //   "Integrate IoT sensors and devices with cloud infrastructure",
    //   "Develop real-time dashboards and analytics platforms",
    //   "Create APIs for mobile applications and third-party integrations",
    //   "Implement automated testing and ensure code quality",
    //   "Collaborate with cross-functional teams to deliver high-quality solutions",
    //   "Participate in code reviews and technical discussions",
    // ],
    skills: ["React/Next.js", "Node.js", "TypeScript", "PostgreSQL"],
    url: "mailto:contact@specificfire.com?subject=Application: Full Stack Software Engineer",
  },
];

export default function Jobs() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            <span className="text-gray-800">Join Our</span>&nbsp;
            <span className="text-red-600">Team</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We're always looking for passionate people to join us in making the
            world safer through innovative technology and fire safety solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Jobs List */}
          <div className="md:col-span-2 space-y-8">
            {jobs.map((job, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col gap-4 border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {job.title === "Full Stack Software Engineer" && (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                          <Code className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {job.title}
                        </h2>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="font-semibold text-red-600">
                            {job.positions} open position
                          </span>
                          {job.type && (
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              {job.type}
                            </span>
                          )}
                          {job.experience && (
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              {job.experience}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mt-3">
                      {job.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>

                {/* Requirements for Full Stack Engineer */}
                {job.requirements && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-red-600" />
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      {job.requirements.map((req, reqIdx) => (
                        <li
                          key={reqIdx}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Responsibilities for Full Stack Engineer */}
                {job.responsibilities && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Database className="w-5 h-5 text-red-600" />
                      Key Responsibilities
                    </h3>
                    <ul className="space-y-2">
                      {job.responsibilities.map((resp, respIdx) => (
                        <li
                          key={respIdx}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">
                            {resp}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills for Full Stack Engineer */}
                {job.skills && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Cloud className="w-5 h-5 text-red-600" />
                      Technical Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, skillIdx) => (
                        <span
                          key={skillIdx}
                          className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Contact us to apply:
                      </p>
                      <a
                        href="tel:+919925913386"
                        className="text-lg font-semibold text-red-600 hover:text-red-700 transition-colors"
                      >
                        +91 9925913386
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why Join Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Work on innovative IoT and cloud solutions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Make a real impact in fire safety and prevention
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Collaborative and supportive work environment
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Opportunities for professional growth
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Competitive compensation and benefits
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Have questions about our open positions? We'd love to hear from
                you.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-red-600" />
                  <a
                    href="mailto:contact@specificfire.com"
                    className="text-sm hover:text-red-600 transition-colors"
                  >
                    contact@specificfire.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-red-600" />
                  <a
                    href="tel:+91 9925913386"
                    className="text-sm hover:text-red-600 transition-colors"
                  >
                    +91 9925913386
                  </a>
                </div>
              </div>
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <a
                  href="https://www.facebook.com/specific.fire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/specific-fire/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@SPECIFIC_FIRE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/specificfire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
