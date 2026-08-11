import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import { blogs } from "../data/blogs";

export default function BlogDetail() {
  const { slug } = useParams();
  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    return (
      <section className="page-section px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">Blog</p>
          <h1 className="mt-4 text-4xl font-black text-heading">Article not found.</h1>
          <Link to="/blog" className="secondary-button mt-8 px-5 py-3">
            <FaArrowLeft /> Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="page-section px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link to="/blog" className="secondary-button mb-8 px-5 py-3">
          <FaArrowLeft /> Back to Blog
        </Link>

        <header className="surface-card rounded-3xl p-7 md:p-10">
          <span className="rounded-full px-4 py-2 text-xs font-black accent-soft accent-text">
            {blog.category}
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight text-heading md:text-6xl">
            {blog.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold text-soft">
            <span className="flex items-center gap-2">
              <FaCalendarAlt /> {blog.date}
            </span>
            <span className="flex items-center gap-2">
              <FaClock /> {blog.readTime}
            </span>
          </div>
          <p className="mt-7 text-lg leading-8 text-muted">{blog.summary}</p>
        </header>

        <div className="mt-8 space-y-6">
          {blog.sections.map((section) => (
            <section key={section.heading} className="surface-card rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-black text-heading">{section.heading}</h2>
              <p className="mt-4 leading-8 text-muted">{section.body}</p>
              {section.code && (
                <pre className="mt-5 overflow-x-auto rounded-2xl border p-5 text-sm leading-6" style={{ background: "var(--code-bg)", borderColor: "var(--border)", color: "var(--code-text)" }}>
                  <code>{section.code}</code>
                </pre>
              )}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
