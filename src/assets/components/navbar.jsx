import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBars, FaBriefcase, FaMoon, FaSun, FaTimes } from "react-icons/fa";

const pages = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Experience", path: "/experience" },
  { name: "Skills", path: "/skills" },
  { name: "Projects", path: "/projects" },
  { name: "Freelance", path: "/freelance", featured: true },
  { name: "Certificates", path: "/certificates" },
  { name: "Education", path: "/education" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY <= lastY || currentY < 24);
      setScrolled(currentY > 20);
      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: visible ? 0 : -82, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 z-[9999] w-full transition-all duration-300 ${
        scrolled ? "py-3" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="surface-card flex items-center justify-between rounded-2xl px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl accent-bg text-sm font-black text-white">
              GS
            </span>
            <span>
              <span className="block text-base font-extrabold leading-tight text-heading">
                Gulrez Sarankar
              </span>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                Software Engineer
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {pages.filter((item) => !item.featured).map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    isActive(item.path)
                      ? "accent-soft accent-text"
                      : "text-muted hover:accent-soft hover:accent-text"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              to="/freelance"
              className={`nav-cta hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-extrabold transition sm:inline-flex ${
                isActive("/freelance")
                  ? "accent-bg text-white"
                  : "primary-button"
              }`}
            >
              <FaBriefcase className="text-xs" />
              Hire Me
            </Link>

            <button
              type="button"
              aria-label="Toggle theme"
              onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
              className="secondary-button h-10 w-10 rounded-xl p-0"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>

            <button
              type="button"
              aria-label="Open menu"
              className="secondary-button h-10 w-10 rounded-xl p-0 lg:hidden"
              onClick={() => setOpen((current) => !current)}
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="surface-card mt-3 rounded-2xl p-3 lg:hidden"
            >
              <div className="grid gap-1">
                {pages.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${
                      isActive(item.path)
                        ? "accent-soft accent-text"
                        : "text-muted hover:accent-soft hover:accent-text"
                    }`}
                  >
                    {item.featured && <FaBriefcase className="text-xs" />}
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
