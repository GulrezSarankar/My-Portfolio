import { supabase, isSupabaseConfigured } from "./supabaseClient";

const staticExperiences = [
  {
    company: "ISEES Technologies LLP",
    role: "Software Engineer",
    period: "Jan 2026 — Present",
    tenure: "Jul 2024 — Present",
    location: "Onsite / Remote",
    isPromoted: true,
    highlights: [
      "Promoted from Associate Software Engineer to Software Engineer in January 2026.",
      "Working on Java-based backend development and maintaining REST APIs.",
      "Working with database integration and application development.",
      "Contributing to real-world software projects and backend architecture.",
    ],
    tech: ["Java", "REST APIs", "Databases", "Backend Architecture"],
  },
  {
    company: "ISEES Technologies LLP",
    role: "Associate Software Engineer",
    period: "Jul 2024 — Jan 2026",
    location: "Onsite / Remote",
    isPromoted: false,
    highlights: [
      "Worked as a Java Developer building real-world backend applications.",
      "Gained hands-on experience with Core Java and OOP concepts.",
      "Worked on backend development, REST APIs, and database integration.",
      "Contributed to real-world application development projects.",
    ],
    tech: ["Core Java", "OOP", "REST APIs", "Databases", "Backend Development"],
  },
];

export const getExperience = async () => {
  if (!isSupabaseConfigured()) {
    return { data: staticExperiences, error: null, source: "static" };
  }

  try {
    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .eq("is_visible", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return { data: staticExperiences, error, source: "static_fallback" };
    }

    const formatted = data.map((exp) => ({
      ...exp,
      period: exp.is_current
        ? `${exp.start_date ? exp.start_date.slice(0, 7) : "Jan 2026"} — Present`
        : `${exp.start_date ? exp.start_date.slice(0, 7) : ""} — ${exp.end_date ? exp.end_date.slice(0, 7) : ""}`,
      tech: exp.highlights && exp.highlights.length > 0 ? ["Java", "REST APIs", "Databases"] : [],
    }));

    return { data: formatted, raw: data, error: null, source: "supabase" };
  } catch (err) {
    console.error("Experience retrieval failed:", err);
    return { data: staticExperiences, error: err, source: "static_error_fallback" };
  }
};

export const createExperience = async (expData) => {
  const { data, error } = await supabase
    .from("experience")
    .insert({
      company: expData.company,
      role: expData.role,
      employment_type: expData.employment_type ?? null,
      location: expData.location ?? null,
      start_date: expData.start_date ?? null,
      end_date: expData.end_date ?? null,
      is_current: Boolean(expData.is_current),
      description: expData.description ?? null,
      highlights: expData.highlights ?? [],
      display_order: expData.display_order ?? 0,
      is_visible: expData.is_visible !== false,
    })
    .select()
    .single();

  return { data, error };
};

export const updateExperience = async (id, expData) => {
  const { data, error } = await supabase
    .from("experience")
    .update(expData)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

export const deleteExperience = async (id) => {
  const { data, error } = await supabase
    .from("experience")
    .delete()
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

