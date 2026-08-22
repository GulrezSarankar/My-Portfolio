import { motion } from "framer-motion";
import { FaMagnifyingGlass, FaSitemap, FaCode, FaVial, FaRocket } from "react-icons/fa6";

const steps = [
  {
    num: "01",
    title: "Understand the Problem",
    icon: <FaMagnifyingGlass className="text-[var(--accent-primary)]" />,
    desc: "Analyze business goals, domain entities, user requirements, throughput needs, and boundary constraints before writing code.",
  },
  {
    num: "02",
    title: "Design the Architecture",
    icon: <FaSitemap className="text-[var(--accent-primary)]" />,
    desc: "Model database schemas, package boundaries, REST endpoints, DTO contracts, authentication rules, and caching strategies.",
  },
  {
    num: "03",
    title: "Build Reliable APIs",
    icon: <FaCode className="text-[var(--accent-primary)]" />,
    desc: "Implement clean Spring Boot services, transactional persistence, input validations, error handling, and security wrappers.",
  },
  {
    num: "04",
    title: "Test & Validate",
    icon: <FaVial className="text-[var(--accent-primary)]" />,
    desc: "Run unit tests with JUnit/Mockito, inspect performance bottlenecks, tune SQL queries, and verify API edge cases.",
  },
  {
    num: "05",
    title: "Deploy & Improve",
    icon: <FaRocket className="text-[var(--accent-primary)]" />,
    desc: "Package containerized builds with Docker, generate OpenAPI/Swagger docs, and refine systems based on operational feedback.",
  },
];

export default function EngineeringProcess() {
  return (
    <section className="bg-[var(--bg-section)] py-12 lg:py-20 border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)]">
            ENGINEERING METHODOLOGY
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)] md:text-4xl">
            HOW I BUILD
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm sm:text-base text-[var(--text-secondary)]">
            A disciplined, production-focused approach to software development from problem discovery to deployment handover.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="theme-card theme-card-hover flex flex-col justify-between p-5 sm:p-6"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-[var(--accent-primary)]">
                    {step.num}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-sm border border-[var(--border-color)]">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-[var(--text-primary)]">
                  {step.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
