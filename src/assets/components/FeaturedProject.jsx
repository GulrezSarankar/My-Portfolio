import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { FaServer, FaDatabase, FaLayerGroup, FaArrowDown, FaMobile, FaDesktop, FaShieldHalved, FaJava, FaLock } from "react-icons/fa6";
import { SiSpringboot, SiPostgresql, SiRedis, SiDocker, SiReact } from "react-icons/si";

export default function FeaturedProject() {
  return (
    <section id="featured-project" className="bg-[var(--bg-main)] py-12 lg:py-20 border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)]">
            FEATURED ENGINEERING ARCHITECTURE
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)] md:text-4xl">
            Production System Spotlight
          </h2>
        </div>

        <div className="theme-card overflow-hidden p-5 sm:p-8 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            {/* LEFT SIDE: Project Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 min-w-0"
            >
              <div className="flex flex-wrap items-center gap-2">
                <div className="theme-badge">
                  <SiSpringboot /> ENTERPRISE SYSTEM
                </div>
                <div className="theme-badge-private">
                  <FaLock className="text-[11px]" /> 🔒 PRIVATE PROJECT
                </div>
              </div>

              <h3 className="mt-4 text-xl sm:text-2xl lg:text-3xl font-black text-[var(--text-primary)]">
                GrandMart — Multi Outlet Supermarket System
              </h3>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                A multi-outlet supermarket management system with role-based access,
                real-time inventory management, POS billing, HR & payroll, and automated sales analytics.
              </p>

              {/* Tech Badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { name: "Java", icon: <FaJava /> },
                  { name: "Spring Boot", icon: <SiSpringboot /> },
                  { name: "PostgreSQL", icon: <SiPostgresql /> },
                  { name: "Redis", icon: <SiRedis /> },
                  { name: "React", icon: <SiReact /> },
                  { name: "Docker", icon: <SiDocker /> },
                ].map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-color)] bg-[var(--bg-main)] px-2.5 py-1.5 text-xs font-bold text-[var(--text-primary)]"
                  >
                    <span className="text-[var(--accent-primary)]">{tech.icon}</span>
                    {tech.name}
                  </span>
                ))}
              </div>

              {/* Feature Checklist */}
              <div className="mt-6 space-y-2.5">
                {[
                  "Multi-outlet & role-based access control (RBAC)",
                  "Real-time inventory & barcode-based billing POS",
                  "HR & Payroll management with automated tax computation",
                  "Sales analytics, audit trails, and financial reporting",
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <FaCheckCircle className="mt-1 text-xs text-[var(--accent-primary)] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT SIDE: Theme-Aware System Architecture Diagram Visualizer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-6 w-full min-w-0"
            >
              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-section)] p-4 sm:p-6 shadow-md transition-colors duration-300">
                <div className="mb-4 flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
                    <FaLayerGroup className="text-[var(--accent-primary)]" />
                    <span>SYSTEM ARCHITECTURE DIAGRAM</span>
                  </div>
                  <span className="rounded bg-[var(--accent-soft)] border border-[var(--border-color)] px-2 py-0.5 text-[10px] font-mono font-bold text-[var(--accent-primary)]">
                    v2.4 Production
                  </span>
                </div>

                {/* Architecture Nodes Layout */}
                <div className="flex flex-col items-center gap-2.5 sm:gap-3 font-mono text-xs">
                  {/* Layer 1: Client */}
                  <div className="flex items-center gap-3 sm:gap-4 rounded-lg border border-[var(--arch-node-border)] bg-[var(--arch-node-bg)] px-4 sm:px-6 py-2 shadow-xs transition-colors duration-300">
                    <FaDesktop className="text-[var(--accent-primary)]" />
                    <span className="font-bold text-[var(--arch-node-text)] text-[11px] sm:text-xs">Web / Mobile Client (React)</span>
                    <FaMobile className="text-[var(--accent-primary)]" />
                  </div>

                  <FaArrowDown className="text-xs sm:text-sm text-[var(--accent-primary)] animate-bounce" />

                  {/* Layer 2: API Gateway */}
                  <div className="flex items-center gap-2 rounded-lg border border-[var(--accent-primary)] bg-[var(--accent-soft)] px-3 sm:px-8 py-2 font-bold text-[var(--accent-primary)] text-[10px] sm:text-xs text-center">
                    <FaShieldHalved className="shrink-0" />
                    <span className="leading-tight">API Gateway / Spring Cloud LoadBalancer</span>
                  </div>

                  <FaArrowDown className="text-xs sm:text-sm text-[var(--accent-primary)] animate-bounce" />

                  {/* Layer 3: Microservices Grid */}
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 w-full">
                    <div className="flex flex-col items-center justify-center rounded-lg border border-[var(--arch-node-border)] bg-[var(--arch-node-bg)] p-2 text-center shadow-xs transition-colors duration-300">
                      <span className="text-[9px] sm:text-[10px] text-[var(--text-muted)] font-sans">SERVICE 01</span>
                      <span className="font-bold text-[#10B981] text-[10px] sm:text-xs">Auth Service</span>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-lg border border-[var(--arch-node-border)] bg-[var(--arch-node-bg)] p-2 text-center shadow-xs transition-colors duration-300">
                      <span className="text-[9px] sm:text-[10px] text-[var(--text-muted)] font-sans">SERVICE 02</span>
                      <span className="font-bold text-[#3B82F6] text-[10px] sm:text-xs">User Service</span>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-lg border border-[var(--arch-node-border)] bg-[var(--arch-node-bg)] p-2 text-center shadow-xs transition-colors duration-300">
                      <span className="text-[9px] sm:text-[10px] text-[var(--text-muted)] font-sans">SERVICE 03</span>
                      <span className="font-bold text-[#F59E0B] text-[10px] sm:text-xs">Order Service</span>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-lg border border-[var(--arch-node-border)] bg-[var(--arch-node-bg)] p-2 text-center shadow-xs transition-colors duration-300">
                      <span className="text-[9px] sm:text-[10px] text-[var(--text-muted)] font-sans">SERVICE 04</span>
                      <span className="font-bold text-[#EC4899] text-[10px] sm:text-xs">Inventory</span>
                    </div>
                  </div>

                  <FaArrowDown className="text-xs sm:text-sm text-[var(--accent-primary)] animate-bounce" />

                  {/* Layer 4: Storage */}
                  <div className="flex items-center justify-center gap-4 sm:gap-6 rounded-lg border border-[var(--arch-node-border)] bg-[var(--arch-node-bg)] px-4 sm:px-6 py-2.5 w-full shadow-xs transition-colors duration-300">
                    <div className="flex items-center gap-1.5 text-[#4169E1]">
                      <FaDatabase />
                      <span className="font-bold text-[var(--arch-node-text)] text-[11px] sm:text-xs">PostgreSQL</span>
                    </div>
                    <span className="text-[var(--border-color)]">|</span>
                    <div className="flex items-center gap-1.5 text-[#DC382D]">
                      <FaServer />
                      <span className="font-bold text-[var(--arch-node-text)] text-[11px] sm:text-xs">Redis Cache</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
