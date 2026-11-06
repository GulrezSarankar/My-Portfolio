import { motion } from "framer-motion";
import {
  FaMagnifyingGlass,
  FaSitemap,
  FaPenRuler,
  FaCode,
  FaVial,
  FaRocket,
} from "react-icons/fa6";

const steps = [
  {
    num: "01",
    title: "Discovery & Scope",
    icon: <FaMagnifyingGlass className="text-[#9B5CFF]" />,
    phase: "Phase 1: Analysis",
    desc: "In-depth requirements gathering, domain analysis, technical feasibility audit, and defining concrete deliverable milestones.",
  },
  {
    num: "02",
    title: "Architecture & Planning",
    icon: <FaSitemap className="text-[#D66BFF]" />,
    phase: "Phase 2: Blueprint",
    desc: "Designing 3NF relational schemas, microservice package structures, OpenAPI contracts, and Redis caching topologies.",
  },
  {
    num: "03",
    title: "UI/UX & Prototyping",
    icon: <FaPenRuler className="text-[#61DAFB]" />,
    phase: "Phase 3: Design",
    desc: "Crafting modern glassmorphic component hierarchies, responsive fluid typography, and frictionless user flows.",
  },
  {
    num: "04",
    title: "Full-Stack Development",
    icon: <FaCode className="text-emerald-400" />,
    phase: "Phase 4: Build",
    desc: "Clean Spring Boot backend development, type-safe React & TypeScript UI, and transaction-safe concurrency handles.",
  },
  {
    num: "05",
    title: "Testing & Security Audit",
    icon: <FaVial className="text-amber-400" />,
    phase: "Phase 5: Verification",
    desc: "Rigorous unit testing (JUnit, Mockito), slow query profiling, JWT & CSRF security audits, and cross-browser QA.",
  },
  {
    num: "06",
    title: "Deployment & Handover",
    icon: <FaRocket className="text-[#D66BFF]" />,
    phase: "Phase 6: Launch",
    desc: "Docker containerization, CI/CD automated deployment, DNS & SSL setup, and comprehensive code handover documentation.",
  },
];

export default function EngineeringProcess() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[#100B20]/95 py-16 sm:py-20 lg:py-28 border-b border-[rgba(255,255,255,0.08)]"
    >
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9B5CFF]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="glass-pill mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D66BFF]" />
            DEVELOPMENT LIFECYCLE
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            A Disciplined, 6-Step <br className="hidden sm:inline" />
            <span className="purple-gradient-text">Engineering Methodology</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#AAA5B8]">
            Predictable delivery, zero technical debt, and transparent communication from initial concept to live production scaling.
          </p>
        </div>

        {/* 6-Step Timeline Grid with Connecting Line Concept */}
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="glass-card group relative p-6 sm:p-7 flex flex-col justify-between overflow-hidden hover:border-[#9B5CFF]/50"
            >
              {/* Subtle top indicator bar */}
              <div className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#9B5CFF]/40 to-transparent group-hover:via-[#D66BFF] transition-colors" />

              <div>
                {/* Step Number & Icon */}
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-heading text-3xl font-black purple-gradient-text tracking-tight">
                    {step.num}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] text-base backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:border-[#9B5CFF]/50">
                    {step.icon}
                  </div>
                </div>

                {/* Phase tag */}
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9B5CFF]">
                  {step.phase}
                </span>

                {/* Step Title */}
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white mt-1 group-hover:text-[#D66BFF] transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#AAA5B8]">
                  {step.desc}
                </p>
              </div>

              {/* Step footer index pill */}
              <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] font-mono text-[#7E7893]">
                <span>Milestone {step.num}/06</span>
                <span className="group-hover:text-[#9B5CFF] transition-colors">Step Verified →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
