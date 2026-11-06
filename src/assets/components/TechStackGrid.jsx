import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaServer, FaCheck } from "react-icons/fa6";
import { skillCategories } from "../../data/skills";
import { getSkills } from "../../services/skillsService";

const categoryFilters = [
  { id: "all", label: "All Technologies" },
  { id: "backend", label: "Backend & Microservices" },
  { id: "frontend", label: "Frontend & UI/UX" },
  { id: "database", label: "Database Engineering" },
  { id: "tools", label: "DevOps & Tools" },
];

export default function TechStackGrid({ isStandalonePage = false }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [categories, setCategories] = useState(skillCategories);

  useEffect(() => {
    let isMounted = true;
    getSkills().then((res) => {
      if (isMounted && res.data && res.data.length > 0) {
        // Group by category if backend returns flat skill array
        const grouped = {};
        res.data.forEach((s) => {
          const cat = s.category || "General";
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push(s);
        });
        const mapped = Object.keys(grouped).map((catName) => ({
          title: catName,
          category: catName.toLowerCase(),
          skills: grouped[catName],
        }));
        if (mapped.length > 0) {
          setCategories(mapped);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCategories = categories.filter((cat) => {
    if (activeFilter === "all") return true;
    const catLower = (cat.category || cat.title || "").toLowerCase();
    return catLower.includes(activeFilter);
  });

  const HeadingTag = isStandalonePage ? "h1" : "h2";

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#080612] py-16 sm:py-20 lg:py-28 border-b border-[rgba(255,255,255,0.08)]"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute bottom-1/4 right-1/3 h-[450px] w-[450px] rounded-full bg-[#9B5CFF]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="glass-pill mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9B5CFF]" />
            TECHNICAL DOMAIN MASTERY
          </div>
          <HeadingTag className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Specialized Tech Stack &amp; <br className="hidden sm:inline" />
            <span className="purple-gradient-text">Production Proficiency</span>
          </HeadingTag>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#AAA5B8]">
            Battle-tested technologies applied across commercial enterprise backends, high-throughput microservices, and interactive modern web applications.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categoryFilters.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeFilter === tab.id
                    ? "bg-gradient-to-r from-[#9B5CFF] to-[#7928CA] text-white shadow-[0_0_20px_rgba(155,92,255,0.35)] border border-[rgba(255,255,255,0.2)]"
                    : "glass-panel text-[#AAA5B8] hover:text-white hover:border-[#9B5CFF]/40"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Category Columns Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {filteredCategories.map((col, idx) => (
            <motion.div
              key={col.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-card flex flex-col justify-between p-6 sm:p-7 hover:border-[#9B5CFF]/50"
            >
              <div>
                {/* Category Header */}
                <div className="mb-6 flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                      {col.title}
                    </h3>
                    <span className="text-[11px] font-medium text-[#D66BFF]">
                      {col.skills.length} Core Technologies
                    </span>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(155,92,255,0.25)] bg-[rgba(155,92,255,0.08)] text-base text-[#9B5CFF]">
                    <FaServer />
                  </div>
                </div>

                {/* Skills with Meter / Badges */}
                <div className="space-y-4">
                  {col.skills.map((skill) => (
                    <div key={skill.name} className="group/item">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-semibold text-white group-hover/item:text-[#D66BFF] transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-[11px] font-mono text-[#AAA5B8]">
                          {skill.level ? `${skill.level}%` : "Advanced"}
                        </span>
                      </div>

                      {/* Animated Progress Meter */}
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level || 85}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full rounded-full bg-gradient-to-r from-[#9B5CFF] to-[#D66BFF]"
                        />
                      </div>

                      {/* Tag / Description under skill */}
                      {skill.tag && (
                        <div className="mt-1 flex items-center justify-between text-[10px] text-[#7E7893]">
                          <span>{skill.tag}</span>
                          {skill.experience && <span>{skill.experience}</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] text-[#AAA5B8]">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <FaCheck className="text-[10px]" /> Production Verified
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
