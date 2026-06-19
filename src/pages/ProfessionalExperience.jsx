import { motion } from "framer-motion";
import SectionTitle from "../assets/components/Sectiontitle";
import { FaCode } from "react-icons/fa";

const experienceItems = [
  {
    title: "Associate Software Engineer",
    company: "Isees Technologies LLP",
    period: "September 2025 - Present",
    icon: <FaCode className="text-2xl accent-text md:text-3xl" />,
    summary:
      "Java Developer specializing in backend development using Spring Boot, REST APIs, and database-driven applications with MongoDB and MySQL.",
    bullets: [
      "Developed and maintained scalable RESTful APIs using Java and Spring Boot.",
      "Implemented authentication and authorization using JWT and Spring Security.",
      "Designed backend modules for order processing and inventory management systems.",
      "Optimized database queries and caching strategies, improving API performance by 32%.",
      "Integrated MongoDB and MySQL databases for efficient data handling and storage.",
      "Collaborated with frontend developers and QA teams to deliver high-quality releases on schedule.",
    ],
  },
];

export default function ProfessionalExperience() {
  return (
    <section className="page-section px-4 sm:px-6">
      <SectionTitle title="Professional Experience" />

      <div className="mx-auto mt-14 max-w-5xl">
        <div className="relative">
          <div className="absolute left-8 top-2 h-full w-px md:left-1/2" style={{ background: "var(--border)" }} />

          <div className="space-y-16">
            {experienceItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="relative flex flex-col md:flex-row md:gap-12"
              >
                <div className="surface-card absolute left-0 z-10 flex h-16 w-16 items-center justify-center rounded-2xl md:left-1/2 md:-translate-x-1/2">
                  {item.icon}
                </div>

                <div className="w-full pl-20 md:w-1/2 md:pl-0 md:pr-8">
                  <div className="surface-card rounded-3xl p-6 md:p-8">
                    <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold uppercase tracking-[0.16em] accent-text md:text-sm">
                      <span>{item.company}</span>
                      <span className="text-soft">/</span>
                      <span className="normal-case text-muted">{item.period}</span>
                    </div>

                    <h3 className="text-2xl font-extrabold tracking-tight text-heading">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-7 text-muted">{item.summary}</p>

                    <ul className="mt-6 list-disc space-y-3 pl-5 text-sm leading-7 text-muted marker:text-[var(--accent)] md:text-base">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="hidden w-1/2 md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
