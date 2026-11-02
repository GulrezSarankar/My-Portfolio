import { supabase, isSupabaseConfigured } from "./supabaseClient";

const staticEducation = [
  {
    institution: "Savitribai Phule Pune University / PG Institute",
    qualification: "Master of Science in Computer Science (M.Sc CS)",
    field_of_study: "Computer Science",
    year: "2024 - 2026",
    grade: "Current",
    description: "Advanced postgraduate program focused on algorithms, cloud computing, distributed system design, and backend software engineering.",
    subjects: ["Advanced Algorithms", "Cloud Architecture", "System Design", "Advanced DBMS", "Data Analytics"],
  },
  {
    institution: "Savitribai Phule Pune University",
    qualification: "Bachelor of Science in Information Technology (B.Sc IT)",
    field_of_study: "Information Technology",
    year: "2019 - 2022",
    grade: "8.14 CGPA",
    description: "Strong IT foundation covering computer science fundamentals, networking, relational databases, Java programming, and software engineering.",
    subjects: ["Database Systems", "Operating Systems", "Software Engineering", "Java Programming", "Web Development"],
  },
];

export const getEducation = async () => {
  if (!isSupabaseConfigured()) {
    return { data: staticEducation, error: null, source: "static" };
  }

  try {
    const { data, error } = await supabase
      .from("education")
      .select("*")
      .eq("is_visible", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return { data: staticEducation, error, source: "static_fallback" };
    }

    const formatted = data.map((edu) => {
      const match = staticEducation.find((s) => s.qualification === edu.qualification);
      return {
        ...edu,
        title: edu.qualification,
        year: `${edu.start_date ? edu.start_date.slice(0, 4) : "2024"} - ${edu.end_date ? edu.end_date.slice(0, 4) : "2026"}`,
        gpa: edu.grade,
        desc: edu.description,
        subjects: match ? match.subjects : (edu.field_of_study ? [edu.field_of_study] : []),
      };
    });

    return { data: formatted, raw: data, error: null, source: "supabase" };
  } catch (err) {
    console.error("Education retrieval failed:", err);
    return { data: staticEducation, error: err, source: "static_error_fallback" };
  }
};

export const createEducation = async (eduData) => {
  const { data, error } = await supabase
    .from("education")
    .insert({
      institution: eduData.institution,
      qualification: eduData.qualification,
      field_of_study: eduData.field_of_study ?? null,
      start_date: eduData.start_date ?? null,
      end_date: eduData.end_date ?? null,
      grade: eduData.grade ?? null,
      description: eduData.description ?? null,
      display_order: eduData.display_order ?? 0,
      is_visible: eduData.is_visible !== false,
    })
    .select()
    .single();

  return { data, error };
};

export const updateEducation = async (id, eduData) => {
  const { data, error } = await supabase
    .from("education")
    .update(eduData)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

export const deleteEducation = async (id) => {
  const { data, error } = await supabase
    .from("education")
    .delete()
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};



export const getAllEducationAdmin = async () => {
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("display_order", { ascending: true });

  return { data, error };
};
