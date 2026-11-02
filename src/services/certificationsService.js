import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { certificates as staticCertificates } from "../data/certificate";

export const getCertifications = async () => {
  if (!isSupabaseConfigured()) {
    return { data: staticCertificates, error: null, source: "static" };
  }

  try {
    const { data, error } = await supabase
      .from("certifications")
      .select("*")
      .eq("is_visible", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return { data: staticCertificates, error, source: "static_fallback" };
    }

    const formatted = data.map((c) => ({
      ...c,
      title: c.name,
      category: c.issuer || "General",
      img: c.image_url || "/assets/c.jpg",
    }));

    return { data: formatted, raw: data, error: null, source: "supabase" };
  } catch (err) {
    console.error("Certifications retrieval failed:", err);
    return { data: staticCertificates, error: err, source: "static_error_fallback" };
  }
};

export const createCertification = async (certData) => {
  const { data, error } = await supabase
    .from("certifications")
    .insert({
      name: certData.name || certData.title,
      issuer: certData.issuer ?? certData.category ?? null,
      credential_id: certData.credential_id ?? null,
      credential_url: certData.credential_url ?? null,
      issue_date: certData.issue_date ?? null,
      expiry_date: certData.expiry_date ?? null,
      image_url: certData.image_url ?? certData.img ?? null,
      display_order: certData.display_order ?? 0,
      is_visible: certData.is_visible !== false,
    })
    .select()
    .single();

  return { data, error };
};

export const updateCertification = async (id, certData) => {
  const payload = { ...certData };
  if (payload.title && !payload.name) payload.name = payload.title;
  if (payload.img && !payload.image_url) payload.image_url = payload.img;
  delete payload.title;
  delete payload.img;

  const { data, error } = await supabase
    .from("certifications")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

export const deleteCertification = async (id) => {
  const { data, error } = await supabase
    .from("certifications")
    .delete()
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

