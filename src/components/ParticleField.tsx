import { useEffect, useRef } from 'react';
import { useIsSmallScreen, useReducedMotion } from '../hooks/useMotion';

// Faint drifting dots behind the whole page, with slight parallax on scroll. Desktop only.
export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const small = useIsSmallScreen();
  const off = reduced || small;

  useEffect(() => {
    if (off) return;
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const dots = Array.from({ length: 70 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.2 + 0.3,
      depth: Math.random() * 0.5 + 0.2,
    }));

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const scroll = window.scrollY;
      const placed = dots.map((d) => {
        d.x = (d.x + d.vx + w) % w;
        d.y = (d.y + d.vy + h) % h;
        return { x: d.x, y: (((d.y - scroll * d.depth * 0.15) % h) + h) % h, r: d.r };
      });
      for (let i = 0; i < placed.length; i++) {
        for (let j = i + 1; j < placed.length; j++) {
          const dx = placed[i].x - placed[j].x;
          const dy = placed[i].y - placed[j].y;
          const dist = dx * dx + dy * dy;
          if (dist < 120 * 120) {
            ctx.strokeStyle = `rgba(52, 211, 153, ${0.06 * (1 - Math.sqrt(dist) / 120)})`;
            ctx.beginPath();
            ctx.moveTo(placed[i].x, placed[i].y);
            ctx.lineTo(placed[j].x, placed[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = 'rgba(242, 239, 233, 0.35)';
      for (const p of placed) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [off]);

  if (off) return null;
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}
