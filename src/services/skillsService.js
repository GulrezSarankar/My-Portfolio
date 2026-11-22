import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { skillCategories as staticSkillCategories } from "../data/skills";

/**
 * Skills Service
 */

export const getSkills = async () => {
  if (!isSupabaseConfigured()) {
    return { data: staticSkillCategories, raw: [], error: null, source: "static" };
  }

  try {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .eq("is_visible", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return { data: staticSkillCategories, raw: [], error, source: "static_fallback" };
    }

    // Group into categories
    const categoryMap = new Map();
    data.forEach((s) => {
      const cat = s.category || "General";
      if (!categoryMap.has(cat)) {
        categoryMap.set(cat, []);
      }
      categoryMap.get(cat).push({
        id: s.id,
        name: s.name,
        level: s.proficiency || 80,
        icon: s.icon,
      });
    });

    const categories = Array.from(categoryMap.entries()).map(([title, skills]) => ({
      title,
      skills,
    }));

    return { data: categories, raw: data, error: null, source: "supabase" };
  } catch (err) {
    console.error("Skills retrieval failed:", err);
    return { data: staticSkillCategories, raw: [], error: err, source: "static_error_fallback" };
  }
};

export const createSkill = async (skillData) => {
  const { data, error } = await supabase
    .from("skills")
    .insert({
      name: skillData.name,
      category: skillData.category ?? null,
      proficiency: skillData.proficiency ?? skillData.level ?? null,
      icon: skillData.icon ?? null,
      display_order: skillData.display_order ?? 0,
      is_visible: skillData.is_visible !== false,
    })
    .select()
    .single();

  return { data, error };
};

export const updateSkill = async (id, skillData) => {
  const payload = { ...skillData };
  if (payload.level !== undefined && payload.proficiency === undefined) {
    payload.proficiency = payload.level;
    delete payload.level;
  }

  const { data, error } = await supabase
    .from("skills")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

export const deleteSkill = async (id) => {
  const { data, error } = await supabase
    .from("skills")
    .delete()
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};



export const getAllSkillsAdmin = async () => {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("display_order", { ascending: true });

  return { data, error };
};
