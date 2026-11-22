import { motion } from "framer-motion";
import { FaBriefcase, FaCodeBranch, FaServer, FaCircleCheck } from "react-icons/fa6";

const stats = [
  {
    number: "2+",
    label: "Years Experience",
    subtext: "Enterprise & Freelance",
    icon: <FaBriefcase className="text-[#9B5CFF]" />,
  },
  {
    number: "10+",
    label: "Production Deployments",
    subtext: "Enterprise & Client Apps",
    icon: <FaCodeBranch className="text-[#D66BFF]" />,
  },
  {
    number: "300+",
    label: "REST APIs Engineered",
    subtext: "Secured & Documented",
    icon: <FaServer className="text-[#9B5CFF]" />,
  },
  {
    number: "99.9%",
    label: "Production Reliability",
    subtext: "Zero Concurrency Collisions",
    icon: <FaCircleCheck className="text-emerald-400" />,
  },
];

export default function Stats() {
  return (
    <section className="relative z-10 border-y border-[rgba(255,255,255,0.08)] bg-[#100B20]/80 backdrop-blur-md py-8 sm:py-10">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-4 lg:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-card group flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 hover:border-[rgba(155,92,255,0.4)]"
            >
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-[rgba(155,92,255,0.25)] bg-[rgba(155,92,255,0.10)] text-base sm:text-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(155,92,255,0.3)]">
                {stat.icon}
              </div>
              <div>
                <div className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#E5E0F8] leading-tight mt-0.5">
                  {stat.label}
                </div>
                <div className="text-[10px] sm:text-[11px] font-medium text-[#AAA5B8] mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
