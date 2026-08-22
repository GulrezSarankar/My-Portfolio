import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about", hash: "#about" },
  { name: "Skills", path: "/skills", hash: "#skills" },
  { name: "Experience", path: "/experience", hash: "#experience" },
  { name: "Projects", path: "/projects", hash: "#projects" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact", hash: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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

  const handleConnectClick = () => {
    if (location.pathname === "/") {
      const contactSection = document.querySelector("#contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    navigate("/contact");
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--border-color)] bg-[var(--nav-scrolled)] backdrop-blur-md shadow-md py-3"
          : "border-b border-[var(--border-color)] bg-[var(--nav-bg)] backdrop-blur-md py-3.5"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT: Branding */}
        <Link to="/" aria-label="Gulrez Sarankar Homepage" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#2563EB] text-xs sm:text-sm font-bold text-white shadow-md transition-transform duration-200 group-hover:scale-105">
            GS
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-extrabold leading-tight text-[var(--text-primary)] transition-colors group-hover:text-[#2563EB]">
              Gulrez Sarankar
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-[var(--text-secondary)]">
              Java Backend Developer
            </span>
          </div>
        </Link>

        {/* CENTER: Navigation Links (Desktop) */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={(e) => handleNavClick(item, e)}
              className={`relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors duration-200 ${
                isActive(item.path)
                  ? "bg-[var(--accent-soft)] text-[var(--accent-primary)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
              }`}
            >
              {item.name}
              {isActive(item.path) && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[var(--accent-primary)]" />
              )}
            </Link>
          ))}
        </nav>

        {/* RIGHT: Theme Switcher, CTA & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Animated Light/Dark Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 sm:h-10 items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] px-3 text-xs font-bold text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--accent-primary)] hover:bg-[var(--bg-hover)] shadow-xs"
            aria-label="Toggle light or dark theme"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? (
              <>
                <FaSun className="text-sm text-[#FACC15] animate-pulse" />
                <span className="hidden md:inline">Light</span>
              </>
            ) : (
              <>
                <FaMoon className="text-sm text-[#2563EB]" />
                <span className="hidden md:inline">Dark</span>
              </>
            )}
          </button>

          {/* Let's Connect CTA */}
          <button
            type="button"
            onClick={handleConnectClick}
            aria-label="Navigate to contact section"
            className="btn-primary-blue hidden sm:inline-flex text-xs py-2 px-4"
          >
            Let's Connect
            <FaArrowUpRightFromSquare className="text-[10px]" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-2 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-hover)] lg:hidden"
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
            className="border-b border-[var(--border-color)] bg-[var(--bg-main)] px-4 py-4 lg:hidden"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={(e) => {
                    handleNavClick(item, e);
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isActive(item.path)
                      ? "bg-[var(--accent-soft)] text-[var(--accent-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="mt-3 flex items-center gap-2 border-t border-[var(--border-color)] pt-3">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="btn-secondary-theme flex-1 py-2.5 text-xs font-bold"
                >
                  {theme === "dark" ? <FaSun className="text-[#FACC15]" /> : <FaMoon className="text-[#2563EB]" />}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleConnectClick();
                  }}
                  className="btn-primary-blue flex-1 py-2.5 text-xs font-bold"
                >
                  Let's Connect
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
