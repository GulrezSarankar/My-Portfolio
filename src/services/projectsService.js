import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { projects as staticProjects } from "../data/projects";

/**
 * Projects Service
 * Handles CRUD and retrieval for portfolio projects.
 */

export const getAllPublishedProjects = async () => {
  if (!isSupabaseConfigured()) {
    return { data: staticProjects, error: null, source: "static" };
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*, project_images(storage_path, alt_text, display_order)")
      .eq("status", "published")
      .order("display_order", { ascending: true });

    if (error) {
      console.warn("Supabase projects query returned error; using static fallback:", error.message);
      return { data: staticProjects, error, source: "static_fallback" };
    }

    if (!data || data.length === 0) {
      return { data: staticProjects, error: null, source: "static_empty_fallback" };
    }

    // Map to frontend-compatible format while preserving all database fields
    const formatted = data.map((p) => {
      const dbImages = (p.project_images || [])
        .sort((a, b) => a.display_order - b.display_order)
        .map((img) => img.storage_path);

      return {
        ...p,
        tech: p.tech_stack || [],
        github: p.github_url,
        link: p.live_url,
        images: dbImages.length > 0 ? dbImages : p.image_url ? [p.image_url] : [],
        isPrivate: !p.github_url && !p.live_url,
      };
    });

    return { data: formatted, error: null, source: "supabase" };
  } catch (err) {
    console.error("Projects retrieval exception:", err);
    return { data: staticProjects, error: err, source: "static_error_fallback" };
  }
};

export const getProjectBySlug = async (slug) => {
  if (!isSupabaseConfigured()) {
    const found = staticProjects.find((p) => p.id === slug || p.slug === slug);
    return { data: found || null, error: null, source: "static" };
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*, project_images(storage_path, alt_text, display_order)")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      const fallback = staticProjects.find((p) => p.id === slug || p.slug === slug);
      return { data: fallback || null, error: null, source: "static_fallback" };
    }

    const dbImages = (data.project_images || [])
      .sort((a, b) => a.display_order - b.display_order)
      .map((img) => img.storage_path);

    const formatted = {
      ...data,
      tech: data.tech_stack || [],
      github: data.github_url,
      link: data.live_url,
      images: dbImages.length > 0 ? dbImages : data.image_url ? [data.image_url] : [],
      isPrivate: !data.github_url && !data.live_url,
    };

    return { data: formatted, error: null, source: "supabase" };
  } catch (err) {
    console.error("Get project by slug failed:", err);
    const fallback = staticProjects.find((p) => p.id === slug || p.slug === slug);
    return { data: fallback || null, error: err, source: "static_error_fallback" };
  }
};

export const createProject = async (projectData) => {
  const { data, error } = await supabase
    .from("projects")
    .insert({
      title: projectData.title,
      slug: projectData.slug,
      description: projectData.description ?? null,
      short_description: projectData.short_description ?? null,
      tech_stack: projectData.tech_stack || projectData.tech || [],
      image_url: projectData.image_url ?? null,
      github_url: projectData.github_url ?? projectData.github ?? null,
      live_url: projectData.live_url ?? projectData.link ?? null,
      featured: Boolean(projectData.featured),
      status: projectData.status || "draft",
      display_order: projectData.display_order ?? 0,
    })
    .select()
    .single();

  return { data, error };
};

export const updateProject = async (id, projectData) => {
  const payload = { ...projectData };
  if (payload.tech && !payload.tech_stack) payload.tech_stack = payload.tech;
  if (payload.github !== undefined && payload.github_url === undefined) payload.github_url = payload.github;
  if (payload.link !== undefined && payload.live_url === undefined) payload.live_url = payload.link;
  delete payload.tech;
  delete payload.github;
  delete payload.link;
  delete payload.isPrivate;
  delete payload.images;

  const { data, error } = await supabase
    .from("projects")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

export const deleteProject = async (id) => {
  const { data, error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

