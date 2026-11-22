import AboutExperience from "../assets/components/AboutExperience";
import SEO from "../assets/components/SEO";

export default function About() {
  return (
    <div className="bg-[#0D0D0D] min-h-screen text-[#F5F5F5]">
      <SEO
        title="About Gulrez Sarankar | Software Engineer & Java Backend Developer"
        description="Discover the engineering background, development philosophy, and technical track record of Gulrez Sarankar, Software Engineer at ISEES Technologies LLP."
        canonicalPath="/about"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      />
      <AboutExperience isStandalonePage={true} pageType="about" />
    </div>
  );
}
