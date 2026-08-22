import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaClock, FaBookOpen } from "react-icons/fa6";
import { blogs } from "../data/blogs";
import SEO from "../assets/components/SEO";

export default function Blog() {
  return (
    <section className="bg-[var(--bg-main)] py-12 lg:py-20 transition-colors duration-300">
      <SEO
        title="Java & Spring Boot Blog | Technical Articles by Gulrez Sarankar"
        description="Engineering insights, Spring Boot architecture notes, DTO patterns, and database performance optimization articles by Gulrez Sarankar."
        canonicalPath="/blog"
      />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)]">
            JAVA BACKEND ARTICLES
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)] md:text-4xl lg:text-5xl">
            Engineering Insights & Architecture Notes
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-[var(--text-secondary)]">
            Technical notes on Spring Boot package design, DTO mapping, REST API security, and database query optimization.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, idx) => (
            <motion.article
              key={blog.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="theme-card theme-card-hover flex flex-col justify-between p-5 sm:p-6"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="theme-badge">
                    {blog.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-[var(--text-secondary)]">
                    <FaClock className="text-[10px]" /> {blog.readTime}
                  </span>
                </div>

                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent-primary)] border border-[var(--border-color)]">
                  <FaBookOpen />
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                  {blog.title}
                </h2>
                <p className="mt-1 text-xs font-semibold text-[var(--text-muted)]">{blog.date}</p>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                  {blog.excerpt}
                </p>
              </div>

              <div className="mt-6 border-t border-[var(--border-color)] pt-4">
                <Link
                  to={`/blog/${blog.slug}`}
                  className="btn-secondary-theme w-full py-2.5 text-xs font-bold"
                >
                  Read Article
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
