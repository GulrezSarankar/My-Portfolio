import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa6";
import { getAllPublishedTestimonials } from "../../services/testimonialsService";

export default function Testimonials() {
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

  // If not loading, no error, and zero testimonials exist, gracefully omit or show minimal note
  if (!loading && testimonials.length === 0 && !error) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#100B20]/95 py-16 sm:py-20 lg:py-28 border-b border-[rgba(255,255,255,0.08)]"
    >
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/3 h-[500px] w-[500px] rounded-full bg-[#9B5CFF]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="glass-pill mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D66BFF]" />
            CLIENT &amp; COLLABORATOR TRUST
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Endorsements &amp; <br className="hidden sm:inline" />
            <span className="purple-gradient-text">Verified Testimonials</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#AAA5B8]">
            Feedback from engineering leaders, product owners, and academic supervisors on technical execution and delivery reliability.
          </p>
        </div>

        {/* Loading State Skeleton */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="glass-card p-6 sm:p-8 flex flex-col justify-between animate-pulse"
              >
                <div className="space-y-3">
                  <div className="h-4 w-24 bg-white/10 rounded-full" />
                  <div className="h-4 w-full bg-white/10 rounded-lg" />
                  <div className="h-4 w-5/6 bg-white/10 rounded-lg" />
                </div>
                <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.08)] flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-white/10" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-white/10 rounded" />
                    <div className="h-3 w-40 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && testimonials.length === 0 && (
          <div className="p-8 text-center rounded-2xl border border-red-500/20 bg-red-500/5 text-red-300 text-sm max-w-md mx-auto">
            <p>Recommendations could not be loaded at this time.</p>
          </div>
        )}

        {/* Testimonials Grid */}
        {!loading && testimonials.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="glass-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#9B5CFF]/50"
              >
                {/* Corner quote mark */}
                <FaQuoteLeft className="pointer-events-none absolute top-4 right-6 text-4xl text-[rgba(155,92,255,0.12)] group-hover:text-[rgba(214,107,255,0.2)] transition-colors" />

                <div>
                  {/* Star Rating & Highlight */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#FACC15]">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <FaStar key={i} className="text-sm" />
                      ))}
                    </div>
                    {t.highlight && (
                      <span className="glass-pill text-[10px] py-0.5 px-2 bg-[rgba(155,92,255,0.15)] text-[#D66BFF]">
                        {t.highlight}
                      </span>
                    )}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-sm sm:text-base leading-relaxed text-[#E5E0F8] italic">
                    "{t.content || t.feedback}"
                  </p>
                </div>

                {/* Author Footer */}
                <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.08)] flex items-center gap-3.5">
                  {t.photo_url ? (
                    <img
                      src={t.photo_url}
                      alt={t.name || t.client_name}
                      className="h-11 w-11 shrink-0 rounded-xl object-cover border border-[#9B5CFF]/40 shadow-[0_0_15px_rgba(155,92,255,0.3)]"
                    />
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#9B5CFF] to-[#7928CA] font-heading font-bold text-sm text-white shadow-[0_0_15px_rgba(155,92,255,0.3)]">
                      {t.avatar ||
                        (t.client_name || t.name || "C")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h3 className="font-heading text-sm sm:text-base font-bold text-white leading-tight">
                      {t.name || t.client_name}
                    </h3>
                    <p className="text-xs font-medium text-[#AAA5B8] mt-0.5">
                      {t.role || t.designation || "Client"}{" "}
                      {t.company ? (
                        <>
                          • <strong className="text-[#D66BFF] font-semibold">{t.company}</strong>
                        </>
                      ) : null}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
