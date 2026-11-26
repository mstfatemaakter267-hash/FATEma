import { AnimatedBackground } from '../components/AnimatedBackground';
import { CustomCursor } from '../components/CustomCursor';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { Preloader } from '../components/Preloader';
import { ScrollProgress } from '../components/ScrollProgress';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { About } from '../sections/About';
import { Contact } from '../sections/Contact';
import { DeveloperActivity } from '../sections/DeveloperActivity';
import { Experience } from '../sections/Experience';
import { Hero } from '../sections/Hero';
import { Projects } from '../sections/Projects';
import { Services } from '../sections/Services';
import { Skills } from '../sections/Skills';

const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'services',
  'projects',
  'experience',
  'activity',
  'contact',
];

export function Home() {
  const { progress, isScrolled } = useScrollProgress();
  const activeSection = useActiveSection(SECTION_IDS, 'home');
  const { soundEnabled, toggleSound, playClick } = useSoundEffects();

  return (
    <div className="relative min-h-screen text-[#F8FAFC]">
      <Preloader />
      <ScrollProgress progress={progress} />
      <CustomCursor />
      <AnimatedBackground />

      <Navbar
        activeSection={activeSection}
        isScrolled={isScrolled}
        onNavigate={playClick}
      />

      <main className="relative z-10">
        <Hero onActionSound={playClick} />
        <About onActionSound={playClick} />
        <Skills onActionSound={playClick} />
        <Services />
        <Projects onActionSound={playClick} />
        <Experience />
        <DeveloperActivity />
        <Contact onActionSound={playClick} />
      </main>

      <Footer soundEnabled={soundEnabled} onToggleSound={toggleSound} />
    </div>
  );
}
