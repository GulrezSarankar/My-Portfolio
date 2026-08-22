import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle, FaEnvelope } from "react-icons/fa";
import SEO from "../assets/components/SEO";

const services = [
  "Spring Boot REST API development & microservices",
  "Stateless JWT authentication & Spring Security RBAC",
  "PostgreSQL & MySQL database design and query tuning",
  "Redis caching strategy for high-concurrency endpoints",
  "React frontend integration with backend API contracts",
  "Production readiness, unit testing, and OpenAPI docs",
];

const process = [
  { title: "1. Scope & Architecture", text: "We define user flows, data schemas, API contracts, timelines, and acceptance criteria." },
  { title: "2. Clean Build & Milestones", text: "I deliver incremental milestones with clean Java/Spring Boot code, version control, and progress demos." },
  { title: "3. Testing & Handover", text: "You receive clean source code, Docker configs, OpenAPI docs, and deployment handover support." },
];

export default function Freelance() {
  return (
    <section className="bg-[var(--bg-main)] py-12 lg:py-20 transition-colors duration-300">
      <SEO
        title="Backend Engineering Services | Gulrez Sarankar | Java & Spring Boot"
        description="Freelance backend development services by Gulrez Sarankar: Spring Boot REST API design, microservices, database optimization, JWT authentication, and technical consulting."
        canonicalPath="/freelance"
      />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)]">
            BACKEND ENGINEERING SERVICES
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)] md:text-4xl lg:text-5xl">
            Reliable Backend Development & Architecture
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-[var(--text-secondary)]">
            I help teams build high-performance APIs, database-driven applications, enterprise modules, and scalable microservices.
          </p>
        </div>

        {/* Hero Card */}
        <div className="grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="theme-card p-6 sm:p-8 lg:col-span-7"
          >
            <span className="theme-badge">
              Available for Freelance & Contract Work
            </span>

            <h2 className="mt-4 text-xl sm:text-2xl font-black text-[var(--text-primary)]">
              Backend-first solutions for serious web applications.
            </h2>

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
              Whether you need to scale an existing Java codebase, design a robust REST API,
              or build a multi-tenant backend from scratch, I deliver maintainable production software.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="mailto:gulrezsarankar39@gmail.com" className="btn-primary-blue text-xs sm:text-sm">
                <FaEnvelope className="text-xs" />
                Start a Conversation
              </a>
              <Link to="/projects" className="btn-secondary-theme text-xs sm:text-sm">
                View Work
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="theme-card p-6 sm:p-8 lg:col-span-5"
          >
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Core Offerings</h3>
            <div className="mt-4 space-y-2.5">
              {services.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <FaCheckCircle className="mt-1 text-xs text-[var(--accent-primary)] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Process Grid */}
        <div className="mt-10">
          <h3 className="mb-6 text-center text-xl font-extrabold text-[var(--text-primary)]">
            Engineering Workflow
          </h3>
          <div className="grid gap-5 md:grid-cols-3">
            {process.map((p, idx) => (
              <div key={idx} className="theme-card p-6">
                <h4 className="text-base font-bold text-[var(--text-primary)]">{p.title}</h4>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
