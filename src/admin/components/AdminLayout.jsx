import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import {
  FaChartPie,
  FaFolderOpen,
  FaWrench,
  FaBriefcase,
  FaGraduationCap,
  FaAward,
  FaNewspaper,
  FaEnvelope,
  FaArrowRightFromBracket,
  FaArrowUpRightFromSquare,
  FaBars,
  FaXmark,
  FaShieldHalved,
} from "react-icons/fa6";

export default function AdminLayout({ activeTab, setActiveTab, children }) {
  const { admin, logout } = useAdminAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { id: "overview", label: "Dashboard", icon: <FaChartPie className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <FaFolderOpen className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <FaWrench className="w-4 h-4" /> },
    { id: "experience", label: "Experience", icon: <FaBriefcase className="w-4 h-4" /> },
    { id: "education", label: "Education", icon: <FaGraduationCap className="w-4 h-4" /> },
    { id: "certifications", label: "Certifications", icon: <FaAward className="w-4 h-4" /> },
    { id: "blogs", label: "Blog Posts", icon: <FaNewspaper className="w-4 h-4" /> },
    { id: "messages", label: "Messages", icon: <FaEnvelope className="w-4 h-4" /> },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-indigo-500 selection:text-white">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <FaShieldHalved className="w-4 h-4" />
          </div>
          <span className="font-bold text-white text-sm">Gulrez Admin</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileSidebarOpen ? <FaXmark className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo Header */}
          <div className="hidden md:flex items-center gap-3 px-6 py-5 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <FaShieldHalved className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-white text-base tracking-tight leading-none">
                Admin Panel
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">Gulrez Portfolio</div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-4 space-y-1">
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Content & Records
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer text-left ${
                  activeTab === item.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Footer & User Info */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                {admin?.role || "ADMIN"}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="text-xs font-mono text-slate-300 truncate mt-1">
              {admin?.email}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition border border-slate-700/80"
            >
              <FaArrowUpRightFromSquare className="w-3 h-3 text-slate-400" />
              <span>Public Site</span>
            </Link>

            <button
              onClick={logout}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-semibold transition border border-red-800/50 cursor-pointer"
              title="Sign Out"
            >
              <FaArrowRightFromBracket className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-slate-900/60 border-b border-slate-800 backdrop-blur-xs sticky top-0 z-30">
          <div className="text-sm text-slate-400">
            <span className="text-slate-500">Admin</span> &nbsp;/&nbsp;{" "}
            <span className="text-white capitalize font-semibold">{activeTab}</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-indigo-400 transition inline-flex items-center gap-1 font-medium"
            >
              <span>View Live Portfolio</span>
              <FaArrowUpRightFromSquare className="w-3 h-3" />
            </Link>

            <button
              onClick={logout}
              className="text-xs px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold border border-slate-700 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
