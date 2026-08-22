import { motion } from "framer-motion";
import { FaBriefcase, FaCodeBranch, FaLayerGroup, FaServer } from "react-icons/fa6";

const stats = [
  {
    number: "2+",
    label: "Years Experience",
    icon: <FaBriefcase className="text-[var(--accent-primary)]" />,
  },
  {
    number: "15+",
    label: "Projects",
    icon: <FaCodeBranch className="text-[var(--accent-primary)]" />,
  },
  {
    number: "20+",
    label: "Technologies",
    icon: <FaLayerGroup className="text-[var(--accent-primary)]" />,
  },
  {
    number: "250+",
    label: "APIs Built",
    icon: <FaServer className="text-[var(--accent-primary)]" />,
  },
];

export default function Stats() {
  return (
    <section className="border-y border-[var(--border-color)] bg-[var(--bg-section)] py-10 transition-colors duration-300">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="theme-card theme-card-hover flex items-center gap-4 p-4 sm:p-5"
            >
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-sm sm:text-base border border-[var(--border-color)]">
                {stat.icon}
              </div>
              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[var(--text-primary)]">
                  {stat.number}
                </div>
                <div className="text-xs font-semibold text-[var(--text-secondary)]">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
