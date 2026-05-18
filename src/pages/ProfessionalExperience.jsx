import { motion } from "framer-motion";
import SectionTitle from "../assets/components/Sectiontitle";
import { FaCode } from "react-icons/fa";

const experienceItems = [
  {
    title: "Associate Software Engineer",
    company: "Isees Technologies LLP",
    period: "September 2025 – Present",
    icon: <FaCode className="text-purple-300 text-2xl md:text-3xl" />,
    summary:
      "Java Developer specializing in backend development using Spring Boot, REST APIs, and database-driven applications with MongoDB and MySQL.",
    bullets: [
      "Developed and maintained scalable RESTful APIs using Java and Spring Boot.",
      "Implemented authentication and authorization using JWT and Spring Security.",
      "Designed backend modules for order processing and inventory management systems.",
      "Optimized database queries and caching strategies, improving API performance by 32%.",
      "Integrated MongoDB and MySQL databases for efficient data handling and storage.",
      "Collaborated with frontend developers and QA teams to deliver high-quality releases on schedule.",
    ],
  },
];

export default function ProfessionalExperience() {
  return (
    <div className="pb-24 pt-12 relative overflow-hidden bg-slate-950 text-white">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-purple-700 blur-[150px] opacity-20 -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-blue-500 blur-[150px] opacity-15 -z-10 pointer-events-none" />

      <SectionTitle title="Professional Experience" />

      <div className="max-w-5xl mx-auto mt-16 relative px-6">
        {/* Subtle Vertical Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-2 h-full w-[2px] bg-gradient-to-b from-purple-500/50 via-blue-500/30 to-transparent transform md:-translate-x-1/2" />

        <div className="space-y-16">
          {experienceItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`relative flex flex-col md:flex-row items-start grid-cols-2 md:gap-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              
              {/* Timeline Center Node / Icon */}
              <div className="absolute left-0 md:left-1/2 z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 border border-white/10 shadow-[0_0_20px_rgba(168,85,247,0.15)] transform -translate-x-0 md:-translate-x-1/2 transition-all duration-300 hover:border-purple-400/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]">
                {item.icon}
              </div>

              {/* Content Card Wrapper for Center Alignment */}
              <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <div className="group relative bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300">
                  
                  {/* Company & Date Meta */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-sm uppercase tracking-wider text-purple-400 font-semibold mb-2">
                    <span>{item.company}</span>
                    <span className="text-white/30">•</span>
                    <span className="text-gray-400 font-medium normal-case">{item.period}</span>
                  </div>

                  {/* Job Title */}
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm md:text-base text-gray-400 mt-3 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Bullet Points */}
                  <ul className="mt-6 space-y-3 list-disc list-outside pl-5 text-sm md:text-base text-gray-300 marker:text-purple-400">
                    {item.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="leading-relaxed pl-1">
                        {bullet}
                      </li>
                    ))}
                  </ul>

                </div>
              </div>

              {/* Invisible spacer element to preserve perfect layout on desktop center split */}
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}