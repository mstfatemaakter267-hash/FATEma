export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  description: string;
  deliverables: string[];
  iconName: 'Layout' | 'Atom' | 'Smartphone' | 'Palette' | 'Sparkles' | 'Gauge';
  gradient: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'frontend-dev',
    index: '01',
    title: 'Frontend Development',
    description:
      'Translating visual concepts into clean, semantic, and high-contrast user interfaces with disciplined spacing and accessibility.',
    deliverables: ['Semantic HTML5', 'Modern JavaScript', 'Interactive UI States'],
    iconName: 'Layout',
    gradient: 'from-[#9F1239]/25 to-[#9F1239]/5',
  },
  {
    id: 'react-apps',
    index: '02',
    title: 'React Application Development',
    description:
      'Building modular single-page applications with reusable React components, custom hooks, and smooth client-side routing.',
    deliverables: ['Component Architecture', 'Custom Hooks', 'Predictable State'],
    iconName: 'Atom',
    gradient: 'from-[#BE123C]/25 to-[#9F1239]/5',
  },
  {
    id: 'responsive-design',
    index: '03',
    title: 'Responsive Web Design',
    description:
      'Crafting fluid layouts engineered for mobile phones, tablets, laptops, and ultra-wide desktops without horizontal overflow.',
    deliverables: ['Mobile-First Grids', 'Fluid Typography', 'Cross-Browser Polish'],
    iconName: 'Smartphone',
    gradient: 'from-[#9F1239]/30 to-[#BE123C]/5',
  },
  {
    id: 'ui-systems',
    index: '04',
    title: 'Design System Implementation',
    description:
      'Structuring cohesive dark and light UI component libraries with Tailwind CSS tokens, clean typography, and accessible controls.',
    deliverables: ['Tailwind Tokens', 'Reusable Cards & Modals', 'WCAG Contrast'],
    iconName: 'Palette',
    gradient: 'from-[#9F1239]/25 to-[#FB7185]/5',
  },
  {
    id: 'motion-ux',
    index: '05',
    title: 'Motion & Micro-Interactions',
    description:
      'Adding subtle, GPU-friendly Framer Motion transitions, hover choreography, and reduced-motion compliant animations.',
    deliverables: ['Framer Motion', 'Scroll Choreography', 'Reduced-Motion Safe'],
    iconName: 'Sparkles',
    gradient: 'from-[#BE123C]/25 to-[#9F1239]/5',
  },
  {
    id: 'performance',
    index: '06',
    title: 'Frontend Optimization',
    description:
      'Refining bundle structure, clean asset loading, and semantic markup for fast initial paint and smooth user interactions.',
    deliverables: ['Vite Bundling', 'Asset Fallbacks', 'Clean Code Refactor'],
    iconName: 'Gauge',
    gradient: 'from-[#9F1239]/30 to-[#9F1239]/5',
  },
];
