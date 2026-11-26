import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Cpu } from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { SkillCard } from '../components/SkillCard';
import { SKILL_CATEGORIES, SKILLS, type SkillCategory } from '../data/skills';

interface SkillsProps {
  onActionSound?: () => void;
}

const ORBIT_NODES: Array<{
  category: SkillCategory;
  label: string;
  positionClass: string;
}> = [
  {
    category: 'Frontend',
    label: 'React & JS',
    positionClass: 'top-3 left-1/2 -translate-x-1/2',
  },
  {
    category: 'Styling',
    label: 'Tailwind & CSS',
    positionClass: 'top-1/2 right-1 -translate-y-1/2',
  },
  {
    category: 'Frontend',
    label: 'HTML5 & Motion',
    positionClass: 'bottom-3 left-1/2 -translate-x-1/2',
  },
  {
    category: 'Tools',
    label: 'Git & Vite',
    positionClass: 'top-1/2 left-1 -translate-y-1/2',
  },
];

export function Skills({ onActionSound }: SkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | SkillCategory>('All');
  const prefersReduced = useReducedMotion();

  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'All') return SKILLS;
    return SKILLS.filter((skill) => skill.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category: 'All' | SkillCategory) => {
    onActionSound?.();
    setSelectedCategory(category);
  };

  return (
    <section id="skills" className="relative z-10 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle
            number="02"
            kicker="Technical Stack"
          icon={Cpu}
            title="Skills engineered for modern frontend experiences."
            subtitle="Filter by layer or select an orbit node to explore core React & JavaScript skills, styling systems, and developer tooling."
          />

          {/* Interactive Frontend Orbit Constellation */}
          <div className="mb-10 flex shrink-0 justify-center lg:mb-12">
            <div className="glass-card relative flex h-56 w-56 items-center justify-center rounded-full">
              <motion.div
                aria-hidden="true"
                animate={prefersReduced ? undefined : { rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-5 rounded-full border border-dashed border-[#BE123C]/40"
              />
              <div
                aria-hidden="true"
                className="absolute inset-12 rounded-full border border-[#FB7185]/25"
              />

              <button
                type="button"
                onClick={() => handleCategoryChange('All')}
                className={`z-10 flex h-16 w-16 flex-col items-center justify-center rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === 'All'
                    ? 'border-[#FB7185] bg-[#9F1239] text-[#F8FAFC] shadow-[0_0_24px_rgba(190,18,60,0.45)]'
                    : 'glass-inset text-[#D2B6BE] hover:text-[#FB7185]'
                }`}
              >
                <span className="font-display text-sm">UI</span>
                <span className="font-mono text-[10px] text-[#FB7185]">All</span>
              </button>

              {ORBIT_NODES.map((node) => {
                const isActive = selectedCategory === node.category;
                return (
                  <button
                    key={node.label}
                    type="button"
                    onClick={() => handleCategoryChange(node.category)}
                    title={`Filter ${node.category} skills`}
                    className={`absolute ${node.positionClass} z-10 rounded-xl border px-2.5 py-1.5 text-[11px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'border-[#FB7185] bg-[#9F1239] text-[#F8FAFC] shadow-[0_0_18px_rgba(190,18,60,0.45)]'
                        : 'glass-inset text-[#FB7185] hover:border-[#FB7185] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {node.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Maroon Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="mb-8 inline-flex flex-wrap items-center gap-1.5 rounded-xl glass-inset p-1.5"
        >
          {SKILL_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => handleCategoryChange(category)}
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
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredSkills.map((skill, idx) => (
            <SkillCard key={skill.id} skill={skill} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
