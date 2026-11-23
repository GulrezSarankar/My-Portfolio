import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft, FaArrowRight, FaArrowUpRightFromSquare } from "react-icons/fa6";
import SEO from "../assets/components/SEO";
import { getAllPublishedTestimonials } from "../services/testimonialsService";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getAllPublishedTestimonials()
      .then((res) => {
        if (!isMounted) return;
        if (res.error && (!res.data || res.data.length === 0)) {
          setError(res.error.message || "Failed to load testimonials");
        } else {
          setTestimonials(res.data || []);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] pt-10 sm:pt-14 pb-20">
      <SEO
        title="Testimonials & Endorsements | Gulrez Sarankar"
        description="Verified recommendations and feedback from engineering leaders, product owners, and collaborators on Java backend architecture, system reliability, and delivery execution."
        canonicalPath="/testimonials"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Testimonials", url: "/testimonials" },
        ]}
      />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs / Meta */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-[#A1A1A1]">
          <Link to="/" className="hover:text-[#F5F5F5] transition-colors">
            home
          </Link>
          <span>/</span>
          <span className="text-[#A3E635]">testimonials</span>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#141414] px-3 py-1 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1A1]">
              Social Proof &amp; Peer Endorsements
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F5] leading-tight">
            Client &amp; Collaborator <br className="hidden sm:inline" />
            <span className="text-[#A3E635]">Testimonials</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#A1A1A1] leading-relaxed">
            Direct feedback from engineering leads, client stakeholders, and project collaborators on backend architecture, API resilience, and technical delivery.
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-8 flex flex-col justify-between animate-pulse"
              >
                <div className="space-y-3">
                  <div className="h-4 w-28 bg-[#1A1A1A] rounded" />
                  <div className="h-4 w-full bg-[#1A1A1A] rounded" />
                  <div className="h-4 w-4/5 bg-[#1A1A1A] rounded" />
                </div>
                <div className="mt-6 pt-5 border-t border-[#262626] flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-[#1A1A1A]" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-32 bg-[#1A1A1A] rounded" />
                    <div className="h-3 w-44 bg-[#1A1A1A] rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && testimonials.length === 0 && (
          <div className="rounded-xl border border-red-500/30 bg-[#141414] p-8 text-center max-w-lg mx-auto">
            <p className="text-sm text-red-400 mb-4">
              Unable to load endorsements at this time.
            </p>
            <p className="text-xs text-[#A1A1A1]">
              Please check back shortly or connect directly for references.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && testimonials.length === 0 && (
          <div className="rounded-xl border border-[#262626] bg-[#141414] p-10 sm:p-14 text-center max-w-xl mx-auto">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#1A1A1A] border border-[#262626] text-[#A3E635] mb-4">
              <FaQuoteLeft className="text-lg" />
            </div>
            <h2 className="font-heading text-lg sm:text-xl font-bold text-[#F5F5F5] mb-2">
              Endorsements Under Curation
            </h2>
            <p className="text-sm text-[#A1A1A1] leading-relaxed mb-6">
              Client and collaborator endorsements are being collated. In the meantime, inspect production case studies or reach out to request direct references.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/projects" className="btn-secondary w-full sm:w-auto text-xs py-2.5 px-4">
                <span>View Project Case Studies</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
              <Link to="/contact" className="btn-primary w-full sm:w-auto text-xs py-2.5 px-4">
                <span>Get in Touch</span>
                <FaArrowUpRightFromSquare className="text-[10px]" />
              </Link>
            </div>
          </div>
        )}

        {/* Testimonials Grid */}
        {!loading && testimonials.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id || index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-8 flex flex-col justify-between transition-colors hover:border-[#383838]"
              >
                <div>
                  {/* Rating & Highlight */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#FACC15]">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <FaStar key={i} className="text-xs" />
                      ))}
                    </div>
                    {t.highlight && (
                      <span className="rounded-md border border-[#262626] bg-[#1A1A1A] px-2.5 py-0.5 text-[11px] font-mono text-[#A3E635]">
                        {t.highlight}
                      </span>
                    )}
                  </div>

                  {/* Feedback Quote */}
                  <p className="text-sm sm:text-base leading-relaxed text-[#F5F5F5]/90">
                    &ldquo;{t.content || t.feedback}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-6 pt-5 border-t border-[#262626] flex items-center gap-3.5">
                  {t.photo_url ? (
                    <img
                      src={t.photo_url}
                      alt={t.name || t.client_name}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      className="h-11 w-11 shrink-0 rounded-lg object-cover border border-[#262626]"
                    />
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1A1A1A] border border-[#262626] font-mono text-xs font-bold text-[#A3E635]">
                      {t.avatar ||
                        (t.client_name || t.name || "CL")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h2 className="font-heading text-sm font-semibold text-[#F5F5F5] truncate">
                      {t.name || t.client_name}
                    </h2>
                    <p className="text-xs text-[#A1A1A1] truncate mt-0.5">
                      {t.role || t.designation || "Collaborator"}
                      {t.company ? (
                        <>
                          {" "}
                          • <span className="text-[#F5F5F5] font-medium">{t.company}</span>
                        </>
                      ) : null}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom CTA Strip */}
        <div className="mt-16 rounded-xl border border-[#262626] bg-[#141414] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h2 className="font-heading text-xl font-bold text-[#F5F5F5]">
              Looking to collaborate on a backend or full-stack project?
            </h2>
            <p className="text-sm text-[#A1A1A1]">
              Available for full-time engineering engagements, freelance architecture, and consulting.
            </p>
          </div>
          <Link to="/contact" className="btn-primary text-xs py-3 px-5 shrink-0">
            <span>Start a Conversation</span>
            <FaArrowUpRightFromSquare className="text-[10px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

