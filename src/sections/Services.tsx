import { motion, useReducedMotion } from 'motion/react';
import { Atom, Briefcase, Gauge, Layout, Palette, Smartphone, Sparkles } from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { SERVICES, type ServiceItem } from '../data/services';

function getServiceIcon(iconName: ServiceItem['iconName']) {
  switch (iconName) {
    case 'Layout':
      return Layout;
    case 'Atom':
      return Atom;
    case 'Smartphone':
      return Smartphone;
    case 'Palette':
      return Palette;
    case 'Sparkles':
      return Sparkles;
    case 'Gauge':
      return Gauge;
  }
}

export function Services() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="services" className="relative z-10 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          number="03"
          kicker="Services"
          icon={Briefcase}
          title="Capabilities focused on expressive, responsive frontend craft."
          subtitle="Dedicated frontend engineering services tailored for modern web applications, landing pages, and interactive React products."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, idx) => {
            const Icon = getServiceIcon(service.iconName);
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(idx * 0.06, 0.25),
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={prefersReduced ? undefined : { y: -5 }}
                className="group relative overflow-hidden rounded-2xl glass-card glass-hover p-6"
              >
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#BE123C] via-[#E11D48] to-[#FB7185] transition-transform duration-300 group-hover:scale-x-100"
                />

                <div className="relative flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl glass-inset text-[#FB7185] transition-transform duration-200 group-hover:scale-105 group-hover:text-[#FDA4AF]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs tabular-nums text-[#FB7185]">
                    {service.index}.
                  </span>
                </div>

                <h3 className="relative mt-5 font-display text-xl font-semibold text-[#F8FAFC]">
                  {service.title}
                </h3>

                <p className="relative mt-2.5 text-sm leading-relaxed text-[#D2B6BE]">
                  {service.description}
                </p>

                <p className="relative mt-5 border-t border-white/[0.07] pt-4 font-mono text-xs text-[#FB7185]/85">
                  {service.deliverables.join(' · ')}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
