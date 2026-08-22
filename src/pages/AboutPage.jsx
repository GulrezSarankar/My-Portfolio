import AboutExperience from "../assets/components/AboutExperience";
import SEO from "../assets/components/SEO";

export default function About() {
  return (
    <div className="pt-4">
      <SEO
        title="About Gulrez Sarankar | Java Backend Developer & Software Engineer"
        description="Learn about Gulrez Sarankar, a Java Backend Developer and Associate Software Engineer in Pune specializing in Spring Boot, PostgreSQL, microservices, and distributed architecture."
        canonicalPath="/about"
      />
      <AboutExperience isStandalonePage={true} pageType="about" />
    </div>
  );
}
