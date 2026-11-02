import React, { useState, useEffect } from "react";
import { getAllCertificationsAdmin, createCertification, updateCertification, deleteCertification } from "../../services/certificationsService";
import { uploadProjectImage } from "../../services/storageService";
import ConfirmModal from "../components/ConfirmModal";
import { FaPlus, FaPenToSquare, FaTrash, FaCloudArrowUp, FaArrowUpRightFromSquare, FaXmark } from "react-icons/fa6";

export default function AdminCertificationsTab() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [currentCert, setCurrentCert] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("Tools");
  const [credentialUrl, setCredentialUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [formError, setFormError] = useState("");

  const [certToDelete, setCertToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCertifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllCertificationsAdmin();
      if (res.error) {
        setError(res.error.message);
      } else {
        setCertifications(res.data || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setCurrentCert(null);
    setName("");
    setIssuer("Tools");
    setCredentialUrl("");
    setImageUrl("");
    setDisplayOrder((certifications.length || 0) + 1);
    setIsVisible(true);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (cert) => {
    setModalMode("edit");
    setCurrentCert(cert);
    setName(cert.name || "");
    setIssuer(cert.issuer || "Tools");
    setCredentialUrl(cert.credential_url || "");
    setImageUrl(cert.image_url || "");
    setDisplayOrder(cert.display_order ?? 0);
    setIsVisible(cert.is_visible !== false);
    setFormError("");
    setIsModalOpen(true);
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

    if (!name.trim()) {
      setFormError("Certification name is required.");
      return;
    }

    const payload = {
      name: name.trim(),
      issuer: issuer.trim() || null,
      credential_url: credentialUrl.trim() || null,
      image_url: imageUrl.trim() || null,
      display_order: Number(displayOrder),
      is_visible: isVisible,
    };

    setSaving(true);
    try {
      if (modalMode === "create") {
        const { error: createErr } = await createCertification(payload);
        if (createErr) throw createErr;
      } else {
        const { error: updateErr } = await updateCertification(currentCert.id, payload);
        if (updateErr) throw updateErr;
      }

      setIsModalOpen(false);
      fetchCertifications();
    } catch (err) {
      setFormError(err.message || "Failed to save certification.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!certToDelete) return;
    setDeleting(true);
    try {
      const { error: delErr } = await deleteCertification(certToDelete.id);
      if (delErr) throw delErr;
      setCertToDelete(null);
      fetchCertifications();
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
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Certifications & Credentials</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage professional certificates, credential badges, and media previews.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition shadow-md shadow-indigo-600/30 cursor-pointer self-start sm:self-auto"
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span>New Certificate</span>
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
                <th className="py-3 px-4">Certificate Name</th>
                <th className="py-3 px-4">Category / Issuer</th>
                <th className="py-3 px-4">Image Preview</th>
                <th className="py-3 px-4">Visibility</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                    Loading certifications...
                  </td>
                </tr>
              ) : certifications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                    No certifications found.
                  </td>
                </tr>
              ) : (
                certifications.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-mono text-xs text-slate-400">{c.display_order}</td>
                    <td className="py-3 px-4 font-bold text-white">{c.name}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 text-xs rounded bg-slate-800 text-slate-300 border border-slate-700/60 font-semibold">
                        {c.issuer || "General"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {c.image_url ? (
                        <img
                          src={c.image_url}
                          alt={c.name}
                          className="w-10 h-7 object-cover rounded border border-slate-700"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-xs text-slate-600">No Image</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                          c.is_visible
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-slate-700/30 text-slate-400 border border-slate-700/50"
                        }`}
                      >
                        {c.is_visible ? "Visible" : "Hidden"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        {c.credential_url && (
                          <a
                            href={c.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
                            title="Verify Credential"
                          >
                            <FaArrowUpRightFromSquare className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => openEditModal(c)}
                          className="p-1.5 rounded text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition cursor-pointer"
                        >
                          <FaPenToSquare className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setCertToDelete(c)}
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
              {modalMode === "create" ? "Add Certificate" : `Edit: ${currentCert?.name}`}
            </h3>

            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-xs text-red-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Certificate Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Docker Essentials"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Category / Issuer Tag
                </label>
                <input
                  type="text"
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  placeholder="e.g. Tools, Database, Programming"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Credential Verification URL
                </label>
                <input
                  type="url"
                  value={credentialUrl}
                  onChange={(e) => setCredentialUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Image Path / Upload
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="/assets/Docker.png or Supabase URL"
                    className="flex-1 px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 cursor-pointer transition shrink-0">
                    <FaCloudArrowUp className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{uploadingImage ? "..." : "Upload"}</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
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
                  disabled={saving || uploadingImage}
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition cursor-pointer shadow-md shadow-indigo-600/30 disabled:opacity-60 flex items-center gap-2"
                >
                  {saving && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  <span>{modalMode === "create" ? "Add Certificate" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(certToDelete)}
        title={`Delete: ${certToDelete?.name}?`}
        message="Are you sure you want to delete this certification credential from your portfolio?"
        confirmText="Delete Credential"
        onConfirm={handleDelete}
        onCancel={() => setCertToDelete(null)}
        loading={deleting}
      />
    </div>
  );
}
