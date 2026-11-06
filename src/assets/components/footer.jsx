import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaArrowUp } from "react-icons/fa6";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-[rgba(255,255,255,0.08)] bg-[#080612] pt-14 pb-8">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-[#9B5CFF]/10 blur-[120px]" />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-[rgba(255,255,255,0.08)]">
          
          {/* COL 1: Brand & Bio */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" aria-label="Gulrez Sarankar" className="inline-flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#9B5CFF] to-[#7928CA] p-[1px] shadow-[0_0_20px_rgba(155,92,255,0.4)]">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#080612]">
                  <span className="font-heading text-base font-extrabold text-white">
                    GS<span className="text-[#D66BFF]">.</span>
                  </span>
                </div>
              </div>
              <span className="font-heading text-lg font-bold text-white group-hover:text-[#D66BFF] transition-colors">
                Gulrez Sarankar
              </span>
            </Link>

            <p className="text-xs sm:text-sm leading-relaxed text-[#AAA5B8] max-w-sm">
              Software Engineer &amp; Freelance Developer with 2+ years of enterprise experience. Architecting resilient Java &amp; Spring Boot backends and building high-performance modern web applications.
            </p>

            {/* Live Availability status pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-emerald-300">
                Available for contract roles &amp; freelance projects
              </span>
            </div>
          </div>

          {/* COL 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9B5CFF]">
              Navigation
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-[#AAA5B8]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About &amp; Journey</Link>
              </li>
              <li>
                <Link to="/freelance" className="hover:text-white transition-colors">Freelance &amp; Services</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors">Engineering Portfolio</Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-white transition-colors">Skills &amp; Architecture</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact &amp; Hire</Link>
              </li>
            </ul>
          </div>

          {/* COL 3: Social & Direct Reach */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D66BFF]">
              Connect &amp; Collaborate
            </span>
            <p className="text-xs text-[#AAA5B8] leading-relaxed">
              Based in Pune, India. Available for worldwide remote contracts, consulting, and full-time engineering engagements.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/gulrezsarankar"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] text-sm text-[#AAA5B8] hover:border-[#9B5CFF] hover:bg-[rgba(155,92,255,0.15)] hover:text-white transition-all"
                title="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/in/gulrez-sarankar"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] text-sm text-[#AAA5B8] hover:border-[#9B5CFF] hover:bg-[rgba(155,92,255,0.15)] hover:text-white transition-all"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://wa.me/918459464676"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] text-sm text-[#AAA5B8] hover:border-emerald-500 hover:bg-emerald-500/15 hover:text-emerald-400 transition-all"
                title="WhatsApp"
              >
                <FaWhatsapp />
              </a>

              <a
                href="mailto:gulrezsarankar24@gmail.com"
                aria-label="Email Gulrez"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] text-sm text-[#AAA5B8] hover:border-[#D66BFF] hover:bg-[rgba(214,107,255,0.15)] hover:text-white transition-all"
                title="Email"
              >
                <FaEnvelope />
              </a>
            </div>

            <div className="pt-2 text-[11px] text-[#7E7893]">
              Direct Phone / WhatsApp: <strong className="text-white">+91 8459464676</strong>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: Copyright & Back-to-Top */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E7893]">
          <div>
            © {new Date().getFullYear()} Gulrez Sarankar. All rights reserved. Handcrafted with React &amp; Tailwind CSS.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-[#AAA5B8] hover:text-[#9B5CFF] transition-colors"
          >
            <span>Back to top</span>
            <FaArrowUp className="text-[10px]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
