import { motion } from "framer-motion";
import { FaGraduationCap, FaUniversity } from "react-icons/fa";
import SectionTitle from "../assets/components/Sectiontitle";

const educationData = [
  {
    title: "Master of Science in Computer Science (M.Sc CS)",
    year: "2024 - 2026 (Expected)",
    gpa: "Current",
    icon: <FaGraduationCap />,
    desc: "Advanced postgraduate program focused on algorithms, AI, cloud computing, system design, and enterprise application development.",
    subjects: ["Advanced Algorithms", "Cloud Computing", "Artificial Intelligence", "Advanced DBMS", "Data Analytics", "System Design"],
  },
  {
    title: "Bachelor of Science in Information Technology (B.Sc IT)",
    year: "2019 - 2021",
    gpa: "8.14 CGPA",
    icon: <FaUniversity />,
    desc: "Strong IT foundation covering programming, networking, databases, cybersecurity, and full-stack web development.",
    subjects: ["Networking", "DBMS", "Operating Systems", "Software Engineering", "Java Programming", "Web Development"],
  },
];

export default function Education() {
  return (
    <section className="page-section px-4 sm:px-6">
      <SectionTitle title="Education" />

      <div className="mx-auto grid max-w-5xl gap-6">
        {educationData.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="surface-card rounded-3xl p-7 md:p-9"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl accent-soft text-3xl accent-text">
                {item.icon}
              </div>

              <div className="flex-1">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full px-4 py-2 text-xs font-bold accent-soft accent-text">{item.year}</span>
                  <span className="rounded-full px-4 py-2 text-xs font-bold text-muted" style={{ background: "var(--surface-muted)" }}>{item.gpa}</span>
                </div>

                <h3 className="text-2xl font-extrabold text-heading">{item.title}</h3>
                <p className="mt-3 leading-7 text-muted">{item.desc}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.subjects.map((subject) => (
                    <span key={subject} className="rounded-lg px-3 py-1 text-xs font-bold text-muted" style={{ background: "var(--surface-muted)" }}>
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
