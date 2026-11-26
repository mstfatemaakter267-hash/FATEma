export type SkillCategory = 'Frontend' | 'Styling' | 'Tools';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  focusLabel: string;
  depthLevel: number; // Qualitative 1-5 visual bar (not a fabricated percentage)
  summary: string;
  accentColor: string;
}

export const SKILL_CATEGORIES: Array<'All' | SkillCategory> = [
  'All',
  'Frontend',
  'Styling',
  'Tools',
];

export const SKILLS: SkillItem[] = [
  // Frontend Core
  {
    id: 'html5',
    name: 'HTML5',
    category: 'Frontend',
    focusLabel: 'Core Foundation',
    depthLevel: 5,
    summary: 'Semantic landmarks, accessible forms, and clean document structure.',
    accentColor: '#E11D48',
  },
  {
    id: 'javascript',
    name: 'JavaScript ES6+',
    category: 'Frontend',
    focusLabel: 'Daily Workflow',
    depthLevel: 4,
    summary: 'Modern ES6+ modules, async flows, DOM orchestration, and clean state logic.',
    accentColor: '#FB7185',
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'Frontend',
    focusLabel: 'Primary Specialization',
    depthLevel: 4,
    summary: 'Modular hooks, component composition, React Router, and responsive UI state.',
    accentColor: '#FB7185',
  },
  {
    id: 'motion',
    name: 'Framer Motion',
    category: 'Frontend',
    focusLabel: 'Interactive UI',
    depthLevel: 4,
    summary: 'Smooth scroll-linked reveals, layout transitions, and reduced-motion polish.',
    accentColor: '#E11D48',
  },
  // Styling & Layout
  {
    id: 'css3',
    name: 'CSS3',
    category: 'Styling',
    focusLabel: 'Core Foundation',
    depthLevel: 5,
    summary: 'Flexbox, CSS Grid, fluid typography, and custom glassmorphism surfaces.',
    accentColor: '#BE123C',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Styling',
    focusLabel: 'Daily Workflow',
    depthLevel: 5,
    summary: 'Design-token systems, responsive breakpoints, and dark editorial styling.',
    accentColor: '#FB7185',
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    category: 'Styling',
    focusLabel: 'Applied Practice',
    depthLevel: 4,
    summary: 'Rapid layout grids and component prototyping for structured web apps.',
    accentColor: '#E11D48',
  },
  // Tools & Workflow
  {
    id: 'git',
    name: 'Git',
    category: 'Tools',
    focusLabel: 'Version Control',
    depthLevel: 4,
    summary: 'Branching workflows, clean commit history, and conflict resolution.',
    accentColor: '#BE123C',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Tools',
    focusLabel: 'Collaboration',
    depthLevel: 4,
    summary: 'Repository organization, pull requests, issue tracking, and documentation.',
    accentColor: '#FB7185',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'Tools',
    focusLabel: 'Daily Environment',
    depthLevel: 5,
    summary: 'Workspace debugging, linting integration, and rapid code navigation.',
    accentColor: '#E11D48',
  },
  {
    id: 'npm',
    name: 'npm & Vite',
    category: 'Tools',
    focusLabel: 'Build Tooling',
    depthLevel: 4,
    summary: 'Package management, fast local bundling, and clean production builds.',
    accentColor: '#FB7185',
  },
];
