import React from "react";
import { vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import * as router from "react-router-dom";
import ProjectDetail from "./ProjectDetail";

vi.mock("../services/projectsService", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getProjectBySlug: vi.fn().mockImplementation((slug) => {
      if (slug === "grandmart") {
        return Promise.resolve({
          data: {
            id: "grandmart",
            slug: "grandmart",
            title: "GrandMart Multi-Outlet ERP",
            short_description: "Enterprise retail management platform",
            overview: "Comprehensive retail management system across distributed branches.",
            problem_statement: "High concurrency race conditions on physical store inventory.",
            my_role: "Lead Backend Architect",
            architecture: "Spring Boot microservices with Redis caching and PostgreSQL.",
            technical_challenges: "Pessimistic vs optimistic database locks under flash sale spikes.",
            solutions: "Redis distributed locking with Spring retry templates.",
            tech_stack: ["Java", "Spring Boot", "PostgreSQL", "Redis"],
            tech: ["Java", "Spring Boot", "PostgreSQL", "Redis"],
            key_features: ["Distributed stock deduplication", "Stateless JWT RBAC"],
            results_outcomes: "99.99% SKU consistency | 3.2x faster queries",
            github_url: "https://github.com/example/grandmart",
            live_url: "https://grandmart.example.com",
            api_docs_url: "https://api.grandmart.example.com/docs",
            has_case_study: true,
            status: "published",
            category: "Enterprise / Backend",
          },
          error: null,
        });
      }
      return Promise.resolve({ data: null, error: null });
    }),
    getAllPublishedProjects: vi.fn().mockResolvedValue({
      data: [
        {
          id: "aamzone",
          slug: "aamzone",
          title: "AamZone",
          short_description: "Mango ecommerce platform",
        },
      ],
      error: null,
    }),
  };
});

describe("ProjectDetail Page", () => {
  test("renders full case study when project exists", async () => {
    vi.spyOn(router, "useParams").mockReturnValue({ slug: "grandmart" });
    await act(async () => {
      render(<ProjectDetail />);
    });

    expect(screen.getAllByText("GrandMart Multi-Outlet ERP").length).toBeGreaterThan(0);
    expect(screen.getByText("Enterprise retail management platform")).toBeInTheDocument();
    expect(screen.getByText("Problem Statement")).toBeInTheDocument();
    expect(
      screen.getByText(/High concurrency race conditions on physical store inventory/i)
    ).toBeInTheDocument();
    expect(screen.getByText("System Architecture & Engineering Design")).toBeInTheDocument();
    expect(screen.getByText("Technical Challenges")).toBeInTheDocument();
    expect(screen.getByText("Solutions Implemented")).toBeInTheDocument();
    expect(screen.getByText("Distributed stock deduplication")).toBeInTheDocument();
    expect(screen.getByText("Production Results & Key Metrics")).toBeInTheDocument();

    // Links
    expect(screen.getByText("Live Production Demo")).toBeInTheDocument();
    expect(screen.getByText("GitHub Repository")).toBeInTheDocument();
    expect(screen.getByText("API Documentation")).toBeInTheDocument();
  });

  test("renders 404 Not Found state when slug does not exist", async () => {
    vi.spyOn(router, "useParams").mockReturnValue({ slug: "non-existent-project" });
    await act(async () => {
      render(<ProjectDetail />);
    });

    expect(screen.getByText("Project Case Study Not Found")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Back to All Projects/i })).toBeInTheDocument();
  });
});

