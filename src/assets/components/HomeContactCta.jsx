import { Link } from "react-router-dom";
import { FaArrowUpRightFromSquare, FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";

export default function HomeContactCta() {
  return (
    <section className="bg-[#0D0D0D] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[#262626] bg-[#141414] p-8 sm:p-12 lg:p-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#1A1A1A] px-3 py-1 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1A1]">
              Collaboration &amp; Hiring
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F5] max-w-2xl mx-auto leading-tight">
            Let's Build Resilient Backend Systems
          </h2>

          <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-[#A1A1A1] leading-relaxed">
            Available for full-time software engineering roles, high-throughput Spring Boot microservices, database architecture consulting, and technical collaborations.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" className="btn-primary text-xs sm:text-sm py-2.5 px-6">
              <span>Send a Message</span>
              <FaArrowUpRightFromSquare className="text-[10px]" />
            </Link>

            <a
              href="mailto:gulrezsarankar24@gmail.com"
              className="btn-secondary text-xs sm:text-sm py-2.5 px-6"
            >
              <FaEnvelope className="text-xs" />
              <span>Direct Email</span>
            </a>
          </div>

          {/* Quick Connect Channels */}
          <div className="mt-10 pt-8 border-t border-[#262626] flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#A1A1A1]">
            <a
              href="https://github.com/gulrezsarankar"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#F5F5F5] transition-colors"
            >
              <FaGithub className="text-sm" />
              <span>GitHub</span>
            </a>

            <span>•</span>

            <a
              href="https://linkedin.com/in/gulrez-sarankar"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#F5F5F5] transition-colors"
            >
              <FaLinkedin className="text-sm" />
              <span>LinkedIn</span>
            </a>

            <span>•</span>

            <a
              href="https://wa.me/918421090063"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#A3E635] transition-colors"
            >
              <FaWhatsapp className="text-sm" />
              <span>WhatsApp</span>
            </a>

            <span>•</span>

            <span>Pune, India (Remote Available)</span>
          </div>
        </div>
      </div>
    </section>
  );
}

