import { blogs } from "./data/blogs";
import { projects } from "./data/projects";

test("portfolio data includes projects and blog detail content", () => {
  expect(projects.length).toBeGreaterThan(0);
  expect(projects.every((project) => project.title && project.link && project.images.length)).toBe(true);

  expect(blogs).toHaveLength(3);
  expect(blogs.every((blog) => blog.slug && blog.title && blog.sections.length)).toBe(true);
});
