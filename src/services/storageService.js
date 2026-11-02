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

export const deleteImage = async (bucket, path) => {
  const { data, error } = await supabase.storage.from(bucket).remove([path]);
  return { data, error };
};

