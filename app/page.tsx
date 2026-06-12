import HeroSlider from "@/components/home/HeroSlider";
import FeaturesSection from "@/components/common/FeaturesSection";
import ServicesSection from "@/components/home/ServicesSection";
import CallToAction from "@/components/home/CallToAction";
import PortfolioSection from "@/components/home/PortfolioSection";
import { getCachedSettings } from "@/lib/db/cache";

export const dynamic = "force-dynamic";

export default async function Home() {
  let isLive = true;
  try {
    const data = await getCachedSettings();
    if (data) {
      if (typeof data.isLive === 'boolean') {
        isLive = data.isLive;
      }
    }
  } catch (error) {
    console.error("Error fetching settings for page:", error);
  }

  if (!isLive) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center', background: '#fafafa' }}>
        <h1 style={{ fontFamily: '"Merienda One", cursive', fontSize: '3rem', color: '#ff7a7a', marginBottom: '20px' }}>
          Slice of Cake
        </h1>
        <div style={{ height: '2px', width: '60px', background: '#e0e0e0', margin: '0 auto 30px' }}></div>
        <h2 style={{ fontSize: '2rem', fontWeight: 300, color: '#333', marginBottom: '16px' }}>
          Opening Soon
        </h2>
        <p style={{ maxWidth: '500px', margin: '0 auto 40px', color: '#666', lineHeight: 1.8 }}>
          We are crafting something delicious for you. Our curated collection of cakes, pastries, and treats will be available shortly.
        </p>
        <div>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#888', marginBottom: '16px' }}>
            Stay tuned for our launch
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <span style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: '#ff7a7a', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></span>
            <span style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: '#ff7a7a', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '0.2s' }}></span>
            <span style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: '#ff7a7a', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '0.4s' }}></span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <HeroSlider />
      <ServicesSection />
      <PortfolioSection />
      <CallToAction />
    </main>
  );
}
