import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import Tilt from "react-parallax-tilt";
import Typewriter from "typewriter-effect";
import { FaJava, FaGithub, FaLinkedin, FaDownload, FaCode } from "react-icons/fa";
import { SiSpringboot, SiMongodb, SiMysql, SiPostman } from "react-icons/si";

export default function Hero() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening");
  }, []);

  const particles = useMemo(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      duration: Math.random() * 5 + 4,
    })), []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center pt-20 pb-10 md:py-0 px-4 md:px-10 lg:px-24 overflow-hidden bg-[#05000a]">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-600/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            animate={{ opacity: [0, 1, 0], y: [0, -40, 0] }}
            transition={{ duration: p.duration, repeat: Infinity }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: p.left, top: p.top }}
          />
        ))}
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 z-10">
        
        {/* --- LEFT: BIG IMAGE SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-start relative"
        >
          {/* Tech Badges Floating */}
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-6 -right-4 z-30 bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 hidden md:block">
            <SiSpringboot className="text-green-400 text-3xl" />
          </motion.div>
          
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-10 -left-6 z-30 bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 hidden md:block">
            <FaJava className="text-orange-400 text-4xl" />
          </motion.div>

          <Tilt tiltMaxAngleX={7} tiltMaxAngleY={7} scale={1.02} className="z-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              
              <div className="relative w-[290px] h-[400px] md:w-[420px] md:h-[580px] bg-[#0a0010] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="/Gulrez New.png" 
                  alt="Gulrez Sarankar" 
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700"
                />
                
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-bold text-lg">Gulrez Sarankar</p>
                      <p className="text-purple-400 text-xs uppercase tracking-widest font-mono">Backend Architect</p>
                    </div>
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <FaCode className="text-purple-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        </motion.div>

        {/* --- RIGHT: TEXT CONTENT SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <div className="flex items-center gap-3 justify-center lg:justify-start mb-6">
            <span className="w-10 h-[1px] bg-purple-500"></span>
            <p className="text-purple-400 font-mono tracking-widest text-xs uppercase">
              {greeting}
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
            CRAFTING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500">
              SOLUTIONS
            </span>
          </h1>

          <div className="mt-6 text-xl md:text-3xl font-medium text-gray-300">
            <Typewriter
              options={{
                strings: ["Java Specialist", "Spring Boot Expert", "Database Architect"],
                autoStart: true, loop: true, deleteSpeed: 50,
              }}
            />
          </div>

          <p className="mt-8 text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
            I specialize in building <span className="text-white">secure, scalable backend systems</span> that power 
            modern digital experiences.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 mt-12 justify-center lg:justify-start">
            <motion.a 
              href="mailto:gulrez@example.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-10 py-4 rounded-2xl font-bold text-center transition-all shadow-xl"
            >
              Get In Touch
            </motion.a>
            
            <motion.a 
              href="/Gulrez-Resume.pdf"
              className="border border-white/20 px-10 py-4 rounded-2xl font-bold text-white text-center flex items-center justify-center gap-2 transition-all"
            >
              <FaDownload size={14}/> Download CV
            </motion.a>
          </div>

          {/* Fixed Social Icons - Now using FaGithub and FaLinkedin */}
          <div className="mt-12 flex justify-center lg:justify-start gap-6 text-3xl">
            <a href="https://github.com/gulrezsarankar" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-all">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/gulrez-sarankar" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-400 transition-all">
              <FaLinkedin />
            </a>
          </div>

          {/* Mini Tech Stack Row */}
          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6 text-2xl text-gray-700">
            <SiSpringboot className="hover:text-green-500 transition-all cursor-help" title="Spring Boot" />
            <SiMongodb className="hover:text-green-600 transition-all cursor-help" title="MongoDB" />
            <SiMysql className="hover:text-blue-500 transition-all cursor-help" title="MySQL" />
            <SiPostman className="hover:text-orange-500 transition-all cursor-help" title="Postman" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}