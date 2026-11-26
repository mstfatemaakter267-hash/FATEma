import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Download,
  FolderKanban,
  Home,
  Layers,
  Mail,
  Menu,
  User,
  Briefcase,
  X,
  type LucideIcon,
} from 'lucide-react';
import { PROFILE, downloadPortfolioCV } from '../data/profile';

interface NavbarProps {
  activeSection: string;
  isScrolled: boolean;
  onNavigate?: () => void;
}

const NAV_LINKS: Array<{ id: string; label: string; icon: LucideIcon }> = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Layers },
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export function Navbar({ activeSection, isScrolled, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    onNavigate?.();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 pt-3 sm:px-6 sm:pt-4">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-8 rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-6 ${
          isScrolled
            ? 'glass-surface-strong shadow-[0_12px_40px_rgba(10,0,4,0.5)]'
            : 'glass-surface'
        }`}
      >
        {/* Zone 1: Single-line animated brand wordmark */}
        <motion.a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          whileHover={prefersReduced ? undefined : { scale: 1.04 }}
          whileTap={prefersReduced ? undefined : { scale: 0.97 }}
          title="Mst Fatema Akter — Open to Frontend opportunities"
          className="font-display text-xl font-bold tracking-tight text-[#F8FAFC] whitespace-nowrap shrink-0"
        >
          FA<span className="text-[#FDA4AF]">.</span>
        </motion.a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 lg:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className={`group relative py-1.5 text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#FB7185]'
                    : 'text-[#D2B6BE] hover:text-[#FB7185]'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#BE123C] via-[#E11D48] to-[#FB7185] transition-transform duration-200 group-hover:scale-x-100"
                />
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-[#BE123C] via-[#E11D48] to-[#FB7185]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary maroon action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              onNavigate?.();
              downloadPortfolioCV();
            }}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] px-4 py-2 text-xs font-semibold text-[#F8FAFC] shadow-[0_0_24px_rgba(159,18,57,0.38)] transition-all duration-200 hover:brightness-115 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Download CV</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center glass-inset rounded-xl text-[#F8FAFC] transition-colors hover:border-[#FB7185]/60 lg:hidden cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Responsive mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass-surface-strong mx-auto mt-2 max-w-6xl rounded-2xl p-4 lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.id);
                    }}
                    className={`flex min-h-[44px] items-center justify-between rounded-xl px-4 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#9F1239]/30 text-[#FB7185]'
                        : 'text-[#D2B6BE] hover:bg-white/[0.04] hover:text-[#FB7185]'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <link.icon className="h-4 w-4" aria-hidden="true" />
                      {link.label}
                    </span>
                    {isActive && (
                      <span className="font-mono text-xs text-[#FB7185]">Active</span>
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="mt-3 flex flex-col gap-3 border-t border-white/[0.08] pt-3">
              <p className="px-2 text-xs text-[#D2B6BE]">
                {PROFILE.availability} · {PROFILE.location}
              </p>
              <button
                type="button"
                onClick={() => {
                  onNavigate?.();
                  downloadPortfolioCV();
                  setMobileOpen(false);
                }}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] px-4 py-2.5 text-sm font-semibold text-[#F8FAFC] cursor-pointer"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>Download CV</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
