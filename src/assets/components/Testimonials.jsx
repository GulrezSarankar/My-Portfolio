import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa6";
import { testimonialsData } from "../../data/testimonialsData";

export default function Testimonials() {

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

        {/* Testimonials Grid (Desktop 2x2, Mobile interactive) */}
        <div className="grid gap-6 md:grid-cols-2">
          {testimonialsData.map((t, index) => (
            <motion.div
              key={t.id}
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
                    {[...Array(t.rating)].map((_, i) => (
                      <FaStar key={i} className="text-sm" />
                    ))}
                  </div>
                  <span className="glass-pill text-[10px] py-0.5 px-2 bg-[rgba(155,92,255,0.15)] text-[#D66BFF]">
                    {t.highlight}
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-sm sm:text-base leading-relaxed text-[#E5E0F8] italic">
                  "{t.content}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.08)] flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#9B5CFF] to-[#7928CA] font-heading font-bold text-sm text-white shadow-[0_0_15px_rgba(155,92,255,0.3)]">
                  {t.avatar}
                </div>
                <div>
                  <h3 className="font-heading text-sm sm:text-base font-bold text-white leading-tight">
                    {t.name}
                  </h3>
                  <p className="text-xs font-medium text-[#AAA5B8] mt-0.5">
                    {t.role} • <strong className="text-[#D66BFF] font-semibold">{t.company}</strong>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
