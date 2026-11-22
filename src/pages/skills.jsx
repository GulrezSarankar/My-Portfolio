import TechStackGrid from "../assets/components/TechStackGrid";
import SEO from "../assets/components/SEO";

export default function Skills() {
  return (
    <div className="pt-4">
      <SEO
        title="Skills & Technical Capabilities | Gulrez Sarankar"
        description="Technical skills of Gulrez Sarankar across Backend Development, Databases, Security, Caching & Performance, Testing, DevOps, and Frontend."
        canonicalPath="/skills"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Skills", url: "/skills" },
        ]}
      />
      <TechStackGrid isStandalonePage={true} />
    </div>
  );
}
