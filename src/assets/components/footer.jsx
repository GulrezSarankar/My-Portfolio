import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 border-t px-6 py-8" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-sm text-muted md:flex-row md:text-left">
        <p>Copyright {new Date().getFullYear()} Gulrez Sarankar. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-semibold">
          <span>Software Engineer | Java | Spring Boot | React</span>
          <Link to="/blog" className="accent-text hover:underline">
            Blog
          </Link>
        </div>
      </div>
    </footer>
  );
}
