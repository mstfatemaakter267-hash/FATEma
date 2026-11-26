import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

export function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 360, damping: 28, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 360, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (prefersReduced) return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest('a, button, input, textarea, [role="button"]')
      );
      setIsInteractive(interactive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [mouseX, mouseY, prefersReduced]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-30 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          x: springX,
          y: springY,
          background:
            'radial-gradient(circle, rgba(159,18,57,0.4) 0%, rgba(128,0,32,0.16) 55%, transparent 75%)',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-40 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-150"
        animate={{
          width: isInteractive ? 34 : 20,
          height: isInteractive ? 34 : 20,
          borderColor: isInteractive
            ? 'rgba(251, 113, 133, 0.78)'
            : 'rgba(190, 18, 60, 0.5)',
        }}
        transition={{ duration: 0.15 }}
        style={{
          x: springX,
          y: springY,
        }}
      />
    </>
  );
}
