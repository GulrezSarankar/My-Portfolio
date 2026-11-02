import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./hooks/layout/mainlayout";
import Home from "./pages/Home";
import About from "./pages/AboutPage";
import Skills from "./pages/skills";
import Projects from "./pages/projects";
import Certificates from "./pages/certificate";
import Contact from "./pages/contact";
import Education from "./pages/Education";
import ProfessionalExperience from "./pages/ProfessionalExperience";
import Freelance from "./pages/Freelance";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import IntroLoader from "./assets/components/IntroLoader";
import DocViewer from "./pages/DocViewer";
import { trackPageVisit } from "./services/analyticsService";
import { AdminAuthProvider } from "./admin/context/AdminAuthContext";
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";

function AnalyticsTracker() {
  const location = useLocation();
  useEffect(() => {
    // Only track public portfolio views, skip admin routes
    if (!location.pathname.startsWith("/admin")) {
      trackPageVisit(location.pathname, typeof document !== "undefined" ? document.referrer : "");
    }
  }, [location.pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [loading, setLoading] = useState(!isAdminRoute);

  useEffect(() => {
    if (isAdminRoute) {
      setLoading(false);
      return;
    }
    const timer = setTimeout(() => setLoading(false), 1450);
    return () => clearTimeout(timer);
  }, [isAdminRoute]);

  return (
    <AdminAuthProvider>
      <AnalyticsTracker />
      <AnimatePresence>{loading && <IntroLoader />}</AnimatePresence>
      {isAdminRoute ? (
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      ) : (
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/experience" element={<ProfessionalExperience />} />
            <Route path="/freelance" element={<Freelance />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/education" element={<Education />} />
            <Route path="/impp-4-sem" element={<DocViewer />} />
          </Routes>
        </MainLayout>
      )}
    </AdminAuthProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
