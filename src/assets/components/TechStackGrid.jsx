import { useState, useEffect } from "react";
import {
  FaServer,
  FaDatabase,
  FaShieldHalved,
  FaBolt,
  FaVial,
  FaTerminal,
  FaLaptopCode,
  FaCircleCheck,
} from "react-icons/fa6";
import { skillCategories } from "../../data/skills";
import { getSkills } from "../../services/skillsService";

const categoryFilters = [
  { id: "all", label: "All Domains" },
  { id: "backend", label: "Backend Core" },
  { id: "database", label: "Databases" },
  { id: "security", label: "Security" },
  { id: "caching", label: "Caching & Perf" },
  { id: "testing", label: "Testing & QA" },
  { id: "devops", label: "DevOps & Tools" },
  { id: "frontend", label: "Frontend (Secondary)" },
];

const categoryIcons = {
  backend: <FaServer className="text-sm" />,
  database: <FaDatabase className="text-sm" />,
  security: <FaShieldHalved className="text-sm" />,
  caching: <FaBolt className="text-sm" />,
  testing: <FaVial className="text-sm" />,
  devops: <FaTerminal className="text-sm" />,
  frontend: <FaLaptopCode className="text-sm" />,
};

export default function TechStackGrid({ isStandalonePage = false }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [categories, setCategories] = useState(skillCategories);

  useEffect(() => {
    let isMounted = true;
    getSkills().then((res) => {
      if (isMounted && res.data && res.data.length > 0) {
        // If Supabase returned data, map it; otherwise staticSkillCategories is used
        if (res.source === "supabase") {
          const grouped = {};
          res.data.forEach((catGroup) => {
            const key = catGroup.title || "Backend Development";
            grouped[key] = catGroup.skills;
          });
          // Merge with static metadata for rich descriptions
          const merged = skillCategories.map((sc) => ({
            ...sc,
            skills: grouped[sc.title] || sc.skills,
          }));
          setCategories(merged);
        } else {
          setCategories(res.data);
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
    return catLower.includes(activeFilter.toLowerCase());
  });

  const HeadingTag = isStandalonePage ? "h1" : "h2";

  return (
    <section
      id="skills"
      className="relative bg-[#0D0D0D] py-16 sm:py-20 lg:py-24 border-b border-[#262626] text-[#F5F5F5]"
    >
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#141414] px-3 py-1 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1A1]">
              Technical Skills &amp; Domain Expertise
            </span>
          </div>

          <HeadingTag className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F5] leading-tight">
            Specialized Backend Stack &amp; <br className="hidden sm:inline" />
            <span className="text-[#A3E635]">Production Capabilities</span>
          </HeadingTag>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#A1A1A1]">
            Curated technical domains honed across commercial enterprise backends, high-concurrency booking engines, and database-intensive applications.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {categoryFilters.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-mono transition-colors ${
                  activeFilter === tab.id
                    ? "bg-[#A3E635] text-[#0D0D0D] font-semibold"
                    : "border border-[#262626] bg-[#141414] text-[#A1A1A1] hover:border-[#383838] hover:text-[#F5F5F5]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {filteredCategories.map((col) => {
            const icon = categoryIcons[col.category] || <FaServer className="text-sm" />;
            const isFrontend = col.category === "frontend";

            return (
              <div
                key={col.title}
                className={`rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-7 flex flex-col justify-between transition-colors hover:border-[#383838] ${
                  isFrontend ? "border-dashed" : ""
                }`}
              >
                <div>
                  {/* Category Card Header */}
                  <div className="mb-5 flex items-start justify-between border-b border-[#262626] pb-4 gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading text-lg font-bold text-[#F5F5F5]">
                          {col.title}
                        </h3>
                        {isFrontend && (
                          <span className="rounded bg-[#1A1A1A] border border-[#262626] px-1.5 py-0.5 text-[9px] font-mono text-[#A1A1A1]">
                            Secondary
                          </span>
                        )}
                      </div>
                      {col.description && (
                        <p className="text-xs text-[#A1A1A1] mt-1 leading-relaxed">
                          {col.description}
                        </p>
                      )}
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#262626] bg-[#1A1A1A] text-[#A3E635]">
                      {icon}
                    </div>
                  </div>

                  {/* Skills List without Percentage Bars */}
                  <div className="space-y-3.5">
                    {col.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="rounded-lg border border-[#262626] bg-[#1A1A1A] p-3 transition-colors hover:border-[#383838]"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs sm:text-sm font-semibold text-[#F5F5F5]">
                            {skill.name}
                          </span>
                          {skill.tag && (
                            <span className="shrink-0 rounded bg-[#141414] border border-[#262626] px-2 py-0.5 text-[10px] font-mono text-[#A3E635]">
                              {skill.tag}
                            </span>
                          )}
                        </div>

                        {skill.focus && (
                          <p className="mt-1.5 text-xs text-[#A1A1A1] leading-relaxed">
                            {skill.focus}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-6 pt-4 border-t border-[#262626] flex items-center justify-between text-[11px] font-mono text-[#A1A1A1]">
                  <span className="flex items-center gap-1.5 text-[#A3E635]">
                    <FaCircleCheck className="text-[10px]" /> Verified Competency
                  </span>
                  <span>{col.skills.length} Technical Items</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
