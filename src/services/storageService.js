import { supabase } from "./supabaseClient";

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const validateImageFile = (file) => {
  if (!file) return { valid: false, error: "No file provided" };
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type (${file.type}). Allowed types: JPEG, PNG, WebP, AVIF.`,
    };
  }
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds 5 MB limit.`,
    };
  }
  return { valid: true, error: null };
};

export const getPublicImageUrl = (bucket, path) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

export const uploadProjectImage = async (file, customPath = null) => {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    return { data: null, error: new Error(validation.error) };
  }

  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filePath = customPath || `projects/${Date.now()}-${cleanName}`;

  const { data, error } = await supabase.storage
    .from("project-media")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) return { data: null, error };

  const publicUrl = getPublicImageUrl("project-media", data.path);
  return { data: { path: data.path, publicUrl }, error: null };
};

export const uploadProfileImage = async (file, customPath = null) => {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    return { data: null, error: new Error(validation.error) };
  }

  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filePath = customPath || `profile/${Date.now()}-${cleanName}`;

  const { data, error } = await supabase.storage
    .from("profile-media")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) return { data: null, error };

  const publicUrl = getPublicImageUrl("profile-media", data.path);
  return { data: { path: data.path, publicUrl }, error: null };
};

export const uploadBlogImage = async (file, customPath = null) => {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    return { data: null, error: new Error(validation.error) };
  }

  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filePath = customPath || `blog/${Date.now()}-${cleanName}`;

  const { data, error } = await supabase.storage
    .from("blog-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) return { data: null, error };

  const publicUrl = getPublicImageUrl("blog-images", data.path);
  return { data: { path: data.path, publicUrl }, error: null };
};

export const deleteBlogImage = async (pathOrUrl) => {
  if (!pathOrUrl) return { data: null, error: null };
  let path = pathOrUrl;
  if (pathOrUrl.startsWith("http")) {
    const bucketMarker = "/blog-images/";
    const idx = pathOrUrl.indexOf(bucketMarker);
    if (idx !== -1) {
      path = pathOrUrl.slice(idx + bucketMarker.length);
    }
  }
  return await deleteImage("blog-images", path);
};

export const deleteImage = async (bucket, path) => {
  const { data, error } = await supabase.storage.from(bucket).remove([path]);
  return { data, error };
};

export const uploadTestimonialImage = async (file, customPath = null) => {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    return { data: null, error: new Error(validation.error) };
  }

  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filePath = customPath || `testimonials/${Date.now()}-${cleanName}`;

  const { data, error } = await supabase.storage
    .from("blog-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) return { data: null, error };

  const publicUrl = getPublicImageUrl("blog-images", data.path);
  return { data: { path: data.path, publicUrl }, error: null };
};

export const deleteTestimonialImage = async (pathOrUrl) => {
  if (!pathOrUrl) return { data: null, error: null };
  let path = pathOrUrl;
  if (pathOrUrl.startsWith("http")) {
    const bucketMarker = "/blog-images/";
    const legacyMarker = "/testimonial-images/";
    const idx = pathOrUrl.indexOf(bucketMarker);
    if (idx !== -1) {
      path = pathOrUrl.slice(idx + bucketMarker.length);
    } else {
      const legIdx = pathOrUrl.indexOf(legacyMarker);
      if (legIdx !== -1) {
        path = pathOrUrl.slice(legIdx + legacyMarker.length);
      }
    }
  }
  return await deleteImage("blog-images", path);
};

export const uploadCaseStudyImage = async (file, customPath = null) => {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    return { data: null, error: new Error(validation.error) };
  }

  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filePath = customPath || `case-studies/${Date.now()}-${cleanName}`;

  const { data, error } = await supabase.storage
    .from("project-case-study-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) return { data: null, error };

  const publicUrl = getPublicImageUrl("project-case-study-images", data.path);
  return { data: { path: data.path, publicUrl }, error: null };
};

export const deleteCaseStudyImage = async (pathOrUrl) => {
  if (!pathOrUrl) return { data: null, error: null };
  let path = pathOrUrl;
  if (pathOrUrl.startsWith("http")) {
    const bucketMarker = "/project-case-study-images/";
    const idx = pathOrUrl.indexOf(bucketMarker);
    if (idx !== -1) {
      path = pathOrUrl.slice(idx + bucketMarker.length);
    }
  }
  return await deleteImage("project-case-study-images", path);
};

