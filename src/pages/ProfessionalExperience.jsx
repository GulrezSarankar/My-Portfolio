import AboutExperience from "../assets/components/AboutExperience";
import SEO from "../assets/components/SEO";

export default function ProfessionalExperience() {
  return (
    <div className="pt-4">
      <SEO
        title="Professional Experience | Gulrez Sarankar | Software Engineer"
        description="Professional experience of Gulrez Sarankar as a Software Engineer at ISEES Technologies LLP, promoted from Associate Software Engineer in January 2026. Java backend development, REST APIs, and application development."
        canonicalPath="/experience"
      />
      <AboutExperience isStandalonePage={true} pageType="experience" />
    </div>
  );
}
