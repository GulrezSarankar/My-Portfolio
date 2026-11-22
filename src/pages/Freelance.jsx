import SEO from "../assets/components/SEO";
import Services from "../assets/components/services";
import EngineeringProcess from "../assets/components/EngineeringProcess";
import Contact from "./contact";

export default function Freelance() {
  return (
    <div className="bg-[#080612]">
      <SEO
        title="Freelance Web Development & Backend Engineering | Gulrez Sarankar"
        description="Hire Gulrez Sarankar for custom website development, high-throughput Spring Boot REST APIs, scalable e-commerce platforms, and database architecture."
        canonicalPath="/freelance"
      />
      <Services isStandalone={true} />
      <EngineeringProcess />
      <Contact isStandalonePage={true} />
    </div>
  );
}
