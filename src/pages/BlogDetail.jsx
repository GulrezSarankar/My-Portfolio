import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaCalendarDays, FaClock } from "react-icons/fa6";
import { blogs } from "../data/blogs";
import { getPostBySlug } from "../services/blogService";
import SEO from "../assets/components/SEO";
import MarkdownRenderer from "../assets/components/MarkdownRenderer";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(() => blogs.find((item) => item.slug === slug));

  useEffect(() => {
    let isMounted = true;
    getPostBySlug(slug).then((res) => {
      if (isMounted && res.data) {
        setBlog(res.data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (!blog) {
    return (
      <section className="bg-[#0D0D0D] py-16 sm:py-24 text-[#F5F5F5]">
        <SEO
          title="Article Not Found | Gulrez Sarankar"
          description="The requested Java backend engineering article could not be found."
          canonicalPath="/blog"
          noindex
        />
        <div className="mx-auto max-w-3xl text-center px-4">
          <h1 className="font-heading text-3xl font-bold text-[#F5F5F5]">Article not found.</h1>
          <p className="mt-3 text-sm text-[#A1A1A1]">
            The requested technical article could not be found or has been moved.
          </p>
          <div className="mt-6">
            <Link to="/blog" className="btn-primary inline-flex items-center gap-2 text-xs py-2.5 px-4">
              <FaArrowLeft className="text-xs" /> Back to Blog
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt || blog.summary,
    ...(blog.cover_image_url ? { image: blog.cover_image_url } : {}),
    "author": {
      "@type": "Person",
      "name": "Gulrez Sarankar",
      "url": "https://www.gulrezsarankar.info/"
    },
    "url": `https://www.gulrezsarankar.info/blog/${blog.slug}`,
    "mainEntityOfPage": `https://www.gulrezsarankar.info/blog/${blog.slug}`,
    "articleSection": blog.category
  };

  return (
    <article className="bg-[#0D0D0D] text-[#F5F5F5] py-12 sm:py-16 lg:py-20 border-b border-[#262626]">
      <SEO
        title={`${blog.title} | Gulrez Sarankar`}
        description={blog.excerpt || blog.summary}
        canonicalPath={`/blog/${blog.slug}`}
        ogType="article"
        ogImage={
          blog.cover_image_url
            ? (blog.cover_image_url.startsWith("http") ? blog.cover_image_url : `https://www.gulrezsarankar.info${blog.cover_image_url}`)
            : "https://www.gulrezsarankar.info/og-image.jpg"
        }
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: blog.title, url: `/blog/${blog.slug}` },
        ]}
        jsonLd={blogJsonLd}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="btn-secondary mb-8 text-xs inline-flex items-center gap-2 py-2 px-3.5"
        >
          <FaArrowLeft className="text-[10px]" /> <span>Back to Blog</span>
        </Link>

        {blog.cover_image_url && (
          <div className="mb-8 overflow-hidden rounded-xl border border-[#262626] bg-[#141414] max-h-[460px]">
            <img
              src={blog.cover_image_url}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.parentElement.style.display = "none";
              }}
            />
          </div>
        )}

        <header className="rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-8 lg:p-10">
          <span className="rounded bg-[#1A1A1A] border border-[#262626] px-2.5 py-0.5 text-[11px] font-mono text-[#A3E635]">
            {blog.category}
          </span>

          <h1 className="mt-4 font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F5F5F5]">
            {blog.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-xs font-mono text-[#A1A1A1]">
            <span className="flex items-center gap-1.5">
              <FaCalendarDays className="text-[10px] text-[#A3E635]" /> {blog.date}
            </span>
            <span className="flex items-center gap-1.5">
              <FaClock className="text-[10px] text-[#A3E635]" /> {blog.readTime}
            </span>
          </div>

          <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#A1A1A1]">
            {blog.summary || blog.excerpt}
          </p>
        </header>

        {/* Article Body Content */}
        {blog.content ? (
          <MarkdownRenderer content={blog.content} />
        ) : blog.sections && blog.sections.length > 0 ? (
          <div className="mt-8 space-y-6">
            {blog.sections.map((section, idx) => (
              <section
                key={idx}
                className="rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-8"
              >
                <h2 className="font-heading text-lg sm:text-xl font-bold text-[#F5F5F5]">
                  {section.heading}
                </h2>

                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#A1A1A1]">
                  {section.body}
                </p>

                {section.code && (
                  <div className="mt-4 overflow-x-auto rounded-lg border border-[#262626] bg-[#0D0D0D] p-4 font-mono text-xs text-[#BEF264]">
                    <pre>
                      <code>{section.code}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}
          </div>
        ) : null}

        {/* Back Link at bottom */}
        <div className="mt-10 pt-6 border-t border-[#262626] flex items-center justify-between">
          <Link
            to="/blog"
            className="text-xs font-mono font-medium text-[#A1A1A1] hover:text-[#A3E635] transition-colors inline-flex items-center gap-2"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Return to all articles</span>
          </Link>
          <span className="text-xs font-mono text-[#666666]">
            Author: Gulrez Sarankar
          </span>
        </div>
      </div>
    </article>
  );
}
