import React, { useState, useEffect } from "react";
import { getContactMessages, updateMessageStatus, deleteMessage } from "../../services/contactService";
import ConfirmModal from "../components/ConfirmModal";
import {
  FaMagnifyingGlass,
  FaEnvelope,
  FaEnvelopeOpen,
  FaTrash,
  FaReply,
  FaXmark,
  FaRotate,
} from "react-icons/fa6";

export default function AdminMessagesTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [activeMessage, setActiveMessage] = useState(null);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getContactMessages();
      if (res.error) {
        setError(res.error.message);
      } else {
        setMessages(res.data || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (msg) => {
    const newStatus = msg.status === "unread" ? "read" : "unread";
    try {
      await updateMessageStatus(msg.id, newStatus);
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, status: newStatus } : m))
      );
      if (activeMessage?.id === msg.id) {
        setActiveMessage((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert(`Status update failed: ${err.message}`);
    }
  };

  const handleStatusChange = async (msgId, newStatus) => {
    try {
      await updateMessageStatus(msgId, newStatus);
      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, status: newStatus } : m))
      );
      if (activeMessage?.id === msgId) {
        setActiveMessage((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert(`Status update failed: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    if (!messageToDelete) return;
    setDeleting(true);
    try {
      const { error: delErr } = await deleteMessage(messageToDelete.id);
      if (delErr) throw delErr;
      if (activeMessage?.id === messageToDelete.id) {
        setActiveMessage(null);
      }
      setMessageToDelete(null);
      fetchMessages();
    } catch (err) {
      alert(`Deletion failed: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  const openMessageModal = (msg) => {
    setActiveMessage(msg);
    if (msg.status === "unread") {
      handleToggleRead(msg);
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()) ||
      m.subject?.toLowerCase().includes(search.toLowerCase()) ||
      m.message?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" ? true : m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Contact Messages Inbox</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review incoming inquiries, client messages, and recruiter outreach.
          </p>
        </div>
        <button
          onClick={fetchMessages}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition border border-slate-700 cursor-pointer self-start sm:self-auto"
        >
          <FaRotate className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Inbox</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by sender, email, subject, or message text..."
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
          <option value="all">All Messages</option>
          <option value="unread">Unread Only</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="archived">Archived</option>
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
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Sender</th>
                <th className="py-3 px-4">Subject & Message Preview</th>
                <th className="py-3 px-4">Date Received</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 text-sm">
                    Loading inbox messages...
                  </td>
                </tr>
              ) : filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 text-sm">
                    No contact messages found.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((msg) => (
                  <tr
                    key={msg.id}
                    className={`hover:bg-slate-800/40 transition cursor-pointer ${
                      msg.status === "unread" ? "bg-slate-800/20 font-semibold" : ""
                    }`}
                    onClick={() => openMessageModal(msg)}
                  >
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleToggleRead(msg)}
                        className={`p-1.5 rounded transition ${
                          msg.status === "unread"
                            ? "text-orange-400 hover:text-orange-300"
                            : "text-slate-500 hover:text-slate-300"
                        }`}
                        title={msg.status === "unread" ? "Mark as Read" : "Mark as Unread"}
                      >
                        {msg.status === "unread" ? (
                          <FaEnvelope className="w-4 h-4" />
                        ) : (
                          <FaEnvelopeOpen className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{msg.name}</div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">{msg.email}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-md">
                      <div className="text-sm text-slate-200 truncate">
                        {msg.subject || "(No subject provided)"}
                      </div>
                      <div className="text-xs text-slate-400 truncate mt-0.5">
                        {msg.message}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono text-slate-400 whitespace-nowrap">
                      {msg.created_at ? new Date(msg.created_at).toLocaleString() : "—"}
                    </td>
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex items-center gap-2">
                        <a
                          href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: ${msg.subject || "Portfolio Contact"}`)}`}
                          onClick={() => handleStatusChange(msg.id, "replied")}
                          className="p-1.5 rounded text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition"
                          title="Reply via Email Client"
                        >
                          <FaReply className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => setMessageToDelete(msg)}
                          className="p-1.5 rounded text-slate-400 hover:text-red-400 hover:bg-slate-800 transition cursor-pointer"
                          title="Delete Message"
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

      {/* Message Detail Modal */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl text-slate-100">
            <button
              onClick={() => setActiveMessage(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1"
            >
              <FaXmark className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  activeMessage.status === "unread"
                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    : activeMessage.status === "replied"
                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                    : "bg-slate-800 text-slate-300 border border-slate-700"
                }`}
              >
                {activeMessage.status}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {activeMessage.created_at ? new Date(activeMessage.created_at).toLocaleString() : ""}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              {activeMessage.subject || "(No subject provided)"}
            </h3>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs sm:text-sm mb-6 space-y-1">
              <div>
                <span className="text-slate-400 font-semibold">From: </span>
                <span className="text-white font-medium">{activeMessage.name}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold">Email: </span>
                <a href={`mailto:${activeMessage.email}`} className="text-indigo-400 hover:underline">
                  {activeMessage.email}
                </a>
              </div>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto mb-6">
              {activeMessage.message}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <select
                  value={activeMessage.status}
                  onChange={(e) => handleStatusChange(activeMessage.id, e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="unread">Mark as Unread</option>
                  <option value="read">Mark as Read</option>
                  <option value="replied">Mark as Replied</option>
                  <option value="archived">Mark as Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${activeMessage.email}?subject=${encodeURIComponent(`Re: ${activeMessage.subject || "Portfolio Contact"}`)}`}
                  onClick={() => handleStatusChange(activeMessage.id, "replied")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                >
                  <FaReply className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
                <button
                  onClick={() => setMessageToDelete(activeMessage)}
                  className="px-3 py-2 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 text-xs font-semibold border border-red-800/60 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(messageToDelete)}
        title="Delete Contact Message?"
        message={`Are you sure you want to delete the message from ${messageToDelete?.name} (${messageToDelete?.email})?`}
        confirmText="Delete Message"
        onConfirm={handleDelete}
        onCancel={() => setMessageToDelete(null)}
        loading={deleting}
      />
    </div>
  );
}
