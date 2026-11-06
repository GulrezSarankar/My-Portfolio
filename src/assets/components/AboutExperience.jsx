import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getExperience } from "../../services/experienceService";
import {
  FaLocationDot,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaArrowUpRightFromSquare,
  FaCircleCheck,
  FaDownload,
  FaServer,
  FaCode,
  FaDatabase,
  FaShieldHalved,
} from "react-icons/fa6";
import { SiSpringboot, SiPostgresql, SiRedis, SiReact } from "react-icons/si";

const experiences = [
  {
    company: "ISEES Technologies LLP",
    role: "Software Engineer",
    period: "Jan 2026 — Present",
    tenure: "Full-Time • Pune, India",
    isPromoted: true,
    highlights: [
      "Promoted to Software Engineer following strong architectural contributions to high-concurrency production backends.",
      "Architect and maintain mission-critical Spring Boot microservices and RESTful API endpoints for enterprise clients.",
      "Design normalized PostgreSQL and MySQL schemas with optimized composite indexing and Redis caching.",
      "Lead full-stack feature development integrating React.js and TypeScript frontends with secure backend services.",
    ],
    tech: ["Java", "Spring Boot", "PostgreSQL", "Redis", "REST APIs", "Docker"],
  },
  {
    company: "ISEES Technologies LLP",
    role: "Associate Software Engineer",
    period: "Jul 2024 — Jan 2026",
    tenure: "Full-Time • Pune, India",
    isPromoted: false,
    highlights: [
      "Developed Core Java backend logic, implementing OOP principles and database integration layers.",
      "Constructed REST APIs with automated payload validation, error mapping, and Swagger documentation.",
      "Collaborated in sprint planning, Git branching workflows, peer code reviews, and integration testing.",
      "Implemented security controls including BCrypt password encryption and stateless JWT token verification.",
    ],
    tech: ["Core Java", "Spring Boot", "MySQL", "REST APIs", "Git", "Maven"],
  },
];

export default function AboutExperience({ isStandalonePage = false, pageType = "about" }) {
  const [experienceList, setExperienceList] = useState(experiences);

  useEffect(() => {
    let isMounted = true;
    getExperience().then((res) => {
      if (isMounted && res.data && res.data.length > 0) {
        setExperienceList(res.data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSec = document.querySelector("#contact");
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/contact";
    }
  };

  const HeadingTag = isStandalonePage ? "h1" : "h2";

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#100B20]/90 py-16 sm:py-20 lg:py-28 border-b border-[rgba(255,255,255,0.08)]"
    >
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 -translate-y-1/2 rounded-full bg-[#9B5CFF]/10 blur-[100px]" />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        
        {/* ================================================================
            SECTION HEADER & BADGE
            ================================================================ */}
        <div className="mb-12 sm:mb-16 text-left max-w-3xl">
          <div className="glass-pill mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9B5CFF]" />
            ENGINEERING PHILOSOPHY &amp; BACKGROUND
          </div>
          <HeadingTag className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Engineering scalable backends &amp; <br className="hidden sm:inline" />
            <span className="purple-gradient-text">resilient digital products.</span>
          </HeadingTag>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#AAA5B8]">
            Software Engineer at <strong className="text-white font-semibold">ISEES Technologies LLP</strong> and Freelance Web Architect based in Pune. I bridge the gap between heavy enterprise backend engineering and elegant, conversion-focused user interfaces.
          </p>
        </div>

        {/* ================================================================
            SPLIT LAYOUT: Core Narrative vs Architectural Blueprint
            ================================================================ */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          
          {/* LEFT: Professional Narrative & Core Tenets */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Story Card */}
            <div className="glass-card p-6 sm:p-8">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-4">
                The Journey &amp; Development Philosophy
              </h3>
              
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#AAA5B8]">
                <p>
                  With <strong className="text-white">2+ years of professional backend experience</strong>, I specialize in crafting robust, fault-tolerant backend infrastructures using <span className="text-[#9B5CFF] font-semibold">Java, Spring Boot, Hibernate, and PostgreSQL</span>. My career at ISEES Technologies has centered on building real-time reservation engines, multi-branch ERP solutions, and high-concurrency payment APIs.
                </p>
                <p>
                  Beyond server-side logic, I build full-stack web applications with <span className="text-[#D66BFF] font-semibold">React.js, TypeScript, and Tailwind CSS</span>. I believe great software is neither pure aesthetic nor invisible backend plumbing — it is the seamless harmony of a sub-50ms API response paired with an intuitive, fluid user interface.
                </p>
              </div>

              {/* 4 Pillars Grid */}
              <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.08)] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(155,92,255,0.15)] text-[#9B5CFF]">
                    <FaServer className="text-sm" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Clean Architecture</h4>
                    <p className="text-xs text-[#AAA5B8] mt-0.5">Decoupled services, domain boundaries, and strict DTO contracts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(214,107,255,0.15)] text-[#D66BFF]">
                    <FaShieldHalved className="text-sm" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Defensive Security</h4>
                    <p className="text-xs text-[#AAA5B8] mt-0.5">JWT validation, RBAC, CSRF mitigation, and rate limiting.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(16,185,129,0.15)] text-emerald-400">
                    <FaDatabase className="text-sm" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Concurrency Safety</h4>
                    <p className="text-xs text-[#AAA5B8] mt-0.5">Pessimistic locking, Redis distributed locks, zero race conditions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(97,218,251,0.15)] text-[#61DAFB]">
                    <FaCode className="text-sm" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Full-Stack Fluency</h4>
                    <p className="text-xs text-[#AAA5B8] mt-0.5">Type-safe React, Tailwind styling, and responsive UX execution.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="/Gulrez-Sarankar.pdf"
                  download="Gulrez_Sarankar_Resume.pdf"
                  className="btn-primary-purple text-xs sm:text-sm py-2.5 px-5 shadow-[0_0_20px_rgba(155,92,255,0.35)]"
                >
                  <FaDownload className="text-xs" />
                  <span>Download Official Resume</span>
                </a>

                <a
                  href="#contact"
                  onClick={scrollToContact}
                  className="btn-secondary-glass text-xs sm:text-sm py-2.5 px-5"
                >
                  <span>Discuss a Project</span>
                  <FaArrowUpRightFromSquare className="text-xs text-[#D66BFF]" />
                </a>
              </div>
            </div>

            {/* Experience Cards */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#9B5CFF]" />
                Career Trajectory at ISEES Technologies LLP
              </h3>

              {experienceList.map((exp, idx) => (
                <div
                  key={`${exp.role}-${idx}`}
                  className="glass-card p-5 sm:p-6 transition-all duration-300 hover:border-[#9B5CFF]/40"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading text-base sm:text-lg font-bold text-white">
                          {exp.role}
                        </h4>
                        {exp.isPromoted && (
                          <span className="glass-pill text-[10px] py-0.5 px-2 bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                            ★ Promoted
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-[#D66BFF]">
                        {exp.company}
                      </p>
                    </div>

                    <span className="rounded-lg border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 text-[11px] font-semibold text-[#AAA5B8]">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="mt-3.5 space-y-1.5 text-xs sm:text-sm text-[#AAA5B8]">
                    {exp.highlights &&
                      exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <FaCircleCheck className="mt-1 shrink-0 text-[#9B5CFF] text-[11px]" />
                          <span>{h}</span>
                        </li>
                      ))}
                  </ul>

                  {exp.tech && (
                    <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-2 py-0.5 text-[10px] font-medium text-[#AAA5B8]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Architecture Visual & Technical Credibility Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* System Blueprint Glass Card */}
            <div className="glass-card p-6 sm:p-7 border-[rgba(155,92,255,0.25)] relative overflow-hidden">
              {/* Subtle top light bar */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#9B5CFF] via-[#D66BFF] to-[#9B5CFF]" />

              <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.08)]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#AAA5B8] ml-2">
                    architecture_flow.svg
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  HEALTHY
                </span>
              </div>

              {/* Layered Architectural Flow Diagram */}
              <div className="mt-5 space-y-3 font-mono text-xs">
                {/* Layer 1: Client Interfaces */}
                <div className="rounded-xl border border-[rgba(97,218,251,0.25)] bg-[rgba(97,218,251,0.05)] p-3">
                  <div className="flex items-center justify-between text-[#61DAFB] font-bold">
                    <div className="flex items-center gap-2">
                      <SiReact className="text-sm" />
                      <span>PRESENTATION LAYER</span>
                    </div>
                    <span className="text-[10px] text-[#AAA5B8]">React / Tailwind / Mobile</span>
                  </div>
                  <p className="text-[11px] text-[#AAA5B8] mt-1 font-sans">
                    Stateless SPA with optimistic updates, SSR-readiness &amp; glassmorphism.
                  </p>
                </div>

                {/* Connecting Arrow */}
                <div className="flex justify-center text-[#9B5CFF] text-xs">
                  ↓ HTTPS / REST / JWT Bearer
                </div>

                {/* Layer 2: API Gateway & Security */}
                <div className="rounded-xl border border-[rgba(155,92,255,0.3)] bg-[rgba(155,92,255,0.08)] p-3 shadow-[0_0_20px_rgba(155,92,255,0.15)]">
                  <div className="flex items-center justify-between text-[#D66BFF] font-bold">
                    <div className="flex items-center gap-2">
                      <SiSpringboot className="text-sm text-emerald-400" />
                      <span>SPRING BOOT 3 GATEWAY</span>
                    </div>
                    <span className="text-[10px] text-emerald-400">Spring Security</span>
                  </div>
                  <p className="text-[11px] text-[#AAA5B8] mt-1 font-sans">
                    Stateless token authentication, CORS filters, request validation &amp; rate limiters.
                  </p>
                </div>

                {/* Connecting Arrow */}
                <div className="flex justify-center text-[#9B5CFF] text-xs">
                  ↓ Transaction Boundary (@Transactional)
                </div>

                {/* Layer 3: Persistence & Cache Layer */}
                <div className="rounded-xl border border-[rgba(65,105,225,0.25)] bg-[rgba(65,105,225,0.05)] p-3">
                  <div className="flex items-center justify-between text-[#4169E1] font-bold">
                    <div className="flex items-center gap-2">
                      <SiPostgresql className="text-sm text-blue-400" />
                      <SiRedis className="text-sm text-red-400 ml-1" />
                      <span>STORAGE &amp; CACHE LAYER</span>
                    </div>
                    <span className="text-[10px] text-white">PostgreSQL + Redis</span>
                  </div>
                  <p className="text-[11px] text-[#AAA5B8] mt-1 font-sans">
                    3NF normalized relational schema, HikariCP connection pooling, sub-50ms index scans.
                  </p>
                </div>
              </div>

              {/* Status footer inside card */}
              <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.08)] grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.02)]">
                  <div className="text-xs font-bold text-white">Sub-50ms</div>
                  <div className="text-[10px] text-[#AAA5B8]">API Latency</div>
                </div>
                <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.02)]">
                  <div className="text-xs font-bold text-emerald-400">Zero Race</div>
                  <div className="text-[10px] text-[#AAA5B8]">Concurrency</div>
                </div>
                <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.02)]">
                  <div className="text-xs font-bold text-[#D66BFF]">100% Type</div>
                  <div className="text-[10px] text-[#AAA5B8]">Validated</div>
                </div>
              </div>
            </div>

            {/* Quick Contact & Location Info Card */}
            <div className="glass-card p-5 sm:p-6 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-3 text-[#AAA5B8]">
                <FaLocationDot className="text-base text-[#9B5CFF] shrink-0" />
                <span>Pune, Maharashtra, India (Open to Remote Globally)</span>
              </div>
              <div className="flex items-center gap-3 text-[#AAA5B8]">
                <FaEnvelope className="text-base text-[#D66BFF] shrink-0" />
                <a
                  href="mailto:gulrezsarankar24@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  gulrezsarankar24@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-[#AAA5B8]">
                <FaLinkedin className="text-base text-[#0A66C2] shrink-0" />
                <a
                  href="https://linkedin.com/in/gulrez-sarankar"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  linkedin.com/in/gulrez-sarankar
                </a>
              </div>
              <div className="flex items-center gap-3 text-[#AAA5B8]">
                <FaGithub className="text-base text-white shrink-0" />
                <a
                  href="https://github.com/gulrezsarankar"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  github.com/gulrezsarankar
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
