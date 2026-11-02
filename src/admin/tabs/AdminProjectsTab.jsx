import React, { useState, useEffect } from "react";
import { getAllProjectsAdmin, createProject, updateProject, deleteProject } from "../../services/projectsService";
import { uploadProjectImage } from "../../services/storageService";
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

  // Form Fields
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
    setFormError("");
    setIsModalOpen(true);
  };

  const handleTitleChange = (val) => {
    setTitle(val);
    if (modalMode === "create" && !slug) {
      // Auto-generate clean slug
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

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!title.trim() || !slug.trim()) {
      setFormError("Title and slug are required.");
      return;
    }

    const techArray = techStackInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

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
            Manage case studies, live demo links, repository URLs, and showcase status.
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

      {error && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-xs sm:text-sm text-red-200">
          Database error: {error}
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/70 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Tech Stack</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                    Loading project records...
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                    No projects found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
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
              Update database fields and media in PostgreSQL.
            </p>

            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-xs text-red-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
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

              {/* Image Upload / URL */}
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

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={saving}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
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
