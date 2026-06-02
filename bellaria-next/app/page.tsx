import HeroSlider from "@/components/home/HeroSlider";
import FeaturesSection from "@/components/common/FeaturesSection";
import ServicesSection from "@/components/home/ServicesSection";
import CallToAction from "@/components/home/CallToAction";
import PortfolioSection from "@/components/home/PortfolioSection";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <ServicesSection />
      <PortfolioSection />
      <CallToAction />
    </main>
  );
}
