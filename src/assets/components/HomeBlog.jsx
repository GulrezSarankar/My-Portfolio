import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaClock } from "react-icons/fa6";
import { getPublishedPosts } from "../../services/blogService";

export default function HomeBlog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getPublishedPosts().then((res) => {
      if (isMounted && res.data) {
        setPosts(res.data.slice(0, 2));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="bg-[#0D0D0D] py-16 sm:py-20 lg:py-24 border-b border-[#262626]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#141414] px-3 py-1 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1A1]">
                Technical Writing &amp; Architecture Notes
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5]">
              Latest Engineering Articles
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#A1A1A1] leading-relaxed">
              Practical guides on Spring Boot package layout, entity vs. DTO patterns, and database query performance.
            </p>
          </div>

          <Link
            to="/blog"
            className="btn-secondary text-xs sm:text-sm py-2.5 px-4 self-start md:self-auto shrink-0"
          >
            <span>View All Articles</span>
            <FaArrowRight className="text-[11px]" />
          </Link>
        </div>

        {/* 2-Column Article Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug || post.id}
              className="rounded-xl border border-[#262626] bg-[#141414] p-6 sm:p-8 flex flex-col justify-between transition-colors hover:border-[#383838]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="rounded bg-[#1A1A1A] border border-[#262626] px-2.5 py-0.5 text-[11px] font-mono text-[#A3E635]">
                    {post.category || "Java Architecture"}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#666666]">
                    <FaClock className="text-[10px]" />
                    <span>{post.readTime || "5 min read"}</span>
                  </div>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-[#F5F5F5] hover:text-[#A3E635] transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#A1A1A1] leading-relaxed line-clamp-3">
                  {post.excerpt || post.summary}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#262626] flex items-center justify-between">
                <span className="text-xs font-mono text-[#666666]">
                  {post.date}
                </span>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#F5F5F5] hover:text-[#A3E635] transition-colors"
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

