import React, { useState, useEffect } from "react";
import { getAllEducationAdmin, createEducation, updateEducation, deleteEducation } from "../../services/educationService";
import ConfirmModal from "../components/ConfirmModal";
import { FaPlus, FaPenToSquare, FaTrash, FaXmark } from "react-icons/fa6";

export default function AdminEducationTab() {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [currentEdu, setCurrentEdu] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [institution, setInstitution] = useState("");
  const [qualification, setQualification] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("Computer Science");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grade, setGrade] = useState("");
  const [description, setDescription] = useState("");
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [formError, setFormError] = useState("");

  const [eduToDelete, setEduToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchEducation = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllEducationAdmin();
      if (res.error) {
        setError(res.error.message);
      } else {
        setEducationList(res.data || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setCurrentEdu(null);
    setInstitution("");
    setQualification("");
    setFieldOfStudy("Computer Science");
    setStartDate("");
    setEndDate("");
    setGrade("");
    setDescription("");
    setDisplayOrder((educationList.length || 0) + 1);
    setIsVisible(true);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (edu) => {
    setModalMode("edit");
    setCurrentEdu(edu);
    setInstitution(edu.institution || "");
    setQualification(edu.qualification || "");
    setFieldOfStudy(edu.field_of_study || "");
    setStartDate(edu.start_date || "");
    setEndDate(edu.end_date || "");
    setGrade(edu.grade || "");
    setDescription(edu.description || "");
    setDisplayOrder(edu.display_order ?? 0);
    setIsVisible(edu.is_visible !== false);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!institution.trim() || !qualification.trim()) {
      setFormError("Institution and qualification title are required.");
      return;
    }

    const payload = {
      institution: institution.trim(),
      qualification: qualification.trim(),
      field_of_study: fieldOfStudy.trim() || null,
      start_date: startDate || null,
      end_date: endDate || null,
      grade: grade.trim() || null,
      description: description.trim() || null,
      display_order: Number(displayOrder),
      is_visible: isVisible,
    };

    setSaving(true);
    try {
      if (modalMode === "create") {
        const { error: createErr } = await createEducation(payload);
        if (createErr) throw createErr;
      } else {
        const { error: updateErr } = await updateEducation(currentEdu.id, payload);
        if (updateErr) throw updateErr;
      }

      setIsModalOpen(false);
      fetchEducation();
    } catch (err) {
      setFormError(err.message || "Failed to save education record.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!eduToDelete) return;
    setDeleting(true);
    try {
      const { error: delErr } = await deleteEducation(eduToDelete.id);
      if (delErr) throw delErr;
      setEduToDelete(null);
      fetchEducation();
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
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Academic Education</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage university degrees, courses, grades, and academic credentials.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition shadow-md shadow-indigo-600/30 cursor-pointer self-start sm:self-auto"
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span>New Degree</span>
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
                <th className="py-3 px-4">Degree & Field</th>
                <th className="py-3 px-4">Institution</th>
                <th className="py-3 px-4">Grade / CGPA</th>
                <th className="py-3 px-4">Visibility</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                    Loading education records...
                  </td>
                </tr>
              ) : educationList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                    No education records found.
                  </td>
                </tr>
              ) : (
                educationList.map((edu) => (
                  <tr key={edu.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-400">{edu.display_order}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{edu.qualification}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{edu.field_of_study}</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-300">
                      {edu.institution}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-indigo-400">
                      {edu.grade || "—"}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                          edu.is_visible
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-slate-700/30 text-slate-400 border border-slate-700/50"
                        }`}
                      >
                        {edu.is_visible ? "Visible" : "Hidden"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(edu)}
                          className="p-1.5 rounded text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition cursor-pointer"
                        >
                          <FaPenToSquare className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEduToDelete(edu)}
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
              {modalMode === "create" ? "Add Degree" : `Edit: ${currentEdu?.qualification}`}
            </h3>

            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-xs text-red-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Qualification / Degree Title *
                </label>
                <input
                  type="text"
                  required
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="e.g. Master of Science in Computer Science (M.Sc CS)"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Institution *
                </label>
                <input
                  type="text"
                  required
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g. Savitribai Phule Pune University"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    value={fieldOfStudy}
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Grade / CGPA
                  </label>
                  <input
                    type="text"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder="e.g. 8.14 CGPA or Current"
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
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Academic Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Advanced algorithms, distributed systems..."
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Display Order
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
                  <span>{modalMode === "create" ? "Add Degree" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(eduToDelete)}
        title={`Delete: ${eduToDelete?.qualification}?`}
        message="Are you sure you want to delete this educational degree from your portfolio?"
        confirmText="Delete Record"
        onConfirm={handleDelete}
        onCancel={() => setEduToDelete(null)}
        loading={deleting}
      />
    </div>
  );
}
