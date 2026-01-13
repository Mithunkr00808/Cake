import HeroSlider from "@/components/home/HeroSlider";
import ServicesSection from "@/components/home/ServicesSection";
import CallToAction from "@/components/home/CallToAction";
import PortfolioSection from "@/components/home/PortfolioSection";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <ServicesSection />
      <CallToAction />
      <PortfolioSection />
    </main>
  );
}
