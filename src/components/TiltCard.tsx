import { useRef, type PointerEvent, type ReactNode } from 'react';
import { useFinePointer, useReducedMotion } from '../hooks/useMotion';

type TiltCardProps = { children: ReactNode; className?: string; max?: number; onHoverChange?: (hovered: boolean) => void };

// Card that tilts toward the cursor with a soft glare. Static on touch devices and with reduced motion.
export default function TiltCard({ children, className = '', max = 6, onHoverChange }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !enabled) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', `${(x - 0.5) * max * 2}deg`);
    el.style.setProperty('--rx', `${(0.5 - y) * max * 2}deg`);
    el.style.setProperty('--gx', `${x * 100}%`);
    el.style.setProperty('--gy', `${y * 100}%`);
  };

  const onEnter = () => {
    ref.current?.style.setProperty('--glare', '1');
    onHoverChange?.(true);
  };
  const onLeave = () => {
    const el = ref.current;
    el?.style.setProperty('--rx', '0deg');
    el?.style.setProperty('--ry', '0deg');
    el?.style.setProperty('--glare', '0');
    onHoverChange?.(false);
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerEnter={onEnter} onPointerLeave={onLeave} className={`tilt relative ${className}`}>
      {children}
    </div>
  );
}
