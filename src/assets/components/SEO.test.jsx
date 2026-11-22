import React, { useState } from "react";
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { render, act } from "@testing-library/react";
import SEO, { _resetSeoOwnerForTesting } from "./SEO";
import ProjectDetail from "../../pages/ProjectDetail";
import * as router from "react-router-dom";

vi.mock("../../services/projectsService", () => ({
  getProjectBySlug: vi.fn().mockImplementation((slug) => {
    if (slug === "valid-project") {
      return Promise.resolve({
        data: {
          id: "valid-project",
          slug: "valid-project",
          title: "Valid Project",
          short_description: "Valid Description",
          overview: "Overview",
          tech: ["Java"],
        },
        error: null,
      });
    }
    return Promise.resolve({ data: null, error: null });
  }),
  getAllPublishedProjects: vi.fn().mockResolvedValue({ data: [], error: null }),
}));

describe("SEO Component Robots Metadata Lifecycle", () => {
  beforeEach(() => {
    _resetSeoOwnerForTesting();
    document.head.innerHTML = `<meta name="robots" content="index, follow" />`;
  });

  afterEach(() => {
    document.head.innerHTML = "";
  });

  test("Public → Admin route transition correctly applies noindex, nofollow", async () => {
    function RouteContainer() {
      const [route, setRoute] = useState("public");
      return (
        <div>
          <button onClick={() => setRoute("admin")}>Go to Admin</button>
          {route === "public" ? (
            <SEO title="Public Page" canonicalPath="/about" noindex={false} />
          ) : (
            <SEO title="Admin Login" canonicalPath="/admin/login" noindex={true} />
          )}
        </div>
      );
    }

    const { getByText } = render(<RouteContainer />);
    const robotsMeta = document.querySelector("meta[name='robots']");
    expect(robotsMeta?.getAttribute("content")).toBe("index, follow");

    await act(async () => {
      getByText("Go to Admin").click();
    });

    expect(robotsMeta?.getAttribute("content")).toBe("noindex, nofollow");
  });

  test("Admin → Public route transition correctly restores index, follow", async () => {
    function RouteContainer() {
      const [route, setRoute] = useState("admin");
      return (
        <div>
          <button onClick={() => setRoute("public")}>Go to Public</button>
          {route === "admin" ? (
            <SEO title="Admin Login" canonicalPath="/admin/login" noindex={true} />
          ) : (
            <SEO title="Public Page" canonicalPath="/about" noindex={false} />
          )}
        </div>
      );
    }

    const { getByText } = render(<RouteContainer />);
    const robotsMeta = document.querySelector("meta[name='robots']");
    expect(robotsMeta?.getAttribute("content")).toBe("noindex, nofollow");

    await act(async () => {
      getByText("Go to Public").click();
    });

    expect(robotsMeta?.getAttribute("content")).toBe("index, follow");
  });

  test("Admin route → another Admin route preserves noindex, nofollow without reset glitch", async () => {
    function RouteContainer() {
      const [adminPage, setAdminPage] = useState("login");
      return (
        <div>
          <button onClick={() => setAdminPage("dashboard")}>Go to Dashboard</button>
          {adminPage === "login" ? (
            <SEO title="Admin Login" canonicalPath="/admin/login" noindex={true} />
          ) : (
            <SEO title="Admin Dashboard" canonicalPath="/admin/dashboard" noindex={true} />
          )}
        </div>
      );
    }

    const { getByText } = render(<RouteContainer />);
    const robotsMeta = document.querySelector("meta[name='robots']");
    expect(robotsMeta?.getAttribute("content")).toBe("noindex, nofollow");

    await act(async () => {
      getByText("Go to Dashboard").click();
    });

    // Stale cleanup from Admin Login MUST NOT have reset the directive to index, follow
    expect(robotsMeta?.getAttribute("content")).toBe("noindex, nofollow");
  });

  test("Unknown project slug displays 404 fallback with noindex, nofollow", async () => {
    vi.spyOn(router, "useParams").mockReturnValue({ slug: "unknown-slug-xyz" });

    await act(async () => {
      render(<ProjectDetail />);
    });

    const robotsMeta = document.querySelector("meta[name='robots']");
    expect(robotsMeta?.getAttribute("content")).toBe("noindex, nofollow");
  });

  test("Component unmount resets to default index, follow, and remount reapplies noindex", async () => {
    const { unmount } = render(
      <SEO title="Admin Protected" canonicalPath="/admin/dashboard" noindex={true} />
    );

    const robotsMeta = () => document.querySelector("meta[name='robots']");
    expect(robotsMeta()?.getAttribute("content")).toBe("noindex, nofollow");

    // Unmount and flush microtasks
    await act(async () => {
      unmount();
    });

    expect(robotsMeta()?.getAttribute("content")).toBe("index, follow");

    // Remount
    render(
      <SEO title="Admin Protected" canonicalPath="/admin/dashboard" noindex={true} />
    );

    expect(robotsMeta()?.getAttribute("content")).toBe("noindex, nofollow");
  });
});
