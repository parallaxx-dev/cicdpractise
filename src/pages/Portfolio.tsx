import { HeroSection } from '@/components/portfolio/HeroSection';
import { Marquee } from '@/components/portfolio/Marquee';
import { AboutSection } from '@/components/portfolio/AboutSection';
import { StackSection } from '@/components/portfolio/StackSection';
import { WorkSection } from '@/components/portfolio/WorkSection';
import { ContactSection } from '@/components/portfolio/ContactSection';

export function Portfolio() {
  return (
    <>
      <div className="wrap">
        <HeroSection />
      </div>

      <Marquee />

      <div className="wrap">
        <AboutSection />
        <StackSection />
        <WorkSection />
        <ContactSection />
      </div>
    </>
  );
}
