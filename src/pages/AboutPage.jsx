import { motion } from "framer-motion";
import { FaCode, FaDatabase, FaServer } from "react-icons/fa";
import SectionTitle from "../assets/components/Sectiontitle";

const strengths = [
  {
    title: "Backend Engineering",
    text: "REST APIs, authentication, service structure, and business logic with Java and Spring Boot.",
    icon: <FaServer />,
  },
  {
    title: "Data Modeling",
    text: "Relational and document database design with MySQL, SQL Server, and MongoDB.",
    icon: <FaDatabase />,
  },
  {
    title: "Product Delivery",
    text: "React interfaces, API integration, testing workflows, and readable handover documentation.",
    icon: <FaCode />,
  },
];

export default function About() {
  return (
    <section className="page-section px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="About Me" />

        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="surface-card overflow-hidden rounded-3xl p-4"
          >
            <img
              src="/Gulrez.png"
              alt="Gulrez Sarankar"
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] accent-text">Software Engineer</p>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-heading md:text-5xl">
              I build backend-first applications that are practical, secure, and easy to maintain.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              I am an Associate Software Engineer focused on Java, Spring Boot, REST APIs,
              database-backed systems, and modern React interfaces. My work is shaped by clear
              structure, readable code, and dependable delivery.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {strengths.map((item) => (
                <div key={item.title} className="surface-card rounded-2xl p-5">
                  <div className="mb-4 text-2xl accent-text">{item.icon}</div>
                  <h3 className="font-extrabold text-heading">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
