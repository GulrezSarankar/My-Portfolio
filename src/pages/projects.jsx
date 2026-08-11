import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { projects } from "../data/projects";
import SectionTitle from "../assets/components/Sectiontitle";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <section className="page-section px-4 sm:px-6" id="projects">
      <div className="mx-auto max-w-7xl px-0 sm:px-6">
        <SectionTitle title="My Work" />
        <p className="mx-auto -mt-4 mb-12 max-w-2xl text-center leading-7 text-muted">
          Selected projects showing backend architecture, database design, API integration,
          and complete product workflows.
        </p>

        <motion.div layout className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id || project.title || idx}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            />

            <motion.div
              layoutId={`card-${selectedProject.id || selectedProject.title}`}
              className="surface-card relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl md:flex-row"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="custom-scrollbar h-1/2 w-full space-y-4 overflow-y-auto overflow-x-hidden p-4 md:h-full md:w-2/3" style={{ background: "var(--surface-muted)" }}>
                {selectedProject.images.map((img, index) => (
                  <motion.img
                    key={img}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    src={img}
                    alt={`${selectedProject.title} view ${index + 1}`}
                    className="h-auto w-full rounded-2xl object-cover"
                  />
                ))}
              </div>

              <div className="flex w-full flex-col p-6 md:w-1/3 md:p-8" style={{ borderLeft: "1px solid var(--border)" }}>
                <div className="mb-6 flex items-start justify-between gap-4">
                  <h3 className="text-3xl font-black tracking-tight text-heading">
                    {selectedProject.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="secondary-button h-10 w-10 shrink-0 rounded-full p-0"
                    aria-label="Close project gallery"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="custom-scrollbar flex-1 overflow-y-auto pr-2">
                  <p className="mb-6 text-sm leading-7 text-muted">{selectedProject.description}</p>

                  <h4 className="mb-3 text-xs font-black uppercase tracking-widest accent-text">
                    Tech Stack
                  </h4>
                  <div className="mb-8 flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span key={tech} className="rounded-lg px-3 py-1 text-[10px] font-bold accent-soft accent-text">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-button mt-6 w-full py-4"
                >
                  View Project <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--text-soft); border-radius: 10px; }
      `}</style>
    </section>
  );
}

function ProjectCard({ project, onClick }) {
  return (
    <motion.div
      layoutId={`card-${project.id || project.title}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="group"
    >
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareEnable
        glareMaxOpacity={0.05}
        className="surface-card professional-card h-full rounded-2xl p-5"
      >
        <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-xl">
          <img
            src={project.images[0]}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="rounded-full border border-white/20 bg-white/15 px-5 py-2 text-xs font-bold text-white backdrop-blur-md">
              View Project
            </span>
          </div>
        </div>

        <div className="px-1">
          <h3 className="mb-2 text-2xl font-black text-heading">{project.title}</h3>
          <p className="line-clamp-2 text-sm leading-6 text-muted">{project.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((tech) => (
              <span key={tech} className="rounded-lg px-3 py-1 text-xs font-bold accent-soft accent-text">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}
