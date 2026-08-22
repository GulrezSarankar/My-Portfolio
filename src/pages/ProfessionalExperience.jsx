import AboutExperience from "../assets/components/AboutExperience";
import SEO from "../assets/components/SEO";

export default function ProfessionalExperience() {
  return (
    <div className="pt-4">
      <SEO
        title="Professional Experience | Gulrez Sarankar | Associate Software Engineer"
        description="Professional software engineering experience of Gulrez Sarankar as an Associate Software Engineer and Java Developer in Pune building scalable backend applications."
        canonicalPath="/experience"
      />
      <AboutExperience isStandalonePage={true} pageType="experience" />
    </div>
  );
}
