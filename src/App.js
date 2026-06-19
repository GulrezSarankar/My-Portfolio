import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
// import MainLayout from "./layout/MainLayout";
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
import IntroLoader from "./assets/components/IntroLoader";
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence>{loading && <IntroLoader />}</AnimatePresence>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/experience" element={<ProfessionalExperience />} />
          <Route path="/freelance" element={<Freelance />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="education" element={<Education/>}/>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
