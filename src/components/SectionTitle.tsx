import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

interface SectionTitleProps {
  number: string;
  kicker: string;
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionTitle({
  number,
  kicker,
  icon: Icon,
  title,
  subtitle,
  align = 'left',
}: SectionTitleProps) {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 ${isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}
    >
      <div
        className={`glass-chip mb-4 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm font-medium text-[#FB7185] ${
          isCenter ? 'mx-auto' : ''
        }`}
      >
        {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
        <span className="font-mono text-xs tabular-nums text-[#FDA4AF]">{number}</span>
        <span aria-hidden="true" className="h-3 w-px bg-white/20" />
        <span>{kicker}</span>
      </div>

      <h2 className="font-display text-3xl font-semibold tracking-tight text-[#F8FAFC] sm:text-4xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-[#D2B6BE]">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
