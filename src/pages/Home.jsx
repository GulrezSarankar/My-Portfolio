import Hero from "../assets/components/Hero";
import Stats from "../assets/components/stats";
import TechOrbit from "../assets/components/techOrbit";
import AboutExperience from "../assets/components/AboutExperience";
import FeaturedProject from "../assets/components/FeaturedProject";
import Projects from "./projects";
import EngineeringProcess from "../assets/components/EngineeringProcess";
import TechStackGrid from "../assets/components/TechStackGrid";
import Contact from "./contact";
import SEO from "../assets/components/SEO";

export default function Home() {
  return (
    <div className="bg-[#0B111A]">
      <SEO
        title="Gulrez Sarankar | Java Backend Developer | Spring Boot Developer"
        description="Portfolio of Gulrez Sarankar, a Software Engineer at ISEES Technologies LLP specializing in Java, Spring Boot, REST APIs, PostgreSQL, MySQL and backend development."
        canonicalPath="/"
      />
      <Hero />
      <Stats />
      <TechOrbit />
      <AboutExperience isStandalonePage={false} />
      <FeaturedProject />
      <Projects isStandalonePage={false} />
      <EngineeringProcess />
      <TechStackGrid isStandalonePage={false} />
      <Contact isStandalonePage={false} />
    </div>
  );
}
