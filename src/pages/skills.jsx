import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import SectionTitle from "../assets/components/Sectiontitle";
import { skillCategories } from "../data/skills";

export default function Skills() {
  return (
    <div className="pb-24 relative">

      {/* Background effects */}
      <div className="absolute top-0 left-0 w-[260px] h-[260px] bg-purple-700 blur-[150px] opacity-30 -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-pink-600 blur-[200px] opacity-30 -z-10" />

      <SectionTitle title="Skills" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.4 }}
        className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10"
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
              className="rounded-2xl bg-white/5 p-7 border border-white/10 
                         backdrop-blur-xl shadow-[0_0_25px_rgba(180,0,255,0.2)]
                         hover:border-purple-500/40 transition duration-300"
            >
              {/* Category Title */}
              <h2 className="text-2xl font-semibold text-transparent bg-gradient-to-r 
                             from-purple-400 to-pink-500 bg-clip-text mb-5">
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
                    className="bg-black/40 p-4 rounded-xl border border-white/10
                               hover:border-purple-500 hover:shadow-[0_0_20px_rgba(150,0,255,0.4)]
                               backdrop-blur-xl transition"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
                      <span className="text-gray-400 text-sm">{skill.level}%</span>
                    </div>

                    {/* Animated Skill Bar */}
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.2, delay: i * 0.15 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
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
