import { useState, useEffect } from "react";
import { getEducation } from "../services/educationService";
import {
  FaGraduationCap,
  FaBuildingColumns,
  FaAward,
  FaCircleCheck,
  FaCalendarDays,
} from "react-icons/fa6";
import SEO from "../assets/components/SEO";

const educationData = [
  {
    title: "M.Sc. Computer Science",
    institution: "Abeda Inamdar Senior College",
    affiliation: null,
    status: "Completed",
    year: "Completed",
    gpa: "6.73 / 10 CGPA",
    icon: <FaGraduationCap className="text-[#A3E635]" />,
    desc: "Postgraduate curriculum focused on advanced algorithms, distributed system design, enterprise Java architectures, and relational database management systems.",
    subjects: [
      "Advanced Algorithms",
      "System Design & Patterns",
      "Enterprise Java Architectures",
      "Advanced Database Systems",
      "Distributed Computing",
    ],
  },
  {
    title: "B.Sc. Information Technology",
    institution: "Hirval Education, Mahad",
    affiliation: "Mumbai University",
    status: "Completed",
    year: "2019 — 2022",
    gpa: "8.14 / 10 CGPA",
    icon: <FaBuildingColumns className="text-[#A3E635]" />,
    desc: "Undergraduate degree establishing rigorous foundations in object-oriented programming (Core Java), relational database management (RDBMS), data structures, operating systems, and web technologies.",
    subjects: [
      "Core Java & OOP",
      "Relational Database Management (RDBMS)",
      "Data Structures & Algorithms",
      "Operating Systems",
      "Software Engineering",
    ],
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
          subjects:
            item.subjects && item.subjects.length > 0
              ? item.subjects
              : educationData[idx]?.subjects || [],
        }));
        setEduList(merged);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative bg-[#0D0D0D] py-16 sm:py-20 lg:py-24 border-b border-[#262626] text-[#F5F5F5] min-h-screen">
      <SEO
        title="Education & Academic Qualifications | Gulrez Sarankar"
        description="Academic background of Gulrez Sarankar: M.Sc in Computer Science from Abeda Inamdar Senior College and B.Sc in Information Technology from Hirval Education, Mahad (Mumbai University)."
        canonicalPath="/education"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#141414] px-3 py-1 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1A1]">
              Academic Background &amp; Foundations
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F5] leading-tight">
            Academic Qualifications &amp; <br className="hidden sm:inline" />
            <span className="text-[#A3E635]">Computer Science Foundations</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#A1A1A1]">
            Formal computer science education grounding practical backend software engineering in data structures, database theory, and system design.
          </p>
        </div>

        {/* Education Degree Cards */}
        <div className="mx-auto max-w-4xl space-y-6">
          {eduList.map((item) => (
            <div
              key={item.title || item.qualification}
              className="rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-8 transition-colors hover:border-[#383838]"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#262626] bg-[#1A1A1A] text-xl">
                    {item.icon}
                  </div>

                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#F5F5F5]">
                      {item.title || item.qualification}
                    </h2>

                    <div className="text-xs sm:text-sm font-medium text-[#A1A1A1] mt-1 flex flex-wrap items-center gap-1.5">
                      <span className="text-[#F5F5F5]">{item.institution}</span>
                      {item.affiliation && (
                        <>
                          <span className="text-[#666666]">•</span>
                          <span className="text-[#A1A1A1]">Affiliated with {item.affiliation}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                  {item.year && item.year !== "Completed" && (
                    <span className="inline-flex items-center gap-1.5 rounded border border-[#262626] bg-[#1A1A1A] px-2.5 py-1 text-xs font-mono text-[#A1A1A1]">
                      <FaCalendarDays className="text-[10px] text-[#A3E635]" />
                      {item.year}
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1.5 rounded border border-[#262626] bg-[#1A1A1A] px-2.5 py-1 text-xs font-mono text-[#A3E635]">
                    <FaCircleCheck className="text-[10px]" />
                    {item.status || "Completed"}
                  </span>

                  {(item.gpa || item.grade) && (
                    <span className="inline-flex items-center gap-1.5 rounded border border-[#262626] bg-[#1A1A1A] px-2.5 py-1 text-xs font-mono text-[#F5F5F5]">
                      <FaAward className="text-[11px] text-[#A3E635]" />
                      {item.gpa || item.grade}
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#A1A1A1]">
                {item.desc || item.description}
              </p>

              {item.subjects && item.subjects.length > 0 && (
                <div className="mt-5 pt-4 border-t border-[#262626]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#666666] block mb-2">
                    Core Curricular Modules
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.subjects.map((sub) => (
                      <span
                        key={sub}
                        className="rounded border border-[#262626] bg-[#1A1A1A] px-2.5 py-1 text-xs font-mono text-[#A1A1A1]"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
