import { motion } from "framer-motion";
import { FaServer, FaDatabase, FaLaptopCode } from "react-icons/fa";

export default function Services() {
  const services = [
    {
      title: "Backend Development",
      desc: "Building powerful REST APIs with Java + Spring Boot.",
      icon: <FaServer className="text-purple-400 text-4xl" />,
    },
    {
      title: "Database Design",
      desc: "MySQL, MongoDB, SQL Server — optimized schema design.",
      icon: <FaDatabase className="text-pink-400 text-4xl" />,
    },
    {
      title: "Full Stack Development",
      desc: "React + Tailwind + Spring Boot integration.",
      icon: <FaLaptopCode className="text-blue-400 text-4xl" />,
    },
  ];

  return (
    <div className="py-24 text-center">
      <h2 className="text-3xl font-bold text-purple-300 mb-12">
        🛠️ What I Offer
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {services.map((srv, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl shadow-xl hover:border-purple-500/50 transition"
          >
            <div className="mb-4 flex justify-center">{srv.icon}</div>
            <h3 className="text-xl font-semibold text-gray-200">{srv.title}</h3>
            <p className="mt-3 text-gray-400">{srv.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
