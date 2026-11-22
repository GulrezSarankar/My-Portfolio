import AboutExperience from "../assets/components/AboutExperience";
import SEO from "../assets/components/SEO";

export default function ProfessionalExperience() {
  return (
    <div className="bg-[#0D0D0D] min-h-screen text-[#F5F5F5]">
      <SEO
        title="Professional Engineering Experience | Gulrez Sarankar"
        description="Professional software engineering career of Gulrez Sarankar at ISEES Technologies LLP: Java backend architecture, RESTful APIs, PostgreSQL, and Spring Boot."
        canonicalPath="/experience"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Experience", url: "/experience" },
        ]}
      />
      <AboutExperience isStandalonePage={true} pageType="experience" />
    </div>
  );
}
