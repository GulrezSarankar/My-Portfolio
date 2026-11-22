import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { blogs } from "./data/blogs";
import { projects } from "./data/projects";
import Navbar from "./assets/components/navbar";
import Footer from "./assets/components/footer";
import TestimonialsPage from "./pages/TestimonialsPage";

test("portfolio data includes projects and blog detail content", () => {
  expect(projects.length).toBeGreaterThan(0);
  expect(
    projects.every(
      (project) => project.title && (project.isPrivate || project.link) && project.images.length
    )
  ).toBe(true);

  expect(blogs).toHaveLength(3);
  expect(blogs.every((blog) => blog.slug && blog.title && blog.sections.length)).toBe(true);
});

test("Navbar renders all 7 independent navigation routes and CTA", () => {
  render(<Navbar />);
  expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Experience" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Blog" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Testimonials" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  expect(screen.getByText("Resume")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Contact Gulrez Sarankar" })).toBeInTheDocument();
});

test("Footer renders primary navigation, social links, and copyright", () => {
  render(<Footer />);
  expect(screen.getByRole("link", { name: "Testimonials" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Projects & Case Studies" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "GitHub Profile" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "LinkedIn Profile" })).toBeInTheDocument();
  expect(screen.getByText(/Gulrez Sarankar\. Built with React & Tailwind CSS/i)).toBeInTheDocument();
});

test("TestimonialsPage renders editorial heading and content", async () => {
  render(<TestimonialsPage />);
  expect(screen.getByRole("heading", { level: 1, name: /Testimonials/i })).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText(/Social Proof & Peer Endorsements/i)).toBeInTheDocument();
  });
});

