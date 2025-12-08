import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    { label: "Projects Completed", value: 15 },
    { label: "APIs Built", value: 40 },
    { label: "Months Experience", value: 8 },
    { label: "Technologies Mastered", value: 12 },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 1500; // 1.5 sec animation
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <— Fixed: remove stats from dependency to avoid warning

  return (
    <section className="py-20 bg-transparent relative z-20">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center px-6">

        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:border-purple-500/40 transition"
          >
            <h2 className="text-4xl font-bold text-purple-300">
              {Math.floor(counts[i])}+
            </h2>
            <p className="text-gray-300 mt-2 text-lg">{item.label}</p>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
