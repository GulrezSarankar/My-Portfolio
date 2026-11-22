import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import * as router from "react-router-dom";
import BlogDetail from "./BlogDetail";

vi.mock("../services/blogService", () => ({
  getPostBySlug: vi.fn().mockImplementation((slug) => {
    if (slug === "how-to-become-java-backend-developer-roadmap-2026") {
      return Promise.resolve({
        data: {
          id: "roadmap-1",
          slug: "how-to-become-java-backend-developer-roadmap-2026",
          title: "How to Become a Java Backend Developer in 2026: Complete Roadmap",
          category: "Career Roadmap",
          readTime: "8 min read",
          date: "November 22, 2026",
          summary: "Complete backend roadmap for Java engineering.",
          content: `# How to Become a Java Backend Developer in 2026: Complete Roadmap

Becoming a backend developer requires mastering core architecture.

## 1. Learn Core Java
Java is the foundation.

- Collections Framework
- Multithreading and concurrency

## Suggested Learning Order

| Phase | Topics |
|---|---|
| Phase 1 | Core Java |
| Phase 2 | Spring Boot |

\`\`\`java
public class Application {
    public static void main(String[] args) {}
}
\`\`\`

#Java #SpringBoot`,
        },
        error: null,
      });
    }

    if (slug === "legacy-sections-post") {
      return Promise.resolve({
        data: {
          id: "legacy-1",
          slug: "legacy-sections-post",
          title: "Legacy Sections Post",
          category: "Architecture",
          readTime: "4 min read",
          date: "August 10, 2026",
          summary: "Legacy summary",
          sections: [
            {
              heading: "Legacy Section Heading",
              body: "Legacy section body text.",
              code: "System.out.println('Hello');",
            },
          ],
        },
        error: null,
      });
    }

    return Promise.resolve({ data: null, error: null });
  }),
}));

describe("BlogDetail Page Rendering", () => {
  test("renders full markdown article content for Supabase posts", async () => {
    vi.spyOn(router, "useParams").mockReturnValue({
      slug: "how-to-become-java-backend-developer-roadmap-2026",
    });

    await act(async () => {
      render(<BlogDetail />);
    });

    // Check title and hero
    expect(
      screen.getByText(/How to Become a Java Backend Developer in 2026: Complete Roadmap/i)
    ).toBeInTheDocument();

    // Check rendered markdown headings
    expect(screen.getByText(/Learn Core Java/i)).toBeInTheDocument();
    expect(screen.getByText(/Suggested Learning Order/i)).toBeInTheDocument();

    // Check rendered list items
    expect(screen.getByText(/Collections Framework/i)).toBeInTheDocument();
    expect(screen.getByText(/Multithreading and concurrency/i)).toBeInTheDocument();

    // Check rendered table headers and rows
    expect(screen.getByText("Phase")).toBeInTheDocument();
    expect(screen.getByText("Topics")).toBeInTheDocument();
    expect(screen.getByText("Phase 1")).toBeInTheDocument();
    expect(screen.getByText("Core Java")).toBeInTheDocument();

    // Check code snippet
    expect(screen.getByText(/public static void main/i)).toBeInTheDocument();

    // Check hashtags
    expect(screen.getByText("#Java")).toBeInTheDocument();
    expect(screen.getByText("#SpringBoot")).toBeInTheDocument();
  });

  test("renders legacy sections fallback when content is not present", async () => {
    vi.spyOn(router, "useParams").mockReturnValue({
      slug: "legacy-sections-post",
    });

    await act(async () => {
      render(<BlogDetail />);
    });

    expect(screen.getByText("Legacy Section Heading")).toBeInTheDocument();
    expect(screen.getByText("Legacy section body text.")).toBeInTheDocument();
    expect(screen.getByText("System.out.println('Hello');")).toBeInTheDocument();
  });

  test("renders 404 state when article does not exist", async () => {
    vi.spyOn(router, "useParams").mockReturnValue({
      slug: "non-existent-slug",
    });

    await act(async () => {
      render(<BlogDetail />);
    });

    expect(screen.getByText("Article not found.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Back to Blog/i })).toBeInTheDocument();
  });
});
