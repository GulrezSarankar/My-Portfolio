import { FaJava, FaDocker, FaGitAlt, FaGithub, FaAws, FaServer } from "react-icons/fa6";
import { SiSpringboot, SiSpringsecurity, SiHibernate, SiPostgresql, SiMysql, SiRedis, SiReact } from "react-icons/si";

const techItems = [
  { name: "Java", icon: <FaJava className="text-[#E51F24]" /> },
  { name: "Spring Boot", icon: <SiSpringboot className="text-[#6DB33F]" /> },
  { name: "Spring Security", icon: <SiSpringsecurity className="text-[#6DB33F]" /> },
  { name: "Hibernate", icon: <SiHibernate className="text-[#59666C]" /> },
  { name: "JPA", icon: <FaServer className="text-[var(--accent-primary)]" /> },
  { name: "REST APIs", icon: <FaServer className="text-[#60A5FA]" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
  { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
  { name: "Redis", icon: <SiRedis className="text-[#DC382D]" /> },
  { name: "Docker", icon: <FaDocker className="text-[#2496ED]" /> },
  { name: "Git", icon: <FaGitAlt className="text-[#F05032]" /> },
  { name: "GitHub", icon: <FaGithub className="text-[var(--text-primary)]" /> },
  { name: "AWS", icon: <FaAws className="text-[#FF9900]" /> },
  { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
];

export default function TechOrbit() {
  return (
    <section className="bg-[var(--bg-main)] py-8 border-b border-[var(--border-color)] overflow-hidden transition-colors duration-300">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 mb-4 text-center">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          TECHNICAL CAPABILITY STRIP
        </span>
      </div>

      {/* Marquee Track with Pause on Hover */}
      <div className="marquee-container relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee gap-3 sm:gap-4">
          {[...techItems, ...techItems].map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="theme-card flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-bold text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--accent-primary)] hover:bg-[var(--bg-hover)]"
            >
              <span className="text-sm sm:text-base">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
