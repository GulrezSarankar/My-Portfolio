import React, { useState, useEffect } from "react";
import { getAllSkillsAdmin, createSkill, updateSkill, deleteSkill } from "../../services/skillsService";
import ConfirmModal from "../components/ConfirmModal";
import { FaPlus, FaMagnifyingGlass, FaPenToSquare, FaTrash, FaXmark } from "react-icons/fa6";

export default function AdminSkillsTab() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [currentSkill, setCurrentSkill] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Backend Development");
  const [proficiency, setProficiency] = useState(80);
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [formError, setFormError] = useState("");

  const [skillToDelete, setSkillToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchSkills = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllSkillsAdmin();
      if (res.error) {
        setError(res.error.message);
      } else {
        setSkills(res.data || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setCurrentSkill(null);
    setName("");
    setCategory("Backend Development");
    setProficiency(80);
    setDisplayOrder((skills.length || 0) + 1);
    setIsVisible(true);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (skill) => {
    setModalMode("edit");
    setCurrentSkill(skill);
    setName(skill.name || "");
    setCategory(skill.category || "Backend Development");
    setProficiency(skill.proficiency ?? 80);
    setDisplayOrder(skill.display_order ?? 0);
    setIsVisible(skill.is_visible !== false);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("Skill name is required.");
      return;
    }

    const payload = {
      name: name.trim(),
      category: category.trim(),
      proficiency: Number(proficiency),
      display_order: Number(displayOrder),
      is_visible: isVisible,
    };

    setSaving(true);
    try {
      if (modalMode === "create") {
        const { error: createErr } = await createSkill(payload);
        if (createErr) throw createErr;
      } else {
        const { error: updateErr } = await updateSkill(currentSkill.id, payload);
        if (updateErr) throw updateErr;
      }

      setIsModalOpen(false);
      fetchSkills();
    } catch (err) {
      setFormError(err.message || "Failed to save skill.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!skillToDelete) return;
    setDeleting(true);
    try {
      const { error: delErr } = await deleteSkill(skillToDelete.id);
      if (delErr) throw delErr;
      setSkillToDelete(null);
      fetchSkills();
    } catch (err) {
      alert(`Deletion failed: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  const categories = Array.from(new Set(skills.map((s) => s.category).filter(Boolean)));

  const filteredSkills = skills.filter((s) => {
    const matchesSearch = s.name?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" ? true : s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Technical Skills</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage technical proficiencies, skill categories, and public visibility.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition shadow-md shadow-indigo-600/30 cursor-pointer self-start sm:self-auto"
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span>New Skill</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search skills by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
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
                <th className="py-3 px-4">Skill Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Proficiency</th>
                <th className="py-3 px-4">Visibility</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                    Loading skills...
                  </td>
                </tr>
              ) : filteredSkills.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                    No skills found.
                  </td>
                </tr>
              ) : (
                filteredSkills.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-mono text-xs text-slate-400">{s.display_order}</td>
                    <td className="py-3 px-4 font-bold text-white">{s.name}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 text-xs rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                        {s.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 max-w-xs">
                        <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-indigo-500 h-1.5 rounded-full"
                            style={{ width: `${s.proficiency || 0}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400 font-mono">{s.proficiency}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                          s.is_visible
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-slate-700/30 text-slate-400 border border-slate-700/50"
                        }`}
                      >
                        {s.is_visible ? "Visible" : "Hidden"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(s)}
                          className="p-1.5 rounded text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition cursor-pointer"
                        >
                          <FaPenToSquare className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setSkillToDelete(s)}
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
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1"
            >
              <FaXmark className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-2">
              {modalMode === "create" ? "Add New Skill" : `Edit Skill: ${currentSkill?.name}`}
            </h3>

            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-xs text-red-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Spring Boot"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Backend Development"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Proficiency ({proficiency}%)
                  </label>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={proficiency}
                  onChange={(e) => setProficiency(e.target.value)}
                  className="w-full accent-indigo-500 cursor-pointer"
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
                    <span className="text-xs font-semibold text-slate-300">Visible</span>
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
                  <span>{modalMode === "create" ? "Create Skill" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(skillToDelete)}
        title={`Delete Skill: ${skillToDelete?.name}?`}
        message="Are you sure you want to delete this technical skill from your portfolio?"
        confirmText="Delete Skill"
        onConfirm={handleDelete}
        onCancel={() => setSkillToDelete(null)}
        loading={deleting}
      />
    </div>
  );
}
