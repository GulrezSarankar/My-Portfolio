import { useState } from "react";
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
    projectType: "Custom Backend / Spring Boot",
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
        projectType: "Custom Backend / Spring Boot",
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
      className="relative bg-[#0D0D0D] text-[#F5F5F5] py-16 sm:py-20 lg:py-24 border-b border-[#262626]"
    >
      {isStandalonePage && (
        <SEO
          title="Contact Gulrez Sarankar | Java Backend & Software Engineer"
          description="Get in touch with Gulrez Sarankar for Java Spring Boot backend engineering, API architecture, full-stack web applications, and consulting."
          canonicalPath="/contact"
        />
      )}

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="rounded-xl border border-[#262626] bg-[#141414] p-8 sm:p-12 mb-12 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#1A1A1A] px-3 py-1 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1A1]">
              Collaboration &amp; Hiring Inquiries
            </span>
          </div>

          <HeadingTag className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F5] leading-tight">
            Let's discuss your next <br className="hidden sm:inline" />
            <span className="text-[#A3E635]">engineering project.</span>
          </HeadingTag>

          <p className="mt-4 text-base sm:text-lg text-[#A1A1A1] max-w-2xl mx-auto leading-relaxed">
            Whether you need a high-concurrency Spring Boot microservice, a relational database overhaul, or a performant web client, I'm ready to collaborate.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#A1A1A1]">
            <span className="inline-flex items-center gap-1.5">
              <FaCircleCheck className="text-[#A3E635]" /> Technical Scoping Call
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <FaCircleCheck className="text-[#A3E635]" /> 24-Hour Response Time
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <FaCircleCheck className="text-[#A3E635]" /> Global Remote Available
            </span>
          </div>
        </div>

        {/* Form & Direct Channels Split Layout */}
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT: Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-8">
              <h3 className="font-heading text-xl font-bold text-[#F5F5F5] mb-2">
                Direct Communication Channels
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1A1] mb-6">
                Prefer direct communication? Reach out directly via WhatsApp, Email, or LinkedIn.
              </p>

              <div className="space-y-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/918421090063"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-lg border border-[#262626] bg-[#1A1A1A] hover:border-[#383838] transition-colors group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#262626] bg-[#141414] text-emerald-400 text-lg">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#666666]">
                      WhatsApp (Direct Phone)
                    </div>
                    <div className="text-sm font-semibold text-[#F5F5F5] group-hover:text-[#A3E635] transition-colors">
                      +91 8421090063
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:gulrezsarankar24@gmail.com"
                  className="flex items-center gap-3.5 p-3.5 rounded-lg border border-[#262626] bg-[#1A1A1A] hover:border-[#383838] transition-colors group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#262626] bg-[#141414] text-[#A3E635] text-base">
                    <FaEnvelope />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#666666]">
                      Official Email
                    </div>
                    <div className="text-sm font-semibold text-[#F5F5F5] group-hover:text-[#A3E635] transition-colors break-all">
                      gulrezsarankar24@gmail.com
                    </div>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/gulrez-sarankar"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-lg border border-[#262626] bg-[#1A1A1A] hover:border-[#383838] transition-colors group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#262626] bg-[#141414] text-[#A1A1A1] text-base group-hover:text-[#F5F5F5]">
                    <FaLinkedin />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#666666]">
                      LinkedIn Network
                    </div>
                    <div className="text-sm font-semibold text-[#F5F5F5] group-hover:text-[#A3E635] transition-colors">
                      linkedin.com/in/gulrez-sarankar
                    </div>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/gulrezsarankar"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-lg border border-[#262626] bg-[#1A1A1A] hover:border-[#383838] transition-colors group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#262626] bg-[#141414] text-[#A1A1A1] text-base group-hover:text-[#F5F5F5]">
                    <FaGithub />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#666666]">
                      GitHub Repositories
                    </div>
                    <div className="text-sm font-semibold text-[#F5F5F5] group-hover:text-[#A3E635] transition-colors">
                      github.com/gulrezsarankar
                    </div>
                  </div>
                </a>
              </div>

              {/* Location */}
              <div className="mt-6 pt-5 border-t border-[#262626] flex items-center gap-2 text-xs font-mono text-[#A1A1A1]">
                <FaLocationDot className="text-[#A3E635]" />
                <span>Pune, Maharashtra, India • Available for Global Remote</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-8">
              <h3 className="font-heading text-xl font-bold text-[#F5F5F5] mb-1">
                Send a Project Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1A1] mb-6">
                Fill in the details below and I will get back to you within 24 hours.
              </p>

              {success && (
                <div className="mb-6 rounded-lg border border-[#A3E635]/30 bg-[#1A1A1A] p-4 text-xs sm:text-sm text-[#BEF264] flex items-center gap-2.5">
                  <FaCircleCheck className="text-base text-[#A3E635] shrink-0" />
                  <span>Your message has been sent successfully. I will review your requirements and respond promptly.</span>
                </div>
              )}

              {submitError && (
                <div className="mb-6 rounded-lg border border-red-500/30 bg-[#1A1A1A] p-4 text-xs sm:text-sm text-red-400">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                {/* Honeypot field */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                  className="hidden"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label className="block font-mono text-xs text-[#A1A1A1] mb-1.5">
                      Your Name <span className="text-[#A3E635]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full rounded-lg border border-[#262626] bg-[#1A1A1A] px-3.5 py-2.5 text-[#F5F5F5] placeholder-[#666666] focus:border-[#A3E635] focus:outline-none transition-colors"
                    />
                    {errors.name && (
                      <p className="mt-1 text-[11px] text-red-400 font-mono">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-mono text-xs text-[#A1A1A1] mb-1.5">
                      Email Address <span className="text-[#A3E635]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. john@company.com"
                      className="w-full rounded-lg border border-[#262626] bg-[#1A1A1A] px-3.5 py-2.5 text-[#F5F5F5] placeholder-[#666666] focus:border-[#A3E635] focus:outline-none transition-colors"
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-red-400 font-mono">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Project Type */}
                  <div>
                    <label className="block font-mono text-xs text-[#A1A1A1] mb-1.5">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[#262626] bg-[#1A1A1A] px-3.5 py-2.5 text-[#F5F5F5] focus:border-[#A3E635] focus:outline-none transition-colors"
                    >
                      <option value="Custom Backend / Spring Boot">Java &amp; Spring Boot Backend</option>
                      <option value="Microservices & REST APIs">Microservices &amp; REST APIs</option>
                      <option value="E-Commerce Architecture">E-Commerce Architecture</option>
                      <option value="Full-Stack Web Application">Full-Stack Web Application</option>
                      <option value="Full-Time Engineering Role">Full-Time Software Engineering Role</option>
                      <option value="Technical Consulting">Technical Consulting</option>
                    </select>
                  </div>

                  {/* Estimated Budget */}
                  <div>
                    <label className="block font-mono text-xs text-[#A1A1A1] mb-1.5">
                      Engagement Budget / Scope
                    </label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[#262626] bg-[#1A1A1A] px-3.5 py-2.5 text-[#F5F5F5] focus:border-[#A3E635] focus:outline-none transition-colors"
                    >
                      <option value="Full-Time Employment">Full-Time Employment</option>
                      <option value="Under $1,000">Under $1,000 (Small Module)</option>
                      <option value="$1,000 - $3,000">$1,000 - $3,000 (MVP / Feature)</option>
                      <option value="$3,000 - $8,000">$3,000 - $8,000 (Full Platform)</option>
                      <option value="$8,000+">$8,000+ (Enterprise System)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono text-xs text-[#A1A1A1] mb-1.5">
                    Project Scope &amp; Requirements <span className="text-[#A3E635]">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your project requirements, technical stack expectations, or timeline..."
                    className="w-full rounded-lg border border-[#262626] bg-[#1A1A1A] px-3.5 py-2.5 text-[#F5F5F5] placeholder-[#666666] focus:border-[#A3E635] focus:outline-none transition-colors"
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11px] text-red-400 font-mono">{errors.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full justify-center text-xs py-3"
                  >
                    {submitting ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <FaPaperPlane className="text-[11px]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
