export interface TimelineEntry {
  id: string;
  period: string;
  type: 'Education' | 'Learning Journey' | 'Certifications' | 'Practical Experience';
  title: string;
  organization: string;
  description: string;
  highlights: string[];
}

export const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: 'practical-frontend',
    period: 'Ongoing · Editable',
    type: 'Practical Experience',
    title: 'Frontend & React Project Development',
    organization: 'Independent & Collaborative Builds · Dhaka, Bangladesh',
    description:
      'Designing and building responsive single-page applications using React.js, JavaScript ES6+, Tailwind CSS, and Framer Motion with a focus on clean UI architecture.',
    highlights: [
      'Built 6+ portfolio applications spanning healthcare UI, EdTech, and e-commerce',
      'Implemented responsive dark-mode layouts and accessible form validation',
      'Crafted reusable component libraries and smooth client-side navigation',
    ],
  },
  {
    id: 'learning-journey',
    period: 'Intermediate Stage · Editable',
    type: 'Learning Journey',
    title: 'Modern JavaScript, React & UI Systems',
    organization: 'Self-Directed Frontend Engineering Track',
    description:
      'Deepened practical command over ES6+ JavaScript, React component patterns, Tailwind CSS design tokens, and interactive browser animations.',
    highlights: [
      'Mastered React Hooks, React Router DOM, and state composition',
      'Built fluid mobile-first grids using Tailwind CSS and CSS3 Grid/Flexbox',
      'Adopted Git & GitHub branching workflows for version control',
    ],
  },
  {
    id: 'certifications',
    period: 'Completed · Editable',
    type: 'Certifications',
    title: 'Frontend Web Development Foundations',
    organization: 'Verified Coursework (Update Credential Details)',
    description:
      'Completed structured training modules covering responsive HTML5/CSS3 engineering, JavaScript DOM logic, and component-based React applications.',
    highlights: [
      'Frontend essentials: HTML5, CSS3, Bootstrap, and Tailwind CSS',
      'Interactive UI logic with JavaScript ES6+ and React.js',
      'Project reviews and clean component refactoring',
    ],
  },
  {
    id: 'education',
    period: 'Academic Track · Editable',
    type: 'Education',
    title: 'Academic Studies & Computing Fundamentals',
    organization: 'Dhaka, Bangladesh (Update Institution Name)',
    description:
      'Built core analytical problem-solving habits, structured thinking, and foundational web design principles.',
    highlights: [
      'Structured problem solving and interface organization fundamentals',
      'Collaborative team presentations and project documentation',
      'Consistent commitment to continuous frontend growth',
    ],
  },
];

export const DEVELOPER_ACTIVITY = {
  currentlyLearning: [
    'Frontend TypeScript Patterns',
    'Accessible Motion Design',
    'Design System Architecture',
    'React Performance Tuning',
  ],
  codingInterests: [
    'Design Systems & Micro-interactions',
    'Responsive Layout Engineering',
    'Interactive Dashboards & Modals',
    'Clean Component Tooling',
  ],
  terminalCommands: [
    {
      command: 'whoami',
      label: 'Profile',
      output: [
        'name:     Mst Fatema Akter',
        'role:     Frontend Web Developer (React & UI)',
        'location: Dhaka, Bangladesh',
        'level:    Intermediate · Continuous Learner',
      ],
    },
    {
      command: 'stack --active',
      label: 'Tech Stack',
      output: [
        'core:     HTML5, CSS3, JavaScript ES6+, React.js',
        'styling:  Tailwind CSS, Bootstrap, Framer Motion',
        'workflow: Git, GitHub, VS Code, npm, Vite',
        'focus:    100% Frontend · Zero Backend Needed',
      ],
    },
    {
      command: 'focus --current',
      label: 'Exploring',
      output: [
        '→ Building responsive React interfaces with clean UX',
        '→ Crafting maroon-accented dark design systems',
        '→ Exploring TypeScript & production UI performance',
        '→ Open to frontend developer roles & collaborations',
      ],
    },
  ],
  sampleContributionMatrix: [
    [1, 2, 0, 3, 2, 1, 0],
    [2, 3, 2, 4, 1, 2, 1],
    [0, 2, 3, 2, 3, 1, 0],
    [1, 1, 4, 3, 2, 2, 1],
    [2, 3, 2, 1, 4, 3, 1],
    [3, 2, 4, 3, 2, 1, 2],
    [1, 4, 3, 2, 3, 2, 0],
    [2, 2, 3, 4, 3, 1, 1],
    [3, 3, 2, 3, 4, 2, 1],
    [1, 2, 4, 3, 2, 3, 2],
    [2, 4, 3, 4, 3, 2, 1],
    [3, 3, 4, 2, 4, 3, 2],
  ],
};
