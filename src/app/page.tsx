import HeroSection from "@/components/home/HeroSection";
import AboutTeaser from "@/components/home/AboutTeaser";
import ServicesOverview from "@/components/home/ServicesOverview";
import CareTeaser from "@/components/home/CareTeaser";
import TrustTechniqueIntro from "@/components/home/TrustTechniqueIntro";
import HomeCTA from "@/components/home/HomeCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutTeaser />
      <ServicesOverview />
      <CareTeaser />
      <TrustTechniqueIntro />
      <HomeCTA />
    </>
  );
}
