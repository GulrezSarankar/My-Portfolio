import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import {
  FaCircleCheck,
  FaJava,
  FaLock,
  FaFileLines,
} from "react-icons/fa6";
import { SiSpringboot, SiPostgresql, SiRedis, SiDocker, SiReact } from "react-icons/si";
import { projects } from "../../data/projects";

export default function FeaturedProject() {
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const grandmart = projects.find((p) => p.id === "grandmart") || projects[0];

  return (
    <section
      id="featured-project"
      className="relative overflow-hidden bg-[#080612] py-16 sm:py-20 lg:py-28 border-b border-[rgba(255,255,255,0.08)]"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-20 right-1/4 h-[500px] w-[500px] rounded-full bg-[#9B5CFF]/15 blur-[120px]" />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="glass-pill mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9B5CFF]" />
            FEATURED ENTERPRISE CASE STUDY
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            High-Throughput Production <br className="hidden sm:inline" />
            <span className="purple-gradient-text">Architecture Spotlight</span>
          </h2>
          <p className="mt-3 text-base text-[#AAA5B8]">
            An in-depth look at how distributed caching and pessimistic database locking power an enterprise multi-outlet retail system.
          </p>
        </div>

        {/* Main Glass Feature Card */}
        <div className="glass-card overflow-hidden p-6 sm:p-8 lg:p-10 border-[rgba(155,92,255,0.25)] relative">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            
            {/* LEFT: Project Details & Metrics */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 min-w-0"
            >
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="glass-pill text-[10px] py-1">
                  <SiSpringboot className="text-emerald-400" /> ENTERPRISE PRODUCTION
                </span>
                <span className="theme-badge-private text-[10px] py-1">
                  <FaLock className="text-[#AAA5B8] text-[10px]" /> PRIVATE ENTERPRISE CODEBASE
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                GrandMart — Multi-Outlet Enterprise ERP
              </h3>

              {/* Description */}
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#AAA5B8]">
                Distributed supermarket retail management system providing cross-outlet stock deduplication, role-based checkout POS terminals, automated payroll computation, and real-time sales reporting.
              </p>

              {/* Tech Chips */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { name: "Java 17", icon: <FaJava className="text-red-400" /> },
                  { name: "Spring Boot 3", icon: <SiSpringboot className="text-emerald-400" /> },
                  { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
                  { name: "Redis Caching", icon: <SiRedis className="text-red-500" /> },
                  { name: "Docker", icon: <SiDocker className="text-sky-400" /> },
                  { name: "React Frontend", icon: <SiReact className="text-cyan-400" /> },
                ].map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-xs font-semibold text-white"
                  >
                    <span>{tech.icon}</span>
                    {tech.name}
                  </span>
                ))}
              </div>

              {/* Key Features */}
              <div className="mt-6 space-y-2.5">
                {[
                  "Real-time distributed SKU synchronization across physical branches",
                  "Stateless JWT RBAC securing Cashier POS, Store Manager, and Admin endpoints",
                  "Pessimistic locking algorithm preventing inventory overselling during rush hours",
                  "Automated financial ledger reconciliation with exportable PDF & CSV audit logs",
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <FaCircleCheck className="mt-1 text-xs text-[#9B5CFF] shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-[#E5E0F8]">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* Case Study Button */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCaseStudyOpen(true)}
                  className="btn-primary-purple text-xs sm:text-sm py-2.5 px-5 shadow-[0_0_20px_rgba(155,92,255,0.4)]"
                >
                  <FaFileLines className="text-xs" />
                  <span>View Architectural Case Study</span>
                </button>
              </div>
            </motion.div>

            {/* RIGHT: High-Fidelity Glass Architectural Diagram Visualizer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-6 w-full"
            >
              <div className="glass-panel p-6 sm:p-7 border-[rgba(155,92,255,0.3)] bg-[rgba(16,11,32,0.85)]">
                <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.08)]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#D66BFF]">
                      GrandMart Cluster Topology
                    </span>
                  </div>
                  <span className="glass-pill text-[10px] py-0.5 px-2 bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                    Active Production
                  </span>
                </div>

                {/* Microservice Architecture Graph */}
                <div className="mt-6 space-y-3.5 font-mono text-xs">
                  {/* Client POS Terminals */}
                  <div className="flex items-center justify-between p-3 rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)]">
                    <div className="flex items-center gap-2 text-white">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      <span className="font-bold">Branch POS Terminals</span>
                    </div>
                    <span className="text-[11px] text-[#AAA5B8]">React SPA / Barcode Scanner</span>
                  </div>

                  <div className="flex justify-center text-[#9B5CFF] text-xs">
                    ↓ REST over TLS (Sub-50ms)
                  </div>

                  {/* Core Spring Boot Engine */}
                  <div className="p-4 rounded-xl border border-[rgba(155,92,255,0.4)] bg-[rgba(155,92,255,0.10)] shadow-[0_0_25px_rgba(155,92,255,0.2)]">
                    <div className="flex items-center justify-between text-white font-bold mb-2">
                      <div className="flex items-center gap-2">
                        <SiSpringboot className="text-emerald-400 text-sm" />
                        <span>GrandMart Backend Core Service</span>
                      </div>
                      <span className="text-[10px] text-emerald-300">Java 17</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-[#AAA5B8] font-sans">
                      <div className="p-1.5 rounded bg-[rgba(0,0,0,0.3)]">
                        • Inventory Lock Manager
                      </div>
                      <div className="p-1.5 rounded bg-[rgba(0,0,0,0.3)]">
                        • JWT Authentication Filter
                      </div>
                      <div className="p-1.5 rounded bg-[rgba(0,0,0,0.3)]">
                        • POS Billing Calculator
                      </div>
                      <div className="p-1.5 rounded bg-[rgba(0,0,0,0.3)]">
                        • Audit Trail Logger
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center text-[#9B5CFF] text-xs">
                    ↓ HikariCP Pool &amp; Jedis
                  </div>

                  {/* Persistence Tier */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl border border-blue-500/30 bg-blue-500/05">
                      <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs">
                        <SiPostgresql />
                        <span>PostgreSQL</span>
                      </div>
                      <p className="text-[10px] text-[#AAA5B8] mt-1 font-sans">
                        ACID transactions &amp; SKU records
                      </p>
                    </div>

                    <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/05">
                      <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs">
                        <SiRedis />
                        <span>Redis Cache</span>
                      </div>
                      <p className="text-[10px] text-[#AAA5B8] mt-1 font-sans">
                        Session tokens &amp; live price cache
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metrics ribbon */}
                <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.08)] grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.02)]">
                    <div className="text-sm font-extrabold text-white">99.99%</div>
                    <div className="text-[10px] text-[#AAA5B8]">SKU Consistency</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.02)]">
                    <div className="text-sm font-extrabold text-emerald-400">3.2x</div>
                    <div className="text-[10px] text-[#AAA5B8]">Faster Checkouts</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.02)]">
                    <div className="text-sm font-extrabold text-[#D66BFF]">10,000+</div>
                    <div className="text-[10px] text-[#AAA5B8]">Daily Transactions</div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {caseStudyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCaseStudyOpen(false)}
              className="absolute inset-0 bg-[#080612]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card relative z-10 max-h-[85vh] w-full max-w-3xl overflow-hidden p-6 sm:p-8 border-[rgba(155,92,255,0.35)] shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.10)] pb-4 mb-5">
                <div>
                  <span className="glass-pill text-[10px] py-0.5">ARCHITECTURAL CASE STUDY</span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mt-1">
                    {grandmart.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCaseStudyOpen(false)}
                  className="rounded-xl p-2 text-[#AAA5B8] hover:bg-[rgba(255,255,255,0.08)] hover:text-white transition-colors"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>

              <div className="max-h-[65vh] overflow-y-auto space-y-6 pr-2 text-sm text-[#AAA5B8]">
                <div>
                  <h4 className="font-heading text-base font-bold text-white mb-2">The Engineering Challenge</h4>
                  <p className="leading-relaxed">
                    Retail operations with multiple physical locations regularly suffer from inventory discrepancies, race conditions during high-volume checkouts, and sluggish database performance when querying historical sales data alongside real-time stock levels.
                  </p>
                </div>

                <div>
                  <h4 className="font-heading text-base font-bold text-white mb-2">The Solution &amp; Architecture</h4>
                  <p className="leading-relaxed">
                    Designed a layered Spring Boot application using PostgreSQL 3NF normalized tables and Redis in-memory caching. High-traffic price lookups and session state are cached in Redis, avoiding repetitive database queries. For checkout operations, pessimistic row locks ensure that a single SKU cannot be simultaneously deducted below zero by concurrent cashier terminals.
                  </p>
                </div>

                <div>
                  <h4 className="font-heading text-base font-bold text-white mb-2">My Engineering Contributions</h4>
                  <ul className="space-y-2">
                    {grandmart.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E5E0F8]">
                        <FaCircleCheck className="mt-1 text-xs text-[#9B5CFF] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-[rgba(155,92,255,0.25)] bg-[rgba(155,92,255,0.06)]">
                  <h5 className="font-heading text-xs font-bold text-white uppercase tracking-wider mb-1">
                    Confidentiality Note
                  </h5>
                  <p className="text-xs text-[#AAA5B8]">
                    This project is a proprietary commercial system deployed in production. Source code and live production credentials remain protected under corporate NDA.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
