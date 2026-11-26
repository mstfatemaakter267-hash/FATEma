import { useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Eye, FolderGit2, Layers } from 'lucide-react';
import type { ProjectItem } from '../data/projects';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onSelect: (project: ProjectItem) => void;
}

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 220,
    damping: 22,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(px);
    mouseY.set(py);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      layout={!prefersReduced}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.06, 0.24),
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReduced
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 900,
            }
      }
      className="group flex flex-col overflow-hidden rounded-2xl glass-card glass-hover"
    >
      <button
        type="button"
        onClick={() => onSelect(project)}
        aria-label={`Inspect ${project.title} details`}
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#260814] text-left cursor-pointer"
      >
        {!imgError ? (
          <img
            src={project.image}
            alt={`${project.title} interface showcase`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#33101F] via-[#260814] to-[#5A1229] p-6 text-center">
            <Layers className="h-8 w-8 text-[#FDA4AF]" aria-hidden="true" />
            <span className="font-display text-sm font-semibold text-[#F8FAFC]">
              {project.title}
            </span>
          </div>
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C050D]/80 via-[#1C050D]/15 to-transparent"
        />
        <span className="absolute bottom-3 left-4 font-mono text-xs text-[#FB7185]">
          {project.category} · {project.statusLabel}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold tracking-tight text-[#F8FAFC]">
          {project.title}
        </h3>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#D2B6BE]">
          {project.summary}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="glass-chip rounded-full px-2.5 py-1 font-mono text-[11px] text-[#FDA4AF]"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-white/[0.1] pt-4">
          <button
            type="button"
            onClick={() => onSelect(project)}
            className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] px-3.5 py-2 text-xs font-semibold text-[#F8FAFC] shadow-[0_0_20px_rgba(225,29,72,0.3)] transition-all duration-200 hover:brightness-110 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            <span>View Details</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-inset inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium text-[#FB7185] transition-colors hover:border-[#FB7185] hover:bg-[#9F1239]/25 whitespace-nowrap shrink-0"
            >
              <span>Live Demo</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="glass-inset inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium text-[#FB7185] transition-colors hover:border-[#FB7185] hover:bg-[#9F1239]/25 whitespace-nowrap shrink-0"
            >
              <FolderGit2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
