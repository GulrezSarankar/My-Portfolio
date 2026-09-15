import { motion } from "framer-motion";
import { FaArrowUpRightFromSquare, FaDownload, FaGithub, FaDatabase, FaLayerGroup, FaArrowRight } from "react-icons/fa6";

export default function Hero() {
  const scrollToProjects = (e) => {
    e.preventDefault();
    const projectsSec = document.querySelector("#projects");
    if (projectsSec) {
      projectsSec.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/projects";
    }
  };

  return (
    <section className="relative overflow-hidden bg-[var(--bg-main)] pb-12 pt-10 lg:pb-20 lg:pt-16 bg-grid-pattern bg-blue-glow transition-colors duration-300">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
          {/* LEFT SIDE: Hero Headline & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 text-left"
          >
            {/* Eyebrow badge */}
            <div className="theme-badge mb-4">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              JAVA BACKEND DEVELOPER
            </div>

            {/* Headline */}
            <h1 className="text-2xl font-black tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl lg:leading-[1.12]">
              Building scalable, <br className="hidden xs:inline" />
              secure &amp; reliable <br className="hidden xs:inline" />
              <span className="text-[var(--accent-primary)]">backend systems.</span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base lg:text-lg">
              I design and develop reliable backend systems using Java and Spring Boot, with a focus on clean architecture, API reliability, database performance and maintainable production code.
            </p>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <a
                href="#projects"
                onClick={scrollToProjects}
                aria-label="View portfolio projects"
                className="btn-primary-blue text-xs sm:text-sm py-2.5 px-4 sm:py-3 sm:px-5"
              >
                View My Work
                <FaArrowUpRightFromSquare className="text-[10px] sm:text-xs" />
              </a>

              <a
                href="/Gulrez-Sarankar.pdf"
                download="Gulrez_Sarankar_Resume.pdf"
                aria-label="Download Gulrez Sarankar Resume PDF"
                className="btn-secondary-theme text-xs sm:text-sm py-2.5 px-4 sm:py-3 sm:px-5"
              >
                <FaDownload className="text-[10px] sm:text-xs" />
                Download Resume
              </a>

              <a
                href="https://github.com/gulrezsarankar"
                target="_blank"
                rel="noreferrer"
                aria-label="Gulrez Sarankar GitHub Profile"
                className="btn-secondary-theme text-xs sm:text-sm py-2.5 px-4 sm:py-3 sm:px-5"
              >
                <FaGithub className="text-xs sm:text-sm" />
                GitHub
              </a>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Dark Code Editor & Data Flow Workspace (Technical Visual Accent) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-6 w-full min-w-0 overflow-hidden"
          >
            {/* Editor Container */}
            <div className="overflow-hidden rounded-xl border border-[#263241] bg-[#0A1018] shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-[#263241] bg-[#060A10] px-3 sm:px-4 py-2.5 sm:py-3">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#EF4444]" />
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#F59E0B]" />
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#10B981]" />
                </div>
                <div className="flex items-center gap-1.5 rounded-t-md bg-[#0A1018] px-2.5 py-1 text-[11px] sm:text-xs font-mono text-[#60A5FA]">
                  <span>☕</span>
                  <span>BookingService.java</span>
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-[#6F7B8B]">UTF-8</div>
              </div>

              {/* Code Snippet */}
              <div className="overflow-x-auto p-3 sm:p-5 font-code text-[10px] sm:text-xs md:text-sm leading-relaxed text-[#E2E8F0]">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr>
                      <td className="w-6 sm:w-8 select-none text-right font-mono text-[#475569]">01</td>
                      <td className="pl-3 sm:pl-4">
                        <span className="text-[#F472B6]">@Service</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="w-6 sm:w-8 select-none text-right font-mono text-[#475569]">02</td>
                      <td className="pl-3 sm:pl-4">
                        <span className="text-[#F472B6]">@Transactional</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="w-6 sm:w-8 select-none text-right font-mono text-[#475569]">03</td>
                      <td className="pl-3 sm:pl-4">
                        <span className="text-[#60A5FA]">public class</span>{" "}
                        <span className="font-bold text-[#FACC15]">BookingService</span>{" "}
                        <span className="text-[#94A3B8]">&#123;</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="w-6 sm:w-8 select-none text-right font-mono text-[#475569]">04</td>
                      <td className="pl-3 sm:pl-4"></td>
                    </tr>
                    <tr>
                      <td className="w-6 sm:w-8 select-none text-right font-mono text-[#475569]">05</td>
                      <td className="pl-3 sm:pl-4">
                        &nbsp;&nbsp;<span className="text-[#60A5FA]">public</span>{" "}
                        <span className="text-[#4ADE80]">BookingResponse</span>{" "}
                        <span className="text-[#60A5FA]">createBooking</span>
                        <span className="text-[#94A3B8]">(</span>
                        <span className="text-[#4ADE80]">BookingRequest</span>{" "}
                        <span className="text-[#E2E8F0]">req</span>
                        <span className="text-[#94A3B8]">) &#123;</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="w-6 sm:w-8 select-none text-right font-mono text-[#475569]">06</td>
                      <td className="pl-3 sm:pl-4">
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#60A5FA]">validateBooking</span>
                        <span className="text-[#94A3B8]">(req);</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="w-6 sm:w-8 select-none text-right font-mono text-[#475569]">07</td>
                      <td className="pl-3 sm:pl-4">
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#60A5FA]">lockSlot</span>
                        <span className="text-[#94A3B8]">(redis, req.getSlotId());</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="w-6 sm:w-8 select-none text-right font-mono text-[#475569]">08</td>
                      <td className="pl-3 sm:pl-4">
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#4ADE80]">Booking</span>{" "}
                        <span className="text-[#E2E8F0]">booking</span> ={" "}
                        <span className="text-[#60A5FA]">bookingRepo</span>
                        <span className="text-[#94A3B8]">.</span>
                        <span className="text-[#60A5FA]">save</span>
                        <span className="text-[#94A3B8]">(Booking.from(req));</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="w-6 sm:w-8 select-none text-right font-mono text-[#475569]">09</td>
                      <td className="pl-3 sm:pl-4">
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#60A5FA]">return</span>{" "}
                        <span className="text-[#4ADE80]">BookingResponse</span>
                        <span className="text-[#94A3B8]">.</span>
                        <span className="text-[#60A5FA]">from</span>
                        <span className="text-[#94A3B8]">(booking);</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="w-6 sm:w-8 select-none text-right font-mono text-[#475569]">10</td>
                      <td className="pl-3 sm:pl-4">
                        &nbsp;&nbsp;<span className="text-[#94A3B8]">&#125;</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="w-6 sm:w-8 select-none text-right font-mono text-[#475569]">11</td>
                      <td className="pl-3 sm:pl-4">
                        <span className="text-[#94A3B8]">&#125;</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Data Flow Pipeline Footer */}
              <div className="border-t border-[#263241] bg-[#070D15] p-2.5 sm:p-3">
                <div className="flex items-center justify-between overflow-x-auto gap-2 text-[10px] sm:text-[11px] font-mono text-[#A8B2C1]">
                  <span className="flex items-center gap-1 text-[#60A5FA] shrink-0">
                    <FaLayerGroup /> Client
                  </span>
                  <FaArrowRight className="text-[8px] sm:text-[9px] text-[#6F7B8B] shrink-0" />
                  <span className="text-[#38BDF8] shrink-0">REST API</span>
                  <FaArrowRight className="text-[8px] sm:text-[9px] text-[#6F7B8B] shrink-0" />
                  <span className="text-[#FACC15] shrink-0">Service</span>
                  <FaArrowRight className="text-[8px] sm:text-[9px] text-[#6F7B8B] shrink-0" />
                  <span className="flex items-center gap-1 text-[#4ADE80] shrink-0">
                    <FaDatabase /> PostgreSQL
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
