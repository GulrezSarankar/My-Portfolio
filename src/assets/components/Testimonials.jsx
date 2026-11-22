import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaArrowRight, FaQuoteLeft } from "react-icons/fa6";
import { getAllPublishedTestimonials } from "../../services/testimonialsService";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getAllPublishedTestimonials()
      .then((res) => {
        if (!isMounted) return;
        if (res.data && res.data.length > 0) {
          setTestimonials(res.data);
        } else {
          setTestimonials([]);
        }
      })
      .catch(() => {
        if (isMounted) setTestimonials([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Do not render empty cards, skeletons, or fake content if there are no testimonials
  if (!loading && testimonials.length === 0) {
    return null;
  }

  // If loading, don't flash unnecessary skeletons on homepage
  if (loading) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="bg-[#0D0D0D] py-16 sm:py-20 lg:py-24 border-b border-[#262626]"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#141414] px-3 py-1 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1A1]">
                Endorsements &amp; Peer Trust
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5]">
              Verified Recommendations
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#A1A1A1] leading-relaxed">
              Feedback from engineering leaders, client stakeholders, and peers on technical execution and reliability.
            </p>
          </div>

          <Link
            to="/testimonials"
            className="btn-secondary text-xs sm:text-sm py-2.5 px-4 self-start md:self-auto shrink-0"
          >
            <span>All Testimonials</span>
            <FaArrowRight className="text-[11px]" />
          </Link>
        </div>

        {/* 2-Column Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.slice(0, 4).map((t, index) => (
            <div
              key={t.id || index}
              className="rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-8 flex flex-col justify-between transition-colors hover:border-[#383838]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#FACC15]">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <FaStar key={i} className="text-xs" />
                    ))}
                  </div>
                  {t.highlight && (
                    <span className="rounded bg-[#1A1A1A] border border-[#262626] px-2 py-0.5 text-[10px] font-mono text-[#A3E635]">
                      {t.highlight}
                    </span>
                  )}
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-[#F5F5F5]/90">
                  &ldquo;{t.content || t.feedback}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#262626] flex items-center gap-3.5">
                {t.photo_url ? (
                  <img
                    src={t.photo_url}
                    alt={t.name || t.client_name}
                    className="h-10 w-10 shrink-0 rounded-lg object-cover border border-[#262626]"
                  />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1A1A1A] border border-[#262626] font-mono text-xs font-bold text-[#A3E635]">
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
                  <div className="font-heading text-sm font-semibold text-[#F5F5F5] truncate">
                    {t.name || t.client_name}
                  </div>
                  <div className="text-xs text-[#A1A1A1] truncate mt-0.5">
                    {t.role || t.designation || "Client"}
                    {t.company ? ` • ${t.company}` : ""}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
