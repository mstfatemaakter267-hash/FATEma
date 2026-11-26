import hospitalImg from '../assets/images/project_hospital_1795526086492.jpg';
import lmsImg from '../assets/images/project_lms_1795526086301.jpg';
import recipeImg from '../assets/images/project_recipe_1795526086611.jpg';
import ecommerceImg from '../assets/images/project_ecommerce_1795526086877.jpg';
import authImg from '../assets/images/project_auth_dashboard_1795526088068.jpg';
import portfolioImg from '../assets/images/project_portfolio_1795526087739.jpg';

export type ProjectCategory = 'All' | 'React Apps' | 'UI & Design';

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  featured?: boolean;
  summary: string;
  fullDescription: string;
  technologies: string[];
  image: string;
  highlights: string[];
  architectureNote: string;
  liveUrl: string | null; // Editable: add real live deployment URL when hosted
  githubUrl: string | null; // Editable: add real GitHub repo URL when published
  statusLabel: string;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All',
  'React Apps',
  'UI & Design',
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'hospital-management-system',
    slug: 'hospital-management-system',
    title: 'Hospital Management System',
    category: 'React Apps',
    featured: true,
    summary:
      'A structured clinical operations interface for managing patient triage views, doctor schedules, and appointment slots.',
    fullDescription:
      'Built to streamline day-to-day coordination across reception desks and clinical staff views. Features a clean triage queue, doctor availability grid, patient record filtering, and responsive dashboard navigation.',
    technologies: ['React.js', 'JavaScript ES6+', 'Tailwind CSS', 'React Router'],
    image: hospitalImg,
    highlights: [
      'Interactive doctor schedule grid with slot filtering',
      'Patient intake directory and instant client-side search',
      'Clean responsive layout adapted for desktop and tablet displays',
    ],
    architectureNote:
      'Modular React components with custom state hooks and clean route-based dashboard views.',
    liveUrl: null,
    githubUrl: null,
    statusLabel: 'Sample Case Study',
  },
  {
    id: 'online-learning-management-system',
    slug: 'online-learning-management-system',
    title: 'Online Learning Management System',
    category: 'React Apps',
    summary:
      'An interactive e-learning workspace enabling students to browse courses, follow syllabi, and track lesson progress.',
    fullDescription:
      'Designed around clarity and focused study flows. Learners can browse structured course cards, mark lesson milestones complete in local state, and monitor syllabus progress cleanly.',
    technologies: ['React.js', 'JavaScript ES6+', 'Tailwind CSS', 'Framer Motion'],
    image: lmsImg,
    highlights: [
      'Structured course syllabus navigation with lesson completion toggles',
      'Personalized student progress overview and module breakdown',
      'Smooth animated transitions between course chapters',
    ],
    architectureNote:
      'Component-driven syllabus tree with persistent browser storage and accessible keyboard navigation.',
    liveUrl: null,
    githubUrl: null,
    statusLabel: 'Sample Case Study',
  },
  {
    id: 'recipe-finder-application',
    slug: 'recipe-finder-application',
    title: 'Recipe Finder Application',
    category: 'UI & Design',
    summary:
      'A responsive culinary discovery interface for filtering recipes by ingredients, cuisine, and preparation time.',
    fullDescription:
      'Focused on crisp visual hierarchy and effortless filtering. Users can search dishes in real time, toggle dietary preferences, inspect step-by-step preparation details, and bookmark favorites locally.',
    technologies: ['React.js', 'JavaScript ES6+', 'Tailwind CSS', 'CSS3'],
    image: recipeImg,
    highlights: [
      'Instant multi-criteria filtering by ingredient and meal category',
      'Clean recipe detail view with interactive ingredient checklist',
      'Responsive card grid optimized for mobile and desktop browsing',
    ],
    architectureNote:
      'Debounced search filtering and custom React hooks for saved favorites synchronization.',
    liveUrl: null,
    githubUrl: null,
    statusLabel: 'Sample Case Study',
  },
  {
    id: 'ecommerce-storefront-ui',
    slug: 'ecommerce-storefront-ui',
    title: 'Modern E-commerce Storefront',
    category: 'React Apps',
    summary:
      'A responsive online storefront UI with category browsing, persistent shopping cart drawer, and checkout summary.',
    fullDescription:
      'Engineered to demonstrate polished frontend commerce flows—from dynamic product filtering and cart drawer state updates to quantity controls and order summary calculation.',
    technologies: ['React.js', 'Tailwind CSS', 'JavaScript ES6+', 'Bootstrap'],
    image: ecommerceImg,
    highlights: [
      'Interactive slide-over cart drawer with live subtotal calculation',
      'Product catalog filtering, search, and quick-view previews',
      'Responsive storefront grid with accessible checkout form validation',
    ],
    architectureNote:
      'Context-driven cart state paired with local storage persistence and modular product cards.',
    liveUrl: null,
    githubUrl: null,
    statusLabel: 'Sample Case Study',
  },
  {
    id: 'authentication-dashboard',
    slug: 'authentication-dashboard',
    title: 'Access & Analytics Dashboard UI',
    category: 'UI & Design',
    summary:
      'A sleek dark dashboard interface showcasing user sign-in forms, validation states, and role-view data tables.',
    fullDescription:
      'Built to explore clean frontend security UX patterns, featuring interactive login and registration forms, clear validation feedback, tabular activity logs, and responsive sidebar layouts.',
    technologies: ['React.js', 'Tailwind CSS', 'HTML5', 'JavaScript ES6+'],
    image: authImg,
    highlights: [
      'Structured sign-in, sign-up, and recovery UI views with validation',
      'Tabular session activity overview with clean numeric alignment',
      'Responsive navigation drawer and high-contrast dark surfaces',
    ],
    architectureNote:
      'Form validation hooks paired with clean tabular UI components and accessible ARIA states.',
    liveUrl: null,
    githubUrl: null,
    statusLabel: 'Sample Case Study',
  },
  {
    id: 'personal-portfolio-website',
    slug: 'personal-portfolio-website',
    title: 'Personal Portfolio Website',
    category: 'UI & Design',
    summary:
      'A dark maroon glassmorphism developer portfolio crafted with React, Tailwind CSS, and Framer Motion choreography.',
    fullDescription:
      'Designed as a living showcase of frontend craft—combining architectural dark surfaces, interactive skill visualization, project filtering modals, and accessibility-first motion.',
    technologies: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    image: portfolioImg,
    highlights: [
      'Accessible motion choreography respecting reduced-motion settings',
      'Interactive skill constellation and project case-study modal',
      'Modular component architecture with clean data separation',
    ],
    architectureNote:
      'Vite + React Router SPA with modular section architecture and custom scroll hooks.',
    liveUrl: null,
    githubUrl: null,
    statusLabel: 'Current Showcase',
  },
];
