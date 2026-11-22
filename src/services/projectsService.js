import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { projects as staticProjects } from "../data/projects";

/**
 * Projects Service
 * Handles CRUD and retrieval for portfolio projects and case studies.
 */

export const isValidUrl = (urlString) => {
  if (!urlString || typeof urlString !== "string") return false;
  try {
    const url = new URL(urlString.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const formatProjectRecord = (p, staticMatch = null) => {
  const source = staticMatch ? { ...staticMatch, ...p } : p;
  const dbImages = (p.project_images || [])
    .sort((a, b) => a.display_order - b.display_order)
    .map((img) => img.storage_path);

  const images =
    dbImages.length > 0
      ? dbImages
      : p.image_url
      ? [p.image_url]
      : staticMatch?.images && staticMatch.images.length > 0
      ? staticMatch.images
      : [];

  const keyFeatures =
    Array.isArray(p.key_features) && p.key_features.length > 0
      ? p.key_features
      : Array.isArray(p.features) && p.features.length > 0
      ? p.features
      : Array.isArray(staticMatch?.features)
      ? staticMatch.features
      : [];

  const screenshots =
    Array.isArray(p.screenshots) && p.screenshots.length > 0
      ? p.screenshots
      : images.map((img, i) => ({ url: img, caption: `Screenshot ${i + 1}` }));

  const hasCaseStudy = Boolean(
    p.has_case_study ||
    p.overview ||
    p.problem_statement ||
    p.architecture ||
    p.longDescription ||
    staticMatch?.longDescription ||
    (Array.isArray(keyFeatures) && keyFeatures.length > 0) ||
    p.architecture_diagram_url ||
    (Array.isArray(screenshots) && screenshots.length > 0)
  );

  return {
    ...source,
    ...p,
    tech: p.tech_stack || p.tech || staticMatch?.tech || [],
    github: p.github_url !== undefined ? p.github_url : p.github !== undefined ? p.github : staticMatch?.github || null,
    link: p.live_url !== undefined ? p.live_url : p.link !== undefined ? p.link : staticMatch?.link || null,
    images,
    isPrivate: !(p.github_url || p.github || staticMatch?.github) && !(p.live_url || p.link || staticMatch?.link),
    overview: p.overview || p.description || staticMatch?.longDescription || staticMatch?.description || "",
    problem_statement: p.problem_statement || staticMatch?.problem_statement || null,
    my_role: p.my_role || p.contribution || staticMatch?.contribution || null,
    architecture: p.architecture || staticMatch?.architecture || null,
    technical_challenges: p.technical_challenges || staticMatch?.technical_challenges || null,
    solutions: p.solutions || staticMatch?.solutions || null,
    key_features: keyFeatures,
    results_outcomes:
      p.results_outcomes ||
      (staticMatch?.metrics ? staticMatch.metrics.map((m) => `${m.label}: ${m.value}`).join(" | ") : null),
    api_docs_url: p.api_docs_url || staticMatch?.api_docs_url || null,
    architecture_diagram_url: p.architecture_diagram_url || staticMatch?.architecture_diagram_url || null,
    architecture_diagram_path: p.architecture_diagram_path || null,
    screenshots,
    has_case_study: hasCaseStudy,
  };
};

export const getAllPublishedProjects = async () => {
  if (!isSupabaseConfigured()) {
    return { data: staticProjects.map((sp) => formatProjectRecord(sp, sp)), error: null, source: "static" };
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*, project_images(storage_path, alt_text, display_order)")
      .eq("status", "published")
      .order("display_order", { ascending: true });

    if (error) {
      console.warn("Supabase projects query returned error; using static fallback:", error.message);
      return { data: staticProjects.map((sp) => formatProjectRecord(sp, sp)), error, source: "static_fallback" };
    }

    if (!data || data.length === 0) {
      return { data: staticProjects.map((sp) => formatProjectRecord(sp, sp)), error: null, source: "static_empty_fallback" };
    }

    const formatted = data.map((p) => {
      const staticMatch = staticProjects.find(
        (sp) => sp.id === p.id || sp.slug === p.slug || sp.id === p.slug
      );
      return formatProjectRecord(p, staticMatch);
    });
    return { data: formatted, error: null, source: "supabase" };
  } catch (err) {
    console.error("Projects retrieval exception:", err);
    return { data: staticProjects.map((sp) => formatProjectRecord(sp, sp)), error: err, source: "static_error_fallback" };
  }
};

export const getProjectBySlug = async (slug) => {
  if (!isSupabaseConfigured()) {
    const found = staticProjects.find((p) => p.id === slug || p.slug === slug);
    return { data: found ? formatProjectRecord(found, found) : null, error: null, source: "static" };
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
      return { data: fallback ? formatProjectRecord(fallback, fallback) : null, error: null, source: "static_fallback" };
    }

    const staticMatch = staticProjects.find((p) => p.id === slug || p.slug === slug);
    const formatted = formatProjectRecord(data, staticMatch);
    return { data: formatted, error: null, source: "supabase" };
  } catch (err) {
    console.error("Get project by slug failed:", err);
    const fallback = staticProjects.find((p) => p.id === slug || p.slug === slug);
    return { data: fallback ? formatProjectRecord(fallback, fallback) : null, error: err, source: "static_error_fallback" };
  }
};

export const createProject = async (projectData) => {
  const insertPayload = {
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
  };

  // Optional case study fields
  if (projectData.overview !== undefined) insertPayload.overview = projectData.overview;
  if (projectData.problem_statement !== undefined) insertPayload.problem_statement = projectData.problem_statement;
  if (projectData.my_role !== undefined) insertPayload.my_role = projectData.my_role;
  if (projectData.architecture !== undefined) insertPayload.architecture = projectData.architecture;
  if (projectData.technical_challenges !== undefined) insertPayload.technical_challenges = projectData.technical_challenges;
  if (projectData.solutions !== undefined) insertPayload.solutions = projectData.solutions;
  if (projectData.key_features !== undefined) insertPayload.key_features = projectData.key_features;
  if (projectData.results_outcomes !== undefined) insertPayload.results_outcomes = projectData.results_outcomes;
  if (projectData.api_docs_url !== undefined) insertPayload.api_docs_url = projectData.api_docs_url;
  if (projectData.architecture_diagram_url !== undefined) insertPayload.architecture_diagram_url = projectData.architecture_diagram_url;
  if (projectData.architecture_diagram_path !== undefined) insertPayload.architecture_diagram_path = projectData.architecture_diagram_path;
  if (projectData.screenshots !== undefined) insertPayload.screenshots = projectData.screenshots;
  if (projectData.has_case_study !== undefined) insertPayload.has_case_study = Boolean(projectData.has_case_study);

  const { data, error } = await supabase
    .from("projects")
    .insert(insertPayload)
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

export const getAllProjectsAdmin = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("*, project_images(storage_path, alt_text, display_order)")
    .order("display_order", { ascending: true });

  return { data, error };
};
