import { motion } from "framer-motion";
import {
  FaArrowUpRightFromSquare,
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaServer,
  FaCheck,
} from "react-icons/fa6";
import { SiSpringboot, SiReact } from "react-icons/si";

export default function Hero() {
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSec = document.querySelector("#contact");
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/contact";
    }
  };

  const scrollToProjects = (e) => {
    e.preventDefault();
    const projectsSec = document.querySelector("#projects");
    if (projectsSec) {
      projectsSec.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/projects";
    }
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#080612] bg-grid-pattern pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-32"
    >
      {/* Ambient Violet & Purple Radial Backlights */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#9B5CFF]/20 via-[#D66BFF]/10 to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-[#9B5CFF]/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[350px] w-[350px] rounded-full bg-[#7928CA]/15 blur-[100px]" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">

          {/* ================================================================
              LEFT COLUMN: Personal Branding, Pitch, CTAs & Social Links
              ================================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-left"
          >
            {/* Status Pill Greeting */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(155,92,255,0.3)] bg-[rgba(155,92,255,0.08)] px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(155,92,255,0.15)] mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9B5CFF] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#9B5CFF]" />
              </span>
              <span className="text-xs sm:text-sm font-medium tracking-wide text-white">
                👋 Hey there, I'm
              </span>
            </motion.div>

            {/* Animated Name & Headline */}
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.08]">
              Gulrez <br className="hidden sm:inline" />
              <span className="purple-gradient-text">Sarankar</span>
            </h1>

            {/* Position & Specialization Tagline */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#E5E0F8]">
                Software Engineer
              </span>
              <span className="text-xl sm:text-2xl text-[#9B5CFF]">&amp;</span>
              <span className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold purple-accent-text">
                Freelance Developer
              </span>
            </div>

            {/* High-Impact Elevator Pitch */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#AAA5B8] sm:text-lg">
              Specializing in high-throughput <strong className="text-white font-semibold">Java &amp; Spring Boot</strong> enterprise backend architectures and modern <strong className="text-white font-semibold">Full-Stack Web Development</strong>. 2+ years of professional engineering experience building mission-critical APIs, distributed systems, and converting complex requirements into performant digital products.
            </p>

            {/* Core Capability Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs text-[#E5E0F8]">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5 backdrop-blur-md">
                <FaCheck className="text-[#9B5CFF] text-[10px]" /> Spring Boot Microservices
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5 backdrop-blur-md">
                <FaCheck className="text-[#D66BFF] text-[10px]" /> PostgreSQL &amp; Redis Caching
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5 backdrop-blur-md">
                <FaCheck className="text-[#9B5CFF] text-[10px]" /> React.js &amp; TypeScript
              </span>
            </div>

            {/* CTAs: Hire Me & View My Work */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#contact"
                onClick={scrollToContact}
                className="btn-primary-purple text-sm sm:text-base py-3 px-6 sm:px-7 shadow-[0_0_25px_rgba(155,92,255,0.45)]"
              >
                <span>Hire Me for Your Project</span>
                <FaArrowUpRightFromSquare className="text-xs" />
              </a>

              <a
                href="#projects"
                onClick={scrollToProjects}
                className="btn-secondary-glass text-sm sm:text-base py-3 px-6 sm:px-7"
              >
                <span>View My Work</span>
                <FaArrowRight className="text-xs text-[#D66BFF]" />
              </a>
            </div>

            {/* Direct Social Channels */}
            <div className="mt-10 pt-8 border-t border-[rgba(255,255,255,0.10)] flex flex-wrap items-center gap-4 sm:gap-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#7E7893]">
                Connect Directly:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/gulrezsarankar"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] text-base text-[#AAA5B8] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#9B5CFF] hover:bg-[rgba(155,92,255,0.18)] hover:text-white"
                  title="GitHub"
                >
                  <FaGithub />
                </a>

                <a
                  href="https://linkedin.com/in/gulrez-sarankar"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] text-base text-[#AAA5B8] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#9B5CFF] hover:bg-[rgba(155,92,255,0.18)] hover:text-white"
                  title="LinkedIn"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="https://wa.me/918421090063"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp Message"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] text-base text-[#AAA5B8] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#10B981] hover:bg-emerald-500/20 hover:text-emerald-400"
                  title="WhatsApp (+91 8421090063)"
                >
                  <FaWhatsapp />
                </a>

                <a
                  href="mailto:gulrezsarankar24@gmail.com"
                  aria-label="Email Gulrez"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] text-base text-[#AAA5B8] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#D66BFF] hover:bg-[rgba(214,107,255,0.18)] hover:text-white"
                  title="gulrezsarankar24@gmail.com"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </motion.div>

          {/* ================================================================
              RIGHT COLUMN: Profile Photo with Ambient Violet Glow & Floating Cards
              ================================================================ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Violet Ambient Backlight Sphere */}
            <div className="absolute inset-0 m-auto h-[320px] w-[320px] sm:h-[400px] sm:w-[400px] rounded-full bg-gradient-to-tr from-[#9B5CFF]/30 to-[#D66BFF]/25 blur-[70px] pointer-events-none" />

            {/* Main Portrait Glass Card Frame */}
            <div className="relative group p-2 rounded-3xl border border-[rgba(255,255,255,0.15)] bg-gradient-to-b from-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0.02)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {/* Inner Decorative Border */}
              <div className="relative overflow-hidden rounded-[22px] bg-[#100B20] max-w-[340px] sm:max-w-[380px]">
                <img
                  src="/Gulrez.png"
                  alt="Gulrez Sarankar — Software Engineer & Freelance Developer"
                  className="w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                  width="380"
                  height="450"
                />

                {/* Bottom Gradient Overlay on Image for seamless blending */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080612] via-[#080612]/60 to-transparent" />

                {/* Image Label Overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div>
                    <p className="font-heading text-sm font-bold text-white">
                      Gulrez Sarankar
                    </p>
                    <p className="text-[11px] font-medium text-[#D66BFF]">
                      ISEES Technologies LLP
                    </p>
                  </div>
                  <span className="flex h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-[#080612] shadow-[0_0_10px_#10B981]" />
                </div>
              </div>

              {/* ============================================================
                  FLOATING GLASS CARD 1: 2+ Years Experience (Top Left)
                  ============================================================ */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-6 sm:-left-8 rounded-2xl border border-[rgba(255,255,255,0.18)] bg-[rgba(16,11,32,0.85)] p-3 sm:p-3.5 backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,0.5)] flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#9B5CFF] to-[#7928CA] text-white shadow-[0_0_15px_rgba(155,92,255,0.4)]">
                  <FaServer className="text-base" />
                </div>
                <div>
                  <p className="font-heading text-base sm:text-lg font-bold text-white leading-none">
                    2+ Years
                  </p>
                  <p className="text-[10px] sm:text-xs font-medium text-[#AAA5B8] mt-0.5">
                    Engineering Experience
                  </p>
                </div>
              </motion.div>

              {/* ============================================================
                  FLOATING GLASS CARD 2: Java & Spring Boot Architect (Bottom Right)
                  ============================================================ */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute -bottom-5 -right-6 sm:-right-8 rounded-2xl border border-[rgba(255,255,255,0.18)] bg-[rgba(16,11,32,0.85)] p-3 sm:p-3.5 backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,0.5)] flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#10B981] to-[#047857] text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <SiSpringboot className="text-lg" />
                </div>
                <div>
                  <p className="font-heading text-xs sm:text-sm font-bold text-white leading-none">
                    Spring Boot Architect
                  </p>
                  <p className="text-[10px] sm:text-xs font-medium text-[#AAA5B8] mt-0.5">
                    REST APIs &amp; Microservices
                  </p>
                </div>
              </motion.div>

              {/* ============================================================
                  FLOATING GLASS CARD 3: Full-Stack Web Solutions (Mid Right)
                  ============================================================ */}
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="hidden sm:flex absolute top-1/2 -right-12 -translate-y-1/2 rounded-2xl border border-[rgba(255,255,255,0.18)] bg-[rgba(16,11,32,0.85)] px-3 py-2 backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,0.5)] items-center gap-2"
              >
                <SiReact className="text-[#61DAFB] text-base animate-spin" style={{ animationDuration: "12s" }} />
                <span className="text-[11px] font-semibold text-white">
                  Full-Stack Architecture
                </span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
