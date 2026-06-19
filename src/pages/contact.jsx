import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { FaEnvelope, FaGithub, FaLinkedin, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import SectionTitle from "../assets/components/Sectiontitle";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    if (!form.message.trim()) nextErrors.message = "Message is required";
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length !== 0) return;

    emailjs
      .send("service_j7ot56i", "template_e0405xa", form, "1oWtGWvdpK0HR2ufE")
      .then(() => {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch((err) => console.log(err));
  };

  const inputClass =
    "w-full rounded-xl border px-4 py-4 text-heading outline-none transition focus:ring-4";

  return (
    <section className="page-section px-4 sm:px-6">
      <SectionTitle title="Get In Touch" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          className="surface-card rounded-3xl p-8 md:p-10"
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] accent-text">Contact</p>
          <h3 className="mt-4 text-3xl font-black text-heading">Let us build something useful.</h3>
          <p className="mt-4 leading-7 text-muted">
            Share your project idea, collaboration opportunity, or role details. I usually respond quickly with a practical next step.
          </p>

          <div className="mt-8 space-y-5 text-muted">
            <a href="mailto:gulrezsarankar39@gmail.com" className="flex items-center gap-4 font-semibold hover:accent-text">
              <FaEnvelope className="text-2xl accent-text" />
              <span>gulrezsarankar39@gmail.com</span>
            </a>
            <a href="tel:+918421090063" className="flex items-center gap-4 font-semibold hover:accent-text">
              <FaPhoneAlt className="text-2xl accent-text" />
              <span>+91 8421090063</span>
            </a>
            <a href="https://wa.me/918421090063" target="_blank" rel="noreferrer" className="flex items-center gap-4 font-semibold hover:accent-text">
              <FaWhatsapp className="text-2xl accent-text" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="mt-10 flex gap-5 text-3xl">
            <a href="https://github.com/gulrezsarankar" target="_blank" rel="noopener noreferrer" className="text-soft hover:accent-text" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/gulrezsarankar" target="_blank" rel="noopener noreferrer" className="text-soft hover:accent-text" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          className="surface-card rounded-3xl p-8 md:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold text-heading">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                style={{ background: "var(--surface-strong)", borderColor: "var(--border)" }}
              />
              {errors.name && <p className="mt-2 text-sm font-semibold text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-heading">Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                style={{ background: "var(--surface-strong)", borderColor: "var(--border)" }}
              />
              {errors.email && <p className="mt-2 text-sm font-semibold text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-heading">Project Details</label>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                className={inputClass}
                style={{ background: "var(--surface-strong)", borderColor: "var(--border)" }}
              />
              {errors.message && <p className="mt-2 text-sm font-semibold text-red-500">{errors.message}</p>}
            </div>

            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit" className="primary-button w-full px-6 py-4">
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 right-8 rounded-xl px-5 py-3 font-bold text-white shadow-xl"
          style={{ background: "var(--success)" }}
        >
          Message sent successfully.
        </motion.div>
      )}
    </section>
  );
}
