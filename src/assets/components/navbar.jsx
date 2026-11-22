import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Blog", path: "/blog" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (item) => {
    if (item.path === "/") {
      return location.pathname === "/";
    }
    return location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-[#262626] bg-[#0D0D0D]/95 backdrop-blur-md py-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          : "border-b border-[#262626]/80 bg-[#0D0D0D]/85 backdrop-blur-sm py-3.5"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link
          to="/"
          aria-label="Gulrez Sarankar Homepage"
          className="group flex items-center gap-3 select-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#262626] bg-[#141414] transition-colors group-hover:border-[#383838]">
            <span className="font-heading text-sm font-bold tracking-tight text-[#F5F5F5]">
              GS<span className="text-[#A3E635]">.</span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-sm font-semibold leading-tight text-[#F5F5F5] transition-colors group-hover:text-[#A3E635]">
              Gulrez Sarankar
            </span>
            <span className="text-[11px] font-mono text-[#A1A1A1]">
              Java Backend &amp; Distributed Systems
            </span>
          </div>
        </Link>

        {/* Live Availability Status Pill (Desktop only) */}
        <div className="hidden xl:flex items-center gap-2 rounded-full border border-[#262626] bg-[#141414] px-3 py-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A3E635] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#A3E635]" />
          </span>
          <span className="text-[11px] font-mono text-[#A1A1A1]">
            Available for new opportunities
          </span>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main Navigation">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#1A1A1A] text-[#F5F5F5] border border-[#262626]"
                    : "text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#141414]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.name}
                {active && (
                  <span className="absolute -bottom-1.5 left-2.5 right-2.5 h-[2px] rounded-full bg-[#A3E635]" />
                )}
              </Link>
            );
          })}

          {/* Official Resume Link */}
          <a
            href="/Gulrez-Sarankar.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium text-[#A1A1A1] transition-colors hover:text-[#F5F5F5] hover:bg-[#141414]"
            title="Download Official Resume (PDF)"
          >
            <span>Resume</span>
            <FaArrowUpRightFromSquare className="text-[10px] text-[#A1A1A1]" />
          </a>
        </nav>

        {/* Right Action CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="btn-primary hidden sm:inline-flex text-xs py-2 px-3.5"
            aria-label="Contact Gulrez Sarankar"
          >
            <span>Get in Touch</span>
            <FaArrowUpRightFromSquare className="text-[10px]" />
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg border border-[#262626] bg-[#141414] p-2 text-[#F5F5F5] transition-colors hover:border-[#383838] hover:text-[#A3E635] lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
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
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden border-b border-[#262626] bg-[#0D0D0D] px-4 py-4 lg:hidden"
          >
            <div className="flex flex-col gap-1.5">
              {/* Mobile Availability indicator */}
              <div className="mb-2 flex items-center gap-2 rounded-lg border border-[#262626] bg-[#141414] px-3 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A3E635] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#A3E635]" />
                </span>
                <span className="text-xs font-mono text-[#A1A1A1]">
                  Available for new opportunities
                </span>
              </div>

              {/* Navigation links */}
              {navItems.map((item) => {
                const active = isActive(item);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-[#1A1A1A] text-[#F5F5F5] border border-[#262626]"
                        : "text-[#A1A1A1] hover:bg-[#141414] hover:text-[#F5F5F5]"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
                      )}
                    </div>
                  </Link>
                );
              })}

              {/* Resume link in mobile */}
              <a
                href="/Gulrez-Sarankar.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3.5 py-2 text-sm font-medium text-[#A1A1A1] transition-colors hover:bg-[#141414] hover:text-[#F5F5F5]"
              >
                <span>Download Resume (PDF)</span>
                <FaArrowUpRightFromSquare className="text-xs text-[#A1A1A1]" />
              </a>

              {/* Mobile CTA */}
              <div className="mt-3 border-t border-[#262626] pt-3">
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary w-full justify-center py-2.5 text-xs"
                >
                  <span>Get in Touch</span>
                  <FaArrowUpRightFromSquare className="text-xs" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
