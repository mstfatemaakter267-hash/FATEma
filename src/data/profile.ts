import portraitImage from '../assets/images/profile_developer_1795526084761.jpeg'

export interface StatItem {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export interface SocialLink {
  id: 'github' | 'linkedin' | 'email';
  label: string;
  href: string;
  handle: string;
  isConfigured: boolean;
}

export const PROFILE = {
  brandMark: 'FA.',
  name: 'Mst Fatema Akter',
  shortName: 'Fatema Akter',
  title: 'Frontend Web Developer',
  role: 'React & Frontend Developer',
  location: 'Dhaka, Bangladesh',
  experienceLevel: 'Intermediate',
  availability: 'Open to Frontend & React Opportunities',
  email: 'fatema.dev.contact@example.com',
  githubUsername: import.meta.env.VITE_GITHUB_USERNAME || '',
  heroHeading: 'Crafting Digital Experiences Through Code.',
  heroIntro:
    "Hi, I'm Fatema Akter — a Frontend Web Developer passionate about building beautiful, responsive, and user-friendly web applications.",
  typingRoles: [
    'Frontend Web Developer',
    'React.js Specialist',
    'Responsive UI Builder',
    'JavaScript ES6+ Developer',
  ],
  portraitImage,
  about: {
    intro:
      'Based in Dhaka, Bangladesh, I focus on turning creative ideas into fast, accessible, and cleanly structured frontend web applications using React.js, JavaScript ES6+, HTML5, CSS3, and Tailwind CSS.',
    journey:
      'My development journey began with semantic HTML and modern CSS layouts before evolving into component-driven React interfaces and smooth interactive UI experiences. Every project has sharpened my attention to layout precision, state flow, and responsive polish.',
    goals:
      'I am focused on contributing to product-minded frontend teams where thoughtful UI craft meets clean engineering, while deepening my expertise in TypeScript, design systems, and web accessibility.',
    uniqueApproach:
      'I combine visual elegance with clean component architecture—designing interfaces that feel effortless to navigate across mobile, tablet, and desktop screens.',
  },
  stats: [
    {
      id: 'projects',
      label: 'Projects Completed',
      value: '06+',
      detail: 'Interactive frontend builds',
    },
    {
      id: 'tech',
      label: 'Technologies Explored',
      value: '10+',
      detail: 'React, Tailwind & tooling',
    },
    {
      id: 'journey',
      label: 'Learning Journey',
      value: 'Intermediate',
      detail: 'Continuous hands-on growth',
    },
    {
      id: 'focus',
      label: 'Development Focus',
      value: 'Frontend',
      detail: 'Responsive React web apps',
    },
  ] satisfies StatItem[],
  socialLinks: [
    {
      id: 'github',
      label: 'GitHub',
      href: import.meta.env.VITE_GITHUB_URL || 'https://github.com',
      handle: import.meta.env.VITE_GITHUB_USERNAME
        ? `@${import.meta.env.VITE_GITHUB_USERNAME}`
        : 'GitHub',
      isConfigured: Boolean(import.meta.env.VITE_GITHUB_URL),
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com',
      handle: import.meta.env.VITE_LINKEDIN_URL
        ? 'LinkedIn Profile'
        : 'LinkedIn',
      isConfigured: Boolean(import.meta.env.VITE_LINKEDIN_URL),
    },
    {
      id: 'email',
      label: 'Email',
      href: 'mailto:fatema.dev.contact@example.com',
      handle: 'fatema.dev.contact@example.com',
      isConfigured: true,
    },
  ] satisfies SocialLink[],
};

export function downloadPortfolioCV(): void {
  const cvContent = [
    '============================================================',
    'MST FATEMA AKTER',
    'Frontend Web Developer | React.js & Responsive UI Specialist',
    'Location: Dhaka, Bangladesh',
    'Experience Level: Intermediate',
    '============================================================',
    '',
    'PROFILE SUMMARY',
    PROFILE.heroIntro,
    PROFILE.about.intro,
    '',
    'TECHNICAL SKILLS',
    '- Frontend: HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Bootstrap, Framer Motion',
    '- Tools & Workflow: Git, GitHub, VS Code, npm, Vite',
    '',
    'FEATURED PROJECTS (SAMPLE PORTFOLIO WORK)',
    '1. Hospital Management System — Responsive clinical scheduling & patient interface',
    '2. Online Learning Management System — Course browser, syllabus & progress tracking UI',
    '3. Recipe Finder Application — Responsive culinary search & ingredient filtering app',
    '4. Modern E-commerce Storefront — Interactive product catalog, cart drawer & checkout UI',
    '5. Security & Access Dashboard — Role-scoped analytics & authentication UI views',
    '6. Personal Portfolio Website — Dark maroon editorial portfolio with Framer Motion',
    '',
    'DEVELOPMENT PHILOSOPHY',
    PROFILE.about.uniqueApproach,
  ].join('\n');

  const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Mst-Fatema-Akter-Frontend-CV.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
