import { useEffect, useMemo, useRef, useState } from 'react';
import type { SkillGroup } from '../data/portfolio';
import { useInView, useIsSmallScreen, useReducedMotion } from '../hooks/useMotion';

type Item = { label: string; group: number; x: number; y: number; z: number };

// A drag-to-rotate sphere of skill words, drawn with CSS transforms (no WebGL needed).
// The grouped list beside it carries the same content for screen readers.
export default function SkillCloud({ groups }: { groups: SkillGroup[] }) {
  const [containerRef, inView] = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const small = useIsSmallScreen();
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rotation = useRef({ x: 0.3, y: 0, vx: 0, vy: 0.0035, dragging: false, lastX: 0, lastY: 0, hovering: false });

  const items = useMemo<Item[]>(() => {
    const flat = groups.flatMap((g, gi) => g.items.map((label) => ({ label, group: gi })));
    const n = flat.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return flat.map((it, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      return { ...it, x: Math.cos(golden * i) * r, y, z: Math.sin(golden * i) * r };
    });
  }, [groups]);

  const radius = small ? 150 : 240;

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const draw = () => {
      const rot = rotation.current;
      if (!rot.dragging) {
        const auto = reduced || rot.hovering ? 0 : 0.0035;
        rot.vy += (auto - rot.vy) * 0.03;
        rot.vx *= 0.95;
      }
      rot.y += rot.vy;
      rot.x = Math.max(-1.2, Math.min(1.2, rot.x + rot.vx));
      const [sy, cy, sx, cx] = [Math.sin(rot.y), Math.cos(rot.y), Math.sin(rot.x), Math.cos(rot.x)];
      items.forEach((it, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        const x1 = it.x * cy + it.z * sy;
        const z1 = -it.x * sy + it.z * cy;
        const y2 = it.y * cx - z1 * sx;
        const z2 = it.y * sx + z1 * cx;
        const depth = (z2 + 1) / 2; // 0 back, 1 front
        el.style.transform = `translate(-50%, -50%) translate3d(${x1 * radius}px, ${y2 * radius}px, 0) scale(${0.55 + depth * 0.6})`;
        el.style.opacity = String(0.12 + depth * depth * 0.88);
        el.style.zIndex = String(Math.round(depth * 100));
      });
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [inView, items, radius, reduced]);

  const onPointerDown = (e: React.PointerEvent) => {
    const rot = rotation.current;
    rot.dragging = true;
    rot.lastX = e.clientX;
    rot.lastY = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const rot = rotation.current;
    if (!rot.dragging) return;
    rot.vy = (e.clientX - rot.lastX) * 0.004;
    rot.vx = -(e.clientY - rot.lastY) * 0.004;
    rot.lastX = e.clientX;
    rot.lastY = e.clientY;
  };
  const endDrag = () => {
    rotation.current.dragging = false;
  };

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <div
        ref={containerRef}
        aria-hidden="true"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerEnter={() => (rotation.current.hovering = true)}
        onPointerLeave={() => {
          rotation.current.hovering = false;
          endDrag();
        }}
        className="relative mx-auto h-[380px] w-full max-w-[600px] cursor-grab touch-pan-y select-none active:cursor-grabbing md:h-[580px]"
      >
        <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
        {items.map((it, i) => {
          const dim = activeGroup !== null && activeGroup !== it.group;
          const lit = activeGroup === it.group;
          return (
            <span
              key={it.label + i}
              ref={(el) => (itemRefs.current[i] = el)}
              className={`absolute left-1/2 top-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-sm font-medium transition-colors duration-300 hover:text-accent md:text-base ${
                lit ? 'text-accent' : dim ? 'text-muted/40' : 'text-fg'
              }`}
            >
              {it.label}
            </span>
          );
        })}
      </div>

      <ul className="space-y-3">
        {groups.map((g, gi) => (
          <li
            key={g.category}
            onPointerEnter={() => setActiveGroup(gi)}
            onPointerLeave={() => setActiveGroup(null)}
            onFocus={() => setActiveGroup(gi)}
            onBlur={() => setActiveGroup(null)}
            tabIndex={0}
            className={`glass cursor-default p-5 transition-colors ${activeGroup === gi ? 'border-accent/50' : ''}`}
          >
            <h3 className="mb-2 font-semibold text-fg">{g.category}</h3>
            <p className="text-sm leading-relaxed text-muted">{g.items.join(' · ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
