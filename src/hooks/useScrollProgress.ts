import { useEffect, useState } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;

      setProgress(nextProgress);
      setIsScrolled(scrollTop > 32);
      frameId = 0;
    };

    const handleScroll = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateScroll);
      }
    };

    updateScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return { progress, isScrolled };
}
