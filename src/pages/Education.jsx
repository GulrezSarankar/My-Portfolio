import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getEducation } from "../services/educationService";
import { FaGraduationCap, FaUniversity } from "react-icons/fa";
import { FaAward } from "react-icons/fa6";
import SEO from "../assets/components/SEO";

const educationData = [
  {
    title: "Master of Science in Computer Science (M.Sc CS)",
    institution: "Savitribai Phule Pune University",
    year: "2022 - 2024",
    gpa: "First Class with Distinction",
    icon: <FaGraduationCap className="text-[#9B5CFF]" />,
    desc: "Postgraduate specialization in distributed algorithms, system design, enterprise Java architectures, advanced database management systems (DBMS), and cloud computing.",
    subjects: ["Advanced Distributed Systems", "Software Architecture & Design Patterns", "Advanced Database Systems", "Cloud Computing & DevOps", "Algorithm Complexity Analysis"],
  },
  {
    title: "Bachelor of Science in Information Technology (B.Sc IT)",
    institution: "Savitribai Phule Pune University",
    year: "2019 - 2022",
    gpa: "8.14 CGPA",
    icon: <FaUniversity className="text-[#D66BFF]" />,
    desc: "Undergraduate degree establishing rigorous foundations in object-oriented programming (Core Java, C++), data structures, operating systems, networking protocols, and web development.",
    subjects: ["Core Java & OOP", "Relational Database Management (RDBMS)", "Data Structures & Algorithms", "Operating Systems", "Computer Networks & Security"],
  },
];

export default function Education() {
  const [eduList, setEduList] = useState(educationData);

  useEffect(() => {
    let isMounted = true;
    getEducation().then((res) => {
      if (isMounted && res.data && res.data.length > 0) {
        const merged = res.data.map((item, idx) => ({
          ...item,
          icon: item.icon || educationData[idx]?.icon || educationData[0].icon,
          subjects: item.subjects && item.subjects.length > 0 ? item.subjects : (educationData[idx]?.subjects || []),
        }));
        setEduList(merged);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#080612] py-16 sm:py-20 lg:py-28">
      <SEO
        title="Education & Academic Qualifications | Gulrez Sarankar"
        description="Academic background of Gulrez Sarankar: M.Sc in Computer Science and B.Sc in IT from Savitribai Phule Pune University."
        canonicalPath="/education"
      />

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-[#9B5CFF]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="glass-pill mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9B5CFF]" />
            ACADEMIC QUALIFICATIONS
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Academic Degrees &amp; <br className="hidden sm:inline" />
            <span className="purple-gradient-text">Computer Science Foundations</span>
          </h1>
          <p className="mt-4 text-base text-[#AAA5B8]">
            Theoretical rigor combined with applied software engineering practice from Savitribai Phule Pune University.
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-6">
          {eduList.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card p-6 sm:p-8 hover:border-[#9B5CFF]/50"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[rgba(155,92,255,0.25)] bg-[rgba(155,92,255,0.08)] text-2xl">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                      {item.title}
                    </h2>
                    <p className="text-sm font-semibold text-[#D66BFF] mt-0.5">
                      {item.institution || "Savitribai Phule Pune University"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-xs font-semibold text-white">
                    {item.year}
                  </span>
                  {item.gpa && (
                    <span className="glass-pill text-xs py-1 px-3 bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                      <FaAward className="text-[11px]" /> {item.gpa}
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#AAA5B8]">
                {item.desc}
              </p>

              {item.subjects && item.subjects.length > 0 && (
                <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E7893]">
                    Core Focus Areas:
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {item.subjects.map((sub) => (
                      <span
                        key={sub}
                        className="rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 text-xs font-medium text-[#E5E0F8]"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
