import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaFolder, FaGithub, FaLock } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { projects } from "../data/projects";
import SEO from "../assets/components/SEO";

export default function Projects({ isStandalonePage = true }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const HeadingTag = isStandalonePage ? "h1" : "h2";

  return (
    <section id="projects" className="bg-[var(--bg-main)] py-12 lg:py-20 transition-colors duration-300">
      {isStandalonePage && (
        <SEO
          title="Projects & Portfolio | Gulrez Sarankar | Java Backend Developer"
          description="Explore backend and full-stack projects built by Gulrez Sarankar, including Spring Boot microservices, multi-tenant supermarket systems, and e-commerce platforms."
          canonicalPath="/projects"
        />
      )}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)]">
            ENGINEERING PORTFOLIO
          </span>
          <HeadingTag className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)] md:text-4xl">
            Selected Backend & Full-Stack Projects
          </HeadingTag>
          <p className="mx-auto mt-2 max-w-2xl text-sm sm:text-base text-[var(--text-secondary)]">
            Production applications built with Spring Boot, Java, PostgreSQL, Redis, REST APIs, and modern frontend tools.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="theme-card theme-card-hover flex flex-col justify-between p-5 sm:p-6"
            >
              <div>
                {/* Header: Icon & Category */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent-primary)] border border-[var(--border-color)]">
                    <FaFolder className="text-base sm:text-lg" />
                  </div>
                  <span className="rounded-md border border-[var(--border-color)] bg-[var(--bg-section)] px-2.5 py-1 text-[11px] font-bold text-[var(--text-secondary)]">
                    {project.category}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-[var(--accent-soft)] border border-[var(--border-color)] px-2.5 py-1 text-xs font-semibold text-[var(--accent-primary)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Links / Private Badge */}
              <div className="mt-6 flex items-center justify-between border-t border-[var(--border-color)] pt-4">
                {project.isPrivate ? (
                  <div className="theme-badge-private">
                    <FaLock className="text-[10px]" /> 🔒 PRIVATE PROJECT
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View live demo for ${project.title}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent-primary)] hover:underline"
                      >
                        Live Demo
                        <FaArrowUpRightFromSquare className="text-[10px]" />
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View GitHub repository for ${project.title}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-primary)] hover:text-[var(--accent-primary)]"
                      >
                        <FaGithub className="text-sm" />
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="theme-card relative z-10 max-h-[85vh] w-full max-w-4xl overflow-hidden p-6"
            >
              <div className="mb-4 flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">{selectedProject.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)]">Gallery View</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project preview modal"
                  className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                >
                  <FaTimes className="text-base" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-1">
                {selectedProject.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${selectedProject.title} preview ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full rounded-lg border border-[var(--border-color)] object-cover"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
