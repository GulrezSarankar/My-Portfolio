import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import { certificates } from "../data/certificate";
import SEO from "../assets/components/SEO";

export default function Certificates() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filter, setFilter] = useState("All");

  const filteredCertificates =
    filter === "All" ? certificates : certificates.filter((c) => c.category === filter);

  const breakpoints = { default: 3, 1024: 3, 768: 2, 500: 1 };

  return (
    <section className="bg-[var(--bg-main)] py-12 lg:py-20 transition-colors duration-300 overflow-hidden">
      <SEO
        title="Certifications & Credentials | Gulrez Sarankar | Java Developer"
        description="Professional certifications and verified credentials of Gulrez Sarankar in Java backend engineering, Spring Boot, and database architecture."
        canonicalPath="/certificates"
      />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)]">
            VERIFIED CREDENTIALS
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)] md:text-4xl">
            Professional Certifications
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm sm:text-base text-[var(--text-secondary)]">
            Technical certifications in Java backend engineering, Spring Boot, database management, and software architecture.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {["All", "Backend", "Frontend", "Database", "Tools"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                filter === cat
                  ? "btn-primary-blue py-2 px-4 shadow-xs"
                  : "btn-secondary-theme py-2 px-4 text-[var(--text-secondary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <Masonry breakpointCols={breakpoints} className="flex gap-4 sm:gap-6 overflow-hidden" columnClassName="my-masonry-grid_column">
          {filteredCertificates.map((certificate, index) => (
            <motion.button
              key={`${certificate.title}-${index}`}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setSelectedIndex(index)}
              aria-label={`View certificate details for ${certificate.title}`}
              className="theme-card theme-card-hover p-4 text-left cursor-pointer mb-6"
            >
              <img
                src={certificate.img}
                alt={`${certificate.title} Certificate`}
                loading="lazy"
                decoding="async"
                className="w-full rounded-lg border border-[var(--border-color)] object-cover"
              />
              <h3 className="mt-3 text-sm sm:text-base font-bold text-[var(--text-primary)]">{certificate.title}</h3>
              <p className="mt-0.5 text-xs font-semibold text-[var(--text-secondary)]">{certificate.category}</p>
            </motion.button>
          ))}
        </Masonry>

        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="theme-card relative max-w-4xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-4 flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">{filteredCertificates[selectedIndex].title}</h3>
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(null)}
                    className="btn-secondary-theme py-1 px-3 text-xs"
                  >
                    Close
                  </button>
                </div>
                <img
                  src={filteredCertificates[selectedIndex].img}
                  alt={filteredCertificates[selectedIndex].title}
                  className="max-h-[70vh] w-full rounded-lg object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
