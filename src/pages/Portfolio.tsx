import { HeroSection } from '@/components/portfolio/HeroSection';
import { Marquee } from '@/components/portfolio/Marquee';
import { AboutSection } from '@/components/portfolio/AboutSection';
import { StackSection } from '@/components/portfolio/StackSection';
import { WorkSection } from '@/components/portfolio/WorkSection';
import { ContactSection } from '@/components/portfolio/ContactSection';

const wrap: React.CSSProperties = {
  position: 'relative',
  zIndex: 2,
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 32px',
};

export function Portfolio() {
  return (
    <>
      <div style={wrap}>
        <HeroSection />
      </div>

      <Marquee />

      <div style={wrap}>
        <AboutSection />
        <StackSection />
        <WorkSection />
        <ContactSection />
      </div>
    </>
  );
}
