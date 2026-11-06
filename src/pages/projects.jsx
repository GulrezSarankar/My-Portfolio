import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaFolder,
  FaGithub,
  FaLock,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { FaArrowUpRightFromSquare, FaFileLines } from "react-icons/fa6";
import { projects } from "../data/projects";
import { getAllPublishedProjects } from "../services/projectsService";
import SEO from "../assets/components/SEO";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "enterprise", label: "Enterprise & Backend" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "fullstack", label: "Full-Stack & AI" },
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
      return project.category.toLowerCase().includes("backend") || project.category.toLowerCase().includes("enterprise");
    if (selectedCategory === "ecommerce")
      return project.category.toLowerCase().includes("commerce") || project.title.toLowerCase().includes("aamzone") || project.title.toLowerCase().includes("farm");
    if (selectedCategory === "fullstack")
      return project.category.toLowerCase().includes("full stack") || project.category.toLowerCase().includes("ai");
    return true;
  });

  const HeadingTag = isStandalonePage ? "h1" : "h2";

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#080612] py-16 sm:py-20 lg:py-28 border-b border-[rgba(255,255,255,0.08)]"
    >
      {isStandalonePage && (
        <SEO
          title="Projects & Engineering Portfolio | Gulrez Sarankar"
          description="Explore enterprise backend systems, e-commerce platforms, and full-stack applications engineered by Gulrez Sarankar using Java, Spring Boot, PostgreSQL, and React."
          canonicalPath="/projects"
        />
      )}

      {/* Radial Glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#9B5CFF]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="glass-pill mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9B5CFF]" />
            PROVEN WORK &amp; CASE STUDIES
          </div>
          <HeadingTag className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Featured Engineering &amp; <br className="hidden sm:inline" />
            <span className="purple-gradient-text">Full-Stack Deliverables</span>
          </HeadingTag>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#AAA5B8]">
            Architected for concurrency, resilience, and speed. A curated portfolio of enterprise ERPs, booking engines, e-commerce storefronts, and client platforms.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-[#9B5CFF] to-[#7928CA] text-white shadow-[0_0_20px_rgba(155,92,255,0.35)] border border-[rgba(255,255,255,0.2)]"
                    : "glass-panel text-[#AAA5B8] hover:text-white hover:border-[#9B5CFF]/40"
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="glass-card flex flex-col justify-between overflow-hidden group hover:border-[#9B5CFF]/50"
            >
              {/* Card Thumbnail / Visual Area */}
              <div className="relative h-48 w-full overflow-hidden bg-[#100B20] border-b border-[rgba(255,255,255,0.08)]">
                {project.images && project.images[0] ? (
                  <img
                    src={project.images[0]}
                    alt={`${project.title} Preview`}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#120D24] to-[#1A1235] text-white">
                    <FaFolder className="text-4xl text-[#9B5CFF]" />
                  </div>
                )}

                {/* Gradient shade over image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080612] via-transparent to-black/30" />

                {/* Top Badges on Thumbnail */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="glass-pill text-[10px] py-0.5 px-2.5 bg-[#080612]/80 backdrop-blur-md">
                    {project.category}
                  </span>

                  {project.isPrivate ? (
                    <span className="theme-badge-private text-[10px] py-0.5 px-2 bg-[#080612]/80 backdrop-blur-md">
                      <FaLock className="text-[10px] text-amber-400" /> Private
                    </span>
                  ) : (
                    <span className="glass-pill text-[10px] py-0.5 px-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      Open Source
                    </span>
                  )}
                </div>

                {/* Quick Case Study Button Overlay */}
                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(project)}
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg border border-[rgba(255,255,255,0.15)] bg-[#080612]/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md transition-all hover:bg-[#9B5CFF] hover:border-[#9B5CFF]"
                >
                  <FaFileLines className="text-[10px] text-[#D66BFF]" />
                  <span>Case Study</span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-[#D66BFF] transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#AAA5B8] line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-2 py-0.5 text-[11px] font-medium text-[#D66BFF]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Links */}
                <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedCaseStudy(project)}
                    className="text-xs font-semibold text-[#AAA5B8] hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>View Details</span>
                    <FaArrowRight className="text-[10px] text-[#9B5CFF]" />
                  </button>

                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View GitHub repository for ${project.title}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] text-sm text-[#AAA5B8] hover:border-[#9B5CFF] hover:text-white transition-all"
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
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D66BFF] hover:text-white transition-colors"
                      >
                        <span>Demo</span>
                        <FaArrowUpRightFromSquare className="text-[10px]" />
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
              className="absolute inset-0 bg-[#080612]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card relative z-10 max-h-[88vh] w-full max-w-3xl overflow-hidden p-6 sm:p-8 border-[rgba(155,92,255,0.35)] shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.10)] pb-4 mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="glass-pill text-[10px] py-0.5">
                      {selectedCaseStudy.category}
                    </span>
                    {selectedCaseStudy.isPrivate ? (
                      <span className="theme-badge-private text-[10px] py-0.5">
                        <FaLock className="text-amber-400 text-[10px]" /> Private Architecture
                      </span>
                    ) : (
                      <span className="glass-pill text-[10px] py-0.5 bg-emerald-500/20 text-emerald-400">
                        Open Source
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mt-1.5">
                    {selectedCaseStudy.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(null)}
                  className="rounded-xl p-2 text-[#AAA5B8] hover:bg-[rgba(255,255,255,0.08)] hover:text-white transition-colors"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="max-h-[68vh] overflow-y-auto space-y-6 pr-2 text-sm text-[#AAA5B8]">
                {/* Image Gallery */}
                {selectedCaseStudy.images && selectedCaseStudy.images.length > 0 && (
                  <div className="rounded-xl overflow-hidden border border-[rgba(255,255,255,0.10)] max-h-64">
                    <img
                      src={selectedCaseStudy.images[0]}
                      alt={`${selectedCaseStudy.title} screenshot`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}

                {/* Detailed Overview */}
                <div>
                  <h4 className="font-heading text-base font-bold text-white mb-2">Project Overview</h4>
                  <p className="leading-relaxed">
                    {selectedCaseStudy.longDescription || selectedCaseStudy.description}
                  </p>
                </div>

                {/* Engineering Highlights & Contribution */}
                {selectedCaseStudy.contribution && (
                  <div className="p-4 rounded-xl border border-[rgba(155,92,255,0.25)] bg-[rgba(155,92,255,0.06)]">
                    <h4 className="font-heading text-sm font-bold text-white mb-1.5">
                      My Engineering Contribution
                    </h4>
                    <p className="text-xs sm:text-sm text-[#E5E0F8] leading-relaxed">
                      {selectedCaseStudy.contribution}
                    </p>
                  </div>
                )}

                {/* Key Features */}
                {selectedCaseStudy.features && selectedCaseStudy.features.length > 0 && (
                  <div>
                    <h4 className="font-heading text-base font-bold text-white mb-2.5">Key Technical Features</h4>
                    <ul className="space-y-2">
                      {selectedCaseStudy.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#E5E0F8]">
                          <FaCheckCircle className="mt-1 text-xs text-[#9B5CFF] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Verified Performance Metrics */}
                {selectedCaseStudy.metrics && selectedCaseStudy.metrics.length > 0 && (
                  <div>
                    <h4 className="font-heading text-base font-bold text-white mb-2.5">Production Metrics</h4>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {selectedCaseStudy.metrics.map((m, idx) => (
                        <div key={idx} className="glass-panel p-3">
                          <div className="font-heading text-sm sm:text-base font-bold text-white">
                            {m.value}
                          </div>
                          <div className="text-[10px] text-[#AAA5B8] mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Badges */}
                <div>
                  <h4 className="font-heading text-sm font-bold text-white mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCaseStudy.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-xs font-semibold text-[#D66BFF]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-end gap-3">
                  {selectedCaseStudy.github && (
                    <a
                      href={selectedCaseStudy.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary-glass text-xs py-2 px-4"
                    >
                      <FaGithub className="text-xs" />
                      <span>View GitHub Code</span>
                    </a>
                  )}

                  {selectedCaseStudy.link && (
                    <a
                      href={selectedCaseStudy.link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary-purple text-xs py-2 px-4"
                    >
                      <span>Live Production Demo</span>
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
