import { Suspense, lazy } from "react";

// Lazy load components that aren't visible immediately
const Hero = lazy(() => import("../assets/components/Hero"));
const Stats = lazy(() => import("../assets/components/stats"));
const TechOrbit = lazy(() => import("../assets/components/techOrbit"));
const Services = lazy(() => import("../assets/components/services"));

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#0c001b]">
      {/* Hero stays standard or gets a high-priority load */}
      <Suspense fallback={<div className="h-screen bg-black" />}>
        <Hero />
        <Stats />
        <TechOrbit />
        <Services />
      </Suspense>
    </div>
  );
}