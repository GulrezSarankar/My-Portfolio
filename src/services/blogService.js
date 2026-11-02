import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { blogs as staticBlogs } from "../data/blogs";

export const getPublishedPosts = async () => {
  if (!isSupabaseConfigured()) {
    return { data: staticBlogs, error: null, source: "static" };
  }

  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return { data: staticBlogs, error, source: "static_fallback" };
    }

    const formatted = data.map((post) => ({
      ...post,
      category: post.tags && post.tags.length > 0 ? post.tags[0] : "Article",
      readTime: "5 min read",
      date: post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "August 12, 2026",
    }));

    return { data: formatted, raw: data, error: null, source: "supabase" };
  } catch (err) {
    console.error("Blog posts retrieval failed:", err);
    return { data: staticBlogs, error: err, source: "static_error_fallback" };
  }
};

export const getPostBySlug = async (slug) => {
  if (!isSupabaseConfigured()) {
    const found = staticBlogs.find((b) => b.slug === slug);
    return { data: found || null, error: null, source: "static" };
  }

  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      const fallback = staticBlogs.find((b) => b.slug === slug);
      return { data: fallback || null, error: null, source: "static_fallback" };
    }

    const formatted = {
      ...data,
      category: data.tags && data.tags.length > 0 ? data.tags[0] : "Article",
      readTime: "5 min read",
      date: data.published_at ? new Date(data.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "August 12, 2026",
      summary: data.excerpt,
    };

    return { data: formatted, error: null, source: "supabase" };
  } catch (err) {
    console.error("Get post by slug failed:", err);
    const fallback = staticBlogs.find((b) => b.slug === slug);
    return { data: fallback || null, error: err, source: "static_error_fallback" };
  }
};

export const createPost = async (postData) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt ?? null,
      content: postData.content ?? "",
      cover_image_url: postData.cover_image_url ?? null,
      tags: postData.tags ?? [],
      status: postData.status || "draft",
      published_at: postData.published_at ?? (postData.status === "published" ? new Date().toISOString() : null),
    })
    .select()
    .single();

  return { data, error };
};

export const updatePost = async (id, postData) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .update(postData)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

export const deletePost = async (id) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

