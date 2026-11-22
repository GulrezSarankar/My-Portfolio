import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaCartShopping,
  FaServer,
  FaShieldHalved,
  FaArrowRight,
  FaCircleCheck,
  FaClock,
} from "react-icons/fa6";
import { servicesData } from "../../data/servicesData";

const iconMap = {
  FaLaptopCode: <FaLaptopCode className="text-2xl text-[#61DAFB]" />,
  FaCartShopping: <FaCartShopping className="text-2xl text-[#D66BFF]" />,
  FaServer: <FaServer className="text-2xl text-[#9B5CFF]" />,
  FaShieldHalved: <FaShieldHalved className="text-2xl text-emerald-400" />,
};

export default function Services({ isStandalone = false }) {
  const scrollToContact = (serviceTitle) => {
    const contactSec = document.querySelector("#contact");
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: "smooth" });
      const selectElement = document.querySelector("#projectType");
      if (selectElement) {
        if (serviceTitle.includes("Custom Website")) selectElement.value = "Web Development";
        else if (serviceTitle.includes("E-Commerce")) selectElement.value = "E-Commerce";
        else if (serviceTitle.includes("Backend")) selectElement.value = "Backend & API";
        else selectElement.value = "Maintenance & Optimization";
      }
    } else {
      window.location.href = "/contact";
    }
  };

  const HeadingTag = isStandalone ? "h1" : "h2";

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#080612] py-16 sm:py-20 lg:py-28 border-b border-[rgba(255,255,255,0.08)]"
    >
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute top-1/3 right-0 h-[450px] w-[450px] rounded-full bg-[#9B5CFF]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-[#D66BFF]/10 blur-[90px]" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="glass-pill mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D66BFF]" />
            FREELANCE &amp; ENGINEERING SERVICES
          </div>
          <HeadingTag className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Comprehensive engineering for <br className="hidden sm:inline" />
            <span className="purple-gradient-text">ambitious digital businesses.</span>
          </HeadingTag>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#AAA5B8]">
            From high-throughput backend APIs to high-conversion modern web interfaces, I deliver end-to-end production software tailored to your timeline and business goals.
          </p>
        </div>

        {/* 4 Premium Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card group flex flex-col justify-between p-6 sm:p-8 relative overflow-hidden"
            >
              {/* Corner accent glow on hover */}
              <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 bg-gradient-to-bl from-[#9B5CFF]/15 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                {/* Top Bar: Icon & Badge */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:border-[#9B5CFF]/40">
                    {iconMap[service.icon]}
                  </div>
                  <span className="glass-pill text-[10px] tracking-wider font-bold">
                    {service.badge}
                  </span>
                </div>

                {/* Service Title & Tagline */}
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-[#D66BFF] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#9B5CFF] mt-1">
                  {service.tagline}
                </p>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-[#AAA5B8]">
                  {service.description}
                </p>

                {/* Features Checklist */}
                <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.08)]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E7893]">
                    What's Included:
                  </span>
                  <ul className="mt-3 space-y-2">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E5E0F8]">
                        <FaCircleCheck className="mt-1 shrink-0 text-[#9B5CFF] text-xs" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Meta & Inquire Button */}
              <div className="mt-8 pt-5 border-t border-[rgba(255,255,255,0.08)] flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1 text-xs text-[#AAA5B8]">
                  <div className="flex items-center gap-1.5">
                    <FaClock className="text-[#9B5CFF] text-[11px]" />
                    <span>Est. Turnaround: <strong className="text-white font-medium">{service.turnaround}</strong></span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToContact(service.title)}
                  className="btn-secondary-glass text-xs py-2 px-4 group/btn"
                >
                  <span>Inquire for Project</span>
                  <FaArrowRight className="text-[10px] text-[#D66BFF] transition-transform duration-200 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 glass-panel p-6 sm:p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6 border-[rgba(155,92,255,0.25)]">
          <div className="text-left max-w-xl">
            <h4 className="font-heading text-lg font-bold text-white">
              Need a Custom Architecture or Dedicated Sprint?
            </h4>
            <p className="text-xs sm:text-sm text-[#AAA5B8] mt-1">
              Every project comes with clean modular git commits, complete documentation, automated test verification, and full deployment handover.
            </p>
          </div>

          <button
            type="button"
            onClick={() => scrollToContact("Custom")}
            className="btn-primary-purple text-xs sm:text-sm py-3 px-6 whitespace-nowrap shadow-[0_0_20px_rgba(155,92,255,0.35)]"
          >
            Schedule a Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
