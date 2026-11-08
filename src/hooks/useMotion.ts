import { useEffect, useRef, useState, type RefObject } from 'react';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
// True on mouse/trackpad devices, where drag-to-rotate and tilt make sense.
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
export const useIsSmallScreen = () => useMediaQuery('(max-width: 767px)');

// Reports whether an element is on screen. With `once`, it stays true after the first time.
export function useInView<T extends Element>(options: { rootMargin?: string; once?: boolean } = {}): [RefObject<T>, boolean] {
  const { rootMargin = '0px', once = false } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, once]);

  return [ref, inView];
}

export function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}
