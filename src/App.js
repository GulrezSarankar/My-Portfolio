import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MainLayout from "./layout/MainLayout";
import MainLayout from "./hooks/layout/mainlayout";
import Home from "./pages/Home";
import About from "./pages/AboutPage";
import Skills from "./pages/skills";
import Projects from "./pages/projects";
import Certificates from "./pages/certificate";
import Contact from "./pages/contact";
import Education from "./pages/Education";
export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="education" element={<Education/>}/>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
