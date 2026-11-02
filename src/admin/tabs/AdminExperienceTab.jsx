import React, { useState, useEffect } from "react";
import { getAllExperienceAdmin, createExperience, updateExperience, deleteExperience } from "../../services/experienceService";
import ConfirmModal from "../components/ConfirmModal";
import { FaPlus, FaPenToSquare, FaTrash, FaXmark } from "react-icons/fa6";

export default function AdminExperienceTab() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [currentExp, setCurrentExp] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [location, setLocation] = useState("Onsite / Remote");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);
  const [description, setDescription] = useState("");
  const [highlightsText, setHighlightsText] = useState("");
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [formError, setFormError] = useState("");

  const [expToDelete, setExpToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchExperiences = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllExperienceAdmin();
      if (res.error) {
        setError(res.error.message);
      } else {
        setExperiences(res.data || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setCurrentExp(null);
    setCompany("");
    setRole("");
    setEmploymentType("Full-time");
    setLocation("Onsite / Remote");
    setStartDate("");
    setEndDate("");
    setIsCurrent(false);
    setDescription("");
    setHighlightsText("");
    setDisplayOrder((experiences.length || 0) + 1);
    setIsVisible(true);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (exp) => {
    setModalMode("edit");
    setCurrentExp(exp);
    setCompany(exp.company || "");
    setRole(exp.role || "");
    setEmploymentType(exp.employment_type || "Full-time");
    setLocation(exp.location || "Onsite / Remote");
    setStartDate(exp.start_date || "");
    setEndDate(exp.end_date || "");
    setIsCurrent(Boolean(exp.is_current));
    setDescription(exp.description || "");
    setHighlightsText((exp.highlights || []).join("\n"));
    setDisplayOrder(exp.display_order ?? 0);
    setIsVisible(exp.is_visible !== false);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!company.trim() || !role.trim()) {
      setFormError("Company and role are required.");
      return;
    }

    const highlightsArray = highlightsText
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean);

    const payload = {
      company: company.trim(),
      role: role.trim(),
      employment_type: employmentType.trim() || null,
      location: location.trim() || null,
      start_date: startDate || null,
      end_date: isCurrent ? null : endDate || null,
      is_current: isCurrent,
      description: description.trim() || null,
      highlights: highlightsArray,
      display_order: Number(displayOrder),
      is_visible: isVisible,
    };

    setSaving(true);
    try {
      if (modalMode === "create") {
        const { error: createErr } = await createExperience(payload);
        if (createErr) throw createErr;
      } else {
        const { error: updateErr } = await updateExperience(currentExp.id, payload);
        if (updateErr) throw updateErr;
      }

      setIsModalOpen(false);
      fetchExperiences();
    } catch (err) {
      setFormError(err.message || "Failed to save experience record.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!expToDelete) return;
    setDeleting(true);
    try {
      const { error: delErr } = await deleteExperience(expToDelete.id);
      if (delErr) throw delErr;
      setExpToDelete(null);
      fetchExperiences();
    } catch (err) {
      alert(`Deletion failed: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Work Experience</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage employment history, software engineering positions, and achievements.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition shadow-md shadow-indigo-600/30 cursor-pointer self-start sm:self-auto"
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span>New Experience</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-xs sm:text-sm text-red-200">
          Database error: {error}
        </div>
      )}

      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/70 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Company & Role</th>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Highlights</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                    Loading experience records...
                  </td>
                </tr>
              ) : experiences.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                    No experience records found.
                  </td>
                </tr>
              ) : (
                experiences.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-400">{exp.display_order}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{exp.role}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{exp.company} &bull; {exp.location}</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono text-slate-300">
                      {exp.start_date || "?"} &rarr; {exp.is_current ? "Present" : exp.end_date || "?"}
                    </td>
                    <td className="py-3.5 px-4">
                      {exp.is_current ? (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                          Current
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-slate-800 text-slate-400 border border-slate-700/60">
                          Past
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">
                      {(exp.highlights || []).length} items
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(exp)}
                          className="p-1.5 rounded text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition cursor-pointer"
                        >
                          <FaPenToSquare className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setExpToDelete(exp)}
                          className="p-1.5 rounded text-slate-400 hover:text-red-400 hover:bg-slate-800 transition cursor-pointer"
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1"
            >
              <FaXmark className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-2">
              {modalMode === "create" ? "Add Experience" : `Edit Experience: ${currentExp?.role}`}
            </h3>

            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-xs text-red-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. ISEES Technologies LLP"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Software Engineer"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Employment Type
                  </label>
                  <input
                    type="text"
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    placeholder="e.g. Full-time"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Onsite / Remote"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    End Date
                  </label>
                  <input
                    type="date"
                    disabled={isCurrent}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-40"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isCurrentExp"
                  checked={isCurrent}
                  onChange={(e) => setIsCurrent(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-700 focus:ring-indigo-500"
                />
                <label htmlFor="isCurrentExp" className="text-xs font-semibold text-slate-300 cursor-pointer">
                  Currently working here (Present)
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  General Summary
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Overview of duties and team context..."
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Key Achievements / Highlights (One per line)
                </label>
                <textarea
                  rows={4}
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  placeholder="Promoted to Software Engineer&#10;Maintained high-throughput REST APIs&#10;Architected PostgreSQL schemas"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Order
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex items-center pt-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isVisible}
                      onChange={(e) => setIsVisible(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-700 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-semibold text-slate-300">Visible on Site</span>
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
                  disabled={saving}
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition cursor-pointer shadow-md shadow-indigo-600/30 disabled:opacity-60 flex items-center gap-2"
                >
                  {saving && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  <span>{modalMode === "create" ? "Add Position" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(expToDelete)}
        title={`Delete: ${expToDelete?.role} at ${expToDelete?.company}?`}
        message="Are you sure you want to delete this career experience entry?"
        confirmText="Delete Record"
        onConfirm={handleDelete}
        onCancel={() => setExpToDelete(null)}
        loading={deleting}
      />
    </div>
  );
}
