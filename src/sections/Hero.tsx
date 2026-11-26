import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  Code2,
  Download,
  Github,
  Linkedin,
  MapPin,
  Sparkle,
  Palette,
  Sparkles,
  User,
} from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';
import { PROFILE, downloadPortfolioCV } from '../data/profile';

interface HeroProps {
  onActionSound?: () => void;
}

export function Hero({ onActionSound }: HeroProps) {
  const prefersReduced = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [imgError, setImgError] = useState(false);

  const currentRole = PROFILE.typingRoles[roleIndex];

  useEffect(() => {
    if (prefersReduced) return;

    const atEnd = !isDeleting && charCount === currentRole.length;
    const atStart = isDeleting && charCount === 0;
    const delay = atEnd ? 1600 : isDeleting ? 35 : 65;

    const timer = window.setTimeout(() => {
      if (atEnd) {
        setIsDeleting(true);
      } else if (atStart) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % PROFILE.typingRoles.length);
      } else {
        setCharCount((c) => c + (isDeleting ? -1 : 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charCount, currentRole, isDeleting, prefersReduced]);

  const typedText = prefersReduced ? currentRole : currentRole.slice(0, charCount);

  const scrollToProjects = () => {
    onActionSound?.();
    const target = document.getElementById('projects');
    target?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  const githubLink = PROFILE.socialLinks.find((s) => s.id === 'github');
  const linkedinLink = PROFILE.socialLinks.find((s) => s.id === 'linkedin');

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen flex-col justify-center pt-28 pb-12 sm:pt-32"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left column: Typographic hero */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-chip mb-5 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full px-4 py-2 text-xs font-medium text-[#FB7185]"
            >
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FB7185] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FB7185]" />
                </span>
                {PROFILE.availability}
              </span>
              <span aria-hidden="true" className="h-3 w-px bg-white/20" />
              <span className="inline-flex items-center gap-1.5 text-[#D2B6BE]">
                <MapPin className="h-3.5 w-3.5 text-[#FDA4AF]" aria-hidden="true" />
                {PROFILE.location}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.35rem,4.5vw,3.9rem)] font-bold leading-[1.08] tracking-tight text-[#F8FAFC]"
            >
              Crafting Digital Experiences{' '}
              <span className="bg-gradient-to-r from-[#FB7185] via-[#E11D48] to-[#9F1239] bg-clip-text text-transparent">
                Through Code.
              </span>
            </motion.h1>

            {/* Animated typing role */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 flex min-h-[28px] items-center gap-2 font-mono text-sm text-[#FB7185] sm:text-base"
            >
              <span className="text-[#D2B6BE]">Role:</span>
              <span>{typedText}</span>
              <span
                aria-hidden="true"
                className="inline-block h-4 w-[2px] bg-[#E11D48] opacity-85"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-xl text-base leading-relaxed text-[#D2B6BE] sm:text-lg"
            >
              {PROFILE.heroIntro}
            </motion.p>

            {/* Primary Maroon CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                onClick={scrollToProjects}
                className="inline-flex min-h-[46px] items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] px-6 py-3 text-sm font-semibold text-[#F8FAFC] shadow-[0_0_32px_rgba(159,18,57,0.42)] transition-all duration-200 hover:brightness-115 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>

              <MagneticButton
                onClick={() => {
                  onActionSound?.();
                  downloadPortfolioCV();
                }}
                className="inline-flex min-h-[46px] items-center gap-2 glass-surface rounded-xl px-6 py-3 text-sm font-semibold text-[#FB7185] transition-colors duration-200 hover:border-[#FB7185] hover:bg-[#9F1239]/25 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>Download CV</span>
              </MagneticButton>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.34 }}
              className="mt-8 flex items-center gap-5 text-sm text-[#D2B6BE]"
            >
              {githubLink && (
                <a
                  href={githubLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[#FB7185] whitespace-nowrap shrink-0"
                >
                  <Github className="h-4 w-4 text-[#FDA4AF]" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
              )}
              <span aria-hidden="true" className="text-white/15">
                /
              </span>
              {linkedinLink && (
                <a
                  href={linkedinLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[#FB7185] whitespace-nowrap shrink-0"
                >
                  <Linkedin className="h-4 w-4 text-[#FB7185]" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
              )}
            </motion.div>
          </div>

          {/* Right column: Framed Developer Portrait & Floating Frontend Nodes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto max-w-[390px]">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#9F1239]/35 via-[#9F1239]/20 to-[#FB7185]/25 blur-2xl"
              />

              <motion.div
                animate={prefersReduced ? undefined : { y: [0, -8, 0] }}
                transition={
                  prefersReduced
                    ? undefined
                    : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
                }
                className="glass-surface-strong relative overflow-hidden rounded-3xl p-2 shadow-2xl"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#260814]">
                  {!imgError ? (
                    <img
                      src={PROFILE.portraitImage}
                      alt={`${PROFILE.name} — ${PROFILE.title}`}
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#33101F] to-[#5A1229]">
                      <User className="h-14 w-14 text-[#FDA4AF]" aria-hidden="true" />
                      <span className="font-display text-lg font-semibold text-[#F8FAFC]">
                        {PROFILE.name}
                      </span>
                    </div>
                  )}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C050D]/70 via-transparent to-transparent"
                  />
                </div>

                <div className="mt-2 rounded-xl glass-inset px-4 py-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-[#D2B6BE]">
                    <span>ui.config.js</span>
                    <span className="text-[#FB7185]">Frontend</span>
                  </div>
                  <p className="mt-1.5 text-[#F8FAFC]">
                    <span className="text-[#FDA4AF]">const</span> focus ={' '}
                    <span className="text-[#FB7185]">['React', 'Tailwind', 'Motion']</span>;
                  </p>
                </div>
              </motion.div>

              <motion.div
                aria-hidden="true"
                animate={prefersReduced ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="glass-surface absolute -top-4 -left-4 hidden items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-[#F8FAFC] sm:flex"
              >
                <Code2 className="h-4 w-4 text-[#FB7185]" />
                <span>React.js</span>
              </motion.div>

              <motion.div
                aria-hidden="true"
                animate={prefersReduced ? undefined : { y: [0, 7, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                className="glass-surface absolute top-1/3 -right-5 hidden items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-[#F8FAFC] sm:flex"
              >
                <Palette className="h-4 w-4 text-[#FDA4AF]" />
                <span>Tailwind</span>
              </motion.div>

              <motion.div
                aria-hidden="true"
                animate={prefersReduced ? undefined : { y: [0, -5, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                className="glass-surface absolute bottom-20 -left-5 hidden items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-[#F8FAFC] sm:flex"
              >
                <Sparkles className="h-4 w-4 text-[#FB7185]" />
                <span>Motion</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById('about')
                ?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#FB7185] transition-colors hover:text-[#F8FAFC]"
          >
            <span>Scroll to explore</span>
            <ArrowDown className="h-3.5 w-3.5 text-[#FDA4AF]" aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      {/* Subtle architectural marquee divider */}
      <div
        aria-hidden="true"
        className="mt-12 overflow-hidden glass-inset border-x-0 py-3"
      >
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-mono text-xs text-[#D2B6BE]">
          {Array.from({ length: 2 }).map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-10">
              <span>HTML5</span>
              <Sparkle className="h-3 w-3 text-[#FDA4AF]" aria-hidden="true" />
              <span>CSS3</span>
              <Sparkle className="h-3 w-3 text-[#FB7185]" aria-hidden="true" />
              <span>JavaScript ES6+</span>
              <Sparkle className="h-3 w-3 text-[#FDA4AF]" aria-hidden="true" />
              <span>React.js</span>
              <Sparkle className="h-3 w-3 text-[#FB7185]" aria-hidden="true" />
              <span>Tailwind CSS</span>
              <Sparkle className="h-3 w-3 text-[#FDA4AF]" aria-hidden="true" />
              <span>Bootstrap</span>
              <Sparkle className="h-3 w-3 text-[#FB7185]" aria-hidden="true" />
              <span>Framer Motion</span>
              <Sparkle className="h-3 w-3 text-[#FDA4AF]" aria-hidden="true" />
              <span>Vite</span>
              <Sparkle className="h-3 w-3 text-[#FB7185]" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
