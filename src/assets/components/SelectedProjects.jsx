import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowUpRightFromSquare, FaLock, FaGithub } from "react-icons/fa6";
import { projects } from "../../data/projects";

export default function SelectedProjects() {
  // Curate 3 prominent projects excluding grandmart (which has the dedicated spotlight)
  const curated = projects.filter((p) => p.id !== "grandmart").slice(0, 3);

  return (
    <section id="selected-projects" className="bg-[#0D0D0D] py-16 sm:py-20 lg:py-24 border-b border-[#262626]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#141414] px-3 py-1 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1A1]">
                Curated Work
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5]">
              Selected Engineering Projects
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#A1A1A1] leading-relaxed">
              Production web applications, e-commerce architectures, and full-stack systems built with clean code and reliable databases.
            </p>
          </div>

          <Link
            to="/projects"
            className="btn-secondary text-xs sm:text-sm py-2.5 px-4 self-start md:self-auto shrink-0"
          >
            <span>View All Projects</span>
            <FaArrowRight className="text-[11px]" />
          </Link>
        </div>

        {/* Varied Layout: 1 Primary Card + 2 Secondary Cards */}
        <div className="space-y-6">
          {curated[0] && (
            <div className="rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-8 lg:p-10 transition-colors hover:border-[#383838]">
              <div className="grid gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="rounded bg-[#1A1A1A] border border-[#262626] px-2.5 py-0.5 text-[11px] font-mono text-[#A3E635]">
                      {curated[0].category || "E-Commerce"}
                    </span>
                    {curated[0].isPrivate && (
                      <span className="rounded bg-[#1A1A1A] border border-[#262626] px-2.5 py-0.5 text-[11px] font-mono text-[#A1A1A1]">
                        <FaLock className="inline text-[9px] mr-1" />
                        Client Production
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F5F5F5]">
                    {curated[0].title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-[#A1A1A1] leading-relaxed">
                    {curated[0].description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {curated[0].tech.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-[#262626] bg-[#1A1A1A] px-2.5 py-1 text-xs font-mono text-[#F5F5F5]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <Link
                      to={`/projects/${curated[0].id}`}
                      className="btn-primary text-xs py-2 px-4"
                    >
                      <span>View Case Study</span>
                      <FaArrowRight className="text-[10px]" />
                    </Link>
                  </div>
                </div>

                {curated[0].images && curated[0].images.length > 0 && (
                  <div className="lg:col-span-5">
                    <div className="rounded-lg border border-[#262626] bg-[#1A1A1A] overflow-hidden aspect-[16/10] flex items-center justify-center">
                      <img
                        src={curated[0].images[0]}
                        alt={curated[0].title}
                        className="w-full h-full object-cover object-top opacity-90 hover:opacity-100 transition-opacity"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Secondary 2-Column Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {curated.slice(1).map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-7 flex flex-col justify-between transition-colors hover:border-[#383838]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="rounded bg-[#1A1A1A] border border-[#262626] px-2.5 py-0.5 text-[11px] font-mono text-[#A3E635]">
                      {project.category || "Full-Stack"}
                    </span>
                    {project.isPrivate && (
                      <span className="text-[11px] font-mono text-[#666666]">
                        <FaLock className="inline text-[9px] mr-1" />
                        Private
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[#F5F5F5]">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[#A1A1A1] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded border border-[#262626] bg-[#1A1A1A] px-2 py-0.5 text-[11px] font-mono text-[#A1A1A1]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#262626] flex items-center justify-between">
                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#F5F5F5] hover:text-[#A3E635] transition-colors"
                  >
                    <span>Read Details</span>
                    <FaArrowRight className="text-[10px]" />
                  </Link>

                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors"
                        aria-label={`GitHub repo for ${project.title}`}
                      >
                        <FaGithub className="text-[11px]" />
                        <span>Source</span>
                      </a>
                    )}

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors"
                      >
                        <span>Live Site</span>
                        <FaArrowUpRightFromSquare className="text-[9px]" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

