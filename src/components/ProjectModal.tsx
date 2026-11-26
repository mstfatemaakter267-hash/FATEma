import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, FolderGit2, Info, X } from 'lucide-react';
import type { ProjectItem } from '../data/projects';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const isOpen = project !== null;

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  // Rendered through a portal so the dialog sits above the fixed navbar
  // (sections create their own stacking context).
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#12030a]/70 p-4 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-surface-strong relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl shadow-2xl"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#1C050D]/80 text-[#F8FAFC] transition-colors hover:border-[#FB7185] hover:text-[#FB7185] cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#260814]">
              <img
                src={project.image}
                alt={`${project.title} full showcase`}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#2a0914] via-transparent to-transparent"
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#FB7185]">
                <span>{project.category}</span>
                <span aria-hidden="true" className="text-[#D2B6BE]/50">
                  ·
                </span>
                <span className="text-[#FDA4AF]">{project.statusLabel}</span>
              </div>

              <h3
                id="project-modal-title"
                className="mt-2 font-display text-2xl font-semibold text-[#F8FAFC] sm:text-3xl"
              >
                {project.title}
              </h3>

              <p className="mt-3 text-base leading-relaxed text-[#D2B6BE]">
                {project.fullDescription}
              </p>

              <div className="mt-6">
                <h4 className="font-display text-sm font-semibold text-[#F8FAFC]">
                  Key Frontend Highlights
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#D2B6BE]"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#FB7185]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-xl glass-inset p-4">
                <p className="font-mono text-xs text-[#FB7185]">Frontend Structure</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#D2B6BE]">
                  {project.architectureNote}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies used">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="glass-chip rounded-full px-2.5 py-1 font-mono text-[11px] text-[#FDA4AF]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
                {project.liveUrl || project.githubUrl ? (
                  <div className="flex flex-wrap items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] px-4 py-2 text-sm font-semibold text-[#F8FAFC]"
                      >
                        <span>Open Live Demo</span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[42px] items-center gap-2 glass-inset rounded-xl px-4 py-2 text-sm font-medium text-[#FB7185]"
                      >
                        <FolderGit2 className="h-4 w-4" aria-hidden="true" />
                        <span>View Repository</span>
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5 text-xs leading-relaxed text-[#D2B6BE]">
                    <Info
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#FB7185]"
                      aria-hidden="true"
                    />
                    <span>Live demo and source code links are coming soon.</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-[#9F1239] px-4 py-2 text-xs font-semibold text-[#F8FAFC] transition-colors hover:bg-[#BE123C] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
