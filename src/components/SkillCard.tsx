import { motion, useReducedMotion } from 'motion/react';
import {
  Code2,
  FileCode2,
  GitBranch,
  Layers,
  Palette,
  Sparkles,
  Terminal as TerminalIcon,
  Wrench,
} from 'lucide-react';
import type { SkillItem } from '../data/skills';

interface SkillCardProps {
  skill: SkillItem;
  index: number;
}

function getSkillIcon(id: string) {
  switch (id) {
    case 'html5':
    case 'javascript':
      return FileCode2;
    case 'react':
      return Code2;
    case 'motion':
      return Sparkles;
    case 'css3':
    case 'tailwind':
    case 'bootstrap':
      return Palette;
    case 'git':
    case 'github':
      return GitBranch;
    case 'vscode':
      return TerminalIcon;
    case 'npm':
      return Wrench;
    default:
      return Layers;
  }
}

export function SkillCard({ skill, index }: SkillCardProps) {
  const prefersReduced = useReducedMotion();
  const Icon = getSkillIcon(skill.id);

  return (
    <motion.article
      layout={!prefersReduced}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.04, 0.28),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={prefersReduced ? undefined : { y: -4 }}
      className="group relative overflow-hidden rounded-2xl glass-card glass-hover p-5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-25"
        style={{ backgroundColor: skill.accentColor }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl glass-inset transition-transform duration-200 group-hover:scale-105"
            style={{ color: skill.accentColor }}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-[#F8FAFC]">
              {skill.name}
            </h3>
            <p className="text-xs text-[#D2B6BE]">
              <span className="text-[#FB7185]">{skill.category}</span>
              <span aria-hidden="true" className="mx-1.5 text-white/25">
                ·
              </span>
              <span>{skill.focusLabel}</span>
            </p>
          </div>
        </div>
      </div>

      <p className="relative mt-3.5 text-sm leading-relaxed text-[#D2B6BE]">
        {skill.summary}
      </p>

      <div
        className="relative mt-4 flex items-center gap-1.5"
        aria-label={`${skill.name} readiness: ${skill.focusLabel}`}
      >
        {[1, 2, 3, 4, 5].map((segment) => {
          const active = segment <= skill.depthLevel;
          return (
            <motion.span
              key={segment}
              initial={prefersReduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.08 * segment }}
              className={`h-1.5 flex-1 origin-left rounded-full ${
                active ? '' : 'bg-white/[0.07]'
              }`}
              style={
                active
                  ? {
                      background: 'linear-gradient(90deg, #9F1239, #BE123C, #FB7185)',
                    }
                  : undefined
              }
            />
          );
        })}
      </div>
    </motion.article>
  );
}
