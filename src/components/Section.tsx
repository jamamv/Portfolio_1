import type { ReactNode } from 'react';
import Reveal from './Reveal';

type SectionProps = {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
};

export default function Section({ id, index, title, subtitle, className = '', children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative scroll-mt-16 py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal as="div" className="mb-14 max-w-3xl">
          <p className="eyebrow mb-4">
            <span className="text-muted">{index} /</span> {title}
          </p>
          <h2 id={`${id}-title`} className="font-display text-4xl leading-tight md:text-5xl">
            {subtitle ?? title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
