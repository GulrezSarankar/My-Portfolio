import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../../data/projects";
import { skillCategories } from "../../data/skills";

const stats = [
  { label: "Featured Projects", value: projects.length },
  { label: "Skill Categories", value: skillCategories.length },
  {
    label: "Backend Projects",
    value: projects.filter((project) =>
      project.tech.some((tech) => tech.toLowerCase().includes("spring"))
    ).length,
  },
  {
    label: "Database Tools",
    value: skillCategories.find((category) => category.title === "Database")?.skills.length || 0,
  },
];

export default function Stats() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 1500;
    const interval = 20;
    const steps = duration / interval;

    const counter = setInterval(() => {
      setCounts((prev) =>
        prev.map((count, index) =>
          count < stats[index].value
            ? Math.min(count + stats[index].value / steps, stats[index].value)
            : count
        )
      );
    }, interval);

    return () => clearInterval(counter);
  }, []);

  return (
    <section className="relative z-20 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 px-6 text-center md:grid-cols-4">
        {stats.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="surface-card professional-card rounded-2xl p-6"
          >
            <h2 className="text-3xl font-black accent-text md:text-4xl">
              {Math.floor(counts[i])}
            </h2>
            <p className="mt-2 text-sm font-semibold text-muted md:text-base">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
