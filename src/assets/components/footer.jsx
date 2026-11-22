import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaArrowUp, FaArrowUpRightFromSquare } from "react-icons/fa6";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[#262626] bg-[#0D0D0D] pt-14 pb-10 text-[#A1A1A1]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-[#262626]">

          {/* COL 1: Brand & Professional Summary */}
          <div className="lg:col-span-5 space-y-4">
            <Link
              to="/"
              aria-label="Gulrez Sarankar Homepage"
              className="inline-flex items-center gap-3 group select-none"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#262626] bg-[#141414] transition-colors group-hover:border-[#383838]">
                <span className="font-heading text-sm font-bold tracking-tight text-[#F5F5F5]">
                  GS<span className="text-[#A3E635]">.</span>
                </span>
              </div>
              <span className="font-heading text-base font-semibold text-[#F5F5F5] group-hover:text-[#A3E635] transition-colors">
                Gulrez Sarankar
              </span>
            </Link>

            <p className="text-xs sm:text-sm leading-relaxed text-[#A1A1A1] max-w-sm">
              Software Engineer specializing in Java, Spring Boot microservices, high-throughput backend architecture, and modern full-stack web engineering.
            </p>

            {/* Live Availability Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#141414] px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A3E635] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#A3E635]" />
              </span>
              <span className="text-xs font-mono text-[#A1A1A1]">
                Available for contract roles &amp; engineering engagements
              </span>
            </div>
          </div>

          {/* COL 2: Primary Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#F5F5F5]">
              Navigation
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-[#A1A1A1]">
              <li>
                <Link to="/" className="hover:text-[#F5F5F5] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F5F5F5] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#F5F5F5] transition-colors">
                  Projects &amp; Case Studies
                </Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-[#F5F5F5] transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#F5F5F5] transition-colors">
                  Engineering Blog
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-[#F5F5F5] transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F5F5F5] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 3: Connect & Social Channels */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#F5F5F5]">
              Connect &amp; Collaborate
            </span>
            <p className="text-xs text-[#A1A1A1] leading-relaxed">
              Based in Pune, India. Open to distributed remote contracts, technical consulting, and high-impact engineering roles.
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://github.com/gulrezsarankar"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#262626] bg-[#141414] text-[#A1A1A1] hover:border-[#383838] hover:text-[#F5F5F5] transition-colors"
                title="GitHub"
              >
                <FaGithub className="text-sm" />
              </a>

              <a
                href="https://linkedin.com/in/gulrez-sarankar"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#262626] bg-[#141414] text-[#A1A1A1] hover:border-[#383838] hover:text-[#F5F5F5] transition-colors"
                title="LinkedIn"
              >
                <FaLinkedin className="text-sm" />
              </a>

              <a
                href="https://wa.me/918421090063"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#262626] bg-[#141414] text-[#A1A1A1] hover:border-[#383838] hover:text-[#A3E635] transition-colors"
                title="WhatsApp"
              >
                <FaWhatsapp className="text-sm" />
              </a>

              <a
                href="mailto:gulrezsarankar39@gmail.com"
                aria-label="Email Gulrez Sarankar"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#262626] bg-[#141414] text-[#A1A1A1] hover:border-[#383838] hover:text-[#A3E635] transition-colors"
                title="Email"
              >
                <FaEnvelope className="text-sm" />
              </a>

              <a
                href="/Gulrez-Sarankar.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Official Resume"
                className="flex h-9 items-center gap-1.5 px-3 rounded-lg border border-[#262626] bg-[#141414] text-xs font-mono text-[#A1A1A1] hover:border-[#383838] hover:text-[#F5F5F5] transition-colors"
                title="Download Resume"
              >
                <span>CV</span>
                <FaArrowUpRightFromSquare className="text-[10px]" />
              </a>
            </div>

            <div className="pt-2 text-xs font-mono text-[#666666]">
              Direct Email:{" "}
              <a
                href="mailto:gulrezsarankar39@gmail.com"
                className="text-[#A1A1A1] hover:text-[#A3E635] transition-colors"
              >
                gulrezsarankar39@gmail.com
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: Copyright & Back-to-Top */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666666]">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} Gulrez Sarankar. Built with React &amp; Tailwind CSS.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors"
          >
            <span>Back to top</span>
            <FaArrowUp className="text-[10px]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
