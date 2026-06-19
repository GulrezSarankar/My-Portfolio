import { motion } from "framer-motion";
import { FaDatabase, FaLaptopCode, FaServer } from "react-icons/fa";

export default function Services() {
  const services = [
    {
      title: "Backend Development",
      desc: "REST APIs, authentication, business workflows, and maintainable Spring Boot services.",
      icon: <FaServer className="text-4xl accent-text" />,
    },
    {
      title: "Database Design",
      desc: "MySQL, MongoDB, and SQL Server schemas shaped for reliability and performance.",
      icon: <FaDatabase className="text-4xl accent-text" />,
    },
    {
      title: "Full Stack Delivery",
      desc: "React interfaces connected to stable APIs with clean deployment-ready structure.",
      icon: <FaLaptopCode className="text-4xl accent-text" />,
    },
  ];

  return (
    <section className="px-6 py-20 text-center">
      <p className="section-kicker mb-3">Services</p>
      <h2 className="mb-4 text-3xl font-extrabold text-heading">Engineering support for practical product work.</h2>
      <p className="mx-auto mb-12 max-w-2xl text-muted">
        Practical engineering support for teams that need clean APIs, durable data layers, and usable web interfaces.
      </p>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {services.map((srv, i) => (
          <motion.div
            key={srv.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="surface-card rounded-2xl p-8 transition hover:-translate-y-1"
          >
            <div className="mb-4 flex justify-center">{srv.icon}</div>
            <h3 className="text-xl font-bold text-heading">{srv.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{srv.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
