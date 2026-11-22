import {
  FaServer,
  FaDatabase,
  FaShieldHalved,
  FaBolt,
  FaDocker,
  FaCreditCard,
  FaCode,
  FaLayerGroup,
} from "react-icons/fa6";

const expertiseAreas = [
  {
    title: "Java & Spring Boot Core",
    icon: <FaServer className="text-[#A3E635]" />,
    description:
      "Enterprise Java 17/21 microservices, Spring MVC, Spring Data JPA, and Hibernate ORM with clean layered architecture.",
    skills: ["Java 17/21", "Spring Boot 3", "Spring Data JPA", "Hibernate"],
  },
  {
    title: "REST API Design & Contracts",
    icon: <FaCode className="text-[#A3E635]" />,
    description:
      "Stateless endpoint modeling, DTO encapsulation, standard RFC-7807 error envelopes, and OpenAPI/Swagger specifications.",
    skills: ["Stateless APIs", "DTO Pattern", "OpenAPI / Swagger", "Input Validation"],
  },
  {
    title: "PostgreSQL & Database Engineering",
    icon: <FaDatabase className="text-[#A3E635]" />,
    description:
      "Normalized 3NF schema design, composite B-tree indexing, query optimization, and transaction isolation levels.",
    skills: ["PostgreSQL", "MySQL", "Indexing Strategies", "HikariCP"],
  },
  {
    title: "Authentication & Authorization",
    icon: <FaShieldHalved className="text-[#A3E635]" />,
    description:
      "Stateless JWT token workflows, Spring Security filter chains, role-based access control (RBAC), and BCrypt hashing.",
    skills: ["Spring Security", "JWT Tokens", "RBAC", "BCrypt Hashing"],
  },
  {
    title: "Redis & Distributed Caching",
    icon: <FaBolt className="text-[#A3E635]" />,
    description:
      "In-memory caching strategies, TTL management, cache invalidation hooks, and sub-second query response optimization.",
    skills: ["Redis", "Cache Eviction", "Sub-second Latency", "Concurrency Control"],
  },
  {
    title: "Docker & Containerization",
    icon: <FaDocker className="text-[#A3E635]" />,
    description:
      "Multi-stage Docker builds, container isolation, Linux server administration, and reproducible production runtimes.",
    skills: ["Docker", "Multi-stage Builds", "Linux CLI", "Maven Isolation"],
  },
  {
    title: "Payment Integration & Webhooks",
    icon: <FaCreditCard className="text-[#A3E635]" />,
    description:
      "Payment gateway integration, automated webhook signature verification, and idempotent transaction state machines.",
    skills: ["Razorpay Gateway", "Webhook Handlers", "Idempotency", "Ledger Reconciliation"],
  },
  {
    title: "Backend Architecture & Full-Stack",
    icon: <FaLayerGroup className="text-[#A3E635]" />,
    description:
      "Clean separation of concerns, transactional boundaries, exception handling, and modern React web client consumption.",
    skills: ["Microservices", "Transaction Isolation", "React.js", "Tailwind CSS"],
  },
];

export default function EngineeringExpertise() {
  return (
    <section className="bg-[#0D0D0D] py-16 sm:py-20 lg:py-24 border-b border-[#262626]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#141414] px-3 py-1 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1A1]">
              Technical Capabilities
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5]">
            Engineering Expertise &amp; Core Stack
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#A1A1A1] leading-relaxed">
            Practical development specialization backed by enterprise backend experience, REST API design, and production delivery.
          </p>
        </div>

        {/* 8-Card Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {expertiseAreas.map((area) => (
            <div
              key={area.title}
              className="rounded-xl border border-[#262626] bg-[#141414] p-5 sm:p-6 flex flex-col justify-between transition-colors hover:border-[#383838]"
            >
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#262626] bg-[#1A1A1A] text-base mb-4">
                  {area.icon}
                </div>

                <h3 className="font-heading text-base font-semibold text-[#F5F5F5] leading-snug">
                  {area.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
                  {area.description}
                </p>
              </div>

              {/* Skills Tags */}
              <div className="mt-5 pt-4 border-t border-[#262626] flex flex-wrap gap-1.5">
                {area.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded bg-[#1A1A1A] border border-[#262626] px-2 py-0.5 text-[10px] font-mono text-[#A1A1A1]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

