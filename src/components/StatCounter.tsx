import { useEffect, useState } from 'react';
import type { Stat } from '../data/portfolio';
import { useInView, useReducedMotion } from '../hooks/useMotion';

const format = (n: number, decimals = 0) =>
  n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export default function StatCounter({ stat }: { stat: Stat }) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) return setShown(stat.value);
    let frame = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setShown(stat.value * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, stat.value]);

  return (
    <div ref={ref}>
      <p className="font-display text-3xl text-fg md:text-4xl" aria-hidden="true">
        {stat.prefix}
        {format(shown, stat.decimals)}
        {stat.suffix}
      </p>
      <p className="sr-only">
        {stat.prefix}
        {format(stat.value, stat.decimals)}
        {stat.suffix}
      </p>
      <p className="mt-1 text-sm leading-snug text-muted">{stat.label}</p>
    </div>
  );
}
