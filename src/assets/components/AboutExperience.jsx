import { motion } from "framer-motion";
import { FaLocationDot, FaEnvelope, FaLinkedin, FaGithub, FaArrowUpRightFromSquare, FaCircleCheck } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";

const experiences = [
  {
    company: "ISEES Technologies LLP",
    role: "Software Engineer",
    period: "Jan 2026 — Present",
    tenure: "Jul 2024 — Present",
    location: "Onsite / Remote",
    isPromoted: true,
    highlights: [
      "Promoted from Associate Software Engineer to Software Engineer in January 2026.",
      "Working on Java-based backend development and maintaining REST APIs.",
      "Working with database integration and application development.",
      "Contributing to real-world software projects and backend architecture.",
    ],
    tech: ["Java", "REST APIs", "Databases", "Backend Architecture"],
  },
  {
    company: "ISEES Technologies LLP",
    role: "Associate Software Engineer",
    period: "Jul 2024 — Jan 2026",
    location: "Onsite / Remote",
    isPromoted: false,
    highlights: [
      "Worked as a Java Developer building real-world backend applications.",
      "Gained hands-on experience with Core Java and OOP concepts.",
      "Worked on backend development, REST APIs, and database integration.",
      "Contributed to real-world application development projects.",
    ],
    tech: ["Core Java", "OOP", "REST APIs", "Databases", "Backend Development"],
  },
];

export default function AboutExperience({ isStandalonePage = false, pageType = "about" }) {
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSec = document.querySelector("#contact");
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/contact";
    }
  };

  const AboutHeadingTag = isStandalonePage && pageType === "about" ? "h1" : "h2";
  const ExpHeadingTag = isStandalonePage && pageType === "experience" ? "h1" : "h2";

  return (
    <section id="about" className="bg-[var(--bg-section)] py-12 lg:py-20 border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT: ABOUT ME */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <div className="theme-badge mb-3">
              ABOUT ME
            </div>

            <AboutHeadingTag className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)] md:text-4xl">
              Backend developer focused on building reliable systems.
            </AboutHeadingTag>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
              I design and develop reliable backend systems using Java and Spring Boot,
              with a focus on clean architecture, API reliability, database performance,
              and maintainable production code.
            </p>

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
              With experience spanning multi-tenant enterprise architectures, database query
              tuning, Redis caching, and distributed security workflows, I solve complex engineering challenges and ship
              robust production software.
            </p>

            {/* Profile Frame with Technical Tag Decorations */}
            <div className="mt-6 sm:mt-8 grid gap-5 sm:grid-cols-12 items-center">
              <div className="sm:col-span-5 max-w-[220px] sm:max-w-none mx-auto sm:mx-0 w-full">
                <div className="relative overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-1.5 shadow-md">
                  <img
                    src="/Gulrez.png"
                    alt="Gulrez Sarankar - Java Backend Developer Profile"
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full rounded-lg object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/Gulrez New.png";
                    }}
                  />
                  {/* Subtle Tech Overlay Badges */}
                  <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
                    {["Java", "Spring Boot", "PostgreSQL"].map((b) => (
                      <span
                        key={b}
                        className="rounded bg-[var(--bg-main)]/90 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-[var(--accent-primary)] border border-[var(--border-color)]"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-2.5 sm:col-span-7 text-xs sm:text-sm">
                <div className="flex items-center gap-3 text-[var(--text-primary)]">
                  <FaLocationDot className="text-[var(--accent-primary)] shrink-0" />
                  <span className="font-semibold">India</span>
                </div>

                <div className="flex items-center gap-3 text-[var(--text-primary)]">
                  <FaEnvelope className="text-[var(--accent-primary)] shrink-0" />
                  <a href="mailto:gulrezsarankar39@gmail.com" aria-label="Send email to Gulrez Sarankar" className="font-semibold hover:text-[var(--accent-primary)] truncate">
                    gulrezsarankar39@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3 text-[var(--text-primary)]">
                  <FaLinkedin className="text-[var(--accent-primary)] shrink-0" />
                  <a href="https://linkedin.com/in/gulrez-sarankar" target="_blank" rel="noreferrer" aria-label="Gulrez Sarankar LinkedIn Profile" className="font-semibold hover:text-[var(--accent-primary)] truncate">
                    LinkedIn / gulrez-sarankar
                  </a>
                </div>

                <div className="flex items-center gap-3 text-[var(--text-primary)]">
                  <FaGithub className="text-[var(--accent-primary)] shrink-0" />
                  <a href="https://github.com/gulrezsarankar" target="_blank" rel="noreferrer" aria-label="Gulrez Sarankar GitHub Profile" className="font-semibold hover:text-[var(--accent-primary)] truncate">
                    GitHub / gulrezsarankar
                  </a>
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#10B981]" />
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-[#10B981]">
                    Open to Opportunities
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <a
                href="#contact"
                onClick={scrollToContact}
                aria-label="Navigate to contact section"
                className="btn-primary-blue text-xs sm:text-sm py-2.5 px-4 sm:py-3 sm:px-5"
              >
                Let's Connect
                <FaArrowUpRightFromSquare className="text-xs" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT: EXPERIENCE TIMELINE */}
          <motion.div
            id="experience"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-6"
          >
            <div className="theme-badge mb-3">
              CAREER PATH
            </div>

            <ExpHeadingTag className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)] md:text-4xl">
              Professional Experience
            </ExpHeadingTag>

            {/* Company & Overall Tenure */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-[var(--accent-primary)]">ISEES Technologies LLP</span>
              <span className="text-xs text-[var(--text-muted)]">·</span>
              <span className="text-xs font-semibold text-[var(--text-secondary)]">Jul 2024 — Present</span>
            </div>

            <div className="relative mt-6 sm:mt-8 space-y-6 sm:space-y-8 pl-5 sm:pl-6 before:absolute before:bottom-2 before:left-2 before:top-2 before:w-[2px] before:bg-[var(--border-color)]">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Indicator Dot — accent for current, muted for past */}
                  <div className={`absolute -left-[27px] sm:-left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--bg-main)] shadow-xs ${exp.isPromoted ? "bg-[var(--accent-primary)]" : "bg-[var(--border-color)]"}`} />

                  <div className="theme-card p-4 sm:p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[var(--border-color)] pb-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base sm:text-lg font-extrabold text-[var(--text-primary)]">
                            {exp.role}
                          </h3>
                          {exp.isPromoted && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-[#10B981]/15 border border-[#10B981]/30 px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
                              <FaArrowUp className="text-[8px]" />
                              PROMOTED
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-[var(--accent-primary)]">
                          {exp.company}
                        </p>
                      </div>
                      <span className="rounded-md bg-[var(--accent-soft)] border border-[var(--border-color)] px-2.5 py-1 text-[11px] sm:text-xs font-bold text-[var(--accent-primary)] whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                      {exp.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <FaCircleCheck className="mt-1 text-xs shrink-0 text-[var(--accent-primary)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Badges */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <span key={t} className="rounded bg-[var(--bg-main)] border border-[var(--border-color)] px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-[var(--accent-primary)]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
