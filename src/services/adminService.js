import { supabase } from "./supabaseClient";

/**
 * Admin Dashboard Aggregation Service
 * Collects metrics, counts, and overview data for administrative monitoring.
 */

export const getDashboardStats = async () => {
  try {
    const [
      projectsRes,
      skillsRes,
      experienceRes,
      educationRes,
      certificationsRes,
      blogsRes,
      messagesRes,
      analyticsRes,
    ] = await Promise.all([
      supabase.from("projects").select("id, status, featured", { count: "exact" }),
      supabase.from("skills").select("id, is_visible", { count: "exact" }),
      supabase.from("experience").select("id, is_visible", { count: "exact" }),
      supabase.from("education").select("id, is_visible", { count: "exact" }),
      supabase.from("certifications").select("id, is_visible", { count: "exact" }),
      supabase.from("blog_posts").select("id, status", { count: "exact" }),
      supabase.from("contact_messages").select("id, status", { count: "exact" }),
      supabase.from("visitor_analytics").select("id", { count: "exact" }),
    ]);

    const unreadMessages = (messagesRes.data || []).filter((m) => m.status === "unread").length;
    const publishedProjects = (projectsRes.data || []).filter((p) => p.status === "published").length;
    const publishedBlogs = (blogsRes.data || []).filter((b) => b.status === "published").length;

    return {
      data: {
        projects: {
          total: projectsRes.count || 0,
          published: publishedProjects,
        },
        skills: {
          total: skillsRes.count || 0,
        },
        experience: {
          total: experienceRes.count || 0,
        },
        education: {
          total: educationRes.count || 0,
        },
        certifications: {
          total: certificationsRes.count || 0,
        },
        blogPosts: {
          total: blogsRes.count || 0,
          published: publishedBlogs,
        },
        messages: {
          total: messagesRes.count || 0,
          unread: unreadMessages,
        },
        analytics: {
          totalVisits: analyticsRes.count || 0,
        },
      },
      error: null,
    };
  } catch (err) {
    console.error("Dashboard stats aggregation error:", err);
    return { data: null, error: err };
  }
};

