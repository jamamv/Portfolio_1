import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
};

export default function Section({ id, title, subtitle, className = '', children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-16 py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h2 id={`${id}-title`} className="mb-3 text-3xl font-bold md:text-4xl">
            {title}
          </h2>
          {subtitle && <p className="mx-auto max-w-2xl text-gray-400">{subtitle}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
