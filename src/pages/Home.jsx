import Hero from "../assets/components/Hero";
import Stats from "../assets/components/stats";
import TechOrbit from "../assets/components/techOrbit";
import AboutExperience from "../assets/components/AboutExperience";
import Services from "../assets/components/services";
import FeaturedProject from "../assets/components/FeaturedProject";
import Projects from "./projects";
import EngineeringProcess from "../assets/components/EngineeringProcess";
import TechStackGrid from "../assets/components/TechStackGrid";
import Testimonials from "../assets/components/Testimonials";
import Contact from "./contact";
import SEO from "../assets/components/SEO";

export default function Home() {
  return (
    <div className="bg-[#080612] min-h-screen text-white">
      <SEO
        title="Gulrez Sarankar | Software Engineer & Freelance Developer | Java Backend & Full-Stack"
        description="Portfolio of Gulrez Sarankar, Software Engineer & Freelance Developer specializing in Java, Spring Boot, REST APIs, PostgreSQL, React, and high-performance Web Architecture."
        canonicalPath="/"
      />
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Key Stats Strip */}
      <Stats />

      {/* 3. Core Tech Showcase Strip */}
      <TechOrbit />

      {/* 4. About & Experience */}
      <AboutExperience isStandalonePage={false} />

      {/* 5. Freelance & Engineering Services */}
      <Services isStandalone={false} />

      {/* 6. Flagship Architecture Case Study (GrandMart) */}
      <FeaturedProject />

      {/* 7. Comprehensive Projects Grid (GrandMart, AamZone, DOOB, RQD Farm, NeoKart, etc.) */}
      <Projects isStandalonePage={false} />

      {/* 8. 6-Step Development Process */}
      <EngineeringProcess />

      {/* 9. Technical Expertise & Skill Meters */}
      <TechStackGrid isStandalonePage={false} />

      {/* 10. Client & Collaborator Testimonials */}
      <Testimonials />

      {/* 11. Purple Glassmorphic Contact Section */}
      <Contact isStandalonePage={false} />
    </div>
  );
}
