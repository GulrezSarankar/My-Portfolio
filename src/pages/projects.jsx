import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { projects } from "../data/projects";
import SectionTitle from "../assets/components/Sectiontitle";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProject]);

  return (
    <section className="page-section px-4 sm:px-6" id="projects">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="My Work" />
        <p className="mx-auto -mt-4 mb-12 max-w-2xl text-center leading-7 text-muted">
          Selected projects showing backend architecture, database design, API integration, and complete product workflows.
        </p>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {projects.map((project, idx) => (
            <ProjectCard 
              key={project.id || idx} 
              project={project} 
              onClick={() => setSelectedProject(project)} 
            />
          ))}
        </motion.div>
      </div>

      {/* FULL SCREEN GALLERY MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            {/* Dark Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            />

            {/* Modal Container */}
            <motion.div
              layoutId={`card-${selectedProject.id || selectedProject.title}`}
              className="surface-card relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* LEFT: All Images (Scrollable) */}
              <div className="w-full md:w-2/3 h-1/2 md:h-full overflow-y-auto overflow-x-hidden p-4 space-y-4 custom-scrollbar" style={{ background: "var(--surface-muted)" }}>
                {selectedProject.images.map((img, i) => (
                  <motion.img
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    src={img}
                    alt={`View ${i}`}
                    className="w-full h-auto rounded-2xl object-cover"
                  />
                ))}
              </div>

              {/* RIGHT: Details (Sticky) */}
              <div className="w-full md:w-1/3 p-8 flex flex-col" style={{ borderLeft: "1px solid var(--border)" }}>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-bold text-heading tracking-tight">{selectedProject.title}</h3>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="secondary-button h-10 w-10 rounded-full p-0"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  <p className="text-muted leading-relaxed mb-6 text-sm">
                    {selectedProject.description}
                  </p>

                  <h4 className="text-xs font-black accent-text uppercase tracking-widest mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.tech.map(t => (
                      <span key={t} className="px-3 py-1 accent-soft accent-text text-[10px] font-bold rounded-lg">
                        {t}
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
                  LIVE PREVIEW →
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global CSS for the scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
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
        className="surface-card h-full rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1"
      >
        <div className="relative aspect-[16/10] rounded-[1.8rem] overflow-hidden mb-6">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/45 group-hover:bg-black/15 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
             <span className="rounded-full border border-white/20 bg-white/15 px-5 py-2 text-xs font-bold text-white backdrop-blur-md">
                View Project
             </span>
          </div>
        </div>

        <div className="px-2">
          <h3 className="text-2xl font-bold text-heading mb-2">{project.title}</h3>
          <p className="text-muted text-sm line-clamp-2 leading-6">
            {project.description}
          </p>
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
