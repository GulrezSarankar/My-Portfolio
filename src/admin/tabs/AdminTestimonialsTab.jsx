import React, { useState, useEffect } from "react";
import {
  getAllTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialVisibility,
} from "../../services/testimonialsService";
import { uploadTestimonialImage, deleteTestimonialImage } from "../../services/storageService";
import ConfirmModal from "../components/ConfirmModal";
import {
  FaPlus,
  FaMagnifyingGlass,
  FaPenToSquare,
  FaTrash,
  FaXmark,
  FaCloudArrowUp,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaQuoteLeft,
} from "react-icons/fa6";

export default function AdminTestimonialsTab() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create" | "edit"
  const [currentTestimonial, setCurrentTestimonial] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form Fields
  const [clientName, setClientName] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");
  const [feedback, setFeedback] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoPath, setPhotoPath] = useState("");
  const [oldPhotoPath, setOldPhotoPath] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [formError, setFormError] = useState("");

  // Delete State
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllTestimonialsAdmin();
      if (res.error) {
        setError(res.error.message);
      } else {
        setTestimonials(res.data || []);
      }
    } catch (err) {
      setError(err.message || "Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setCurrentTestimonial(null);
    setClientName("");
    setDesignation("");
    setCompany("");
    setFeedback("");
    setPhotoUrl("");
    setPhotoPath("");
    setOldPhotoPath("");
    setIsVisible(true);
    setDisplayOrder((testimonials.length || 0) + 1);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalMode("edit");
    setCurrentTestimonial(item);
    setClientName(item.client_name || "");
    setDesignation(item.designation || "");
    setCompany(item.company || "");
    setFeedback(item.feedback || "");
    setPhotoUrl(item.photo_url || item.avatar_url || "");
    setPhotoPath(item.photo_path || "");
    setOldPhotoPath(item.photo_path || item.photo_url || item.avatar_url || "");
    setIsVisible(item.is_visible !== false);
    setDisplayOrder(item.display_order ?? 0);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setFormError("");
    try {
      const { data, error: upError } = await uploadTestimonialImage(file);
      if (upError) {
        setFormError(`Image upload error: ${upError.message}`);
      } else if (data?.publicUrl) {
        setPhotoUrl(data.publicUrl);
        setPhotoPath(data.path);
      }
    } catch (err) {
      setFormError(`Image upload failed: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setPhotoUrl("");
    setPhotoPath("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!clientName.trim()) {
      setFormError("Client name is required.");
      return;
    }

    if (!feedback.trim()) {
      setFormError("Feedback statement is required.");
      return;
    }

    const payload = {
      client_name: clientName.trim(),
      designation: designation.trim() || null,
      company: company.trim() || null,
      feedback: feedback.trim(),
      photo_url: photoUrl || null,
      photo_path: photoPath || null,
      is_visible: isVisible,
      display_order: Number(displayOrder) || 0,
    };

    setSaving(true);
    try {
      if (modalMode === "create") {
        const { error: createErr } = await createTestimonial(payload);
        if (createErr) throw createErr;
      } else {
        const { error: updateErr } = await updateTestimonial(currentTestimonial.id, payload);
        if (updateErr) throw updateErr;

        // If photo was replaced or removed, clean up old file after successful db update
        if (oldPhotoPath && oldPhotoPath !== photoPath && oldPhotoPath !== photoUrl) {
          try {
            await deleteTestimonialImage(oldPhotoPath);
          } catch (cleanErr) {
            console.warn("Could not clean up old image:", cleanErr.message);
          }
        }
      }

      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      setFormError(err.message || "Failed to save testimonial.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!testimonialToDelete) return;
    setDeleting(true);
    try {
      const photoToDelete =
        testimonialToDelete.photo_path ||
        testimonialToDelete.avatar_url ||
        testimonialToDelete.photo_url;
      const { error: delErr } = await deleteTestimonial(testimonialToDelete.id, photoToDelete);
      if (delErr) throw delErr;
      setTestimonialToDelete(null);
      fetchTestimonials();
    } catch (err) {
      alert(`Deletion failed: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleVisibility = async (item) => {
    try {
      // Optimistic update
      setTestimonials((prev) =>
        prev.map((t) => (t.id === item.id ? { ...t, is_visible: !t.is_visible } : t))
      );
      const { error: toggleErr } = await toggleTestimonialVisibility(item.id, item.is_visible);
      if (toggleErr) {
        // Revert on error
        fetchTestimonials();
        alert(`Failed to toggle visibility: ${toggleErr.message}`);
      }
    } catch (err) {
      fetchTestimonials();
      alert(`Failed to toggle visibility: ${err.message}`);
    }
  };

  const filteredTestimonials = testimonials.filter((t) => {
    const matchesSearch =
      (t.client_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.company || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.designation || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.feedback || "").toLowerCase().includes(search.toLowerCase());

    const matchesVisibility =
      visibilityFilter === "all"
        ? true
        : visibilityFilter === "visible"
        ? t.is_visible
        : !t.is_visible;

    return matchesSearch && matchesVisibility;
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Client Testimonials</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage client recommendations, endorsements, avatars, and public display visibility.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition shadow-md shadow-indigo-600/30 cursor-pointer self-start sm:self-auto"
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span>New Testimonial</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search testimonials by client, company, designation, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
        <select
          value={visibilityFilter}
          onChange={(e) => setVisibilityFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer"
        >
          <option value="all">All Visibility</option>
          <option value="visible">Visible Only</option>
          <option value="hidden">Hidden Only</option>
        </select>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/80 text-red-200 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={fetchTestimonials} className="underline text-xs hover:text-white">
            Retry
          </button>
        </div>
      )}

      {/* Table / List */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <span className="text-sm">Loading testimonials...</span>
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <FaQuoteLeft className="w-8 h-8 mx-auto mb-2 opacity-40 text-indigo-400" />
            <p className="text-sm font-semibold text-slate-400">No testimonials found</p>
            <p className="text-xs text-slate-600 mt-1">
              {search || visibilityFilter !== "all"
                ? "Try adjusting your search query or visibility filter."
                : "Add your first client endorsement by clicking 'New Testimonial'."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Designation & Company</th>
                  <th className="py-3.5 px-4">Feedback</th>
                  <th className="py-3.5 px-4 text-center">Order</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {filteredTestimonials.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition group">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {item.photo_url || item.avatar_url ? (
                          <img
                            src={item.photo_url || item.avatar_url}
                            alt={item.client_name}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                            className="w-10 h-10 rounded-full object-cover border border-slate-700 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
                            {(item.client_name || "C")
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="font-semibold text-white truncate">{item.client_name}</div>
                          <div className="text-xs text-slate-400 md:hidden truncate">
                            {item.designation} {item.company ? `• ${item.company}` : ""}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <div className="text-slate-300 font-medium">{item.designation || "—"}</div>
                      <div className="text-xs text-indigo-400">{item.company || "—"}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="text-xs text-slate-300 line-clamp-2 max-w-md italic">
                        "{item.feedback}"
                      </p>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {item.display_order ?? 0}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleVisibility(item)}
                        title={item.is_visible ? "Click to hide from public site" : "Click to show on public site"}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition ${
                          item.is_visible
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                            : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"
                        }`}
                      >
                        {item.is_visible ? (
                          <>
                            <FaEye className="w-3 h-3" />
                            <span>Visible</span>
                          </>
                        ) : (
                          <>
                            <FaEyeSlash className="w-3 h-3" />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                          title="Edit Testimonial"
                        >
                          <FaPenToSquare className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setTestimonialToDelete(item)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition"
                          title="Delete Testimonial"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1"
              aria-label="Close modal"
            >
              <FaXmark className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">
              {modalMode === "create" ? "Add Client Testimonial" : "Edit Testimonial"}
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Enter verified feedback details from clients, supervisors, or project stakeholders.
            </p>

            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-800/80 text-red-300 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Client Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Farhan Shaikh"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Designation / Role
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Project Manager, Lead Engineer"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. ISEES Technologies LLP"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    min="0"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Photo Upload & Preview */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Client Photo / Avatar
                </label>
                <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  {photoUrl ? (
                    <div className="relative">
                      <img
                        src={photoUrl}
                        alt="Preview"
                        className="w-14 h-14 rounded-full object-cover border border-indigo-500"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500">
                      <FaUser className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 space-y-1.5">
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-semibold transition cursor-pointer">
                      <FaCloudArrowUp className="w-3.5 h-3.5" />
                      <span>{photoUrl ? "Replace Photo" : "Upload Photo"}</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>

                    {photoUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="ml-2 text-xs text-red-400 hover:text-red-300 underline"
                      >
                        Remove Photo
                      </button>
                    )}

                    <div className="text-[11px] text-slate-500">
                      {uploadingImage ? "Uploading to bucket..." : "JPG, PNG, or WebP. Max 5 MB."}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Testimonial / Feedback Statement <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter the client's verified statement or recommendation..."
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isVisibleCheck"
                  checked={isVisible}
                  onChange={(e) => setIsVisible(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor="isVisibleCheck" className="text-xs text-slate-300 font-medium cursor-pointer">
                  Display visibly on public portfolio
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={saving || uploadingImage}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 transition cursor-pointer disabled:opacity-60 flex items-center gap-2 shadow-md shadow-indigo-600/30"
                >
                  {saving && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  <span>{modalMode === "create" ? "Save Testimonial" : "Update Testimonial"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(testimonialToDelete)}
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial from "${testimonialToDelete?.client_name}"? This action is permanent and cannot be undone.`}
        confirmText="Delete Testimonial"
        onConfirm={handleDelete}
        onCancel={() => setTestimonialToDelete(null)}
        loading={deleting}
      />
    </div>
  );
}

