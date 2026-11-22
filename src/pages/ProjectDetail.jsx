import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaGithub,
  FaLock,
  FaCircleCheck,
  FaLayerGroup,
  FaWrench,
  FaArrowRight,
  FaCircleExclamation,
  FaImages,
  FaXmark,
} from "react-icons/fa6";
import { FaArrowUpRightFromSquare, FaBook, FaDiagramProject } from "react-icons/fa6";
import { getProjectBySlug, getAllPublishedProjects } from "../services/projectsService";
import SEO from "../assets/components/SEO";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageModal, setActiveImageModal] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    Promise.all([getProjectBySlug(slug), getAllPublishedProjects()])
      .then(([projectRes, allRes]) => {
        if (!isMounted) return;
        if (projectRes.data) {
          setProject(projectRes.data);
        } else {
          setProject(null);
        }

        if (allRes.data) {
          const others = allRes.data
            .filter((p) => p.slug !== slug && p.id !== slug)
            .slice(0, 3);
          setRelatedProjects(others);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message || "Failed to load case study");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-[#080612] py-16 sm:py-24 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
          <div className="h-6 w-32 bg-white/10 rounded-lg" />
          <div className="h-10 w-3/4 bg-white/10 rounded-xl" />
          <div className="h-64 w-full bg-white/10 rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-40 bg-white/10 rounded-2xl" />
            <div className="h-40 bg-white/10 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  // 404 Not Found State
  if (!project) {
    return (
      <div className="min-h-screen bg-[#080612] py-20 sm:py-32 text-white flex items-center justify-center">
        <SEO
          title="Case Study Not Found | Gulrez Sarankar"
          description="The requested project engineering case study could not be located."
          canonicalPath="/projects"
        />
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-[#D66BFF] flex items-center justify-center mx-auto mb-6 text-2xl shadow-[0_0_20px_rgba(155,92,255,0.2)]">
            <FaCircleExclamation />
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            Project Case Study Not Found
          </h1>
          <p className="mt-3 text-sm text-[#AAA5B8] leading-relaxed">
            The project record or case study for <code className="text-[#D66BFF]">/{slug}</code> does not exist or has been relocated.
          </p>
          <div className="mt-8">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#9B5CFF] to-[#7928CA] px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(155,92,255,0.35)] hover:scale-105 transition"
            >
              <FaArrowLeft className="text-xs" />
              <span>Back to All Projects</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const projectTitle = project.title || "Project Case Study";
  const projectDesc = project.overview || project.short_description || project.description || "";
  const coverImage = project.image_url || (project.images && project.images[0]) || null;
  const techStack = project.tech || project.tech_stack || [];
  const keyFeatures = Array.isArray(project.key_features) ? project.key_features : [];
  const screenshots = Array.isArray(project.screenshots) ? project.screenshots : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": projectTitle,
    "description": projectDesc,
    ...(coverImage ? { image: coverImage } : {}),
    "author": {
      "@type": "Person",
      "name": "Gulrez Sarankar",
      "url": "https://gulrezsarankar.info/"
    },
    ...(project.github ? { codeRepository: project.github } : {}),
    "programmingLanguage": techStack,
    "url": `https://gulrezsarankar.info/projects/${project.slug || slug}`
  };

  return (
    <div className="min-h-screen bg-[#080612] text-white">
      <SEO
        title={`${projectTitle} — Engineering Case Study | Gulrez Sarankar`}
        description={projectDesc.slice(0, 160)}
        canonicalPath={`/projects/${project.slug || slug}`}
        jsonLd={jsonLd}
      />

      {/* Background Radial Glow */}
      <div className="pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-[#9B5CFF]/10 blur-[150px]" />

      <main className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12 sm:space-y-16">
        {/* Breadcrumb Navigation & Return */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#AAA5B8]">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <Link to="/projects" className="hover:text-white transition">Projects</Link>
          <span>/</span>
          <span className="text-[#D66BFF] truncate font-medium">{projectTitle}</span>
        </nav>

        {/* Header Hero Area */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {project.category && (
              <span className="glass-pill text-[10px] py-1 px-3">
                {project.category}
              </span>
            )}
            {project.isPrivate ? (
              <span className="theme-badge-private text-[10px] py-1 px-3">
                <FaLock className="text-amber-400 text-[10px]" /> Private Enterprise System
              </span>
            ) : (
              <span className="glass-pill text-[10px] py-1 px-3 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                Open Source
              </span>
            )}
            {project.featured && (
              <span className="glass-pill text-[10px] py-1 px-3 bg-[#9B5CFF]/20 text-[#D66BFF]">
                Featured Architecture
              </span>
            )}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {projectTitle}
          </h1>

          {project.short_description && (
            <p className="text-base sm:text-lg text-[#AAA5B8] leading-relaxed max-w-3xl">
              {project.short_description}
            </p>
          )}

          {/* Action CTAs: Live Demo, GitHub, API Docs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {(project.link || project.live_url) && (
              <a
                href={project.link || project.live_url}
                target="_blank"
                rel="noreferrer"
                className="btn-primary-purple text-xs py-2.5 px-4 inline-flex items-center gap-2"
              >
                <span>Live Production Demo</span>
                <FaArrowUpRightFromSquare className="text-[11px]" />
              </a>
            )}

            {(project.github || project.github_url) && (
              <a
                href={project.github || project.github_url}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary-glass text-xs py-2.5 px-4 inline-flex items-center gap-2"
              >
                <FaGithub className="text-sm" />
                <span>GitHub Repository</span>
              </a>
            )}

            {project.api_docs_url && (
              <a
                href={project.api_docs_url}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary-glass text-xs py-2.5 px-4 inline-flex items-center gap-2"
              >
                <FaBook className="text-xs text-[#D66BFF]" />
                <span>API Documentation</span>
                <FaArrowUpRightFromSquare className="text-[10px]" />
              </a>
            )}
          </div>
        </header>

        {/* Cover Image Showcase */}
        {coverImage && (
          <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.12)] bg-[#100B20] shadow-[0_20px_50px_rgba(0,0,0,0.7)] max-h-[500px]">
            <img
              src={coverImage}
              alt={`${projectTitle} preview`}
              className="w-full h-full object-cover object-top"
            />
          </div>
        )}

        {/* At A Glance Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {project.my_role && (
            <div className="glass-card p-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#D66BFF]">Role</div>
              <div className="mt-1 text-sm font-semibold text-white">{project.my_role}</div>
            </div>
          )}

          <div className="glass-card p-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#D66BFF]">Status</div>
            <div className="mt-1 text-sm font-semibold text-white capitalize">{project.status || "Production"}</div>
          </div>

          <div className="glass-card p-4 sm:col-span-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#D66BFF] mb-2">Technologies</div>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] px-2 py-0.5 text-xs font-semibold text-[#D66BFF]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: Overview & Problem Statement */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FaLayerGroup className="text-[#9B5CFF] text-base" />
              <span>Project Overview</span>
            </h2>
            <div className="prose prose-invert max-w-none text-sm sm:text-base leading-relaxed text-[#E5E0F8] space-y-3">
              <p>{projectDesc}</p>
            </div>
          </div>

          {project.problem_statement && (
            <div className="lg:col-span-5 glass-card p-6 border-amber-500/20 bg-amber-500/5">
              <h3 className="font-heading text-base font-bold text-amber-300 mb-2">
                Problem Statement
              </h3>
              <p className="text-xs sm:text-sm text-[#E5E0F8] leading-relaxed">
                {project.problem_statement}
              </p>
            </div>
          )}
        </section>

        {/* SECTION: Architecture & Architecture Diagram */}
        {(project.architecture || project.architecture_diagram_url) && (
          <section className="glass-card p-6 sm:p-8 space-y-6 border-[rgba(155,92,255,0.25)]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#9B5CFF]/20 text-[#D66BFF] flex items-center justify-center text-sm">
                <FaDiagramProject />
              </div>
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                  System Architecture &amp; Engineering Design
                </h2>
                <p className="text-xs text-[#AAA5B8] mt-0.5">
                  Structural design, data flows, and technical topology.
                </p>
              </div>
            </div>

            {project.architecture && (
              <p className="text-sm sm:text-base text-[#E5E0F8] leading-relaxed">
                {project.architecture}
              </p>
            )}

            {project.architecture_diagram_url && (
              <div className="mt-4 rounded-xl overflow-hidden border border-[rgba(255,255,255,0.12)] bg-[#080612] p-2">
                <button
                  type="button"
                  onClick={() => setActiveImageModal(project.architecture_diagram_url)}
                  className="w-full group cursor-zoom-in relative"
                >
                  <img
                    src={project.architecture_diagram_url}
                    alt="System Architecture Diagram"
                    className="w-full max-h-[450px] object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                  <span className="absolute bottom-3 right-3 text-[11px] bg-black/70 px-2 py-1 rounded text-white backdrop-blur-md">
                    Click to enlarge diagram
                  </span>
                </button>
              </div>
            )}
          </section>
        )}

        {/* SECTION: Technical Challenges & Solutions Implemented */}
        {(project.technical_challenges || project.solutions) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.technical_challenges && (
              <div className="glass-card p-6 border-red-500/20 bg-red-500/5">
                <h3 className="font-heading text-lg font-bold text-red-300 mb-3 flex items-center gap-2">
                  <FaWrench className="text-sm text-red-400" />
                  <span>Technical Challenges</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#E5E0F8] leading-relaxed">
                  {project.technical_challenges}
                </p>
              </div>
            )}

            {project.solutions && (
              <div className="glass-card p-6 border-emerald-500/20 bg-emerald-500/5">
                <h3 className="font-heading text-lg font-bold text-emerald-300 mb-3 flex items-center gap-2">
                  <FaCircleCheck className="text-sm text-emerald-400" />
                  <span>Solutions Implemented</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#E5E0F8] leading-relaxed">
                  {project.solutions}
                </p>
              </div>
            )}
          </section>
        )}

        {/* SECTION: Key Technical Features */}
        {keyFeatures.length > 0 && (
          <section className="glass-card p-6 sm:p-8 space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Key Engineering Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-3.5"
                >
                  <FaCircleCheck className="text-sm text-[#9B5CFF] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#E5E0F8] leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION: Results & Outcomes / Metrics */}
        {project.results_outcomes && (
          <section className="glass-card p-6 sm:p-8 border-[#9B5CFF]/30 bg-gradient-to-br from-[#9B5CFF]/10 to-transparent">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
              Production Results &amp; Key Metrics
            </h2>
            <p className="text-sm sm:text-base text-[#E5E0F8] leading-relaxed">
              {project.results_outcomes}
            </p>
          </section>
        )}

        {/* SECTION: Project Screenshots Gallery */}
        {screenshots.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#9B5CFF]/20 text-[#D66BFF] flex items-center justify-center text-sm">
                <FaImages />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                Interface Gallery &amp; Screenshots
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {screenshots.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageModal(s.url || s)}
                  className="glass-card overflow-hidden rounded-xl border border-[rgba(255,255,255,0.10)] group cursor-zoom-in"
                >
                  <div className="h-56 w-full overflow-hidden bg-[#100B20]">
                    <img
                      src={s.url || s}
                      alt={s.caption || `Screenshot ${idx + 1}`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  {s.caption && (
                    <div className="p-3 border-t border-[rgba(255,255,255,0.08)] text-xs text-[#AAA5B8] bg-[#080612]/60">
                      {s.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <section className="pt-8 border-t border-[rgba(255,255,255,0.08)] space-y-6">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Related Engineering Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id || rel.slug}
                  to={`/projects/${rel.slug || rel.id}`}
                  className="glass-card p-4 hover:border-[#9B5CFF]/50 transition group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-[#D66BFF] uppercase">
                      {rel.category || "Project"}
                    </span>
                    <h3 className="font-heading text-sm font-bold text-white group-hover:text-[#D66BFF] transition mt-1">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-[#AAA5B8] line-clamp-2 mt-1">
                      {rel.short_description || rel.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#9B5CFF]">
                    <span>View Case Study</span>
                    <FaArrowRight className="text-[10px]" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Back Button */}
        <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center">
          <Link
            to="/projects"
            className="btn-secondary-glass text-xs py-2 px-4 inline-flex items-center gap-2"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to All Projects</span>
          </Link>
          <Link
            to="/contact"
            className="btn-primary-purple text-xs py-2 px-4 inline-flex items-center gap-2"
          >
            <span>Discuss This Architecture</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </main>

      {/* Lightbox / Image Modal */}
      <AnimatePresence>
        {activeImageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImageModal(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.2)] bg-[#080612] p-2 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveImageModal(null)}
                className="absolute top-4 right-4 rounded-xl bg-black/70 p-2 text-white hover:bg-black transition z-20"
                aria-label="Close image preview"
              >
                <FaXmark className="text-lg" />
              </button>
              <img
                src={activeImageModal}
                alt="Enlarged preview"
                className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

