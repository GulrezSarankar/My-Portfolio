import Hero from "../assets/components/Hero";
import Stats from "../assets/components/stats";
import TechOrbit from "../assets/components/techOrbit";
import Services from "../assets/components/services";
export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Stats />
      <TechOrbit />
      <Services />
    </div>
  );
}
