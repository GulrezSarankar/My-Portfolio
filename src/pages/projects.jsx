import { projects } from "../data/projects";
import SectionTitle from "../assets/components/Sectiontitle";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

export default function Projects() {
  return (
    <div className="pb-24 relative" id="projects">
      
      <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-purple-700 blur-[150px] opacity-30 -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-pink-600 blur-[180px] opacity-30 -z-10" />

      <SectionTitle title="Projects" />

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              scale={1.05}
              transitionSpeed={1500}
              className="rounded-2xl bg-white/5 backdrop-blur-xl p-6 border border-white/10 
                         shadow-[0_0_25px_rgba(180,0,255,0.15)]
                         hover:border-purple-500/40 hover:shadow-[0_0_35px_rgba(180,0,255,0.35)]
                         transition duration-300"
            >
              {/* IMAGE */}
              <div className="overflow-hidden rounded-xl border border-white/10 mb-4">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* TITLE */}
              <h3 className="text-2xl font-semibold text-transparent bg-gradient-to-r 
                             from-purple-400 to-pink-500 bg-clip-text">
                {project.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-300 mt-3">{project.description}</p>

              {/* TECH TAGS */}
              <div className="flex flex-wrap mt-4 gap-2">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm rounded-lg bg-white/10 text-purple-300 border border-white/10 
                               hover:bg-purple-500/20 transition"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* BUTTON */}
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-6 px-5 py-2 rounded-xl 
                           bg-gradient-to-r from-purple-500 to-pink-500 
                           text-black font-semibold shadow-lg hover:opacity-90 transition"
              >
                View More →
              </a>

            </Tilt>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
