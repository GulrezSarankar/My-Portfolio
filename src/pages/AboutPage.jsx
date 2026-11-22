import AboutExperience from "../assets/components/AboutExperience";
import SEO from "../assets/components/SEO";

export default function About() {
  return (
    <div className="bg-[#0D0D0D] min-h-screen text-[#F5F5F5]">
      <SEO
        title="About Gulrez Sarankar | Java Backend Developer & Software Engineer"
        description="Learn about Gulrez Sarankar, a Java Backend Developer and Associate Software Engineer in Pune specializing in Spring Boot, PostgreSQL, microservices, and distributed architecture."
        canonicalPath="/about"
      />
      <AboutExperience isStandalonePage={true} pageType="about" />
    </div>
  );
}
