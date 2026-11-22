import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaLocationDot,
  FaPaperPlane,
  FaCircleCheck,
} from "react-icons/fa6";
import SEO from "../assets/components/SEO";
import { submitContactMessage } from "../services/contactService";

export default function Contact({ isStandalonePage = true }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "Custom Website Development",
    budget: "$500 - $1,500",
    message: "",
    website: "", // Honeypot
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const HeadingTag = isStandalonePage ? "h1" : "h2";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Your name is required";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address";
    }
    if (!form.message.trim()) nextErrors.message = "Project description is required";
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length !== 0) return;

    setSubmitting(true);

    try {
      const compositeSubject = `[${form.projectType}] Inquiry from ${form.name} (Budget: ${form.budget})`;
      const compositeMessage = `Project Type: ${form.projectType}\nEstimated Budget: ${form.budget}\n\nProject Scope & Requirements:\n${form.message}`;

      const { error } = await submitContactMessage({
        name: form.name,
        email: form.email,
        subject: compositeSubject,
        message: compositeMessage,
        website: form.website, // honeypot
      });

      if (error) {
        throw error;
      }

      setSubmitting(false);
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        projectType: "Custom Website Development",
        budget: "$500 - $1,500",
        message: "",
        website: "",
      });
      setTimeout(() => setSuccess(false), 8000);
    } catch (err) {
      console.error("Contact submission error:", err);
      setSubmitting(false);
      setSubmitError(
        err.message || "Failed to send message. Please contact me directly on WhatsApp or Email."
      );
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#080612] py-16 sm:py-20 lg:py-28"
    >
      {isStandalonePage && (
        <SEO
          title="Contact Gulrez Sarankar | Hire Full-Stack & Backend Developer"
          description="Hire Gulrez Sarankar for enterprise Java Spring Boot backend engineering, custom React websites, and e-commerce development. Direct WhatsApp and Email contact."
          canonicalPath="/contact"
        />
      )}

      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute top-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-[#9B5CFF]/15 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-72 w-72 rounded-full bg-[#D66BFF]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">

        {/* Purple Glassmorphism Contact Banner */}
        <div className="glass-panel p-8 sm:p-12 mb-14 text-center max-w-4xl mx-auto border-[rgba(155,92,255,0.3)] shadow-[0_15px_40px_rgba(155,92,255,0.15)] relative overflow-hidden">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#9B5CFF]/20 blur-2xl" />

          <div className="glass-pill mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D66BFF]" />
            HAVE A PROJECT IN MIND?
          </div>

          <HeadingTag className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Let's turn your idea into a <br className="hidden sm:inline" />
            <span className="purple-gradient-text">powerful digital solution.</span>
          </HeadingTag>

          <p className="mt-4 text-base sm:text-lg text-[#AAA5B8] max-w-2xl mx-auto">
            Whether you need a full enterprise backend, an e-commerce platform, or a modern high-performance website, I'm ready to help you plan, build, and deploy.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#E5E0F8]">
            <span className="inline-flex items-center gap-1.5">
              <FaCircleCheck className="text-[#9B5CFF]" /> Free Technical Consultation
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FaCircleCheck className="text-[#D66BFF]" /> Response within 24 Hours
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FaCircleCheck className="text-emerald-400" /> Non-Disclosure Agreement (NDA) Friendly
            </span>
          </div>
        </div>

        {/* Form & Direct Channels Split Layout */}
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">

          {/* LEFT: Direct Channels & Guarantee */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card p-6 sm:p-8">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
                Direct Communication Channels
              </h3>
              <p className="text-xs sm:text-sm text-[#AAA5B8] mb-6">
                Prefer a quick chat? Reach out directly via WhatsApp, Email, or LinkedIn.
              </p>

              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/918421090063"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all group"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 text-lg group-hover:scale-110 transition-transform">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#7E7893]">
                      WhatsApp (Fastest Response)
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-emerald-300">
                      +91 8421090063
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:gulrezsarankar24@gmail.com"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:border-[#D66BFF]/40 hover:bg-[#D66BFF]/10 transition-all group"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D66BFF]/20 text-[#D66BFF] text-base group-hover:scale-110 transition-transform">
                    <FaEnvelope />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#7E7893]">
                      Official Email
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#D66BFF] break-all">
                      gulrezsarankar24@gmail.com
                    </div>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/gulrez-sarankar"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:border-[#9B5CFF]/40 hover:bg-[#9B5CFF]/10 transition-all group"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#9B5CFF]/20 text-[#9B5CFF] text-base group-hover:scale-110 transition-transform">
                    <FaLinkedin />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#7E7893]">
                      LinkedIn Network
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#9B5CFF]">
                      linkedin.com/in/gulrez-sarankar
                    </div>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/gulrezsarankar"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:border-white/40 hover:bg-white/10 transition-all group"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white text-base group-hover:scale-110 transition-transform">
                    <FaGithub />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#7E7893]">
                      GitHub Repositories
                    </div>
                    <div className="text-sm font-semibold text-white">
                      github.com/gulrezsarankar
                    </div>
                  </div>
                </a>
              </div>

              {/* Location Badge */}
              <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.08)] flex items-center gap-2 text-xs text-[#AAA5B8]">
                <FaLocationDot className="text-[#9B5CFF]" />
                <span>Pune, Maharashtra, India • Available for Global Remote</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Complete Glassmorphism Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-6 sm:p-8 border-[rgba(155,92,255,0.3)] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1">
                Project Inquiry Form
              </h3>
              <p className="text-xs sm:text-sm text-[#AAA5B8] mb-6">
                Fill in your project specifics to receive a tailored architectural proposal and quote.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot anti-spam */}
                <input
                  type="text"
                  name="website"
                  value={form.website || ""}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                  aria-hidden="true"
                />

                {/* Name & Email Row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#AAA5B8]"
                    >
                      Your Full Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="e.g. Alexander Vance"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-white placeholder-[#7E7893] outline-none transition focus:border-[#9B5CFF] focus:bg-[rgba(155,92,255,0.08)] focus:ring-1 focus:ring-[#9B5CFF]"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs font-semibold text-rose-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#AAA5B8]"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="alexander@company.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-white placeholder-[#7E7893] outline-none transition focus:border-[#9B5CFF] focus:bg-[rgba(155,92,255,0.08)] focus:ring-1 focus:ring-[#9B5CFF]"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs font-semibold text-rose-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Project Type & Budget Row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="projectType"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#AAA5B8]"
                    >
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#100B20] px-4 py-3 text-sm text-white outline-none transition focus:border-[#9B5CFF] focus:ring-1 focus:ring-[#9B5CFF]"
                    >
                      <option value="Custom Website Development">
                        Custom Website Development (React/TS)
                      </option>
                      <option value="E-Commerce Development">
                        E-Commerce Platform (Storefront + Payments)
                      </option>
                      <option value="Backend & API Architecture">
                        Backend &amp; API Development (Spring Boot)
                      </option>
                      <option value="Website Maintenance & Optimization">
                        Maintenance &amp; Performance Tuning
                      </option>
                      <option value="General Consulting / Engineering Hire">
                        Full-Time / Contract Engineering Hire
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-budget"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#AAA5B8]"
                    >
                      Estimated Budget Range
                    </label>
                    <select
                      id="contact-budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#100B20] px-4 py-3 text-sm text-white outline-none transition focus:border-[#9B5CFF] focus:ring-1 focus:ring-[#9B5CFF]"
                    >
                      <option value="< $500">Less than $500 (Small sprint)</option>
                      <option value="$500 - $1,500">$500 - $1,500 (Standard MVP)</option>
                      <option value="$1,500 - $3,000">$1,500 - $3,000 (Complete Platform)</option>
                      <option value="$3,000+">$3,000+ (Enterprise / Scaled App)</option>
                      <option value="Flexible / Hourly">Flexible / Ongoing Hourly</option>
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#AAA5B8]"
                  >
                    Project Description &amp; Scope *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    placeholder="Briefly describe what you're building, target timeline, key technical requirements, or reference sites..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-white placeholder-[#7E7893] outline-none transition focus:border-[#9B5CFF] focus:bg-[rgba(155,92,255,0.08)] focus:ring-1 focus:ring-[#9B5CFF]"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs font-semibold text-rose-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary-purple w-full py-4 text-sm sm:text-base font-bold shadow-[0_0_25px_rgba(155,92,255,0.45)]"
                >
                  {submitting ? (
                    <span>Sending Proposal Request...</span>
                  ) : (
                    <>
                      <span>Send Project Request</span>
                      <FaPaperPlane className="text-xs" />
                    </>
                  )}
                </button>
              </form>

              {/* Success Notification Banner */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/15 p-4 text-center text-sm font-semibold text-emerald-300"
                >
                  <FaCircleCheck className="inline-block mr-2 text-emerald-400" />
                  Thank you! Your project inquiry has been delivered directly. I will review your requirements and respond within 24 hours.
                </motion.div>
              )}

              {/* Error Notification Banner */}
              {submitError && (
                <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/15 p-3.5 text-center text-xs font-semibold text-rose-300">
                  {submitError}
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
