import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaXmark,
  FaFolder,
  FaGithub,
  FaLock,
  FaArrowRight,
  FaCircleCheck,
} from "react-icons/fa6";
import { FaArrowUpRightFromSquare, FaFileLines } from "react-icons/fa6";
import { projects } from "../data/projects";
import { getAllPublishedProjects } from "../services/projectsService";
import SEO from "../assets/components/SEO";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "enterprise", label: "Enterprise & Backend" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "fullstack", label: "Full-Stack & Web" },
];

export default function Projects({ isStandalonePage = true }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [projectList, setProjectList] = useState(projects);

  useEffect(() => {
    let isMounted = true;
    getAllPublishedProjects().then((res) => {
      if (isMounted && res.data && res.data.length > 0) {
        setProjectList(res.data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProjects = projectList.filter((project) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "enterprise")
      return (
        project.category.toLowerCase().includes("backend") ||
        project.category.toLowerCase().includes("enterprise")
      );
    if (selectedCategory === "ecommerce")
      return (
        project.category.toLowerCase().includes("commerce") ||
        project.title.toLowerCase().includes("aamzone") ||
        project.title.toLowerCase().includes("farm")
      );
    if (selectedCategory === "fullstack")
      return (
        project.category.toLowerCase().includes("full stack") ||
        project.category.toLowerCase().includes("web") ||
        project.category.toLowerCase().includes("ai")
      );
    return true;
  });

  const HeadingTag = isStandalonePage ? "h1" : "h2";

  return (
    <section
      id="projects"
      className="relative bg-[#0D0D0D] text-[#F5F5F5] py-16 sm:py-20 lg:py-24 border-b border-[#262626]"
    >
      {isStandalonePage && (
        <SEO
          title="Engineering Projects & Architecture Case Studies | Gulrez Sarankar"
          description="Explore high-throughput retail ERPs, concurrency-safe sports venue reservation engines, and farm-to-table platforms engineered with Spring Boot, PostgreSQL, and Redis."
          canonicalPath="/projects"
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Projects", url: "/projects" },
          ]}
        />
      )}

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#141414] px-3 py-1 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1A1]">
              Proven Work &amp; Case Studies
            </span>
          </div>

          <HeadingTag className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F5] leading-tight">
            Featured Engineering &amp; <br className="hidden sm:inline" />
            <span className="text-[#A3E635]">Production Deliverables</span>
          </HeadingTag>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#A1A1A1]">
            Architected for concurrency, resilience, and speed. A curated portfolio of enterprise ERPs, booking engines, e-commerce storefronts, and client platforms.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-[#1A1A1A] text-[#F5F5F5] border border-[#262626] ring-1 ring-[#A3E635]/50"
                    : "border border-[#262626] bg-[#141414] text-[#A1A1A1] hover:text-[#F5F5F5] hover:border-[#383838]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="rounded-xl border border-[#262626] bg-[#141414] flex flex-col justify-between overflow-hidden transition-colors hover:border-[#383838]"
            >
              {/* Card Thumbnail / Visual Area */}
              <div className="relative h-48 w-full overflow-hidden bg-[#1A1A1A] border-b border-[#262626]">
                {project.images && project.images[0] ? (
                  <img
                    src={project.images[0]}
                    alt={`${project.title} Preview`}
                    className="h-full w-full object-cover object-top opacity-90 transition-opacity hover:opacity-100"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#1A1A1A] text-[#A1A1A1]">
                    <FaFolder className="text-4xl text-[#262626]" />
                  </div>
                )}

                {/* Top Badges on Thumbnail */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="rounded bg-[#0D0D0D]/90 border border-[#262626] text-[10px] font-mono py-0.5 px-2 text-[#A3E635] backdrop-blur-sm">
                    {project.category}
                  </span>

                  {project.isPrivate ? (
                    <span className="rounded bg-[#0D0D0D]/90 border border-[#262626] text-[10px] font-mono py-0.5 px-2 text-[#A1A1A1] backdrop-blur-sm">
                      <FaLock className="inline text-[9px] mr-1 text-amber-400" /> Private
                    </span>
                  ) : (
                    <span className="rounded bg-[#0D0D0D]/90 border border-[#262626] text-[10px] font-mono py-0.5 px-2 text-emerald-400 backdrop-blur-sm">
                      Open Source
                    </span>
                  )}
                </div>

                {/* Case Study Quick Link on Card */}
                <Link
                  to={`/projects/${project.slug || project.id}`}
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded border border-[#262626] bg-[#0D0D0D]/90 px-2.5 py-1 text-[11px] font-mono font-medium text-[#F5F5F5] backdrop-blur-sm transition-colors hover:border-[#383838] hover:text-[#A3E635]"
                >
                  <FaFileLines className="text-[10px]" />
                  <span>Case Study</span>
                </Link>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#F5F5F5]">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#A1A1A1] line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-[#262626] bg-[#1A1A1A] px-2 py-0.5 text-[10px] font-mono text-[#A1A1A1]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Links */}
                <div className="mt-6 pt-4 border-t border-[#262626] flex items-center justify-between">
                  <Link
                    to={`/projects/${project.slug || project.id}`}
                    className="text-xs font-mono font-medium text-[#F5F5F5] hover:text-[#A3E635] transition-colors flex items-center gap-1.5"
                  >
                    <span>View Case Study</span>
                    <FaArrowRight className="text-[10px]" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View GitHub repository for ${project.title}`}
                        className="flex h-7 w-7 items-center justify-center rounded border border-[#262626] bg-[#1A1A1A] text-xs text-[#A1A1A1] hover:border-[#383838] hover:text-[#F5F5F5] transition-colors"
                        title="GitHub Repo"
                      >
                        <FaGithub />
                      </a>
                    )}

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View live demo for ${project.title}`}
                        className="inline-flex items-center gap-1 text-xs font-mono text-[#A1A1A1] hover:text-[#A3E635] transition-colors"
                      >
                        <span>Demo</span>
                        <FaArrowUpRightFromSquare className="text-[9px]" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute inset-0 bg-[#0D0D0D]/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative z-10 max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-8 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#1A1A1A] border border-[#262626] px-2 py-0.5 text-[10px] font-mono text-[#A3E635]">
                      {selectedCaseStudy.category}
                    </span>
                    {selectedCaseStudy.isPrivate ? (
                      <span className="rounded bg-[#1A1A1A] border border-[#262626] px-2 py-0.5 text-[10px] font-mono text-[#A1A1A1]">
                        <FaLock className="inline text-[9px] mr-1 text-amber-400" /> Private
                      </span>
                    ) : (
                      <span className="rounded bg-[#1A1A1A] border border-[#262626] px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                        Open Source
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F5F5F5] mt-2">
                    {selectedCaseStudy.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(null)}
                  className="rounded-lg p-2 text-[#A1A1A1] hover:bg-[#1A1A1A] hover:text-[#F5F5F5] transition-colors"
                >
                  <FaXmark className="text-base" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="max-h-[68vh] overflow-y-auto space-y-6 pr-2 text-sm text-[#A1A1A1]">
                {/* Image */}
                {selectedCaseStudy.images && selectedCaseStudy.images.length > 0 && (
                  <div className="rounded-lg overflow-hidden border border-[#262626] max-h-64">
                    <img
                      src={selectedCaseStudy.images[0]}
                      alt={`${selectedCaseStudy.title} screenshot`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}

                {/* Overview */}
                <div>
                  <h4 className="font-heading text-sm font-semibold text-[#F5F5F5] mb-2">
                    Project Overview
                  </h4>
                  <p className="leading-relaxed">
                    {selectedCaseStudy.longDescription || selectedCaseStudy.description}
                  </p>
                </div>

                {/* Contribution */}
                {selectedCaseStudy.contribution && (
                  <div className="p-4 rounded-lg border border-[#262626] bg-[#1A1A1A]">
                    <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-[#A3E635] mb-1.5">
                      Engineering Contribution
                    </h4>
                    <p className="text-xs sm:text-sm text-[#F5F5F5] leading-relaxed">
                      {selectedCaseStudy.contribution}
                    </p>
                  </div>
                )}

                {/* Key Features */}
                {selectedCaseStudy.features && selectedCaseStudy.features.length > 0 && (
                  <div>
                    <h4 className="font-heading text-sm font-semibold text-[#F5F5F5] mb-2.5">
                      Key Technical Features
                    </h4>
                    <ul className="space-y-2">
                      {selectedCaseStudy.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#A1A1A1]">
                          <FaCircleCheck className="mt-1 text-xs text-[#A3E635] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Metrics */}
                {selectedCaseStudy.metrics && selectedCaseStudy.metrics.length > 0 && (
                  <div>
                    <h4 className="font-heading text-sm font-semibold text-[#F5F5F5] mb-2.5">
                      Production Metrics
                    </h4>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {selectedCaseStudy.metrics.map((m, idx) => (
                        <div key={idx} className="rounded-lg border border-[#262626] bg-[#1A1A1A] p-3">
                          <div className="font-heading text-sm sm:text-base font-bold text-[#A3E635]">
                            {m.value}
                          </div>
                          <div className="text-[10px] font-mono text-[#A1A1A1] mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Badges */}
                <div>
                  <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-[#A1A1A1] mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCaseStudy.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-[#262626] bg-[#1A1A1A] px-2.5 py-1 text-xs font-mono text-[#F5F5F5]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 border-t border-[#262626] flex flex-wrap items-center justify-end gap-3">
                  <Link
                    to={`/projects/${selectedCaseStudy.slug || selectedCaseStudy.id}`}
                    className="btn-primary text-xs py-2 px-4"
                  >
                    <span>Full Case Study Page</span>
                    <FaArrowRight className="text-[10px]" />
                  </Link>

                  {selectedCaseStudy.github && (
                    <a
                      href={selectedCaseStudy.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary text-xs py-2 px-4"
                    >
                      <FaGithub className="text-xs" />
                      <span>GitHub</span>
                    </a>
                  )}

                  {selectedCaseStudy.link && (
                    <a
                      href={selectedCaseStudy.link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary text-xs py-2 px-4"
                    >
                      <span>Live Site</span>
                      <FaArrowUpRightFromSquare className="text-[10px]" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
