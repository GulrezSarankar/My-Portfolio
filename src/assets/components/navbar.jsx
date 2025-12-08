import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll detection (hide on scroll down / show on scroll up)
  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      // Hide on scroll down
      if (currentY > lastY) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      // Navbar background appears after scroll
      setScrolled(currentY > 20);

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pages = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Certificates", path: "/certificates" },
    { name: "Education", path: "/education" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{
        y: visible ? 0 : -80,
        opacity: visible ? 1 : 0,
        transition: { duration: 0.35 },
      }}
      className={`
        fixed top-0 left-0 w-full z-[9999]
        transition-all duration-500
        ${scrolled
          ? "bg-black/50 backdrop-blur-xl border-b border-purple-500/20 shadow-lg py-3"
          : "bg-transparent backdrop-blur-0 border-b border-transparent py-5"
        }
      `}
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <span className="text-primary">Gulrez </span>
          <span className="text-white">Sarankar</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          {pages.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="relative group cursor-pointer"
            >
              <span
                className={`${
                  location.pathname === item.path
                    ? "text-purple-400"
                    : "text-gray-300"
                } group-hover:text-purple-400 transition`}
              >
                {item.name}
              </span>

              {/* Neon underline */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Mobile Drawer */}
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 right-6 bg-black/95 p-6 rounded-xl shadow-xl border border-white/10 space-y-5 md:hidden"
          >
            {pages.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="block text-gray-300 hover:text-purple-400 transition text-lg"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
