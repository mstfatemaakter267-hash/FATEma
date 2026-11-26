import { ArrowUp, Github, Linkedin, Mail, Volume2, VolumeX } from 'lucide-react';
import { PROFILE } from '../data/profile';

interface FooterProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const FOOTER_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export function Footer({ soundEnabled, onToggleSound }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="glass-surface relative z-10 mt-20 rounded-none border-x-0 border-b-0">
      <div
        aria-hidden="true"
        className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#BE123C]/70 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <a
              href="#home"
              className="font-display text-2xl font-bold tracking-tight text-[#F8FAFC]"
            >
              FA<span className="text-[#FDA4AF]">.</span>
            </a>
            <p className="mt-2 max-w-sm text-sm text-[#D2B6BE]">
              Frontend Web Developer based in {PROFILE.location}. Building clean, responsive React experiences.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-sm text-[#D2B6BE] transition-colors hover:text-[#FB7185] whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {PROFILE.socialLinks.map((social) => {
              const Icon =
                social.id === 'github'
                  ? Github
                  : social.id === 'linkedin'
                    ? Linkedin
                    : Mail;
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target={social.id === 'email' ? undefined : '_blank'}
                  rel={social.id === 'email' ? undefined : 'noopener noreferrer'}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center glass-inset rounded-xl text-[#D2B6BE] transition-colors hover:border-[#FB7185]/60 hover:text-[#FB7185]"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              );
            })}

            <button
              type="button"
              onClick={onToggleSound}
              aria-pressed={soundEnabled}
              aria-label={soundEnabled ? 'Mute UI click sounds' : 'Enable subtle UI click sounds'}
              title={soundEnabled ? 'UI Sound: On' : 'UI Sound: Off'}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors cursor-pointer ${
                soundEnabled
                  ? 'border-[#BE123C]/60 bg-[#9F1239]/30 text-[#FB7185]'
                  : 'glass-inset text-[#D2B6BE] hover:text-[#FB7185]'
              }`}
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4" aria-hidden="true" />
              ) : (
                <VolumeX className="h-4 w-4" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-10 items-center gap-1.5 rounded-xl bg-[#9F1239] px-3.5 text-xs font-semibold text-[#F8FAFC] transition-colors hover:bg-[#BE123C] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Top</span>
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-white/[0.06] pt-6 text-xs text-[#D2B6BE] sm:flex-row sm:items-center">
          <p>© {currentYear} {PROFILE.name}. All rights reserved.</p>
          <p className="text-[#FB7185]/80">Designed & built with React, Tailwind CSS, and Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
