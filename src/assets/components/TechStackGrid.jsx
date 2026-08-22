import { motion } from "framer-motion";
import { FaServer, FaDatabase, FaWrench, FaCode } from "react-icons/fa6";

const techStack = [
  {
    category: "Backend",
    icon: <FaServer className="text-[var(--accent-primary)]" />,
    skills: ["Java", "Spring Boot", "Spring Security", "Hibernate", "JPA", "REST APIs"],
  },
  {
    category: "Database",
    icon: <FaDatabase className="text-[var(--accent-primary)]" />,
    skills: ["PostgreSQL", "MySQL", "SQL Server", "Redis"],
  },
  {
    category: "DevOps & Tools",
    icon: <FaWrench className="text-[var(--accent-primary)]" />,
    skills: ["Docker", "Git", "GitHub", "Maven", "Postman", "AWS"],
  },
  {
    category: "Frontend",
    icon: <FaCode className="text-[var(--accent-primary)]" />,
    skills: ["React", "JavaScript", "Tailwind CSS"],
  },
];

export default function TechStackGrid({ isStandalonePage = false }) {
  const HeadingTag = isStandalonePage ? "h1" : "h2";

  return (
    <section id="skills" className="bg-[var(--bg-section)] py-12 lg:py-20 border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)]">
            TECHNICAL CAPABILITIES
          </span>
          <HeadingTag className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)] md:text-4xl">
            Engineering Skill Set
          </HeadingTag>
          <p className="mx-auto mt-2 max-w-xl text-sm sm:text-base text-[var(--text-secondary)]">
            Core backend architecture, database systems, DevOps tools, and supporting frontend frameworks.
          </p>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((col, idx) => (
            <motion.div
              key={col.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="theme-card p-5 sm:p-6"
            >
              <div className="mb-4 flex items-center gap-3 border-b border-[var(--border-color)] pb-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-lg border border-[var(--border-color)]">
                  {col.icon}
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[var(--text-primary)]">
                  {col.category}
                </h3>
              </div>

              <ul className="space-y-2.5">
                {col.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[var(--text-primary)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)] shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
