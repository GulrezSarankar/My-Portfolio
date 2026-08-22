import { motion } from "framer-motion";
import { FaGraduationCap, FaUniversity } from "react-icons/fa";
import SEO from "../assets/components/SEO";

const educationData = [
  {
    title: "Master of Science in Computer Science (M.Sc CS)",
    year: "2024 - 2026",
    gpa: "Current",
    icon: <FaGraduationCap className="text-[var(--accent-primary)]" />,
    desc: "Advanced postgraduate program focused on algorithms, cloud computing, distributed system design, and backend software engineering.",
    subjects: ["Advanced Algorithms", "Cloud Architecture", "System Design", "Advanced DBMS", "Data Analytics"],
  },
  {
    title: "Bachelor of Science in Information Technology (B.Sc IT)",
    year: "2019 - 2022",
    gpa: "8.14 CGPA",
    icon: <FaUniversity className="text-[var(--accent-primary)]" />,
    desc: "Strong IT foundation covering computer science fundamentals, networking, relational databases, Java programming, and software engineering.",
    subjects: ["Database Systems", "Operating Systems", "Software Engineering", "Java Programming", "Web Development"],
  },
];

export default function Education() {
  return (
    <section className="bg-[var(--bg-main)] py-12 lg:py-20 transition-colors duration-300">
      <SEO
        title="Education & Degrees | Gulrez Sarankar | M.Sc Computer Science"
        description="Academic background of Gulrez Sarankar, holding an M.Sc in Computer Science and B.Sc in IT with focus on algorithms and system design."
        canonicalPath="/education"
      />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)]">
            ACADEMIC BACKGROUND
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)] md:text-4xl">
            Education & Degrees
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm sm:text-base text-[var(--text-secondary)]">
            Computer Science and Information Technology academic foundation.
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-6">
          {educationData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="theme-card p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-xl border border-[var(--border-color)]">
                {item.icon}
              </div>

              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span className="theme-badge">
                    {item.year}
                  </span>
                  <span className="rounded border border-[var(--border-color)] bg-[var(--bg-section)] px-2.5 py-1 text-xs font-bold text-[var(--text-secondary)]">
                    {item.gpa}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">{item.title}</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">{item.desc}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.subjects.map((sub) => (
                    <span key={sub} className="rounded bg-[var(--bg-section)] border border-[var(--border-color)] px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
