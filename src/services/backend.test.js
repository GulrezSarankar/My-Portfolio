import { isSupabaseConfigured } from "./supabaseClient";
import { getAllPublishedProjects, getProjectBySlug, isValidUrl } from "./projectsService";
import { getSkills } from "./skillsService";
import { getExperience } from "./experienceService";
import { getEducation } from "./educationService";
import { getCertifications } from "./certificationsService";
import { getPublishedPosts, getPostBySlug } from "./blogService";
import { submitContactMessage } from "./contactService";
import {
  validateImageFile,
  MAX_FILE_SIZE,
  uploadBlogImage,
  uploadTestimonialImage,
  uploadCaseStudyImage,
  deleteTestimonialImage,
} from "./storageService";
import {
  validateTestimonial,
  getAllPublishedTestimonials,
  resolveTestimonialPhoto,
} from "./testimonialsService";

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
  }, 25000);

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

  test("storageService uploadBlogImage validates file inputs", async () => {
    const invalidRes = await uploadBlogImage(null);
    expect(invalidRes.error).toBeDefined();

    const badTypeRes = await uploadBlogImage({ type: "text/plain", size: 500, name: "bad.txt" });
    expect(badTypeRes.error).toBeDefined();
  });

  test("projectsService URL validation handles valid and invalid URLs", () => {
    expect(isValidUrl("https://github.com/GulrezSarankar")).toBe(true);
    expect(isValidUrl("http://localhost:3000")).toBe(true);
    expect(isValidUrl("invalid-url")).toBe(false);
    expect(isValidUrl("ftp://invalid.com")).toBe(false);
    expect(isValidUrl("")).toBe(false);
    expect(isValidUrl(null)).toBe(false);
  });

  test("projectsService formats optional case study fields", async () => {
    const res = await getProjectBySlug("grandmart");
    expect(res.data).toBeDefined();
    expect(res.data.has_case_study).toBe(true);
    expect(res.data.overview).toBeDefined();
    expect(Array.isArray(res.data.key_features)).toBe(true);
    expect(Array.isArray(res.data.screenshots)).toBe(true);
  });

  test("testimonialsService validates client feedback inputs", () => {
    const valid = validateTestimonial({
      client_name: "Farhan Shaikh",
      feedback: "Exceptional backend engineer.",
    });
    expect(valid.valid).toBe(true);

    const missingName = validateTestimonial({
      client_name: "",
      feedback: "Great work.",
    });
    expect(missingName.valid).toBe(false);

    const missingFeedback = validateTestimonial({
      client_name: "Farhan",
      feedback: "   ",
    });
    expect(missingFeedback.valid).toBe(false);
  });

  test("testimonialsService getAllPublishedTestimonials returns list with fallback", async () => {
    const res = await getAllPublishedTestimonials();
    expect(res.data).toBeDefined();
    expect(Array.isArray(res.data)).toBe(true);
    if (res.data.length > 0) {
      expect(res.data[0].content || res.data[0].feedback).toBeDefined();
    }
  });

  test("storageService uploadTestimonialImage and uploadCaseStudyImage validate file inputs", async () => {
    const tInvalid = await uploadTestimonialImage(null);
    expect(tInvalid.error).toBeDefined();

    const csInvalid = await uploadCaseStudyImage(null);
    expect(csInvalid.error).toBeDefined();

    const badType = { type: "application/pdf", size: 100, name: "test.pdf" };
    const tBad = await uploadTestimonialImage(badType);
    expect(tBad.error).toBeDefined();

    const csBad = await uploadCaseStudyImage(badType);
    expect(csBad.error).toBeDefined();
  });

  test("resolveTestimonialPhoto synchronizes photo_path and photo_url with blog-images bucket", () => {
    // 1. Given photo_path, derive photo_url from blog-images bucket
    const fromPath = resolveTestimonialPhoto(null, "testimonials/173235-client.jpg");
    expect(fromPath.photoPath).toBe("testimonials/173235-client.jpg");
    expect(fromPath.photoUrl).toContain("/blog-images/testimonials/173235-client.jpg");

    // 2. Given full blog-images photo_url, derive photo_path
    const fromUrl = resolveTestimonialPhoto(
      "https://example.supabase.co/storage/v1/object/public/blog-images/testimonials/173235-client.jpg",
      null
    );
    expect(fromUrl.photoPath).toBe("testimonials/173235-client.jpg");
    expect(fromUrl.photoUrl).toBe(
      "https://example.supabase.co/storage/v1/object/public/blog-images/testimonials/173235-client.jpg"
    );

    // 3. Given legacy testimonial-images URL, normalize to blog-images
    const legacy = resolveTestimonialPhoto(
      "https://example.supabase.co/storage/v1/object/public/testimonial-images/testimonials/avatar.png",
      null
    );
    expect(legacy.photoUrl).toContain("/blog-images/testimonials/avatar.png");
    expect(legacy.photoPath).toBe("testimonials/avatar.png");

    // 4. Given avatar_url, derive photoPath and photoUrl
    const fromAvatar = resolveTestimonialPhoto(
      "https://example.supabase.co/storage/v1/object/public/blog-images/testimonials/avatar2.png",
      null
    );
    expect(fromAvatar.photoPath).toBe("testimonials/avatar2.png");
    expect(fromAvatar.photoUrl).toBe(
      "https://example.supabase.co/storage/v1/object/public/blog-images/testimonials/avatar2.png"
    );

    // 5. Handles null gracefully
    const empty = resolveTestimonialPhoto(null, null);
    expect(empty.photoUrl).toBeNull();
    expect(empty.photoPath).toBeNull();
  });

  test("deleteTestimonialImage handles null and URLs gracefully", async () => {
    const resNull = await deleteTestimonialImage(null);
    expect(resNull.error).toBeNull();
  });
});

