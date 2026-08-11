import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBookOpen, FaClock } from "react-icons/fa";
import SectionTitle from "../assets/components/Sectiontitle";
import { blogs } from "../data/blogs";

export default function Blog() {
  return (
    <section className="page-section px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="Blog" />

        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="section-kicker">Java Backend Notes</p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-heading md:text-5xl">
            Practical articles for clean, interview-ready backend thinking.
          </h1>
          <p className="mt-5 leading-8 text-muted">
            Short technical notes focused on Java, Spring Boot structure, DTO design,
            and backend architecture patterns that make projects easier to review.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="surface-card professional-card flex h-full flex-col rounded-2xl p-6"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="rounded-full px-3 py-1 text-xs font-black accent-soft accent-text">
                  {blog.category}
                </span>
                <span className="flex items-center gap-2 text-xs font-bold text-soft">
                  <FaClock /> {blog.readTime}
                </span>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl accent-bg text-xl text-white">
                <FaBookOpen />
              </div>

              <h2 className="mt-5 text-2xl font-black leading-tight text-heading">
                {blog.title}
              </h2>
              <p className="mt-2 text-sm font-semibold text-soft">{blog.date}</p>
              <p className="mt-4 flex-1 leading-7 text-muted">{blog.excerpt}</p>

              <Link to={`/blog/${blog.slug}`} className="secondary-button mt-6 px-5 py-3">
                Read More <FaArrowRight className="text-xs" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
