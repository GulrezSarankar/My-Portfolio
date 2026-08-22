import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import { blogs } from "../data/blogs";
import SEO from "../assets/components/SEO";

export default function BlogDetail() {
  const { slug } = useParams();
  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    return (
      <section className="bg-[var(--bg-main)] py-12 lg:py-20 transition-colors duration-300">
        <SEO
          title="Article Not Found | Gulrez Sarankar"
          description="The requested Java backend engineering article could not be found."
          canonicalPath="/blog"
        />
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-black text-[var(--text-primary)]">Article not found.</h1>
          <Link to="/blog" className="btn-secondary-theme mt-6">
            <FaArrowLeft /> Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt || blog.summary,
    "author": {
      "@type": "Person",
      "name": "Gulrez Sarankar",
      "url": "https://gulrezsarankar.info/"
    },
    "url": `https://gulrezsarankar.info/blog/${blog.slug}`,
    "mainEntityOfPage": `https://gulrezsarankar.info/blog/${blog.slug}`,
    "articleSection": blog.category
  };

  return (
    <article className="bg-[var(--bg-main)] py-12 lg:py-20 transition-colors duration-300">
      <SEO
        title={`${blog.title} | Gulrez Sarankar`}
        description={blog.excerpt || blog.summary}
        canonicalPath={`/blog/${blog.slug}`}
        ogType="article"
        jsonLd={blogJsonLd}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="btn-secondary-theme mb-8 text-xs">
          <FaArrowLeft /> Back to Blog
        </Link>

        <header className="theme-card p-6 sm:p-8 lg:p-10">
          <span className="theme-badge">
            {blog.category}
          </span>
          <h1 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)] lg:text-4xl">
            {blog.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt /> {blog.date}
            </span>
            <span className="flex items-center gap-1.5">
              <FaClock /> {blog.readTime}
            </span>
          </div>
          <p className="mt-5 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
            {blog.summary}
          </p>
        </header>

        <div className="mt-6 space-y-6">
          {blog.sections.map((section) => (
            <section key={section.heading} className="theme-card p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">{section.heading}</h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">{section.body}</p>
              {section.code && (
                <div className="mt-4 overflow-x-auto rounded-lg border border-[#263241] bg-[#0A1018] p-4 font-code text-xs text-[#38BDF8] sm:text-sm">
                  <pre><code>{section.code}</code></pre>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
