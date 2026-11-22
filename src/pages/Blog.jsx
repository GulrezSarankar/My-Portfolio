import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaClock, FaBookOpen } from "react-icons/fa6";
import { blogs } from "../data/blogs";
import { getPublishedPosts } from "../services/blogService";
import SEO from "../assets/components/SEO";

export default function Blog() {
  const [blogList, setBlogList] = useState(blogs);

  useEffect(() => {
    let isMounted = true;
    getPublishedPosts().then((res) => {
      if (isMounted && res.data && res.data.length > 0) {
        setBlogList(res.data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-[#0D0D0D] text-[#F5F5F5] py-16 sm:py-20 lg:py-24 border-b border-[#262626]">
      <SEO
        title="Java & Spring Boot Blog | Technical Articles by Gulrez Sarankar"
        description="Engineering insights, Spring Boot architecture notes, DTO patterns, and database performance optimization articles by Gulrez Sarankar."
        canonicalPath="/blog"
      />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#141414] px-3 py-1 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1A1]">
              Technical Writing &amp; Architecture Notes
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F5] leading-tight">
            Engineering Insights &amp; <br className="hidden sm:inline" />
            <span className="text-[#A3E635]">Architecture Notes</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#A1A1A1] leading-relaxed">
            Technical notes on Spring Boot package design, DTO mapping, REST API security, and database query optimization.
          </p>
        </div>

        {/* 3-Column Articles Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogList.map((blog) => (
            <article
              key={blog.slug}
              className="rounded-xl border border-[#262626] bg-[#141414] p-6 flex flex-col justify-between transition-colors hover:border-[#383838]"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded bg-[#1A1A1A] border border-[#262626] px-2.5 py-0.5 text-[11px] font-mono text-[#A3E635]">
                    {blog.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-[#666666]">
                    <FaClock className="text-[10px]" /> {blog.readTime}
                  </span>
                </div>

                {blog.cover_image_url ? (
                  <div className="mb-4 h-44 w-full overflow-hidden rounded-lg border border-[#262626] bg-[#1A1A1A]">
                    <img
                      src={blog.cover_image_url}
                      alt={blog.title}
                      className="h-full w-full object-cover opacity-90 transition-opacity hover:opacity-100"
                      loading="lazy"
                      onError={(e) => {
                        e.target.parentElement.style.display = "none";
                      }}
                    />
                  </div>
                ) : (
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[#262626] bg-[#1A1A1A] text-[#A3E635]">
                    <FaBookOpen className="text-sm" />
                  </div>
                )}

                <h2 className="font-heading text-lg font-bold text-[#F5F5F5] hover:text-[#A3E635] transition-colors leading-snug">
                  <Link to={`/blog/${blog.slug}`}>
                    {blog.title}
                  </Link>
                </h2>

                <p className="mt-1 text-xs font-mono text-[#666666]">{blog.date}</p>

                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#A1A1A1] line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>

              <div className="mt-6 border-t border-[#262626] pt-4">
                <Link
                  to={`/blog/${blog.slug}`}
                  className="btn-secondary w-full justify-center text-xs py-2"
                >
                  <span>Read Article</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
