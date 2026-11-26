import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export function Preloader() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(() => !prefersReduced);

  useEffect(() => {
    if (prefersReduced) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 680);

    return () => window.clearTimeout(timer);
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1C050D]"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl glass-card">
              <span className="font-display text-2xl font-bold tracking-tight text-[#F8FAFC]">
                FA<span className="text-[#FDA4AF]">.</span>
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-3 right-3 h-[2px] origin-left rounded-full bg-gradient-to-r from-[#BE123C] via-[#E11D48] to-[#FB7185]"
              />
            </div>
            <p className="font-mono text-xs tracking-widest text-[#FB7185]">
              Frontend Developer Portfolio
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
