import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import SectionTitle from "../assets/components/Sectiontitle";
import { skillCategories } from "../data/skills";

export default function Skills() {
  return (
    <div className="page-section px-4 sm:px-6">
      <SectionTitle title="Skills" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.4 }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Tilt
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              perspective={1000}
              scale={1.02}
              transitionSpeed={1500}
              className="surface-card rounded-2xl p-7 transition duration-300 hover:-translate-y-1"
            >
              {/* Category Title */}
              <h2 className="mb-5 text-2xl font-extrabold text-heading">
                {category.title}
              </h2>

              {/* Skills List */}
              <div className="space-y-5">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.15 }}
                    className="surface-flat rounded-xl p-4 transition"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-semibold text-heading">{skill.name}</h4>
                      <span className="text-muted text-sm">{skill.level}%</span>
                    </div>

                    {/* Animated Skill Bar */}
                    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-muted)" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.2, delay: i * 0.15 }}
                        className="h-full skill-bar"
                      />
                    </div>

                  </motion.div>
                ))}
              </div>
            </Tilt>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
