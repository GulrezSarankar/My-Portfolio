import { motion } from "framer-motion";
import {
  SiJavascript,
  SiPostman,
  SiMongodb,
  SiSpringboot,
  SiMysql,
} from "react-icons/si";

export default function TechOrbit() {
  const icons = [
    { icon: <SiJavascript className="text-yellow-400" />, angle: 0 },
    { icon: <SiPostman className="text-orange-400" />, angle: 60 },
    { icon: <SiSpringboot className="text-green-400" />, angle: 120 },
    { icon: <SiMysql className="text-blue-400" />, angle: 180 },
    { icon: <SiMongodb className="text-green-500" />, angle: 240 },
    { icon: <SiJavascript className="text-yellow-400" />, angle: 300 },
  ];

  return (
    <div className="relative flex justify-center items-center py-20">

      {/* GLOW CIRCLE */}
      <div className="absolute w-[380px] h-[380px] md:w-[480px] md:h-[480px] rounded-full 
                      bg-purple-700/20 blur-[90px]"></div>

      {/* ORBIT RING */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] 
                   border-[2px] border-purple-500/30 rounded-full"
      >
        {/* ICONS IN PERFECT CIRCLE */}
        {icons.map((item, index) => {
          const radius = 150; // circle radius
          const x = radius * Math.cos((item.angle * Math.PI) / 180);
          const y = radius * Math.sin((item.angle * Math.PI) / 180);

          return (
            <motion.div
              key={index}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
              }}
              whileHover={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="text-4xl p-3 rounded-full bg-black/50 border border-white/10 
                              backdrop-blur-xl shadow-lg hover:shadow-purple-500/40 transition">
                {item.icon}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* CENTER GLOW */}
      <div className="absolute w-24 h-24 rounded-full bg-purple-500/20 blur-3xl"></div>
    </div>
  );
}
