import TechStackGrid from "../assets/components/TechStackGrid";
import SEO from "../assets/components/SEO";

export default function Skills() {
  return (
    <div className="pt-4">
      <SEO
        title="Skills & Tech Stack | Gulrez Sarankar | Java Spring Boot Developer"
        description="Explore the technical skills of Gulrez Sarankar: Java, Spring Boot, Spring Security, Hibernate, PostgreSQL, MySQL, Redis, Docker, and REST APIs."
        canonicalPath="/skills"
      />
      <TechStackGrid isStandalonePage={true} />
    </div>
  );
}
