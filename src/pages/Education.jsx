import { useEffect, useRef } from "react";
import SectionTitle from "../assets/components/Sectiontitle";
import { motion, useAnimation } from "framer-motion";
import { FaUniversity, FaGraduationCap } from "react-icons/fa";

const itemVariant = {
  hidden: { opacity: 0, y: 50 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.7 },
  }),
};

export default function Education() {
  const controls = useAnimation();
  const scrollRef = useRef(null);

  useEffect(() => {
    const element = scrollRef.current;

    const handleScroll = () => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const screenHeight = window.innerHeight;

      const progress = Math.min(
        1,
        Math.max(0, (screenHeight - rect.top) / (screenHeight + rect.height))
      );

      controls.start({
        height: `${progress * 100}%`,
        transition: { duration: 0.2 },
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const educationData = [
    {
      title: "Master of Science in Computer Science (M.Sc CS)",
      year: "2024 – 2026 (Expected)",
      gpa: "-- CGPA (Current)",
      color: "purple",
      icon: <FaGraduationCap className="text-purple-300 text-4xl" />,
      desc: "Advanced postgraduate program focusing on algorithms, AI, cloud computing, system design, and enterprise-level application development.",
      subjects: [
        "Advanced Algorithms",
        "Cloud Computing",
        "Artificial Intelligence",
        "Advanced DBMS",
        "Data Analytics",
        "System Design",
      ],
    },
    {
      title: "Bachelor of Science in Information Technology (B.Sc IT)",
      year: "2019 – 2021",
      gpa: "8.14 CGPA",
      color: "pink",
      icon: <FaUniversity className="text-pink-300 text-4xl" />,
      desc: "A strong foundation in IT including programming, networking, databases, cybersecurity and full-stack web development.",
      subjects: [
        "Networking",
        "DBMS",
        "Operating Systems",
        "Software Engineering",
        "Java Programming",
        "Web Development",
      ],
    },
  ];

  return (
    <div className="pb-24 relative overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-[260px] h-[260px] bg-purple-700 blur-[150px] opacity-30 -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-pink-600 blur-[180px] opacity-30 -z-10" />

      <SectionTitle title="Education" />

      <div className="max-w-5xl mx-auto mt-16 relative" ref={scrollRef}>

        {/* Static Timeline */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[3px] bg-white/10 rounded-full" />

        {/* Scroll Fill Line */}
        <motion.div
          animate={controls}
          className="absolute left-1/2 transform -translate-x-1/2 w-[3px]
                     bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 rounded-full"
        />

        {/* Timeline Items */}
        <div className="space-y-28 relative">
          {educationData.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariant}
              initial="hidden"
              animate="show"
              custom={i}
              className={`flex flex-col md:flex-row ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              } items-center gap-6 relative`}
            >

              {/* Timeline Dot */}
              <div
                className={`w-7 h-7 rounded-full border-4 shadow-xl z-20
                ${
                  item.color === "purple"
                    ? "bg-purple-400 border-purple-700 shadow-purple-500/40"
                    : "bg-pink-400 border-pink-700 shadow-pink-500/40"
                }`}
              />

              {/* Card */}
              <div className="bg-white/5 p-7 rounded-xl border border-white/10 backdrop-blur-xl 
                              shadow-lg hover:border-purple-500/40 hover:shadow-purple-500/20 
                              transition-all duration-300 md:w-[70%]">

                {/* Icon */}
                <div className="flex justify-center mb-2">{item.icon}</div>

                {/* YEAR BADGE */}
                <div
                  className="mx-auto mb-3 inline-block px-5 py-1 rounded-full text-sm font-semibold
                             bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white
                             shadow-lg shadow-purple-500/30 hover:shadow-pink-500/40 
                             transition-all duration-300"
                >
                  {item.year}
                </div>

                {/* GPA BADGE */}
                <div className="mx-auto mb-4 inline-block px-4 py-1 rounded-full text-xs 
                                bg-white/10 border border-white/20 text-gray-200 shadow-md">
                  ⭐ <span className="font-semibold">{item.gpa}</span>
                </div>

                {/* Title */}
                <h3
                  className={`text-2xl font-semibold text-center ${
                    item.color === "purple" ? "text-purple-300" : "text-pink-300"
                  }`}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mt-3 text-center leading-relaxed">
                  {item.desc}
                </p>

                {/* SUBJECTS */}
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {item.subjects.map((sub, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs rounded-lg bg-white/10 border border-white/10 
                                 text-gray-300 hover:bg-purple-500/20 transition"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
