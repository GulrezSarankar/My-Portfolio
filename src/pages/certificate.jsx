import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import { certificates } from "../data/certificate";
import SectionTitle from "../assets/components/Sectiontitle";

export default function Certificates() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filter, setFilter] = useState("All");

  const filteredCertificates =
    filter === "All" ? certificates : certificates.filter((c) => c.category === filter);

  const nextCertificate = () =>
    setSelectedIndex((prev) => (prev + 1) % filteredCertificates.length);

  const prevCertificate = () =>
    setSelectedIndex((prev) => (prev === 0 ? filteredCertificates.length - 1 : prev - 1));

  const breakpoints = { default: 3, 900: 2, 600: 1 };

  return (
    <section className="page-section px-4 sm:px-6">
      <SectionTitle title="Certificates" />

      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {["All", "Backend", "Frontend", "Database", "Tools"].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`rounded-xl px-5 py-2 text-sm font-bold transition ${
              filter === cat ? "primary-button" : "secondary-button"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <Masonry breakpointCols={breakpoints} className="mx-auto flex max-w-7xl gap-6" columnClassName="my-masonry-grid_column">
        {filteredCertificates.map((certificate, index) => (
          <motion.button
            key={`${certificate.title}-${index}`}
            type="button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setSelectedIndex(index)}
            className="surface-card shine-effect cursor-pointer rounded-2xl p-4 text-left transition hover:-translate-y-1"
          >
            <img src={certificate.img} alt={certificate.title} className="w-full rounded-xl object-cover" />
            <h3 className="mt-4 text-center text-xl font-extrabold text-heading">{certificate.title}</h3>
            <p className="mt-1 text-center text-sm font-semibold text-muted">{certificate.category}</p>
          </motion.button>
        ))}
      </Masonry>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              className="relative max-w-5xl"
            >
              <img
                src={filteredCertificates[selectedIndex].img}
                alt={filteredCertificates[selectedIndex].title}
                className="max-h-[82vh] rounded-2xl border border-white/20 object-contain shadow-2xl"
              />
            </motion.div>

            <button type="button" className="absolute right-6 top-6 secondary-button px-4 py-2" onClick={() => setSelectedIndex(null)}>
              Close
            </button>
            <button type="button" className="absolute left-6 secondary-button px-4 py-3" onClick={prevCertificate}>
              Prev
            </button>
            <button type="button" className="absolute right-6 secondary-button px-4 py-3" onClick={nextCertificate}>
              Next
            </button>
            <a href={filteredCertificates[selectedIndex].file} download className="primary-button absolute bottom-6 px-6 py-3">
              Download Certificate
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
