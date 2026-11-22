import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCalendarDays } from "react-icons/fa6";
import { getExperience } from "../../services/experienceService";
import { experiences as staticExperiences } from "../../data/experience";

export default function HomeExperience() {
  const [experiences, setExperiences] = useState(staticExperiences);

  useEffect(() => {
    let isMounted = true;
    getExperience().then((res) => {
      if (isMounted && res.data) {
        setExperiences(res.data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-[#0D0D0D] py-16 sm:py-20 lg:py-24 border-b border-[#262626]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#141414] px-3 py-1 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1A1]">
                Career &amp; Industry Track Record
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5]">
              Professional Experience
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#A1A1A1] leading-relaxed">
              Hands-on engineering tenure architecting enterprise backends, managing database persistence, and maintaining REST APIs.
            </p>
          </div>

          <Link
            to="/experience"
            className="btn-secondary text-xs sm:text-sm py-2.5 px-4 self-start md:self-auto shrink-0"
          >
            <span>Full Experience Details</span>
            <FaArrowRight className="text-[11px]" />
          </Link>
        </div>

        {/* Editorial Timeline / List */}
        <div className="space-y-6">
          {experiences.slice(0, 2).map((exp, index) => (
            <div
              key={exp.id || index}
              className="rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-8 transition-colors hover:border-[#383838]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#262626]">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-[#F5F5F5]">
                      {exp.role}
                    </h3>
                    {exp.isPromoted && (
                      <span className="rounded bg-[#1A1A1A] border border-[#262626] px-2 py-0.5 text-[10px] font-mono text-[#A3E635]">
                        Promoted
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-[#A1A1A1] mt-0.5">
                    {exp.company}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1A1]">
                  <FaCalendarDays className="text-[10px] text-[#A3E635]" />
                  <span>{exp.period || exp.tenure}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-5 space-y-2 text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
                {exp.highlights &&
                  exp.highlights.slice(0, 3).map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5">
                      <span className="text-[#A3E635] mt-1 shrink-0 font-mono text-xs">›</span>
                      <span>{item}</span>
                    </div>
                  ))}
              </div>

              {/* Tech Tags */}
              {exp.tech && exp.tech.length > 0 && (
                <div className="mt-5 pt-4 border-t border-[#262626] flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-[#1A1A1A] border border-[#262626] px-2 py-0.5 text-[10px] font-mono text-[#A1A1A1]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

