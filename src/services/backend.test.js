import { isSupabaseConfigured } from "./supabaseClient";
import { getAllPublishedProjects, getProjectBySlug } from "./projectsService";
import { getSkills } from "./skillsService";
import { getExperience } from "./experienceService";
import { getEducation } from "./educationService";
import { getCertifications } from "./certificationsService";
import { getPublishedPosts, getPostBySlug } from "./blogService";
import { submitContactMessage } from "./contactService";
import { validateImageFile, MAX_FILE_SIZE } from "./storageService";

describe("Supabase Backend Services Integration & Fallback Suite", () => {
  test("Supabase client environment safety check", () => {
    // Should return boolean without crashing
    const configured = isSupabaseConfigured();
    expect(typeof configured).toBe("boolean");
  });

  test("projectsService returns valid project items with fallback", async () => {
    const res = await getAllPublishedProjects();
    expect(res.data).toBeDefined();
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);

    const first = res.data[0];
    expect(first.title).toBeDefined();
    expect(first.tech).toBeDefined();
  });

  test("projectsService getProjectBySlug retrieves project by slug", async () => {
    const res = await getProjectBySlug("grandmart");
    expect(res.data).toBeDefined();
    expect(res.data.title).toContain("GrandMart");
  });

  test("skillsService returns categorized skill listings", async () => {
    const res = await getSkills();
    expect(res.data).toBeDefined();
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
    expect(res.data[0].title).toBeDefined();
    expect(Array.isArray(res.data[0].skills)).toBe(true);
  });

  test("experienceService returns professional experience history", async () => {
    const res = await getExperience();
    expect(res.data).toBeDefined();
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
    expect(res.data[0].company).toContain("ISEES");
  });

  test("educationService returns academic degrees", async () => {
    const res = await getEducation();
    expect(res.data).toBeDefined();
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
  });

  test("certificationsService returns verified credentials", async () => {
    const res = await getCertifications();
    expect(res.data).toBeDefined();
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
  });

  test("blogService returns technical articles and retrieves by slug", async () => {
    const listRes = await getPublishedPosts();
    expect(listRes.data).toBeDefined();
    expect(Array.isArray(listRes.data)).toBe(true);
    expect(listRes.data.length).toBeGreaterThan(0);

    const slug = listRes.data[0].slug;
    const detailRes = await getPostBySlug(slug);
    expect(detailRes.data).toBeDefined();
    expect(detailRes.data.slug).toBe(slug);
  });

  test("contactService validates input requirements", async () => {
    const missingName = await submitContactMessage({ email: "test@example.com", message: "Hello" });
    expect(missingName.error).toBeDefined();

    const missingEmail = await submitContactMessage({ name: "John", message: "Hello" });
    expect(missingEmail.error).toBeDefined();

    const missingMessage = await submitContactMessage({ name: "John", email: "test@example.com" });
    expect(missingMessage.error).toBeDefined();
  });

  test("storageService validates MIME types and file sizes", () => {
    const validFile = { type: "image/png", size: 1024 * 1024, name: "test.png" };
    expect(validateImageFile(validFile).valid).toBe(true);

    const oversizeFile = { type: "image/png", size: MAX_FILE_SIZE + 1000, name: "big.png" };
    expect(validateImageFile(oversizeFile).valid).toBe(false);

    const invalidType = { type: "application/pdf", size: 1024, name: "doc.pdf" };
    expect(validateImageFile(invalidType).valid).toBe(false);
  });
});

