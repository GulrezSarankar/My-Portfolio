import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Masonry from "react-masonry-css";
import { certificates } from "../data/certificate";
import SectionTitle from "../assets/components/Sectiontitle";

export default function Certificates() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filter, setFilter] = useState("All");

  const filteredCertificates =
    filter === "All"
      ? certificates
      : certificates.filter((c) => c.category === filter);

  const openPopup = (index) => setSelectedIndex(index);
  const closePopup = () => setSelectedIndex(null);

  const nextCertificate = () =>
    setSelectedIndex((prev) => (prev + 1) % filteredCertificates.length);

  const prevCertificate = () =>
    setSelectedIndex((prev) =>
      prev === 0 ? filteredCertificates.length - 1 : prev - 1
    );

  const breakpoints = {
    default: 3,
    900: 2,
    600: 1,
  };

  return (
    <div className="pb-24 relative">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[260px] h-[260px] bg-purple-700 blur-[150px] opacity-30 -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-pink-600 blur-[180px] opacity-30 -z-10" />

      <SectionTitle title="Certificates" />

      {/* FILTERS */}
      <div className="flex justify-center gap-4 mb-10">
        {["All", "Backend", "Frontend", "Database", "Tools"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-xl border border-white/10 text-white backdrop-blur-xl
              ${filter === cat 
                ? "bg-purple-600 shadow-lg shadow-purple-500/40"
                : "bg-white/5 hover:bg-white/10"} 
              transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <Masonry
        breakpointCols={breakpoints}
        className="flex gap-6 max-w-7xl mx-auto px-6"
        columnClassName="my-masonry-grid_column"
      >
        {filteredCertificates.map((c, i) => (
          <Tilt
            key={i}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            scale={1.03}
            transitionSpeed={1000}
            className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl 
                       shadow-[0_0_20px_rgba(150,0,255,0.2)] hover:border-purple-500/40 
                       hover:shadow-[0_0_30px_rgba(150,0,255,0.4)] p-4 cursor-pointer 
                       shine-effect overflow-hidden"
            onClick={() => openPopup(i)}
          >
            <img
              src={c.img}
              alt={c.title}
              className="rounded-xl w-full object-cover"
            />

            <h3 className="text-xl font-semibold text-center mt-4 text-transparent 
                           bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
              {c.title}
            </h3>

            <p className="text-center text-gray-300 text-sm mt-1">{c.category}</p>
          </Tilt>
        ))}
      </Masonry>

      {/* POPUP VIEWER */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-xl flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Spotlight Glow */}
              <div className="absolute inset-0 rounded-xl shadow-[0_0_80px_#ffffff55]"></div>

              {/* Popup Image */}
              <img
                src={filteredCertificates[selectedIndex].img}
                alt=""
                className="max-w-4xl max-h-[90vh] rounded-2xl border border-white/20 shadow-2xl"
              />
            </motion.div>

            {/* Close */}
            <button
              className="absolute top-8 right-8 text-white bg-red-600 px-4 py-2 rounded-xl"
              onClick={closePopup}
            >
              ✕ Close
            </button>

            {/* Prev */}
            <button
              className="absolute left-8 text-white bg-white/20 px-4 py-3 rounded-full hover:bg-white/30"
              onClick={prevCertificate}
            >
              ‹
            </button>

            {/* Next */}
            <button
              className="absolute right-8 text-white bg-white/20 px-4 py-3 rounded-full hover:bg-white/30"
              onClick={nextCertificate}
            >
              ›
            </button>

            {/* Download */}
            <a
              href={filteredCertificates[selectedIndex].file}
              download
              className="absolute bottom-8 bg-purple-600 px-6 py-2 rounded-xl text-white 
                         font-semibold hover:bg-purple-700"
            >
              ⬇ Download Certificate
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
