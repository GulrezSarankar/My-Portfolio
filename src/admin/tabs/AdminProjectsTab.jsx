import React, { useState, useEffect } from "react";
import {
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
  isValidUrl,
} from "../../services/projectsService";
import {
  uploadProjectImage,
  uploadCaseStudyImage,
  deleteCaseStudyImage,
} from "../../services/storageService";
import ConfirmModal from "../components/ConfirmModal";
import {
  FaPlus,
  FaMagnifyingGlass,
  FaPenToSquare,
  FaTrash,
  FaArrowUpRightFromSquare,
  FaStar,
  FaCloudArrowUp,
  FaXmark,
  FaBookOpen,
  FaDiagramProject,
  FaImages,
  FaArrowUp,
  FaArrowDown,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa6";

export default function AdminProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create" | "edit"
  const [currentProject, setCurrentProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingArch, setUploadingArch] = useState(false);
  const [uploadingScreenshot, setUploadingScreenshot] = useState(false);

  // Form Fields - Core Project
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("published");
  const [featured, setFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(1);
  const [formError, setFormError] = useState("");

  // Form Fields - Optional Case Study
  const [caseStudySectionOpen, setCaseStudySectionOpen] = useState(false);
  const [hasCaseStudy, setHasCaseStudy] = useState(false);
  const [overview, setOverview] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [myRole, setMyRole] = useState("");
  const [architecture, setArchitecture] = useState("");
  const [technicalChallenges, setTechnicalChallenges] = useState("");
  const [solutions, setSolutions] = useState("");
  const [keyFeaturesInput, setKeyFeaturesInput] = useState("");
  const [resultsOutcomes, setResultsOutcomes] = useState("");
  const [apiDocsUrl, setApiDocsUrl] = useState("");
  const [archDiagramUrl, setArchDiagramUrl] = useState("");
  const [archDiagramPath, setArchDiagramPath] = useState("");
  const [screenshots, setScreenshots] = useState([]);

  // Delete State
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllProjectsAdmin();
      if (res.error) {
        setError(res.error.message);
      } else {
        setProjects(res.data || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setCurrentProject(null);
    setTitle("");
    setSlug("");
    setShortDesc("");
    setDescription("");
    setTechStackInput("");
    setGithubUrl("");
    setLiveUrl("");
    setImageUrl("");
    setStatus("published");
    setFeatured(false);
    setDisplayOrder((projects.length || 0) + 1);

    // Case study defaults
    setCaseStudySectionOpen(false);
    setHasCaseStudy(false);
    setOverview("");
    setProblemStatement("");
    setMyRole("");
    setArchitecture("");
    setTechnicalChallenges("");
    setSolutions("");
    setKeyFeaturesInput("");
    setResultsOutcomes("");
    setApiDocsUrl("");
    setArchDiagramUrl("");
    setArchDiagramPath("");
    setScreenshots([]);

    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (proj) => {
    setModalMode("edit");
    setCurrentProject(proj);
    setTitle(proj.title || "");
    setSlug(proj.slug || "");
    setShortDesc(proj.short_description || "");
    setDescription(proj.description || "");
    setTechStackInput((proj.tech_stack || []).join(", "));
    setGithubUrl(proj.github_url || "");
    setLiveUrl(proj.live_url || "");
    setImageUrl(proj.image_url || "");
    setStatus(proj.status || "published");
    setFeatured(Boolean(proj.featured));
    setDisplayOrder(proj.display_order ?? 0);

    // Case study fields
    const hasStudy = Boolean(
      proj.has_case_study ||
      proj.overview ||
      proj.problem_statement ||
      proj.architecture ||
      (Array.isArray(proj.key_features) && proj.key_features.length > 0) ||
      proj.architecture_diagram_url ||
      (Array.isArray(proj.screenshots) && proj.screenshots.length > 0)
    );
    setHasCaseStudy(hasStudy);
    setCaseStudySectionOpen(hasStudy);
    setOverview(proj.overview || "");
    setProblemStatement(proj.problem_statement || "");
    setMyRole(proj.my_role || "");
    setArchitecture(proj.architecture || "");
    setTechnicalChallenges(proj.technical_challenges || "");
    setSolutions(proj.solutions || "");
    setKeyFeaturesInput(
      Array.isArray(proj.key_features)
        ? proj.key_features.join("\n")
        : typeof proj.key_features === "string"
        ? proj.key_features
        : ""
    );
    setResultsOutcomes(proj.results_outcomes || "");
    setApiDocsUrl(proj.api_docs_url || "");
    setArchDiagramUrl(proj.architecture_diagram_url || "");
    setArchDiagramPath(proj.architecture_diagram_path || "");
    setScreenshots(Array.isArray(proj.screenshots) ? proj.screenshots : []);

    setFormError("");
    setIsModalOpen(true);
  };

  const handleTitleChange = (val) => {
    setTitle(val);
    if (modalMode === "create" && !slug) {
      setSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setFormError("");
    try {
      const { data, error: upError } = await uploadProjectImage(file);
      if (upError) {
        setFormError(`Image upload error: ${upError.message}`);
      } else if (data?.publicUrl) {
        setImageUrl(data.publicUrl);
      }
    } catch (err) {
      setFormError(`Image upload failed: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleArchDiagramUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingArch(true);
    setFormError("");
    try {
      const { data, error: upError } = await uploadCaseStudyImage(file);
      if (upError) {
        setFormError(`Diagram upload error: ${upError.message}`);
      } else if (data?.publicUrl) {
        setArchDiagramUrl(data.publicUrl);
        setArchDiagramPath(data.path);
      }
    } catch (err) {
      setFormError(`Diagram upload failed: ${err.message}`);
    } finally {
      setUploadingArch(false);
    }
  };

  const handleRemoveArchDiagram = async () => {
    if (archDiagramPath) {
      try {
        await deleteCaseStudyImage(archDiagramPath);
      } catch (err) {
        console.warn("Could not delete architecture diagram file:", err.message);
      }
    }
    setArchDiagramUrl("");
    setArchDiagramPath("");
  };

  const handleScreenshotUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploadingScreenshot(true);
    setFormError("");
    try {
      const uploadedList = [];
      for (const file of files) {
        const { data, error: upError } = await uploadCaseStudyImage(file);
        if (upError) {
          setFormError(`Screenshot upload error: ${upError.message}`);
          break;
        } else if (data?.publicUrl) {
          uploadedList.push({
            url: data.publicUrl,
            path: data.path,
            caption: file.name.replace(/\.[^/.]+$/, ""),
            display_order: screenshots.length + uploadedList.length + 1,
          });
        }
      }
      if (uploadedList.length > 0) {
        setScreenshots((prev) => [...prev, ...uploadedList]);
      }
    } catch (err) {
      setFormError(`Screenshot upload failed: ${err.message}`);
    } finally {
      setUploadingScreenshot(false);
    }
  };

  const handleRemoveScreenshot = async (index) => {
    const item = screenshots[index];
    if (item?.path) {
      try {
        await deleteCaseStudyImage(item.path);
      } catch (err) {
        console.warn("Could not delete screenshot file:", err.message);
      }
    }
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveScreenshot = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= screenshots.length) return;
    const updated = [...screenshots];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    // Update display orders
    updated.forEach((s, idx) => {
      s.display_order = idx + 1;
    });
    setScreenshots(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!title.trim() || !slug.trim()) {
      setFormError("Title and slug are required.");
      return;
    }

    if (githubUrl.trim() && !isValidUrl(githubUrl.trim())) {
      setFormError("GitHub URL must be a valid URL starting with http:// or https://");
      return;
    }

    if (liveUrl.trim() && !isValidUrl(liveUrl.trim())) {
      setFormError("Live Demo URL must be a valid URL starting with http:// or https://");
      return;
    }

    if (apiDocsUrl.trim() && !isValidUrl(apiDocsUrl.trim())) {
      setFormError("API Documentation URL must be a valid URL starting with http:// or https://");
      return;
    }

    const techArray = techStackInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const keyFeaturesArray = keyFeaturesInput
      .split("\n")
      .map((f) => f.trim().replace(/^[-•*]\s*/, ""))
      .filter(Boolean);

    const isStudyActive = Boolean(
      hasCaseStudy ||
      overview.trim() ||
      problemStatement.trim() ||
      architecture.trim() ||
      keyFeaturesArray.length > 0 ||
      archDiagramUrl.trim() ||
      screenshots.length > 0
    );

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      short_description: shortDesc.trim() || null,
      description: description.trim() || null,
      tech_stack: techArray,
      github_url: githubUrl.trim() || null,
      live_url: liveUrl.trim() || null,
      image_url: imageUrl.trim() || null,
      status,
      featured,
      display_order: Number(displayOrder) || 0,

      // Optional Case Study fields
      overview: overview.trim() || null,
      problem_statement: problemStatement.trim() || null,
      my_role: myRole.trim() || null,
      architecture: architecture.trim() || null,
      technical_challenges: technicalChallenges.trim() || null,
      solutions: solutions.trim() || null,
      key_features: keyFeaturesArray,
      results_outcomes: resultsOutcomes.trim() || null,
      api_docs_url: apiDocsUrl.trim() || null,
      architecture_diagram_url: archDiagramUrl.trim() || null,
      architecture_diagram_path: archDiagramPath.trim() || null,
      screenshots: screenshots,
      has_case_study: isStudyActive,
    };

    setSaving(true);
    try {
      if (modalMode === "create") {
        const { error: createErr } = await createProject(payload);
        if (createErr) throw createErr;
      } else {
        const { error: updateErr } = await updateProject(currentProject.id, payload);
        if (updateErr) throw updateErr;
      }

      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      setFormError(err.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    setDeleting(true);
    try {
      const { error: delErr } = await deleteProject(projectToDelete.id);
      if (delErr) throw delErr;
      setProjectToDelete(null);
      fetchProjects();
    } catch (err) {
      alert(`Deletion failed: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.slug?.toLowerCase().includes(search.toLowerCase()) ||
      (p.tech_stack || []).some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "all" ? true : p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Portfolio Projects</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage projects, architecture case studies, screenshots, and live demonstrations.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition shadow-md shadow-indigo-600/30 cursor-pointer self-start sm:self-auto"
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects by title, slug, or tech stack..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/70 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Case Study</th>
                <th className="py-3 px-4">Tech Stack</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 text-sm">
                    Loading project records...
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 text-sm">
                    No projects found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => {
                  const hasStudy = Boolean(
                    p.has_case_study ||
                    p.overview ||
                    p.problem_statement ||
                    p.architecture ||
                    (Array.isArray(p.key_features) && p.key_features.length > 0)
                  );
                  return (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-400">
                        {p.display_order}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm">{p.title}</div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">/{p.slug}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                            p.status === "published"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : p.status === "draft"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-slate-700/30 text-slate-400 border border-slate-700/50"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {hasStudy ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                            <FaBookOpen className="w-3 h-3" />
                            <span>Detailed</span>
                          </span>
                        ) : (
                          <span className="text-xs text-slate-600">Standard</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {(p.tech_stack || []).slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="px-1.5 py-0.5 text-xs rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                            >
                              {t}
                            </span>
                          ))}
                          {(p.tech_stack || []).length > 3 && (
                            <span className="text-xs text-slate-500">
                              +{p.tech_stack.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {p.featured ? (
                          <FaStar className="w-4 h-4 text-amber-400" title="Featured Project" />
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          {p.live_url && (
                            <a
                              href={p.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
                              title="View Live Site"
                            >
                              <FaArrowUpRightFromSquare className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 rounded text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition cursor-pointer"
                            title="Edit Project"
                          >
                            <FaPenToSquare className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setProjectToDelete(p)}
                            className="p-1.5 rounded text-slate-400 hover:text-red-400 hover:bg-slate-800 transition cursor-pointer"
                            title="Delete Project"
                          >
                            <FaTrash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white transition p-1"
            >
              <FaXmark className="w-5 h-5" />
            </button>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              {modalMode === "create" ? "Add New Project" : `Edit Project: ${currentProject?.title}`}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Configure core project metadata and optional deep-dive Case Study sections.
            </p>

            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-xs text-red-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              {/* SECTION 1: CORE FIELDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. GrandMart Multi-Outlet"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Slug (URL safe) *
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    placeholder="e.g. grandmart"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Short Description
                </label>
                <input
                  type="text"
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="One sentence summary for card previews..."
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Full Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed architecture and features..."
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="Java, Spring Boot, PostgreSQL, Docker"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Cover Image Upload / URL */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Project Cover Image
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter URL or upload to project-media bucket"
                    className="flex-1 w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 cursor-pointer transition shrink-0">
                    <FaCloudArrowUp className="w-4 h-4 text-indigo-400" />
                    <span>{uploadingImage ? "Uploading..." : "Upload Image"}</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
                {imageUrl && (
                  <div className="mt-2 flex items-center gap-3 p-2 bg-slate-950 rounded-lg border border-slate-800">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-12 h-12 object-cover rounded-md"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    <span className="text-xs text-slate-400 truncate flex-1">{imageUrl}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex items-center pt-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-700 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-semibold text-slate-300">Feature on Home</span>
                  </label>
                </div>
              </div>

              {/* SECTION 2: OPTIONAL CASE STUDY ACCORDION */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setCaseStudySectionOpen(!caseStudySectionOpen)}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">
                      <FaBookOpen />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Case Study & Architecture Deep-Dive</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          Optional
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">
                        Add problem statement, role, challenges, diagrams, and gallery.
                      </div>
                    </div>
                  </div>
                  <div className="text-slate-400">
                    {caseStudySectionOpen ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {caseStudySectionOpen && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                      <input
                        type="checkbox"
                        id="hasCaseStudyCheck"
                        checked={hasCaseStudy}
                        onChange={(e) => setHasCaseStudy(e.target.checked)}
                        className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-700 focus:ring-indigo-500 cursor-pointer"
                      />
                      <label htmlFor="hasCaseStudyCheck" className="text-xs font-semibold text-slate-300 cursor-pointer">
                        Enable dedicated public Case Study page (/projects/{slug || "slug"})
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        1. Project Overview / Summary
                      </label>
                      <textarea
                        rows={3}
                        value={overview}
                        onChange={(e) => setOverview(e.target.value)}
                        placeholder="Comprehensive summary of the system, stakeholders, and business impact..."
                        className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          2. Problem Statement
                        </label>
                        <textarea
                          rows={3}
                          value={problemStatement}
                          onChange={(e) => setProblemStatement(e.target.value)}
                          placeholder="What bottleneck, scalability challenge, or legacy problem did this solve?"
                          className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          3. My Engineering Role
                        </label>
                        <textarea
                          rows={3}
                          value={myRole}
                          onChange={(e) => setMyRole(e.target.value)}
                          placeholder="e.g. Lead Backend Engineer: Designed PostgreSQL 3NF schemas, Spring Boot REST APIs..."
                          className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        4. Architecture & Technical Design
                      </label>
                      <textarea
                        rows={3}
                        value={architecture}
                        onChange={(e) => setArchitecture(e.target.value)}
                        placeholder="Explain system topology, caching strategies, distributed transaction handling, or microservices..."
                        className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    {/* Architecture Diagram Upload */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Architecture Diagram (Optional)
                      </label>
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center p-3 rounded-lg bg-slate-950 border border-slate-800">
                        {archDiagramUrl ? (
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <img
                              src={archDiagramUrl}
                              alt="Architecture Diagram"
                              className="w-14 h-14 object-cover rounded-md border border-indigo-500 shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <span className="text-xs text-slate-300 truncate block font-mono">
                                {archDiagramUrl}
                              </span>
                              <button
                                type="button"
                                onClick={handleRemoveArchDiagram}
                                className="text-xs text-red-400 hover:text-red-300 underline mt-1"
                              >
                                Remove Diagram
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-xs text-slate-400 flex-1">
                            <FaDiagramProject className="text-indigo-400 w-4 h-4" />
                            <span>No architecture diagram uploaded</span>
                          </div>
                        )}
                        <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-xs font-semibold text-white cursor-pointer transition shrink-0">
                          <FaCloudArrowUp className="w-3.5 h-3.5" />
                          <span>{uploadingArch ? "Uploading..." : archDiagramUrl ? "Replace Diagram" : "Upload Diagram"}</span>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleArchDiagramUpload}
                            disabled={uploadingArch}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          5. Technical Challenges
                        </label>
                        <textarea
                          rows={3}
                          value={technicalChallenges}
                          onChange={(e) => setTechnicalChallenges(e.target.value)}
                          placeholder="Concurrency bottlenecks, race conditions, memory pressure, latency issues..."
                          className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          6. Solutions Implemented
                        </label>
                        <textarea
                          rows={3}
                          value={solutions}
                          onChange={(e) => setSolutions(e.target.value)}
                          placeholder="How were those challenges conquered? Redis caching, optimistic locking, connection pooling..."
                          className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        7. Key Features (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={keyFeaturesInput}
                        onChange={(e) => setKeyFeaturesInput(e.target.value)}
                        placeholder="Sub-second SKU consistency across physical branches&#10;Stateless JWT-authenticated RBAC&#10;Automated financial reconciliation"
                        className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          8. Results & Outcomes / Metrics
                        </label>
                        <input
                          type="text"
                          value={resultsOutcomes}
                          onChange={(e) => setResultsOutcomes(e.target.value)}
                          placeholder="e.g. 99.99% SKU Consistency | 3.2x Query Speedup | 10k+ Daily Txns"
                          className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          API Documentation URL (Optional)
                        </label>
                        <input
                          type="url"
                          value={apiDocsUrl}
                          onChange={(e) => setApiDocsUrl(e.target.value)}
                          placeholder="https://documenter.getpostman.com/..."
                          className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Screenshot Gallery Upload & Management */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold text-slate-300">
                          Project Screenshots & Gallery
                        </label>
                        <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-xs font-semibold text-white cursor-pointer transition">
                          <FaImages className="w-3.5 h-3.5" />
                          <span>{uploadingScreenshot ? "Uploading..." : "Add Screenshots"}</span>
                          <input
                            type="file"
                            multiple
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleScreenshotUpload}
                            disabled={uploadingScreenshot}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {screenshots.length === 0 ? (
                        <div className="p-4 text-center rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-500">
                          No screenshots added. Click 'Add Screenshots' to upload images to the case study bucket.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {screenshots.map((s, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-950 border border-slate-800"
                            >
                              <img
                                src={s.url}
                                alt={s.caption || `Screenshot ${idx + 1}`}
                                className="w-12 h-12 object-cover rounded-md border border-slate-700 shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <input
                                  type="text"
                                  value={s.caption || ""}
                                  onChange={(e) => {
                                    const updated = [...screenshots];
                                    updated[idx].caption = e.target.value;
                                    setScreenshots(updated);
                                  }}
                                  placeholder="Caption description..."
                                  className="w-full px-2.5 py-1 text-xs rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                />
                                <span className="text-[10px] text-slate-500 block truncate mt-1">
                                  {s.url}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => handleMoveScreenshot(idx, -1)}
                                  className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                                  title="Move Up"
                                >
                                  <FaArrowUp className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === screenshots.length - 1}
                                  onClick={() => handleMoveScreenshot(idx, 1)}
                                  className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                                  title="Move Down"
                                >
                                  <FaArrowDown className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveScreenshot(idx)}
                                  className="p-1 text-slate-400 hover:text-red-400 cursor-pointer"
                                  title="Delete Screenshot"
                                >
                                  <FaTrash className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Form Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={saving || uploadingImage || uploadingArch || uploadingScreenshot}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage || uploadingArch || uploadingScreenshot}
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition cursor-pointer shadow-md shadow-indigo-600/30 disabled:opacity-60 flex items-center gap-2"
                >
                  {saving && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  <span>{modalMode === "create" ? "Create Project" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={Boolean(projectToDelete)}
        title={`Delete Project: ${projectToDelete?.title}?`}
        message="This will permanently delete this project record from Supabase. Any cascade-linked images will also be removed."
        confirmText="Delete Project"
        onConfirm={handleDelete}
        onCancel={() => setProjectToDelete(null)}
        loading={deleting}
      />
    </div>
  );
}
