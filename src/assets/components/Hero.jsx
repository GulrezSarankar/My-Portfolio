import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import Typewriter from "typewriter-effect";
import { FaArrowRight, FaCheckCircle, FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiMongodb, SiMysql, SiPostman, SiSpringboot } from "react-icons/si";
import { Link } from "react-router-dom";

export default function Hero() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening");
  }, []);

  const highlights = ["Java", "Spring Boot", "REST APIs", "SQL", "MongoDB"];
  const proof = [
    { label: "API delivered", value: "300+" },
    { label: "Projects", value: "15+" },
    { label: "Performance", value: "Excellent" },
  ];

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="text-center lg:text-left"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold text-muted" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--success)" }} />
            {greeting}, available for freelance and backend roles
          </div>

          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-heading sm:text-6xl lg:text-7xl">
            Backend-focused software engineer for scalable web applications.
          </h1>

          <div className="mt-6 text-xl font-semibold text-muted md:text-2xl">
            <Typewriter
              options={{
                strings: ["Java Developer", "Spring Boot Engineer", "Database-focused Builder"],
                autoStart: true,
                loop: true,
                deleteSpeed: 45,
              }}
            />
          </div>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted md:text-lg lg:mx-0">
            I turn product requirements into secure APIs, clean database models, and responsive React
            experiences that are simple to maintain after handover.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Link to="/freelance" className="primary-button px-6 py-4">
              Hire Me <FaArrowRight className="text-sm" />
            </Link>
            <a href="/Gulrez-Sarankar.pdf" className="secondary-button px-6 py-4">
              <FaDownload className="text-sm" /> Download CV
            </a>
          </div>

          <div className="mt-9 grid max-w-xl grid-cols-3 gap-3 lg:mx-0">
            {proof.map((item) => (
              <div key={item.label} className="surface-card rounded-2xl p-4 text-left">
                <p className="text-2xl font-black accent-text">{item.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-soft">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
            {highlights.map((item) => (
              <span key={item} className="rounded-full px-4 py-2 text-sm font-bold accent-soft accent-text">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-9 flex justify-center gap-4 text-2xl lg:justify-start">
            <a href="https://github.com/gulrezsarankar" target="_blank" rel="noreferrer" className="text-soft transition hover:accent-text" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/gulrez-sarankar" target="_blank" rel="noreferrer" className="text-soft transition hover:accent-text" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="relative flex justify-center"
        >
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.01} className="w-full max-w-md">
            <div className="surface-card premium-card overflow-hidden rounded-3xl p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src="/Gulrez New.png"
                  alt="Gulrez Sarankar"
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl p-4" style={{ background: "rgba(15, 23, 42, 0.78)", color: "#fff", backdropFilter: "blur(16px)" }}>
                  <p className="text-lg font-extrabold">Gulrez Sarankar</p>
                  <p className="text-sm text-slate-200">Associate Software Engineer</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-3">
                {[SiSpringboot, SiMongodb, SiMysql, SiPostman].map((Icon, index) => (
                  <div key={index} className="surface-flat flex aspect-square items-center justify-center rounded-2xl text-2xl accent-text">
                    <Icon />
                  </div>
                ))}
              </div>

              <div className="relative z-10 mt-4 rounded-2xl p-5" style={{ background: "var(--surface-muted)" }}>
                <p className="mb-3 text-sm font-extrabold text-heading">Currently focused on</p>
                {["API architecture", "Database performance", "Secure authentication"].map((item) => (
                  <div key={item} className="mt-2 flex items-center gap-2 text-sm font-semibold text-muted">
                    <FaCheckCircle className="accent-text" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
}
