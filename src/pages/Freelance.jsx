import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import SectionTitle from "../assets/components/Sectiontitle";

const services = [
  "Spring Boot REST API development",
  "Authentication, JWT, and role-based access",
  "Database schema design and query optimization",
  "React frontend integration with backend systems",
  "Bug fixing, refactoring, and performance improvements",
  "Deployment-ready project structure and documentation",
];

const process = [
  { title: "Discovery", text: "We define the scope, users, data flow, timeline, and acceptance criteria." },
  { title: "Build", text: "I deliver clean milestones with readable code, version control, and regular updates." },
  { title: "Handover", text: "You receive source code, setup notes, and support for deployment or review." },
];

const deliverables = [
  "Clean source code with clear folder structure",
  "API documentation and environment setup notes",
  "Database schema or collection structure",
  "Responsive UI integration where needed",
];

export default function Freelance() {
  return (
    <section className="page-section px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="Open To Freelance" />

        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="surface-card rounded-3xl p-8 md:p-12"
          >
            <span className="inline-flex rounded-full px-4 py-2 text-sm font-bold accent-soft accent-text">
              Available for freelance projects
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-heading md:text-6xl">
              Backend and full-stack help for serious web products.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              I can help build secure APIs, database-backed applications, dashboards, admin panels,
              and integrations using Java, Spring Boot, React, MySQL, and MongoDB.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="mailto:gulrezsarankar39@gmail.com" className="primary-button px-6 py-4">
                <FaEnvelope /> Start a Project
              </a>
              <Link to="/projects" className="secondary-button px-6 py-4">
                View Projects <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="surface-card rounded-3xl p-8"
          >
            <h2 className="text-2xl font-extrabold text-heading">Project Fit</h2>
            <div className="mt-6 space-y-4">
              {services.map((item) => (
                <div key={item} className="flex gap-3">
                  <FaCheckCircle className="mt-1 shrink-0 accent-text" />
                  <span className="font-semibold text-muted">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {process.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="surface-card rounded-2xl p-7"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl accent-bg text-lg font-black text-white">
                {index + 1}
              </div>
              <h3 className="text-xl font-extrabold text-heading">{item.title}</h3>
              <p className="mt-3 leading-7 text-muted">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="surface-card rounded-3xl p-8">
            <p className="section-kicker">Deliverables</p>
            <h2 className="mt-3 text-3xl font-black text-heading">You get more than code.</h2>
            <p className="mt-4 leading-7 text-muted">
              I focus on handover quality, so the project is understandable, runnable, and ready for the next developer or deployment step.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {deliverables.map((item) => (
              <div key={item} className="surface-card flex gap-3 rounded-2xl p-5">
                <FaCheckCircle className="mt-1 shrink-0 accent-text" />
                <p className="font-semibold leading-6 text-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 surface-card flex flex-col items-start justify-between gap-6 rounded-3xl p-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-heading">Ready to discuss your build?</h2>
            <p className="mt-2 text-muted">Send the project idea, timeline, budget range, and any reference links. I will reply with a practical next step.</p>
          </div>
          <div className="flex gap-4 text-2xl">
            <a href="mailto:gulrezsarankar39@gmail.com" className="accent-text" aria-label="Email"><FaEnvelope /></a>
            <a href="https://github.com/gulrezsarankar" target="_blank" rel="noreferrer" className="accent-text" aria-label="GitHub"><FaGithub /></a>
            <a href="https://linkedin.com/in/gulrez-sarankar" target="_blank" rel="noreferrer" className="accent-text" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
