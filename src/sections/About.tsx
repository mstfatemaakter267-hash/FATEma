import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Cpu,
  Download,
  FolderKanban,
  Lightbulb,
  MapPin,
  Route,
  Target,
  TrendingUp,
  User,
  type LucideIcon,
} from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';
import { SectionTitle } from '../components/SectionTitle';
import { PROFILE, downloadPortfolioCV } from '../data/profile';

const STAT_ICONS: Record<string, LucideIcon> = {
  projects: FolderKanban,
  tech: Cpu,
  journey: TrendingUp,
  focus: Code2,
};

interface AboutProps {
  onActionSound?: () => void;
}

export function About({ onActionSound }: AboutProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="relative z-10 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          number="01"
          kicker="About Me"
          icon={User}
          title="Building thoughtful frontend software with clarity and care."
          subtitle="A look into my background, UI engineering approach, and ongoing growth as a Frontend Web Developer."
        />

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="glass-card relative h-full min-h-[340px] overflow-hidden rounded-2xl">
              {!imgError ? (
                <img
                  src={PROFILE.portraitImage}
                  alt={`${PROFILE.name} portrait`}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#33101F] p-8">
                  <User className="h-12 w-12 text-[#FDA4AF]" aria-hidden="true" />
                  <span className="font-display text-lg font-semibold text-[#F8FAFC]">
                    {PROFILE.name}
                  </span>
                </div>
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C050D]/85 via-transparent to-transparent"
              />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-display text-lg font-semibold text-[#F8FAFC]">
                  {PROFILE.name}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[#FB7185]">
                  <MapPin className="h-3.5 w-3.5 text-[#FDA4AF]" aria-hidden="true" />
                  <span>{PROFILE.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{PROFILE.experienceLevel} Level</span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-2xl glass-card p-6 sm:p-8 lg:col-span-7"
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg font-semibold text-[#F8FAFC]">
                  Personal Introduction
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#D2B6BE] sm:text-base">
                  {PROFILE.about.intro}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 border-t border-white/[0.07] pt-6 sm:grid-cols-2">
                <div>
                  <h4 className="flex items-center gap-2 font-display text-sm font-semibold text-[#FB7185]">
                    <Route className="h-4 w-4" aria-hidden="true" />
                    Development Journey
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#D2B6BE]">
                    {PROFILE.about.journey}
                  </p>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 font-display text-sm font-semibold text-[#FDA4AF]">
                    <Target className="h-4 w-4" aria-hidden="true" />
                    Career Goals
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#D2B6BE]">
                    {PROFILE.about.goals}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/[0.07] pt-6">
                <h4 className="flex items-center gap-2 font-display text-sm font-semibold text-[#F8FAFC]">
                  <Lightbulb className="h-4 w-4 text-[#FB7185]" aria-hidden="true" />
                  What Makes My Approach Unique
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#D2B6BE]">
                  {PROFILE.about.uniqueApproach}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-6">
              <span className="font-mono text-xs text-[#FB7185]">
                {PROFILE.role} · {PROFILE.location}
              </span>
              <MagneticButton
                onClick={() => {
                  onActionSound?.();
                  downloadPortfolioCV();
                }}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] px-5 py-2.5 text-sm font-semibold text-[#F8FAFC] shadow-[0_0_24px_rgba(159,18,57,0.35)] transition-all hover:brightness-115 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>Download Resume</span>
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROFILE.stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="rounded-2xl glass-card p-5"
            >
              <div className="glass-inset mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-[#FB7185]">
                {(() => {
                  const StatIcon = STAT_ICONS[stat.id] ?? Code2;
                  return <StatIcon className="h-5 w-5" aria-hidden="true" />;
                })()}
              </div>
              <p className="font-display text-2xl font-bold tabular-nums text-[#FB7185] sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-[#F8FAFC]">{stat.label}</p>
              <p className="mt-0.5 text-xs text-[#D2B6BE]">{stat.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
