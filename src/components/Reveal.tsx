import type { ReactNode } from 'react';
import { useInView } from '../hooks/useMotion';

type RevealProps = { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'li' };

export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement & HTMLLIElement>({ rootMargin: '0px 0px -10% 0px', once: true });
  return (
    <Tag ref={ref} className={`reveal ${inView ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
