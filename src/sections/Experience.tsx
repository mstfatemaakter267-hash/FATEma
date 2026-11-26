import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Award, BookOpen, Briefcase, GraduationCap, Route } from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { TIMELINE_ENTRIES, type TimelineEntry } from '../data/experience';

function getTimelineIcon(type: TimelineEntry['type']) {
  switch (type) {
    case 'Practical Experience':
      return Briefcase;
    case 'Learning Journey':
      return BookOpen;
    case 'Certifications':
      return Award;
    case 'Education':
      return GraduationCap;
  }
}

export function Experience() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative z-10 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          number="05"
          kicker="Journey & Background"
          icon={Route}
          title="Education, certifications, and practical experience."
          subtitle="A transparent overview of my ongoing frontend engineering path. All timeline records are structured cleanly for easy updates."
        />

        <div ref={timelineRef} className="relative pl-8 sm:pl-12">
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-3 w-[2px] bg-white/[0.08] sm:left-5"
          />

          <motion.div
            aria-hidden="true"
            style={prefersReduced ? undefined : { scaleY: lineScale }}
            className="absolute top-2 bottom-2 left-3 w-[2px] origin-top bg-gradient-to-b from-[#BE123C] via-[#E11D48] to-[#FB7185] sm:left-5"
          />

          <div className="space-y-8">
            {TIMELINE_ENTRIES.map((entry, idx) => {
              const Icon = getTimelineIcon(entry.type);
              return (
                <motion.article
                  key={entry.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative rounded-2xl glass-card glass-hover p-6"
                >
                  <div
                    aria-hidden="true"
                    className="absolute top-7 -left-[29px] flex h-7 w-7 items-center justify-center rounded-full border border-[#BE123C]/70 bg-[#1C050D] text-[#FB7185] shadow-[0_0_16px_rgba(190,18,60,0.45)] sm:-left-[41px]"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs text-[#FB7185]">
                      {entry.type}
                    </span>
                    <span className="font-mono text-xs tabular-nums text-[#D2B6BE]">
                      {entry.period}
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-xl font-semibold text-[#F8FAFC]">
                    {entry.title}
                  </h3>

                  <p className="mt-0.5 text-sm font-medium text-[#FDA4AF]">
                    {entry.organization}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-[#D2B6BE]">
                    {entry.description}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-4 text-xs text-[#D2B6BE] sm:text-sm">
                    {entry.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span aria-hidden="true" className="text-[#FB7185]">
                          ·
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
