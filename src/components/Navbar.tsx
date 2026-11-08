import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { profile } from '../data/portfolio';

const navItems = [
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Experience', id: 'experience' },
  { name: 'Projects', id: 'projects' },
  { name: 'Writing', id: 'writing' },
  { name: 'Contact', id: 'contact' },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A section counts as active when it crosses the upper-middle band of the viewport.
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const sectionIds = ['home', ...navItems.map((n) => n.id)];

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrolled;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const scrolled = useScrolled();

  const linkClass = (id: string) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      active === id ? 'bg-fg/10 text-accent' : 'text-muted hover:text-fg'
    }`;

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line/10 bg-ink/75 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="font-display text-lg text-fg">
          {profile.name}
        </a>

        <ul className="hidden gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={linkClass(item.id)} aria-current={active === item.id ? 'true' : undefined}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="rounded-full p-2 text-muted hover:text-fg md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <ul id="mobile-menu" className="space-y-1 border-t border-line/10 px-4 py-3 md:hidden">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={() => setOpen(false)} className={`block ${linkClass(item.id)}`}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
