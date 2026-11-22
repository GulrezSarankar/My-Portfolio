import SEO from "../assets/components/SEO";
import Hero from "../assets/components/Hero";
import EngineeringExpertise from "../assets/components/EngineeringExpertise";
import FeaturedProject from "../assets/components/FeaturedProject";
import SelectedProjects from "../assets/components/SelectedProjects";
import HomeExperience from "../assets/components/HomeExperience";
import HomeBlog from "../assets/components/HomeBlog";
import Testimonials from "../assets/components/Testimonials";
import HomeContactCta from "../assets/components/HomeContactCta";

export default function Home() {
  return (
    <div className="bg-[#0D0D0D] min-h-screen text-[#F5F5F5]">
      <SEO
        title="Gulrez Sarankar | Software Engineer — Java Backend & Distributed Architecture"
        description="Portfolio of Gulrez Sarankar, Software Engineer at ISEES Technologies LLP specializing in Java 17/21, Spring Boot microservices, PostgreSQL, Redis caching, and resilient RESTful API engineering."
        canonicalPath="/"
      />

      {/* Section A: Professional Hero */}
      <Hero />

      {/* Section B: Engineering Expertise */}
      <EngineeringExpertise />

      {/* Section C: Featured Enterprise Project Case Study (GrandMart) */}
      <FeaturedProject />

      {/* Section D: Selected Projects (AamZone, NeoKart, DOOB) */}
      <SelectedProjects />

      {/* Section E: Professional Experience (ISEES Technologies LLP) */}
      <HomeExperience />

      {/* Section F: Technical Writing (Spring Boot & Java Architecture) */}
      <HomeBlog />

      {/* Section G: Verified Testimonials (Conditionally rendered only when published records exist) */}
      <Testimonials />

      {/* Section H: Contact CTA */}
      <HomeContactCta />
    </div>
  );
}
