import { Link } from "react-router-dom";
import { FaArrowRight, FaLock, FaCircleCheck } from "react-icons/fa6";
import { FaJava } from "react-icons/fa6";
import { SiSpringboot, SiPostgresql, SiRedis, SiDocker } from "react-icons/si";
import { projects } from "../../data/projects";

export default function FeaturedProject() {
  const grandmart = projects.find((p) => p.id === "grandmart") || projects[0];

  return (
    <section
      id="featured-project"
      className="relative bg-[#0D0D0D] py-16 sm:py-20 lg:py-24 border-b border-[#262626]"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#141414] px-3 py-1 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1A1]">
              Featured Production Case Study
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5]">
            High-Throughput Retail Architecture
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#A1A1A1] leading-relaxed">
            An in-depth look at how distributed caching and pessimistic database locking power an enterprise multi-outlet retail ERP.
          </p>
        </div>

        {/* Feature Container */}
        <div className="rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-8 lg:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Left: Project Description & Highlights */}
            <div className="lg:col-span-7">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 rounded border border-[#262626] bg-[#1A1A1A] px-2.5 py-1 text-[11px] font-mono text-[#A3E635]">
                  <SiSpringboot className="text-xs" /> SPRING BOOT 3
                </span>
                <span className="inline-flex items-center gap-1.5 rounded border border-[#262626] bg-[#1A1A1A] px-2.5 py-1 text-[11px] font-mono text-[#A1A1A1]">
                  <FaLock className="text-[10px]" /> PRIVATE ENTERPRISE CODEBASE
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F5F5F5] leading-tight">
                {grandmart.title}
              </h3>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#A1A1A1]">
                {grandmart.longDescription || grandmart.description}
              </p>

              {/* Architectural Highlights */}
              <div className="mt-6 space-y-2.5">
                {[
                  "Distributed inventory synchronization with sub-second SKU consistency across physical branches",
                  "Stateless JWT RBAC securing Cashier POS, Store Manager, and Central Admin endpoints",
                  "Pessimistic database locking algorithm preventing inventory overselling during rush hours",
                  "Automated financial reconciliation reports with exportable CSV & PDF audit statements",
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F5F5]/90">
                    <FaCircleCheck className="mt-1 text-xs text-[#A3E635] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Tech Badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { name: "Java 17", icon: <FaJava className="text-[#A3E635]" /> },
                  { name: "Spring Boot 3", icon: <SiSpringboot className="text-[#A3E635]" /> },
                  { name: "PostgreSQL", icon: <SiPostgresql className="text-[#A3E635]" /> },
                  { name: "Redis Caching", icon: <SiRedis className="text-[#A3E635]" /> },
                  { name: "Docker", icon: <SiDocker className="text-[#A3E635]" /> },
                ].map((t) => (
                  <span
                    key={t.name}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#262626] bg-[#1A1A1A] px-3 py-1 text-xs font-mono text-[#F5F5F5]"
                  >
                    <span>{t.icon}</span>
                    {t.name}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/projects/grandmart"
                  className="btn-primary text-xs sm:text-sm py-2.5 px-5"
                >
                  <span>Read Architecture Case Study</span>
                  <FaArrowRight className="text-[11px]" />
                </Link>

                <Link
                  to="/projects"
                  className="btn-secondary text-xs sm:text-sm py-2.5 px-5"
                >
                  <span>All Projects</span>
                </Link>
              </div>
            </div>

            {/* Right: Architecture Topology Preview Card */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-lg border border-[#262626] bg-[#1A1A1A] p-5 sm:p-6 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
                  <span className="font-semibold text-[#F5F5F5]">GrandMart Architecture Topology</span>
                  <span className="text-[10px] text-[#A3E635]">Production Ready</span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="rounded border border-[#262626] bg-[#141414] p-3 flex items-center justify-between">
                    <span className="text-[#F5F5F5]">Client Tier</span>
                    <span className="text-[11px] text-[#A1A1A1]">POS Terminals &amp; Admin Web</span>
                  </div>

                  <div className="text-center text-[#666666] text-xs">↓ REST API / JWT Auth</div>

                  <div className="rounded border border-[#262626] bg-[#141414] p-3 flex items-center justify-between">
                    <div>
                      <div className="text-[#A3E635] font-semibold">Spring Boot Microservices</div>
                      <div className="text-[10px] text-[#A1A1A1]">Pessimistic Lock &amp; Transactions</div>
                    </div>
                    <span className="text-[10px] text-[#A1A1A1]">Dockerized</span>
                  </div>

                  <div className="text-center text-[#666666] text-xs">↓ Distributed Queries</div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded border border-[#262626] bg-[#141414] p-2.5 text-center">
                      <div className="text-[#F5F5F5] font-semibold">Redis</div>
                      <div className="text-[10px] text-[#A1A1A1]">SKU Cache (sub-ms)</div>
                    </div>
                    <div className="rounded border border-[#262626] bg-[#141414] p-2.5 text-center">
                      <div className="text-[#F5F5F5] font-semibold">PostgreSQL</div>
                      <div className="text-[10px] text-[#A1A1A1]">3NF Relational Store</div>
                    </div>
                  </div>
                </div>

                {/* Verified Technical Metrics */}
                <div className="mt-5 pt-4 border-t border-[#262626] grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-xs font-bold text-[#A3E635] font-mono">Row Lock</div>
                    <div className="text-[10px] text-[#A1A1A1]">Pessimistic</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#A3E635] font-mono">Cache-Aside</div>
                    <div className="text-[10px] text-[#A1A1A1]">Redis Layer</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#A3E635] font-mono">3NF Store</div>
                    <div className="text-[10px] text-[#A1A1A1]">PostgreSQL</div>
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
