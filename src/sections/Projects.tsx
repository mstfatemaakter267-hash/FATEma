import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Eye, FolderKanban } from 'lucide-react';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { SectionTitle } from '../components/SectionTitle';
import {
  PROJECT_CATEGORIES,
  PROJECTS,
  type ProjectCategory,
  type ProjectItem,
} from '../data/projects';

interface ProjectsProps {
  onActionSound?: () => void;
}

export function Projects({ onActionSound }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const prefersReduced = useReducedMotion();

  const featuredProject = useMemo(
    () => PROJECTS.find((p) => p.featured) ?? PROJECTS[0],
    []
  );

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleFilterClick = (category: ProjectCategory) => {
    onActionSound?.();
    setSelectedCategory(category);
  };

  const handleOpenProject = (project: ProjectItem) => {
    onActionSound?.();
    setActiveProject(project);
  };

  return (
    <section id="projects" className="relative z-10 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          number="04"
          kicker="Featured Projects"
          icon={FolderKanban}
          title="Selected React and frontend UI case studies."
          subtitle="Explore sample frontend applications built across healthcare, e-learning, culinary search, and e-commerce interfaces. Click any project to inspect details."
        />

        {featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 overflow-hidden rounded-2xl glass-card"
          >
            <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#260814] lg:col-span-6 lg:aspect-auto">
                <img
                  src={featuredProject.image}
                  alt={`${featuredProject.title} spotlight preview`}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#33101F]/80 hidden lg:block"
                />
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-6">
                <div className="flex items-center gap-2 font-mono text-xs text-[#FB7185]">
                  <span>Featured Spotlight</span>
                  <span aria-hidden="true" className="text-[#D2B6BE]/50">
                    ·
                  </span>
                  <span className="text-[#FDA4AF]">{featuredProject.category}</span>
                </div>

                <h3 className="mt-2 font-display text-2xl font-semibold text-[#F8FAFC] sm:text-3xl">
                  {featuredProject.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#D2B6BE] sm:text-base">
                  {featuredProject.fullDescription}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
                  {featuredProject.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="glass-chip rounded-full px-2.5 py-1 font-mono text-[11px] text-[#FDA4AF]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleOpenProject(featuredProject)}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] px-5 py-2.5 text-sm font-semibold text-[#F8FAFC] shadow-[0_0_24px_rgba(159,18,57,0.38)] transition-all hover:brightness-115 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    <span>Inspect Showcase</span>
                  </button>

                  {featuredProject.liveUrl && (
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[42px] items-center gap-1.5 glass-inset rounded-xl px-4 py-2.5 text-sm font-medium text-[#FB7185] transition-colors hover:border-[#FB7185]"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mb-8 inline-flex flex-wrap items-center gap-1.5 rounded-xl glass-inset p-1.5"
        >
          {PROJECT_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => handleFilterClick(category)}
                className={`min-h-[38px] rounded-lg px-4 py-1.5 text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] text-[#F8FAFC] shadow-sm'
                    : 'text-[#D2B6BE] hover:text-[#FB7185]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <motion.div
          layout={!prefersReduced}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onSelect={handleOpenProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
