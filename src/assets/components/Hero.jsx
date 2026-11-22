import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaFileArrowDown,
  FaCheck,
} from "react-icons/fa6";
import { SiSpringboot, SiPostgresql, SiDocker, SiRedis } from "react-icons/si";
import { FaJava } from "react-icons/fa6";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#0D0D0D] border-b border-[#262626] pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* ================================================================
              LEFT COLUMN: Personal Branding, Headline, Bio & CTAs
              ================================================================ */}
          <div className="lg:col-span-7 text-left">
            {/* Minimal Role Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#141414] px-3.5 py-1 mb-6">
              <span className="h-2 w-2 rounded-full bg-[#A3E635]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1A1]">
                Software Engineer • Java Backend
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F5F5] leading-[1.1]">
              Architecting Resilient <br className="hidden sm:inline" />
              <span className="text-[#A3E635]">Java &amp; Spring Boot</span> Systems
            </h1>

            {/* Subtitle / Professional Bio */}
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#A1A1A1]">
              Software Engineer with 2+ years of professional backend experience at{" "}
              <strong className="text-[#F5F5F5] font-semibold">ISEES Technologies LLP</strong>.
              Specializing in high-concurrency Spring Boot microservices, normalized PostgreSQL schemas,
              distributed Redis caching, and resilient RESTful API engineering.
            </p>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/projects" className="btn-primary text-xs sm:text-sm py-2.5 px-5">
                <span>View Projects</span>
                <FaArrowRight className="text-[11px]" />
              </Link>

              <Link to="/contact" className="btn-secondary text-xs sm:text-sm py-2.5 px-5">
                <span>Contact Me</span>
                <FaArrowUpRightFromSquare className="text-[11px]" />
              </Link>

              <a
                href="/Gulrez-Sarankar.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#262626] bg-[#141414] px-4 py-2.5 text-xs sm:text-sm font-medium text-[#A1A1A1] hover:border-[#383838] hover:text-[#F5F5F5] transition-colors"
                title="Download Official Resume (PDF)"
              >
                <FaFileArrowDown className="text-xs text-[#A3E635]" />
                <span>Resume (PDF)</span>
              </a>
            </div>

            {/* Technology Capability Strip */}
            <div className="mt-10 border-t border-[#262626] pt-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#666666] block mb-3">
                Core Production Stack
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { name: "Java 17/21", icon: <FaJava className="text-[#A3E635]" /> },
                  { name: "Spring Boot", icon: <SiSpringboot className="text-[#A3E635]" /> },
                  { name: "PostgreSQL", icon: <SiPostgresql className="text-[#A3E635]" /> },
                  { name: "Redis", icon: <SiRedis className="text-[#A3E635]" /> },
                  { name: "Docker", icon: <SiDocker className="text-[#A3E635]" /> },
                  { name: "REST APIs", icon: <FaCheck className="text-[#A3E635]" /> },
                ].map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#262626] bg-[#141414] px-2.5 py-1 text-xs font-mono text-[#F5F5F5]"
                  >
                    <span className="text-[10px]">{tech.icon}</span>
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ================================================================
              RIGHT COLUMN: Architecture Snippet / Terminal Window
              ================================================================ */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-xl border border-[#262626] bg-[#141414] overflow-hidden shadow-2xl">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between border-b border-[#262626] bg-[#1A1A1A] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#262626]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#262626]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#262626]" />
                </div>
                <span className="font-mono text-[11px] text-[#A1A1A1]">
                  OrderProcessingService.java
                </span>
                <span className="text-[10px] font-mono text-[#A3E635]">backend-core</span>
              </div>

              {/* Code Snippet */}
              <div className="p-5 font-mono text-xs leading-relaxed text-[#A1A1A1] overflow-x-auto">
                <pre className="text-[11px] sm:text-xs">
                  <code>
                    <span className="text-[#666666]">// High-concurrency enterprise inventory locking</span>
                    {"\n"}
                    <span className="text-[#BEF264]">@Service</span>
                    {"\n"}
                    <span className="text-[#BEF264]">@Transactional</span>(readOnly ={" "}
                    <span className="text-[#F5F5F5]">true</span>)
                    {"\n"}
                    <span className="text-[#F5F5F5]">public class</span>{" "}
                    <span className="text-[#A3E635]">OrderProcessingService</span> {"{"}
                    {"\n\n"}
                    {"  "}
                    <span className="text-[#F5F5F5]">private final</span> InventoryRepository inventory;
                    {"\n"}
                    {"  "}
                    <span className="text-[#F5F5F5]">private final</span> RedisTemplate&lt;String, Object&gt; cache;
                    {"\n\n"}
                    {"  "}
                    <span className="text-[#BEF264]">@Transactional</span>(isolation = Isolation.REPEATABLE_READ)
                    {"\n"}
                    {"  "}
                    <span className="text-[#F5F5F5]">public</span> OrderResponse executeOrder(OrderRequest req) {"{"}
                    {"\n"}
                    {"    "}
                    <span className="text-[#666666]">// 1. Pessimistic lock on SKU ledger</span>
                    {"\n"}
                    {"    "}
                    <span className="text-[#F5F5F5]">var</span> stock = inventory.findAndLockById(req.skuId());
                    {"\n"}
                    {"    "}
                    stock.deduct(req.quantity());
                    {"\n"}
                    {"    "}
                    <span className="text-[#666666]">// 2. Invalidate distributed cache</span>
                    {"\n"}
                    {"    "}
                    cache.delete(<span className="text-[#BEF264]">"sku:"</span> + req.skuId());
                    {"\n"}
                    {"    "}
                    <span className="text-[#F5F5F5]">return</span>{" "}
                    <span className="text-[#F5F5F5]">new</span> OrderResponse(req.id(), Status.CONFIRMED);
                    {"\n"}
                    {"  "}
                    {"}"}
                    {"\n"}
                    {"}"}
                  </code>
                </pre>
              </div>

              {/* Card Footer Status */}
              <div className="border-t border-[#262626] bg-[#1A1A1A] px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-[#A1A1A1]">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
                  <span>ISEES Technologies LLP</span>
                </div>
                <span>Pune, India (Remote Available)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
