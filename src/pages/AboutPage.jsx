import SectionTitle from "../assets/components/Sectiontitle";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 }
};

export default function AboutPage() {
  return (
    <div className="pb-32 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-700/40 blur-[200px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-600/40 blur-[220px] -z-10" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: [0, 1, 0],
              y: [-10, -40, -10],
              x: Math.random() * 40 - 20
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%"
            }}
          />
        ))}
      </div>

      <SectionTitle title="About Me" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">

        {/* LEFT SIDE — 3D CARD */}
        <Tilt tiltMaxAngleX={12} tiltMaxAngleY={12} scale={1.05} transitionSpeed={1800}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative bg-white/10 rounded-3xl border border-white/10 
                       shadow-[0_0_55px_rgba(170,0,255,0.35)] 
                       backdrop-blur-xl p-10"
          >
            {/* Profile Image */}
            <div className="relative flex justify-center">
              <div className="w-56 h-56 rounded-full overflow-hidden 
                              border-4 border-purple-400 shadow-[0_0_40px_rgba(160,0,255,0.5)]">
                <img
                  src="/Gulrez.png"
                  alt="Gulrez Sarankar"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <h2 className="text-3xl mt-8 font-bold text-center bg-gradient-to-r 
                           from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Gulrez Sarankar
            </h2>

            <p className="text-center text-gray-300 mt-2">
              Java Backend Developer
            </p>

            <p className="text-gray-400 mt-6 text-center leading-relaxed">
              I build secure and scalable backend systems using Spring Boot, 
              MySQL, MongoDB, and modern backend architecture.
            </p>
          </motion.div>
        </Tilt>

        {/* RIGHT SIDE — CONTENT */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.25 } } }}
        >

          {/* WHO AM I */}
          <motion.div variants={fadeUp}>
            <h3 className="text-3xl font-bold bg-gradient-to-r 
                           from-purple-400 to-pink-400 bg-clip-text text-transparent">
              👋 Who Am I?
            </h3>
            <p className="text-gray-300 mt-4 leading-relaxed">
              I'm a passionate <span className="text-purple-300 font-semibold">Java Developer</span>
              skilled in building powerful backend systems, REST APIs, and optimized SQL databases.
            </p>
          </motion.div>

          {/* DIVIDER */}
          <div className="w-full h-[2px] bg-gradient-to-r from-purple-500/40 to-pink-500/40 my-8" />

          {/* SKILL BARS */}
          <motion.div variants={fadeUp}>
            <h3 className="text-3xl font-bold text-purple-300">🧰 Technical Skills</h3>

            <div className="mt-6 space-y-6">
              {[
                { name: "Java", level: 90 },
                { name: "Spring Boot", level: 85 },
                { name: "MySQL", level: 80 },
                { name: "MongoDB", level: 75 },
                { name: "Hibernate / JPA", level: 80 },
                { name: "React.js", level: 70 }
              ].map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-gray-300 mb-1">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.2, delay: i * 0.15 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* DIVIDER */}
          <div className="w-full h-[2px] bg-gradient-to-r from-pink-500/40 to-purple-500/40 my-10" />

          {/* TIMELINE */}
          <motion.div variants={fadeUp}>
            <h3 className="text-3xl font-bold text-purple-300 mb-4">🚀 My Journey</h3>

            <div className="space-y-6">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-purple-400"
              >
                <h4 className="font-semibold text-purple-300">
                  🎓 M.Sc Computer Science
                </h4>
                <p className="text-gray-400 text-sm">2024 – 2026</p>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-pink-400"
              >
                <h4 className="font-semibold text-pink-300">
                  🎓 B.Sc IT — Information Technology
                </h4>
                <p className="text-gray-400 text-sm">2021 – 2024</p>
              </motion.div>
            </div>
          </motion.div>

          {/* GOALS */}
          <motion.div variants={fadeUp} className="mt-10">
            <h3 className="text-3xl font-bold text-purple-300 mb-4">🎯 Current Goals</h3>

            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Master Microservices & Distributed Systems</li>
              <li>Spring Security + JWT Full Expertise</li>
              <li>Docker + Kubernetes Deployment</li>
              <li>AWS Cloud Architecture</li>
            </ul>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
