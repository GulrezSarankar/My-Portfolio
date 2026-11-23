import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { testimonialsData as staticTestimonials } from "../data/testimonialsData";
import { deleteTestimonialImage, getPublicImageUrl } from "./storageService";

/**
 * Testimonials Service
 * Handles CRUD and retrieval for client & collaborator testimonials.
 * Uses the 'blog-images' bucket with a 'testimonials/' folder prefix.
 */

export const resolveTestimonialPhoto = (rawPhotoUrl, rawPhotoPath) => {
  let photoUrl = rawPhotoUrl || null;
  let photoPath = rawPhotoPath || null;

  // Clean legacy bucket references in URL if any
  if (photoUrl && photoUrl.includes("/testimonial-images/")) {
    photoUrl = photoUrl.replace("/testimonial-images/", "/blog-images/");
  }

  // Derive photoPath from photoUrl if missing
  if (!photoPath && photoUrl) {
    const marker = "/blog-images/";
    const idx = photoUrl.indexOf(marker);
    if (idx !== -1) {
      photoPath = photoUrl.slice(idx + marker.length);
    } else if (photoUrl.startsWith("testimonials/")) {
      photoPath = photoUrl;
    }
  }

  // Derive photoUrl from photoPath if missing
  if (!photoUrl && photoPath) {
    photoUrl = getPublicImageUrl("blog-images", photoPath);
  }

  return { photoUrl, photoPath };
};

export const validateTestimonial = (item) => {
  if (!item) return { valid: false, error: "Testimonial data is required." };
  if (!item.client_name || typeof item.client_name !== "string" || !item.client_name.trim()) {
    return { valid: false, error: "Client name is required." };
  }
  if (!item.feedback || typeof item.feedback !== "string" || !item.feedback.trim()) {
    return { valid: false, error: "Feedback statement is required." };
  }
  return { valid: true, error: null };
};

export const getAllPublishedTestimonials = async () => {
  if (!isSupabaseConfigured()) {
    return { data: staticTestimonials, error: null, source: "static" };
  }

  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_visible", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase testimonials query error; fallback to static data:", error.message);
      return { data: staticTestimonials, error, source: "static_fallback" };
    }

    if (!data || data.length === 0) {
      // Return empty array when no visible records exist in database
      return { data: [], error: null, source: "supabase_empty" };
    }

    const formatted = data.map((t) => {
      const { photoUrl, photoPath } = resolveTestimonialPhoto(
        t.avatar_url || t.photo_url,
        t.photo_path
      );
      return {
        id: t.id,
        name: t.client_name,
        role: t.designation || "Client",
        company: t.company || "",
        content: t.feedback,
        feedback: t.feedback,
        client_name: t.client_name,
        designation: t.designation,
        photo_url: photoUrl,
        photo_path: photoPath,
        avatar_url: photoUrl,
        is_visible: t.is_visible,
        display_order: t.display_order ?? 0,
        avatar: t.client_name
          ? t.client_name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
          : "GS",
        rating: 5,
        created_at: t.created_at,
      };
    });

    return { data: formatted, raw: data, error: null, source: "supabase" };
  } catch (err) {
    console.error("Testimonials retrieval exception:", err);
    return { data: staticTestimonials, error: err, source: "static_error_fallback" };
  }
};

export const getAllTestimonialsAdmin = async () => {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return { data: data || [], error };
  }

  const formatted = data.map((t) => {
    const { photoUrl, photoPath } = resolveTestimonialPhoto(
      t.avatar_url || t.photo_url,
      t.photo_path
    );
    return {
      ...t,
      photo_url: photoUrl,
      photo_path: photoPath,
      avatar_url: photoUrl,
    };
  });

  return { data: formatted, error: null };
};

export const createTestimonial = async (testimonialData) => {
  const validation = validateTestimonial(testimonialData);
  if (!validation.valid) {
    return { data: null, error: new Error(validation.error) };
  }

  const { photoUrl, photoPath } = resolveTestimonialPhoto(
    testimonialData.photo_url || testimonialData.avatar_url,
    testimonialData.photo_path
  );

  // NOTE: Database schema has 'photo_path' and 'avatar_url'.
  // Do NOT include 'photo_url' in the SQL payload as it is not a database column.
  const payload = {
    client_name: testimonialData.client_name.trim(),
    designation: testimonialData.designation ? testimonialData.designation.trim() : null,
    company: testimonialData.company ? testimonialData.company.trim() : null,
    feedback: testimonialData.feedback.trim(),
    photo_path: photoPath || null,
    avatar_url: photoUrl || null,
    is_visible: testimonialData.is_visible !== false,
    display_order: Number(testimonialData.display_order) || 0,
  };

  const { data, error } = await supabase
    .from("testimonials")
    .insert(payload)
    .select()
    .single();

  if (data) {
    const resolved = resolveTestimonialPhoto(data.avatar_url, data.photo_path);
    return {
      data: {
        ...data,
        photo_url: resolved.photoUrl,
        photo_path: resolved.photoPath,
      },
      error: null,
    };
  }

  return { data, error };
};

export const updateTestimonial = async (id, testimonialData) => {
  if (testimonialData.client_name !== undefined || testimonialData.feedback !== undefined) {
    const validation = validateTestimonial({
      client_name: testimonialData.client_name ?? "placeholder",
      feedback: testimonialData.feedback ?? "placeholder",
    });
    if (!validation.valid) {
      return { data: null, error: new Error(validation.error) };
    }
  }

  // NOTE: Explicitly map permitted columns to prevent sending undeclared columns (e.g. photo_url)
  const payload = {
    updated_at: new Date().toISOString(),
  };

  if (testimonialData.client_name !== undefined) {
    payload.client_name = testimonialData.client_name.trim();
  }
  if (testimonialData.designation !== undefined) {
    payload.designation = testimonialData.designation ? testimonialData.designation.trim() : null;
  }
  if (testimonialData.company !== undefined) {
    payload.company = testimonialData.company ? testimonialData.company.trim() : null;
  }
  if (testimonialData.feedback !== undefined) {
    payload.feedback = testimonialData.feedback.trim();
  }
  if (testimonialData.is_visible !== undefined) {
    payload.is_visible = testimonialData.is_visible !== false;
  }
  if (testimonialData.display_order !== undefined) {
    payload.display_order = Number(testimonialData.display_order) || 0;
  }

  if (
    testimonialData.photo_url !== undefined ||
    testimonialData.photo_path !== undefined ||
    testimonialData.avatar_url !== undefined
  ) {
    const { photoUrl, photoPath } = resolveTestimonialPhoto(
      testimonialData.photo_url || testimonialData.avatar_url,
      testimonialData.photo_path
    );
    payload.photo_path = photoPath || null;
    payload.avatar_url = photoUrl || null;
  }

  const { data, error } = await supabase
    .from("testimonials")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (data) {
    const resolved = resolveTestimonialPhoto(data.avatar_url, data.photo_path);
    return {
      data: {
        ...data,
        photo_url: resolved.photoUrl,
        photo_path: resolved.photoPath,
      },
      error: null,
    };
  }

  return { data, error };
};

export const deleteTestimonial = async (id, photoPathOrUrl = null) => {
  const { data, error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (!error && photoPathOrUrl) {
    try {
      await deleteTestimonialImage(photoPathOrUrl);
    } catch (cleanupErr) {
      console.warn("Testimonial image cleanup warning:", cleanupErr.message);
    }
  }

  return { data, error };
};

export const toggleTestimonialVisibility = async (id, currentVisibility) => {
  return await updateTestimonial(id, { is_visible: !currentVisibility });
};

