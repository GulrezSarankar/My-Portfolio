import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaSun, FaMoon, FaDownload } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const navItems = [
  { name: "Home", path: "/", hash: "#hero" },
  { name: "About", path: "/about", hash: "#about" },
  { name: "Services", path: "/freelance", hash: "#services" },
  { name: "Projects", path: "/projects", hash: "#projects" },
  { name: "Process", path: "/#process", hash: "#process" },
  { name: "Contact", path: "/contact", hash: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return "dark"; // Default to dark purple
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleNavClick = (item, e) => {
    if (location.pathname === "/" && item.hash) {
      e.preventDefault();
      const element = document.querySelector(item.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleHireMeClick = () => {
    if (location.pathname === "/") {
      const contactSection = document.querySelector("#contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    navigate("/contact");
  };

  const isActive = (item) => {
    if (item.path === "/") return location.pathname === "/";
    return location.pathname.startsWith(item.path);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-[rgba(255,255,255,0.12)] bg-[rgba(8,6,18,0.85)] backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] py-2.5"
          : "border-b border-[rgba(255,255,255,0.08)] bg-[rgba(8,6,18,0.7)] backdrop-blur-lg py-3.5"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT: GS. Branding */}
        <Link
          to="/"
          aria-label="Gulrez Sarankar Homepage"
          className="group flex items-center gap-3"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#9B5CFF] to-[#7928CA] p-[1px] shadow-[0_0_20px_rgba(155,92,255,0.4)] transition-transform duration-300 group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#080612]/90">
              <span className="font-heading text-base font-extrabold tracking-tight text-white">
                GS<span className="text-[#D66BFF]">.</span>
              </span>
            </div>
            {/* Glowing dot indicator */}
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#9B5CFF] ring-2 ring-[#080612] shadow-[0_0_8px_#9B5CFF]" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-sm sm:text-base font-bold leading-tight text-white transition-colors group-hover:text-[#D66BFF]">
              Gulrez Sarankar
            </span>
            <span className="text-[11px] font-medium tracking-wide text-[#AAA5B8]">
              Software Engineer & Freelance Dev
            </span>
          </div>
        </Link>

        {/* AVAILABILITY STATUS PILL (Desktop center-left) */}
        <div className="hidden xl:flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] px-3 py-1 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[11px] font-medium text-emerald-300">
            Available for new projects
          </span>
        </div>

        {/* CENTER: Navigation Links (Desktop) */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={(e) => handleNavClick(item, e)}
              className={`relative rounded-xl px-3.5 py-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
                isActive(item)
                  ? "bg-[rgba(155,92,255,0.15)] text-white shadow-[0_0_15px_rgba(155,92,255,0.2)]"
                  : "text-[#AAA5B8] hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
              }`}
            >
              {item.name}
              {isActive(item) && (
                <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] rounded-full bg-gradient-to-r from-[#9B5CFF] to-[#D66BFF]" />
              )}
            </Link>
          ))}

          {/* Resume Direct Link */}
          <a
            href="/Gulrez-Sarankar.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-[#AAA5B8] transition-all duration-200 hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
            title="Download Official Resume"
          >
            Resume
            <FaDownload className="text-[10px] text-[#D66BFF]" />
          </a>
        </nav>

        {/* RIGHT: Theme Switcher, Hire Me CTA & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Light/Dark Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] text-xs text-[#AAA5B8] backdrop-blur-md transition-all duration-300 hover:border-[#9B5CFF] hover:bg-[rgba(155,92,255,0.15)] hover:text-white shadow-xs"
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Purple Mode"}
          >
            {theme === "dark" ? (
              <FaSun className="text-sm text-[#FACC15] animate-pulse" />
            ) : (
              <FaMoon className="text-sm text-[#9B5CFF]" />
            )}
          </button>

          {/* Hire Me CTA Button */}
          <button
            type="button"
            onClick={handleHireMeClick}
            aria-label="Hire Gulrez Sarankar"
            className="btn-primary-purple hidden sm:inline-flex text-xs py-2 px-4 shadow-[0_0_20px_rgba(155,92,255,0.35)]"
          >
            <span>Hire Me</span>
            <FaArrowUpRightFromSquare className="text-[10px]" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] p-2 text-white backdrop-blur-md transition-colors hover:bg-[rgba(155,92,255,0.15)] lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FaTimes className="text-base" /> : <FaBars className="text-base" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="border-b border-[rgba(255,255,255,0.12)] bg-[#080612]/95 backdrop-blur-2xl px-4 py-4 lg:hidden"
          >
            <div className="flex flex-col gap-1.5">
              {/* Availability pill inside drawer */}
              <div className="mb-2 flex items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-3 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-emerald-300">
                  Available for new projects
                </span>
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={(e) => {
                    handleNavClick(item, e);
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                    isActive(item)
                      ? "bg-[rgba(155,92,255,0.2)] text-white border border-[rgba(155,92,255,0.3)]"
                      : "text-[#AAA5B8] hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <a
                href="/Gulrez-Sarankar.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-[#AAA5B8] transition-all hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
              >
                <span>Download Resume</span>
                <FaDownload className="text-xs text-[#D66BFF]" />
              </a>

              <div className="mt-3 flex items-center gap-2 border-t border-[rgba(255,255,255,0.10)] pt-3">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="btn-secondary-glass flex-1 py-2.5 text-xs font-bold"
                >
                  {theme === "dark" ? <FaSun className="text-[#FACC15]" /> : <FaMoon className="text-[#9B5CFF]" />}
                  {theme === "dark" ? "Light Mode" : "Dark Purple"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleHireMeClick();
                  }}
                  className="btn-primary-purple flex-1 py-2.5 text-xs font-bold"
                >
                  Hire Me
                  <FaArrowUpRightFromSquare className="text-xs" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
