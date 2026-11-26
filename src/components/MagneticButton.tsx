import { type ReactNode, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  type = 'button',
  disabled = false,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) * 0.18;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) * 0.18;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const innerContent = href ? (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  ) : (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={prefersReduced ? undefined : { x: springX, y: springY }}
      whileTap={prefersReduced || disabled ? undefined : { scale: 0.97 }}
      className="inline-block"
    >
      {innerContent}
    </motion.div>
  );
}
