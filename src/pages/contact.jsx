import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { FaEnvelope, FaGithub, FaLinkedin, FaLocationDot, FaPaperPlane } from "react-icons/fa6";
import SEO from "../assets/components/SEO";

export default function Contact({ isStandalonePage = true }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const HeadingTag = isStandalonePage ? "h1" : "h2";

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

    setSubmitting(true);

    emailjs
      .send("service_j7ot56i", "template_e0405xa", form, "1oWtGWvdpK0HR2ufE")
      .then(() => {
        setSubmitting(false);
        setSuccess(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        setSubmitting(false);
        alert("Failed to send message. Please send an email directly to gulrezsarankar39@gmail.com");
      });
  };

  return (
    <section id="contact" className="bg-[var(--bg-section)] py-12 lg:py-20 text-[var(--text-primary)] transition-colors duration-300">
      {isStandalonePage && (
        <SEO
          title="Contact Gulrez Sarankar | Java Backend Developer Pune"
          description="Get in touch with Gulrez Sarankar for Java backend engineering roles, Spring Boot contract projects, or software engineering consulting in Pune."
          canonicalPath="/contact"
        />
      )}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-12">
          {/* LEFT SIDE: Heading & Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 min-w-0"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)]">
              GET IN TOUCH
            </span>

            <HeadingTag className="mt-2 text-2xl font-black tracking-tight sm:text-4xl lg:text-5xl lg:leading-tight text-[var(--text-primary)]">
              Let's build something <br className="hidden sm:inline" />
              great together.
            </HeadingTag>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
              I'm always open to discussing new opportunities, interesting projects and challenging engineering problems.
            </p>

            <div className="mt-6 space-y-3.5">
              <div className="flex items-center gap-3 text-sm text-[var(--text-primary)]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-card)] text-[var(--accent-primary)] border border-[var(--border-color)]">
                  <FaEnvelope />
                </div>
                <div>
                  <div className="text-xs text-[var(--text-muted)]">Email</div>
                  <a href="mailto:gulrezsarankar39@gmail.com" aria-label="Email Gulrez Sarankar" className="font-semibold hover:text-[var(--accent-primary)] truncate">
                    gulrezsarankar39@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-[var(--text-primary)]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-card)] text-[var(--accent-primary)] border border-[var(--border-color)]">
                  <FaLinkedin />
                </div>
                <div>
                  <div className="text-xs text-[var(--text-muted)]">LinkedIn</div>
                  <a href="https://linkedin.com/in/gulrez-sarankar" target="_blank" rel="noreferrer" aria-label="Gulrez Sarankar LinkedIn Profile" className="font-semibold hover:text-[var(--accent-primary)] truncate">
                    linkedin.com/in/gulrez-sarankar
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-[var(--text-primary)]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-card)] text-[var(--accent-primary)] border border-[var(--border-color)]">
                  <FaGithub />
                </div>
                <div>
                  <div className="text-xs text-[var(--text-muted)]">GitHub</div>
                  <a href="https://github.com/gulrezsarankar" target="_blank" rel="noreferrer" aria-label="Gulrez Sarankar GitHub Profile" className="font-semibold hover:text-[var(--accent-primary)] truncate">
                    github.com/gulrezsarankar
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-[var(--text-primary)]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-card)] text-[var(--accent-primary)] border border-[var(--border-color)]">
                  <FaLocationDot />
                </div>
                <div>
                  <div className="text-xs text-[var(--text-muted)]">Location</div>
                  <span className="font-semibold">India</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Theme-Aware Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 min-w-0"
          >
            <div className="theme-card p-6 sm:p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
                    />
                    {errors.name && <p className="mt-1 text-xs font-semibold text-[#EF4444]">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
                    />
                    {errors.email && <p className="mt-1 text-xs font-semibold text-[#EF4444]">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="Engineering Role / Project Opportunity"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    placeholder="Tell me about your team, role or project..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
                  />
                  {errors.message && <p className="mt-1 text-xs font-semibold text-[#EF4444]">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary-blue w-full py-3.5"
                >
                  {submitting ? "Sending..." : "Send Message"}
                  <FaPaperPlane className="text-xs" />
                </button>
              </form>

              {success && (
                <div className="mt-4 rounded-lg border border-[#10B981]/30 bg-[#10B981]/10 p-3 text-center text-sm font-bold text-[#10B981]">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
