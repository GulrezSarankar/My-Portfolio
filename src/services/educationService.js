import { supabase, isSupabaseConfigured } from "./supabaseClient";

const staticEducation = [
  {
    id: "msc-cs",
    qualification: "M.Sc. Computer Science",
    title: "M.Sc. Computer Science",
    institution: "Abeda Inamdar Senior College",
    field_of_study: "Computer Science",
    grade: "6.73 / 10 CGPA",
    gpa: "6.73 / 10 CGPA",
    status: "Completed",
    year: "Completed",
    desc: "Postgraduate program focused on advanced algorithms, distributed system design, enterprise Java architectures, and relational database management.",
    description: "Postgraduate program focused on advanced algorithms, distributed system design, enterprise Java architectures, and relational database management.",
    subjects: ["Advanced Algorithms", "System Design", "Enterprise Java Architectures", "Advanced Database Systems", "Distributed Computing"],
  },
  {
    id: "bsc-it",
    qualification: "B.Sc. Information Technology",
    title: "B.Sc. Information Technology",
    institution: "Hirval Education, Mahad",
    affiliation: "Mumbai University",
    field_of_study: "Information Technology",
    year: "2019 - 2022",
    grade: "8.14 / 10 CGPA",
    gpa: "8.14 / 10 CGPA",
    status: "Completed",
    desc: "Undergraduate degree establishing rigorous foundations in object-oriented programming (Core Java), data structures, operating systems, and relational databases.",
    description: "Undergraduate degree establishing rigorous foundations in object-oriented programming (Core Java), data structures, operating systems, and relational databases.",
    subjects: ["Core Java & OOP", "Relational Database Management (RDBMS)", "Data Structures & Algorithms", "Operating Systems", "Software Engineering"],
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
      const match = staticEducation.find(
        (s) => s.qualification === edu.qualification || s.title === edu.qualification
      );
      return {
        ...edu,
        title: edu.qualification,
        institution: edu.institution || match?.institution || "Abeda Inamdar Senior College",
        affiliation: edu.affiliation || match?.affiliation || null,
        year: edu.is_current ? "Current" : edu.end_date ? `${edu.start_date ? edu.start_date.slice(0, 4) : ""} - ${edu.end_date.slice(0, 4)}` : (edu.year || match?.year || "Completed"),
        gpa: edu.grade || match?.gpa || "6.73 / 10 CGPA",
        status: edu.status || match?.status || "Completed",
        desc: edu.description || match?.desc || "",
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
      grade: eduData.grade ?? null,
      start_date: eduData.start_date ?? null,
      end_date: eduData.end_date ?? null,
      is_current: Boolean(eduData.is_current),
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
