import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  const HeadingTag = isStandalonePage ? "h1" : "h2";

  return (
    <section
      id="about"
      className="relative bg-[#0D0D0D] text-[#F5F5F5] py-16 sm:py-20 lg:py-24 border-b border-[#262626]"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#141414] px-3 py-1 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1A1]">
              Engineering Philosophy &amp; Background
            </span>
          </div>

          <HeadingTag className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F5] leading-tight">
            Engineering scalable backends &amp; <br className="hidden sm:inline" />
            <span className="text-[#A3E635]">resilient digital products.</span>
          </HeadingTag>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#A1A1A1]">
            Software Engineer at <strong className="text-[#F5F5F5] font-semibold">ISEES Technologies LLP</strong> based in Pune. I bridge the gap between heavy enterprise backend engineering and intuitive user interfaces.
          </p>
        </div>

        {/* Split Layout: Core Narrative vs Architectural Blueprint */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* LEFT: Professional Narrative & Core Tenets */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Story Card */}
            <div className="rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-8">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F5F5F5] mb-4">
                The Journey &amp; Development Philosophy
              </h3>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#A1A1A1]">
                <p>
                  With <strong className="text-[#F5F5F5]">2+ years of professional backend experience</strong>, I specialize in crafting robust, fault-tolerant backend infrastructures using <span className="text-[#F5F5F5] font-medium">Java, Spring Boot, Hibernate, and PostgreSQL</span>. My career at ISEES Technologies has centered on building real-time reservation engines, multi-branch ERP solutions, and high-concurrency payment APIs.
                </p>
                <p>
                  Beyond server-side logic, I build full-stack web applications with <span className="text-[#F5F5F5] font-medium">React.js, TypeScript, and Tailwind CSS</span>. I believe great software is neither pure aesthetic nor invisible backend plumbing — it is the seamless harmony of a sub-50ms API response paired with an intuitive, fluid user interface.
                </p>
              </div>

              {/* 4 Pillars Grid */}
              <div className="mt-8 pt-6 border-t border-[#262626] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#262626] bg-[#1A1A1A] text-[#A3E635]">
                    <FaServer className="text-sm" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F5F5F5]">Clean Architecture</h4>
                    <p className="text-xs text-[#A1A1A1] mt-0.5">Decoupled services, domain boundaries, and strict DTO contracts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#262626] bg-[#1A1A1A] text-[#A3E635]">
                    <FaShieldHalved className="text-sm" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F5F5F5]">Defensive Security</h4>
                    <p className="text-xs text-[#A1A1A1] mt-0.5">JWT validation, RBAC, CSRF mitigation, and rate limiting.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#262626] bg-[#1A1A1A] text-[#A3E635]">
                    <FaDatabase className="text-sm" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F5F5F5]">Concurrency Safety</h4>
                    <p className="text-xs text-[#A1A1A1] mt-0.5">Pessimistic locking, Redis distributed cache, zero race conditions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#262626] bg-[#1A1A1A] text-[#A3E635]">
                    <FaCode className="text-sm" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F5F5F5]">Full-Stack Fluency</h4>
                    <p className="text-xs text-[#A1A1A1] mt-0.5">Type-safe React, Tailwind styling, and responsive UX execution.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="/Gulrez-Sarankar.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs sm:text-sm py-2.5 px-5"
                >
                  <FaDownload className="text-xs" />
                  <span>Download Official Resume</span>
                </a>

                <Link
                  to="/contact"
                  className="btn-secondary text-xs sm:text-sm py-2.5 px-5"
                >
                  <span>Discuss a Project</span>
                  <FaArrowUpRightFromSquare className="text-xs" />
                </Link>
              </div>
            </div>

            {/* Experience Cards */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-[#F5F5F5] flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#A3E635]" />
                Career Trajectory at ISEES Technologies LLP
              </h3>

              {experienceList.map((exp, idx) => (
                <div
                  key={`${exp.role}-${idx}`}
                  className="rounded-xl border border-[#262626] bg-[#141414] p-5 sm:p-6 transition-colors hover:border-[#383838]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading text-base sm:text-lg font-bold text-[#F5F5F5]">
                          {exp.role}
                        </h4>
                        {exp.isPromoted && (
                          <span className="rounded bg-[#1A1A1A] border border-[#262626] px-2 py-0.5 text-[10px] font-mono text-[#A3E635]">
                            ★ Promoted
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-[#A1A1A1] mt-0.5">
                        {exp.company}
                      </p>
                    </div>

                    <span className="rounded border border-[#262626] bg-[#1A1A1A] px-2.5 py-1 text-[11px] font-mono text-[#A1A1A1]">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="mt-3.5 space-y-1.5 text-xs sm:text-sm text-[#A1A1A1]">
                    {exp.highlights &&
                      exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <FaCircleCheck className="mt-1 shrink-0 text-[#A3E635] text-[11px]" />
                          <span>{h}</span>
                        </li>
                      ))}
                  </ul>

                  {exp.tech && (
                    <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-[#262626]">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-[#262626] bg-[#1A1A1A] px-2 py-0.5 text-[10px] font-mono text-[#A1A1A1]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Architecture Visual & Quick Info Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* System Blueprint Card */}
            <div className="rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-7 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#262626]" />
                    <span className="h-2 w-2 rounded-full bg-[#262626]" />
                    <span className="h-2 w-2 rounded-full bg-[#262626]" />
                  </div>
                  <span className="text-xs font-mono font-medium text-[#A1A1A1] ml-2">
                    architecture_flow.svg
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#A3E635] bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#262626]">
                  PRODUCTION ACTIVE
                </span>
              </div>

              {/* Layered Architectural Flow Diagram */}
              <div className="mt-5 space-y-3 font-mono text-xs">
                {/* Layer 1: Client Interfaces */}
                <div className="rounded-lg border border-[#262626] bg-[#1A1A1A] p-3">
                  <div className="flex items-center justify-between text-[#F5F5F5] font-semibold">
                    <div className="flex items-center gap-2">
                      <SiReact className="text-sm text-[#A3E635]" />
                      <span>PRESENTATION LAYER</span>
                    </div>
                    <span className="text-[10px] text-[#A1A1A1]">React / Vite / Tailwind</span>
                  </div>
                  <p className="text-[11px] text-[#A1A1A1] mt-1 font-sans">
                    Stateless client with responsive layouts and accessible semantic structure.
                  </p>
                </div>

                {/* Connecting Arrow */}
                <div className="flex justify-center text-[#666666] text-xs">
                  ↓ HTTPS / REST / JWT Bearer
                </div>

                {/* Layer 2: API Gateway & Security */}
                <div className="rounded-lg border border-[#262626] bg-[#1A1A1A] p-3">
                  <div className="flex items-center justify-between text-[#F5F5F5] font-semibold">
                    <div className="flex items-center gap-2">
                      <SiSpringboot className="text-sm text-[#A3E635]" />
                      <span>SPRING BOOT 3 GATEWAY</span>
                    </div>
                    <span className="text-[10px] text-[#A3E635]">Spring Security</span>
                  </div>
                  <p className="text-[11px] text-[#A1A1A1] mt-1 font-sans">
                    Stateless token authentication, CORS filters, request validation &amp; exception mapping.
                  </p>
                </div>

                {/* Connecting Arrow */}
                <div className="flex justify-center text-[#666666] text-xs">
                  ↓ Transaction Boundary (@Transactional)
                </div>

                {/* Layer 3: Persistence & Cache Layer */}
                <div className="rounded-lg border border-[#262626] bg-[#1A1A1A] p-3">
                  <div className="flex items-center justify-between text-[#F5F5F5] font-semibold">
                    <div className="flex items-center gap-2">
                      <SiPostgresql className="text-sm text-[#A3E635]" />
                      <SiRedis className="text-sm text-[#A3E635] ml-1" />
                      <span>STORAGE &amp; CACHE LAYER</span>
                    </div>
                    <span className="text-[10px] text-[#A1A1A1]">PostgreSQL + Redis</span>
                  </div>
                  <p className="text-[11px] text-[#A1A1A1] mt-1 font-sans">
                    3NF normalized relational schema, HikariCP connection pooling, sub-50ms index scans.
                  </p>
                </div>
              </div>

              {/* Status footer inside card */}
              <div className="mt-5 pt-4 border-t border-[#262626] grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded border border-[#262626] bg-[#1A1A1A]">
                  <div className="text-xs font-bold text-[#F5F5F5]">Sub-50ms</div>
                  <div className="text-[10px] text-[#A1A1A1]">API Latency</div>
                </div>
                <div className="p-2 rounded border border-[#262626] bg-[#1A1A1A]">
                  <div className="text-xs font-bold text-[#A3E635]">Zero Race</div>
                  <div className="text-[10px] text-[#A1A1A1]">Concurrency</div>
                </div>
                <div className="p-2 rounded border border-[#262626] bg-[#1A1A1A]">
                  <div className="text-xs font-bold text-[#F5F5F5]">100% Type</div>
                  <div className="text-[10px] text-[#A1A1A1]">Validated</div>
                </div>
              </div>
            </div>

            {/* Quick Contact & Location Info Card */}
            <div className="rounded-xl border border-[#262626] bg-[#141414] p-5 sm:p-6 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-3 text-[#A1A1A1]">
                <FaLocationDot className="text-base text-[#A3E635] shrink-0" />
                <span>Pune, Maharashtra, India (Open to Remote Globally)</span>
              </div>
              <div className="flex items-center gap-3 text-[#A1A1A1]">
                <FaEnvelope className="text-base text-[#A3E635] shrink-0" />
                <a
                  href="mailto:gulrezsarankar39@gmail.com"
                  className="hover:text-[#F5F5F5] transition-colors"
                >
                  gulrezsarankar39@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-[#A1A1A1]">
                <FaLinkedin className="text-base text-[#A1A1A1] shrink-0" />
                <a
                  href="https://linkedin.com/in/gulrez-sarankar"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F5F5F5] transition-colors"
                >
                  linkedin.com/in/gulrez-sarankar
                </a>
              </div>
              <div className="flex items-center gap-3 text-[#A1A1A1]">
                <FaGithub className="text-base text-[#A1A1A1] shrink-0" />
                <a
                  href="https://github.com/gulrezsarankar"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F5F5F5] transition-colors"
                >
                  github.com/gulrezsarankar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
