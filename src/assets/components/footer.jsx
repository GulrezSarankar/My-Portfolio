import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-main)] py-8 transition-colors duration-300">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        {/* LEFT: Branding & Copyright */}
        <div className="flex items-center gap-3">
          <Link to="/" aria-label="Gulrez Sarankar Homepage" className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-primary)] text-xs font-bold text-white shadow-xs">
            GS
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[var(--text-primary)]">Gulrez Sarankar</span>
            <span className="text-[11px] text-[var(--text-secondary)]">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>
        </div>

        {/* RIGHT: Quick Links */}
        <div className="flex items-center gap-6 text-xs font-semibold text-[var(--text-secondary)]">
          <a
            href="https://github.com/gulrezsarankar"
            target="_blank"
            rel="noreferrer"
            aria-label="Gulrez Sarankar GitHub Profile"
            className="transition-colors hover:text-[var(--accent-primary)]"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/gulrez-sarankar"
            target="_blank"
            rel="noreferrer"
            aria-label="Gulrez Sarankar LinkedIn Profile"
            className="transition-colors hover:text-[var(--accent-primary)]"
          >
            LinkedIn
          </a>
          <a
            href="mailto:gulrezsarankar39@gmail.com"
            aria-label="Email Gulrez Sarankar"
            className="transition-colors hover:text-[var(--accent-primary)]"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
