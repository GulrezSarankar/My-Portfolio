import { FaJava, FaDocker, FaGitAlt } from "react-icons/fa6";
import {
  SiSpringboot,
  SiHibernate,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFastapi,
} from "react-icons/si";

const techItems = [
  { name: "Java", category: "Core Backend", icon: <FaJava className="text-[#E51F24]" />, glow: "hover:border-red-500/40" },
  { name: "Spring Boot", category: "Framework", icon: <SiSpringboot className="text-[#6DB33F]" />, glow: "hover:border-emerald-500/40" },
  { name: "React.js", category: "Frontend", icon: <SiReact className="text-[#61DAFB]" />, glow: "hover:border-cyan-500/40" },
  { name: "PostgreSQL", category: "Database", icon: <SiPostgresql className="text-[#4169E1]" />, glow: "hover:border-blue-500/40" },
  { name: "Hibernate & JPA", category: "ORM", icon: <SiHibernate className="text-[#59666C]" />, glow: "hover:border-gray-400/40" },
  { name: "Docker", category: "DevOps", icon: <FaDocker className="text-[#2496ED]" />, glow: "hover:border-sky-500/40" },
  { name: "Git & GitHub", category: "VCS", icon: <FaGitAlt className="text-[#F05032]" />, glow: "hover:border-orange-500/40" },
  { name: "TypeScript", category: "Typed UI", icon: <SiTypescript className="text-[#3178C6]" />, glow: "hover:border-blue-500/40" },
  { name: "Tailwind CSS", category: "Styling", icon: <SiTailwindcss className="text-[#06B6D4]" />, glow: "hover:border-teal-500/40" },
  { name: "Python / FastAPI", category: "Async API", icon: <SiFastapi className="text-[#009688]" />, glow: "hover:border-emerald-500/40" },
  { name: "MySQL", category: "Relational DB", icon: <SiMysql className="text-[#4479A1]" />, glow: "hover:border-blue-500/40" },
  { name: "Redis", category: "In-Memory Cache", icon: <SiRedis className="text-[#DC382D]" />, glow: "hover:border-red-500/40" },
];

export default function TechOrbit() {
  return (
    <section className="relative overflow-hidden bg-[#080612] py-8 border-b border-[rgba(255,255,255,0.08)]">
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-24 w-96 -translate-x-1/2 rounded-full bg-[#9B5CFF]/10 blur-3xl" />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-[#9B5CFF] shadow-[0_0_8px_#9B5CFF]" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#AAA5B8]">
            CORE TECHNOLOGY STACK
          </span>
        </div>
        <span className="text-[11px] font-medium text-[#7E7893] hidden sm:inline">
          Hover to inspect • Continuous live pipeline
        </span>
      </div>

      {/* Marquee Track with Pause on Hover */}
      <div className="marquee-container relative w-full overflow-hidden">
        {/* Subtle Side Fade Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 sm:w-24 bg-gradient-to-r from-[#080612] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 sm:w-24 bg-gradient-to-l from-[#080612] to-transparent" />

        <div className="flex w-max animate-marquee gap-3 sm:gap-4 py-1">
          {[...techItems, ...techItems].map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className={`glass-panel flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[rgba(155,92,255,0.12)] hover:shadow-[0_0_20px_rgba(155,92,255,0.25)] ${item.glow}`}
            >
              <span className="text-base sm:text-lg">{item.icon}</span>
              <div className="flex flex-col text-left">
                <span className="leading-tight">{item.name}</span>
                <span className="text-[10px] font-normal text-[#AAA5B8]">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
