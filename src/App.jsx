import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./hooks/layout/mainlayout";
import IntroLoader from "./assets/components/IntroLoader";
import { trackPageVisit } from "./services/analyticsService";
import { AdminAuthProvider } from "./admin/context/AdminAuthContext";
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";

// Eager load primary landing page for optimal First Contentful Paint
import Home from "./pages/Home";

// Route-level code splitting for non-home public pages
const About = lazy(() => import("./pages/AboutPage"));
const Skills = lazy(() => import("./pages/skills"));
const Projects = lazy(() => import("./pages/projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Certificates = lazy(() => import("./pages/certificate"));
const Contact = lazy(() => import("./pages/contact"));
const Education = lazy(() => import("./pages/Education"));
const ProfessionalExperience = lazy(() => import("./pages/ProfessionalExperience"));
const Freelance = lazy(() => import("./pages/Freelance"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const DocViewer = lazy(() => import("./pages/DocViewer"));

// Route-level code splitting for admin suite (completely isolated from public bundle)
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"));
const AdminForgotPassword = lazy(() => import("./admin/pages/AdminForgotPassword"));
const AdminResetPassword = lazy(() => import("./admin/pages/AdminResetPassword"));
const AdminDashboard = lazy(() => import("./admin/pages/AdminDashboard"));

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

function PageFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-[#0D0D0D] text-[#A1A1A1]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-5 w-5 rounded-full border-2 border-[#262626] border-t-[#A3E635] animate-spin" />
        <span className="font-mono text-xs text-[#A1A1A1]">Loading view...</span>
      </div>
    </div>
  );
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
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
            <Route path="/admin/reset-password" element={<AdminResetPassword />} />
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
        </Suspense>
      ) : (
        <MainLayout>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/experience" element={<ProfessionalExperience />} />
              <Route path="/freelance" element={<Freelance />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/education" element={<Education />} />
              <Route path="/impp-4-sem" element={<DocViewer />} />
            </Routes>
          </Suspense>
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
