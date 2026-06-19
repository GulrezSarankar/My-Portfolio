import { motion } from "framer-motion";
import { SiJavascript, SiMongodb, SiMysql, SiPostman, SiSpringboot } from "react-icons/si";

export default function TechOrbit() {
  const stack = [
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" /> },
    { name: "Postman", icon: <SiPostman className="text-orange-500" /> },
    { name: "Spring Boot", icon: <SiSpringboot className="text-green-500" /> },
    { name: "MySQL", icon: <SiMysql className="text-blue-500" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
  ];

  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] accent-text">Core Stack</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-heading md:text-4xl">
            Tools I use to ship reliable products.
          </h2>
          <p className="mt-5 max-w-xl leading-7 text-muted">
            My stack is focused around backend reliability, database correctness, API testing, and clean product interfaces.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {stack.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="surface-card flex min-h-32 flex-col items-center justify-center rounded-2xl p-5"
            >
              <div className="text-4xl">{item.icon}</div>
              <p className="mt-3 text-center text-sm font-bold text-muted">{item.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
