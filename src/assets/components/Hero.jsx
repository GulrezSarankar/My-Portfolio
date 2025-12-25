import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import Typewriter from "typewriter-effect";


import { FaJava, FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import { SiPostman, SiJavascript, SiMongodb } from "react-icons/si";

// Animation
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  const [greeting, setGreeting] = useState("");

  // Auto Greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning ☀️");
    else if (hour < 17) setGreeting("Good Afternoon 🌤️");
    else setGreeting("Good Evening 🌙");
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center gap-16 px-6 overflow-hidden">

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#18001b] via-[#0c001b] to-black"></div>

      {/* Background Blobs */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-purple-700/40 blur-[180px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-fuchsia-600/40 blur-[200px] rounded-full"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0, 1, 0],
              y: [-20, -50, -20],
              x: Math.random() * 40 - 20,
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      {/* LEFT — PHOTO + ORBIT */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative md:w-1/2 flex justify-center"
      >
        {/* Rotating Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute w-[380px] h-[380px] rounded-full border border-purple-500/40 shadow-[0_0_60px_#a855f7]"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute w-[460px] h-[460px] rounded-full border border-pink-500/30 shadow-[0_0_90px_#ec4899]"
        />

        {/* Orbit Icons */}
        <div className="absolute w-[450px] h-[450px] animate-slow-spin">
          <div className="absolute top-0 left-1/2 -ml-6 text-purple-300 text-4xl">
            <FaJava />
          </div>
          <div className="absolute bottom-10 right-0 text-green-300 text-4xl">
            <SiMongodb />
          </div>
          <div className="absolute left-0 top-1/2 text-yellow-300 text-4xl">
            <SiJavascript />
          </div>
          <div className="absolute right-0 top-1/2 text-orange-400 text-4xl">
            <SiPostman />
          </div>
        </div>

        {/* Profile Image */}
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.04}>
          <div className="relative w-72 h-72 md:w-[330px] md:h-[330px] rounded-full overflow-hidden border-4 border-purple-500/50 shadow-[0_0_80px_#a855f7] z-20">
            <img src="/Gulrez.png" alt="Gulrez" className="w-full h-full object-cover" />
          </div>
        </Tilt>
      </motion.div>

      {/* RIGHT — CONTENT */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="md:w-1/2 text-center md:text-left z-20 max-w-xl"
      >
        {/* Greeting */}
        <motion.div
          variants={fadeUp}
          className="inline-block mb-4 px-5 py-2 bg-white/5 backdrop-blur-lg rounded-xl border border-purple-400/20 text-purple-300 shadow-lg"
        >
          🤖 {greeting}, Welcome to my Portfolio!
        </motion.div>

        {/* Name */}
        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold leading-tight">
          I'm{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Gulrez Sarankar
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div variants={fadeUp} className="mt-3 text-3xl text-purple-300 font-semibold">
          <Typewriter
            options={{
              strings: [
                "Java Developer",
                "Spring Boot Specialist",
                "Backend Engineer",
                "REST API Architect",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </motion.div>

        {/* Summary */}
        <motion.p variants={fadeUp} className="mt-6 text-gray-300 leading-relaxed text-lg">
          I build secure, scalable{" "}
          <span className="text-purple-400 font-semibold">Spring Boot</span> applications,
          optimized{" "}
          <span className="text-purple-400 font-semibold">MySQL databases</span>, and
          modern backend architectures.
        </motion.p>

        {/* Experience */}
        <motion.div
          variants={fadeUp}
          className="mt-6 inline-block px-6 py-3 bg-black/40 border border-purple-500/30 rounded-xl backdrop-blur-xl text-purple-300 font-semibold"
        >
          🚀 8+ Months Experience in Backend Development
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap gap-4 mt-10 justify-center md:justify-start"
        >
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary px-7 py-3 rounded-xl text-lg font-medium hover:bg-purple-600 transition shadow-lg"
          >
            View My Work
          </motion.a>

          <motion.a
            href="/Gulrez-Sarankar.pdf"
            download
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-3 rounded-xl text-lg border border-primary hover:bg-primary/20 transition flex items-center gap-2 shadow-lg"
          >
            <FaDownload /> Download Resume
          </motion.a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          variants={fadeUp}
          className="flex gap-6 mt-10 text-3xl text-gray-300 justify-center md:justify-start"
        >
          <a href="https://github.com/gulrezsarankar" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition">
            <FaGithub />
          </a>

          <a href="https://linkedin.com/in/gulrezsarankar" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition">
            <FaLinkedin />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-10 text-gray-300 text-sm opacity-70"
      >
        <div className="flex flex-col items-center">
          <span>Scroll Down</span>
          <span className="text-2xl">⬇</span>
        </div>
      </motion.div>
    </section>
  );
}
