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
  FaArrowUpRightFromSquare,
  FaBook,
  FaDiagramProject,
} from "react-icons/fa6";
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
      <div className="min-h-screen bg-[#0D0D0D] py-16 sm:py-24 text-[#F5F5F5]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
          <div className="h-5 w-32 bg-[#1A1A1A] rounded" />
          <div className="h-10 w-3/4 bg-[#1A1A1A] rounded-lg" />
          <div className="h-64 w-full bg-[#1A1A1A] rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-40 bg-[#1A1A1A] rounded-xl" />
            <div className="h-40 bg-[#1A1A1A] rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // 404 Not Found State
  if (!project) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] py-20 sm:py-32 text-[#F5F5F5] flex items-center justify-center">
        <SEO
          title="Case Study Not Found | Gulrez Sarankar"
          description="The requested project engineering case study could not be located."
          canonicalPath="/projects"
        />
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="w-14 h-14 rounded-xl bg-[#141414] border border-[#262626] text-[#A3E635] flex items-center justify-center mx-auto mb-6 text-2xl">
            <FaCircleExclamation />
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#F5F5F5]">
            Project Case Study Not Found
          </h1>
          <p className="mt-3 text-sm text-[#A1A1A1] leading-relaxed">
            The project record or case study for <code className="text-[#A3E635] font-mono">/{slug}</code> does not exist or has been relocated.
          </p>
          <div className="mt-8">
            <Link
              to="/projects"
              className="btn-primary inline-flex items-center gap-2 text-xs py-2.5 px-5"
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
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5]">
      <SEO
        title={`${projectTitle} — Engineering Case Study | Gulrez Sarankar`}
        description={projectDesc.slice(0, 160)}
        canonicalPath={`/projects/${project.slug || slug}`}
        ogImage={
          project.images && project.images[0] && !project.images[0].endsWith(".svg")
            ? (project.images[0].startsWith("http") ? project.images[0] : `https://gulrezsarankar.info${project.images[0]}`)
            : "https://gulrezsarankar.info/og-image.jpg"
        }
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects" },
          { name: projectTitle, url: `/projects/${project.slug || slug}` },
        ]}
        jsonLd={jsonLd}
      />

      <main className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12 sm:space-y-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#A1A1A1]">
          <Link to="/" className="hover:text-[#F5F5F5] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/projects" className="hover:text-[#F5F5F5] transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-[#A3E635] truncate">{projectTitle}</span>
        </nav>

        {/* Header Hero Area */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {project.category && (
              <span className="rounded bg-[#1A1A1A] border border-[#262626] px-2.5 py-0.5 text-[11px] font-mono text-[#A3E635]">
                {project.category}
              </span>
            )}
            {project.isPrivate ? (
              <span className="rounded bg-[#1A1A1A] border border-[#262626] px-2.5 py-0.5 text-[11px] font-mono text-[#A1A1A1]">
                <FaLock className="inline text-[9px] mr-1 text-amber-400" /> Private Enterprise System
              </span>
            ) : (
              <span className="rounded bg-[#1A1A1A] border border-[#262626] px-2.5 py-0.5 text-[11px] font-mono text-emerald-400">
                Open Source
              </span>
            )}
            {project.featured && (
              <span className="rounded bg-[#1A1A1A] border border-[#262626] px-2.5 py-0.5 text-[11px] font-mono text-[#F5F5F5]">
                Featured Architecture
              </span>
            )}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F5] leading-tight">
            {projectTitle}
          </h1>

          {project.short_description && (
            <p className="text-base sm:text-lg text-[#A1A1A1] leading-relaxed max-w-3xl">
              {project.short_description}
            </p>
          )}

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {(project.link || project.live_url) && (
              <a
                href={project.link || project.live_url}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-xs py-2.5 px-4 inline-flex items-center gap-2"
              >
                <span>Live Production Demo</span>
                <FaArrowUpRightFromSquare className="text-[10px]" />
              </a>
            )}

            {(project.github || project.github_url) && (
              <a
                href={project.github || project.github_url}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs py-2.5 px-4 inline-flex items-center gap-2"
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
                className="btn-secondary text-xs py-2.5 px-4 inline-flex items-center gap-2"
              >
                <FaBook className="text-xs" />
                <span>API Documentation</span>
                <FaArrowUpRightFromSquare className="text-[10px]" />
              </a>
            )}
          </div>
        </header>

        {/* Cover Image Showcase */}
        {coverImage && (
          <div className="rounded-xl overflow-hidden border border-[#262626] bg-[#141414] max-h-[500px]">
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
            <div className="rounded-xl border border-[#262626] bg-[#141414] p-4">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1A1]">Role</div>
              <div className="mt-1 text-sm font-semibold text-[#F5F5F5]">{project.my_role}</div>
            </div>
          )}

          <div className="rounded-xl border border-[#262626] bg-[#141414] p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1A1]">Status</div>
            <div className="mt-1 text-sm font-semibold text-[#F5F5F5] capitalize">{project.status || "Production"}</div>
          </div>

          <div className="rounded-xl border border-[#262626] bg-[#141414] p-4 sm:col-span-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1A1] mb-2">Technologies</div>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="rounded border border-[#262626] bg-[#1A1A1A] px-2 py-0.5 text-xs font-mono text-[#F5F5F5]"
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
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#F5F5F5] flex items-center gap-2">
              <FaLayerGroup className="text-[#A3E635] text-base" />
              <span>Project Overview</span>
            </h2>
            <div className="text-sm sm:text-base leading-relaxed text-[#A1A1A1] space-y-3">
              <p>{projectDesc}</p>
            </div>
          </div>

          {project.problem_statement && (
            <div className="lg:col-span-5 rounded-xl border border-[#262626] bg-[#141414] p-6">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-[#F5F5F5] mb-2">
                Problem Statement
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
                {project.problem_statement}
              </p>
            </div>
          )}
        </section>

        {/* SECTION: Architecture & Architecture Diagram */}
        {(project.architecture || project.architecture_diagram_url) && (
          <section className="rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg border border-[#262626] bg-[#1A1A1A] text-[#A3E635] flex items-center justify-center text-sm">
                <FaDiagramProject />
              </div>
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#F5F5F5]">
                  System Architecture &amp; Engineering Design
                </h2>
                <p className="text-xs text-[#A1A1A1] mt-0.5 font-mono">
                  Structural design, data flows, and technical topology.
                </p>
              </div>
            </div>

            {project.architecture && (
              <p className="text-sm sm:text-base text-[#A1A1A1] leading-relaxed">
                {project.architecture}
              </p>
            )}

            {project.architecture_diagram_url && (
              <div className="mt-4 rounded-lg overflow-hidden border border-[#262626] bg-[#0D0D0D] p-2">
                <button
                  type="button"
                  onClick={() => setActiveImageModal(project.architecture_diagram_url)}
                  className="w-full group cursor-zoom-in relative"
                >
                  <img
                    src={project.architecture_diagram_url}
                    alt="System Architecture Diagram"
                    className="w-full max-h-[450px] object-contain rounded transition-opacity hover:opacity-95"
                  />
                  <span className="absolute bottom-3 right-3 text-[11px] font-mono bg-[#141414]/90 border border-[#262626] px-2.5 py-1 rounded text-[#F5F5F5]">
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
              <div className="rounded-xl border border-[#262626] bg-[#141414] p-6">
                <h3 className="font-heading text-base font-semibold text-[#F5F5F5] mb-3 flex items-center gap-2">
                  <FaWrench className="text-sm text-[#A3E635]" />
                  <span>Technical Challenges</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
                  {project.technical_challenges}
                </p>
              </div>
            )}

            {project.solutions && (
              <div className="rounded-xl border border-[#262626] bg-[#141414] p-6">
                <h3 className="font-heading text-base font-semibold text-[#F5F5F5] mb-3 flex items-center gap-2">
                  <FaCircleCheck className="text-sm text-[#A3E635]" />
                  <span>Solutions Implemented</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
                  {project.solutions}
                </p>
              </div>
            )}
          </section>
        )}

        {/* SECTION: Key Technical Features */}
        {keyFeatures.length > 0 && (
          <section className="rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-8 space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#F5F5F5]">
              Key Engineering Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-lg border border-[#262626] bg-[#1A1A1A] p-3.5"
                >
                  <FaCircleCheck className="text-sm text-[#A3E635] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#F5F5F5]/90 leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION: Results & Outcomes */}
        {project.results_outcomes && (
          <section className="rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-8">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#F5F5F5] mb-2">
              Production Results &amp; Key Metrics
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1A1] leading-relaxed">
              {project.results_outcomes}
            </p>
          </section>
        )}

        {/* SECTION: Project Screenshots Gallery */}
        {screenshots.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg border border-[#262626] bg-[#1A1A1A] text-[#A3E635] flex items-center justify-center text-sm">
                <FaImages />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#F5F5F5]">
                Interface Gallery &amp; Screenshots
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {screenshots.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageModal(s.url || s)}
                  className="overflow-hidden rounded-xl border border-[#262626] bg-[#141414] group cursor-zoom-in"
                >
                  <div className="h-56 w-full overflow-hidden bg-[#1A1A1A]">
                    <img
                      src={s.url || s}
                      alt={s.caption || `Screenshot ${idx + 1}`}
                      className="w-full h-full object-cover object-top opacity-90 transition-opacity group-hover:opacity-100"
                      loading="lazy"
                    />
                  </div>
                  {s.caption && (
                    <div className="p-3 border-t border-[#262626] text-xs font-mono text-[#A1A1A1] bg-[#141414]">
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
          <section className="pt-8 border-t border-[#262626] space-y-6">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#F5F5F5]">
              Related Engineering Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id || rel.slug}
                  to={`/projects/${rel.slug || rel.id}`}
                  className="rounded-xl border border-[#262626] bg-[#141414] p-5 hover:border-[#383838] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="rounded border border-[#262626] bg-[#1A1A1A] px-2 py-0.5 text-[10px] font-mono text-[#A3E635]">
                      {rel.category || "Backend"}
                    </span>
                    <h3 className="font-heading text-sm font-semibold text-[#F5F5F5] mt-2.5">
                      {rel.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-[#A1A1A1] line-clamp-2">
                      {rel.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between text-xs font-mono text-[#A1A1A1]">
                    <span>View Case Study</span>
                    <FaArrowRight className="text-[10px]" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Image Modal Lightbox */}
      <AnimatePresence>
        {activeImageModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0D0D]/90 backdrop-blur-md"
            onClick={() => setActiveImageModal(null)}
          >
            <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-xl border border-[#262626] bg-[#141414] p-2">
              <button
                type="button"
                onClick={() => setActiveImageModal(null)}
                className="absolute top-4 right-4 z-10 rounded-lg bg-[#0D0D0D]/80 border border-[#262626] p-2 text-[#F5F5F5] hover:bg-[#1A1A1A] transition-colors"
                aria-label="Close image preview"
              >
                <FaXmark className="text-base" />
              </button>
              <img
                src={activeImageModal}
                alt="Enlarged preview"
                className="max-h-[85vh] w-auto object-contain rounded"
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
