import React, { useState, useEffect } from "react";
import { getDashboardStats } from "../../services/adminService";
import {
  FaFolderOpen,
  FaCheckDouble,
  FaWrench,
  FaBriefcase,
  FaGraduationCap,
  FaAward,
  FaNewspaper,
  FaEnvelope,
  FaEnvelopeOpenText,
  FaChartLine,
  FaRotate,
} from "react-icons/fa6";

export default function AdminOverviewTab({ setActiveTab }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getDashboardStats();
      if (res.error) {
        setError(res.error.message || "Failed to load dashboard metrics");
      } else {
        setStats(res.data);
      }
    } catch (err) {
      setError(err.message || "Network exception fetching dashboard metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Projects",
      value: stats?.projects?.total ?? "—",
      subtext: `${stats?.projects?.published ?? 0} Published`,
      icon: <FaFolderOpen className="w-5 h-5 text-blue-400" />,
      color: "border-blue-500/20 bg-blue-500/10",
      tab: "projects",
    },
    {
      title: "Published Projects",
      value: stats?.projects?.published ?? "—",
      subtext: "Live on portfolio",
      icon: <FaCheckDouble className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/20 bg-emerald-500/10",
      tab: "projects",
    },
    {
      title: "Total Skills",
      value: stats?.skills?.total ?? "—",
      subtext: "Technologies listed",
      icon: <FaWrench className="w-5 h-5 text-amber-400" />,
      color: "border-amber-500/20 bg-amber-500/10",
      tab: "skills",
    },
    {
      title: "Work Experience",
      value: stats?.experience?.total ?? "—",
      subtext: "Career positions",
      icon: <FaBriefcase className="w-5 h-5 text-purple-400" />,
      color: "border-purple-500/20 bg-purple-500/10",
      tab: "experience",
    },
    {
      title: "Education Degrees",
      value: stats?.education?.total ?? "—",
      subtext: "Academic records",
      icon: <FaGraduationCap className="w-5 h-5 text-cyan-400" />,
      color: "border-cyan-500/20 bg-cyan-500/10",
      tab: "education",
    },
    {
      title: "Certifications",
      value: stats?.certifications?.total ?? "—",
      subtext: "Verified credentials",
      icon: <FaAward className="w-5 h-5 text-yellow-400" />,
      color: "border-yellow-500/20 bg-yellow-500/10",
      tab: "certifications",
    },
    {
      title: "Blog Posts",
      value: stats?.blogPosts?.total ?? "—",
      subtext: `${stats?.blogPosts?.published ?? 0} Published`,
      icon: <FaNewspaper className="w-5 h-5 text-rose-400" />,
      color: "border-rose-500/20 bg-rose-500/10",
      tab: "blogs",
    },
    {
      title: "Contact Messages",
      value: stats?.messages?.total ?? "—",
      subtext: "Submissions received",
      icon: <FaEnvelope className="w-5 h-5 text-indigo-400" />,
      color: "border-indigo-500/20 bg-indigo-500/10",
      tab: "messages",
    },
    {
      title: "Unread Messages",
      value: stats?.messages?.unread ?? "—",
      subtext: "Pending admin review",
      icon: <FaEnvelopeOpenText className="w-5 h-5 text-orange-400" />,
      color: "border-orange-500/20 bg-orange-500/10",
      tab: "messages",
    },
    {
      title: "Total Visits",
      value: stats?.analytics?.totalVisits ?? "—",
      subtext: "Anonymized visits tracked",
      icon: <FaChartLine className="w-5 h-5 text-teal-400" />,
      color: "border-teal-500/20 bg-teal-500/10",
      tab: "overview",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">System Overview</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time PostgreSQL aggregates and operational metrics.
          </p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition border border-slate-700/80 cursor-pointer self-start sm:self-auto"
        >
          <FaRotate className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {error && (
        <div className="rounded-xl bg-red-950/60 border border-red-800/80 p-4 text-xs sm:text-sm text-red-200 flex items-center justify-between">
          <span>Failed to load database counts: {error}</span>
          <button onClick={fetchStats} className="underline font-bold ml-4">
            Retry
          </button>
        </div>
      )}

      {loading && !stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-xl bg-slate-900/60 border border-slate-800 animate-pulse p-4"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {statCards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => setActiveTab(card.tab)}
              className="group p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-lg hover:shadow-indigo-500/5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`p-2 rounded-lg border ${card.color}`}>
                  {card.icon}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {card.value}
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1 group-hover:text-indigo-400 transition">
                  <span>{card.subtext}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition">&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Access Action Shortcuts */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">
          Quick Management Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab("projects")}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm font-semibold text-white border border-slate-700 transition cursor-pointer"
          >
            Manage Projects
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm font-semibold text-white border border-slate-700 transition cursor-pointer"
          >
            Write Blog Post
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs sm:text-sm font-semibold text-white transition cursor-pointer shadow-xs shadow-indigo-600/30"
          >
            Check Messages ({stats?.messages?.unread ?? 0} unread)
          </button>
          <button
            onClick={() => setActiveTab("skills")}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm font-semibold text-white border border-slate-700 transition cursor-pointer"
          >
            Update Skills
          </button>
          <button
            onClick={() => setActiveTab("experience")}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm font-semibold text-white border border-slate-700 transition cursor-pointer"
          >
            Edit Experience
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm font-semibold text-white border border-slate-700 transition cursor-pointer"
          >
            Edit Education
          </button>
          <button
            onClick={() => setActiveTab("certifications")}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm font-semibold text-white border border-slate-700 transition cursor-pointer"
          >
            Manage Certifications
          </button>
        </div>
      </div>
    </div>
  );
}
