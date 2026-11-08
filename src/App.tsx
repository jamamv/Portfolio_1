import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Award, Bot, Briefcase, Download, ExternalLink, Github, GraduationCap, Linkedin, Mail, MapPin, Network, Phone, ScanSearch } from 'lucide-react';
import Navbar from './components/Navbar';
import Section from './components/Section';
import Reveal from './components/Reveal';
import StatCounter from './components/StatCounter';
import TiltCard from './components/TiltCard';
import SkillCloud from './components/SkillCloud';
import ParticleField from './components/ParticleField';
import ErrorBoundary from './components/ErrorBoundary';
import { about, community, earlierProjects, education, experiences, highlights, posts, profile, projects, recognition, skillGroups, stats, type Project } from './data/portfolio';
import { hasWebGL, useFinePointer, useInView, useIsSmallScreen, useReducedMotion } from './hooks/useMotion';

// 3D code loads after the page text, in its own chunk.
const HeroGlobe = lazy(() => import('./components/three/HeroGlobe'));
const ProjectShape = lazy(() => import('./components/three/ProjectShape'));

const projectIcons: Record<Project['icon'], typeof Bot> = { bot: Bot, network: Network, search: ScanSearch, graduation: GraduationCap };

function useWebGL() {
  const [ok, setOk] = useState(false);
  useEffect(() => setOk(hasWebGL()), []);
  return ok;
}

function Hero() {
  const webgl = useWebGL();
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const small = useIsSmallScreen();
  const [globeRef, globeVisible] = useInView<HTMLDivElement>();

  return (
    <section id="home" className="relative overflow-hidden pt-16">
      <div className="absolute inset-0 grain [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" aria-hidden="true" />
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-4 lg:px-8">
        <div className="relative z-10">
          <Reveal>
            <p className="mb-8 inline-flex items-center gap-3 rounded-full border border-line/10 bg-surface/60 px-4 py-1.5 text-sm text-muted backdrop-blur">
              <span className="pulse-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              Currently at {profile.currentCompany}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow mb-5">{profile.role}</p>
            <h1 className="mb-6 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {profile.name.split(' ')[0]}
              <br />
              <span className="italic text-muted">{profile.name.split(' ').slice(1).join(' ')}</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mb-4 max-w-xl text-xl leading-snug text-fg md:text-2xl">{profile.headline}</p>
            <p className="mb-10 max-w-xl leading-relaxed text-muted">{profile.summary}</p>
          </Reveal>
          <Reveal delay={240} className="flex flex-col gap-3 sm:flex-row">
            <a href={profile.resume} download className="btn-primary">
              <Download size={18} aria-hidden="true" />
              Download resume
            </a>
            <a href="#contact" className="btn-ghost">
              Get in touch
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <div ref={globeRef} className="relative h-[320px] sm:h-[420px] lg:h-[600px]">
          <div className="absolute inset-[15%] rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
          {webgl && (
            <ErrorBoundary>
              <Suspense fallback={null}>
                <HeroGlobe animate={!reduced} interactive={fine} light={small} visible={globeVisible} />
              </Suspense>
            </ErrorBoundary>
          )}
          {fine && webgl && <p className="pointer-events-none absolute bottom-6 right-6 text-xs uppercase tracking-[0.2em] text-muted/70">Drag to explore</p>}
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <Reveal className="grid grid-cols-2 gap-8 border-t border-line/10 pt-10 md:grid-cols-4">
          {stats.map((s) => (
            <StatCounter key={s.label} stat={s} />
          ))}
        </Reveal>
        <a href="#about" className="mt-12 hidden items-center gap-2 text-sm text-muted transition hover:text-accent md:inline-flex">
          <ArrowDown size={16} aria-hidden="true" /> Scroll
        </a>
      </div>
    </section>
  );
}

function Portrait() {
  return (
    <TiltCard max={4} className="group mx-auto w-full max-w-sm rounded-[2rem] lg:sticky lg:top-24">
      <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-b from-accent/60 via-line/10 to-transparent" aria-hidden="true" />
      <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-accent/10 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[2rem] bg-ink">
        <img
          src={profile.photo}
          alt={`Portrait of ${profile.name}`}
          width={720}
          height={940}
          loading="lazy"
          className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-6 pt-20">
          <p className="font-display text-xl">{profile.name}</p>
          <p className="text-sm text-muted">{profile.role}</p>
        </div>
      </div>
    </TiltCard>
  );
}

function About() {
  return (
    <Section id="about" index="01" title="About" subtitle="Generative AI, from the first stakeholder conversation to governed production.">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Reveal>
          <Portrait />
        </Reveal>
        <div>
          <div className="space-y-6 text-lg leading-relaxed text-muted">
            {about.map((paragraph, i) => (
              <Reveal key={i} delay={i * 60}>
                <p className={i === 0 ? 'text-fg' : ''}>{paragraph}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="glass flex items-center gap-3 p-5">
              <Briefcase className="shrink-0 text-accent" size={20} aria-hidden="true" />
              <span>{profile.currentCompany}</span>
            </div>
            <div className="glass flex items-center gap-3 p-5">
              <MapPin className="shrink-0 text-accent" size={20} aria-hidden="true" />
              <span>{profile.location}</span>
            </div>
            {highlights.map((h) => (
              <div key={h.label} className="glass p-5">
                <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted">{h.label}</p>
                <p className="text-fg">{h.value}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" index="02" title="Skills" subtitle="What I use to design, ship, and run AI systems in production.">
      <SkillCloud groups={skillGroups} />
    </Section>
  );
}

function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.6 - r.top) / r.height;
      setProgress(Math.max(0, Math.min(1, p)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return [ref, progress] as const;
}

function Experience() {
  const [listRef, progress] = useScrollProgress<HTMLOListElement>();

  return (
    <Section id="experience" index="03" title="Experience" subtitle="From regulatory reporting pipelines to enterprise AI agents.">
      <ol ref={listRef} className="relative space-y-10 pl-8 md:ml-4 md:pl-12">
        <span className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-line/10" aria-hidden="true" />
        <span
          className="absolute left-0 top-2 w-px bg-gradient-to-b from-accent to-accent/40 shadow-[0_0_12px_rgb(var(--c-accent))]"
          style={{ height: `calc(${progress * 100}% - ${progress}rem)` }}
          aria-hidden="true"
        />
        {experiences.map((exp) => (
          <Reveal as="li" key={exp.title + exp.company} className="relative">
            <span
              className="absolute -left-[37px] top-7 h-3 w-3 rounded-full border-2 border-accent bg-ink md:-left-[53px]"
              aria-hidden="true"
            />
            <div className="glass p-6 transition-colors hover:border-line/20 md:p-8">
              <div className="mb-5 flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
                <div>
                  <h3 className="font-display text-2xl text-fg">{exp.title}</h3>
                  <p className="font-medium text-accent">{exp.company}</p>
                </div>
                <p className="shrink-0 text-sm text-muted">{exp.period}</p>
              </div>
              <ul className="mb-6 space-y-3 text-muted">
                {exp.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {exp.technologies.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: '100px' });
  const webgl = useWebGL();
  const reduced = useReducedMotion();
  const Icon = projectIcons[project.icon];

  return (
    <Reveal delay={(index % 2) * 100}>
      <TiltCard onHoverChange={setHovered} className="glass flex h-full flex-col overflow-hidden p-6 hover:border-accent/40 md:p-8">
        <div ref={ref} className="relative -mx-2 -mt-2 mb-4 flex h-32 items-center justify-between">
          <span className="font-display text-5xl text-line/10">0{index + 1}</span>
          <div className="h-32 w-32">
            {webgl && inView ? (
              <ErrorBoundary fallback={<Icon className="m-auto mt-10 text-accent" size={40} aria-hidden="true" />}>
                <Suspense fallback={null}>
                  <ProjectShape kind={project.icon} hovered={hovered} animate={!reduced} />
                </Suspense>
              </ErrorBoundary>
            ) : (
              !webgl && <Icon className="m-auto mt-10 text-accent" size={40} aria-hidden="true" />
            )}
          </div>
        </div>
        <h3 className="mb-3 font-display text-2xl text-fg">{project.title}</h3>
        <p className="mb-6 flex-1 leading-relaxed text-muted">{project.description}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Technologies">
          {project.technologies.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
        {(project.github || project.live) && (
          <div className="mt-6 flex gap-4 border-t border-line/10 pt-4 text-sm">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-accent hover:text-fg">
                <Github size={16} aria-hidden="true" /> Code
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-accent hover:text-fg">
                <ExternalLink size={16} aria-hidden="true" /> Live
              </a>
            )}
          </div>
        )}
      </TiltCard>
    </Reveal>
  );
}

function Projects() {
  return (
    <Section id="projects" index="04" title="Projects" subtitle="Highlights from production AI work and my master thesis.">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>

      <Reveal className="mt-16 scroll-mt-20">
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-muted">Earlier engineering projects</h3>
        <ul className="divide-y divide-line/10 border-y border-line/10">
          {earlierProjects.map((p) => (
            <li key={p.title} className="grid gap-3 py-6 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-8">
              <p className="font-display text-xl text-fg">{p.title}</p>
              <div>
                <p className="mb-3 text-muted">{p.description}</p>
                <p className="text-sm text-accent/90">{p.technologies.join(' · ')}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

function Background() {
  return (
    <Section id="background" index="05" title="Background" subtitle="Education, recognition, and the AI community.">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal className="space-y-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            <GraduationCap size={18} className="text-accent" aria-hidden="true" /> Education
          </h3>
          {education.map((e) => (
            <div key={e.degree} className="glass p-6">
              <p className="font-display text-xl text-fg">{e.degree}</p>
              <p className="text-accent">{e.school}</p>
              <p className="mt-1 text-sm text-muted">{e.period}</p>
              {e.detail && <p className="mt-3 text-muted">{e.detail}</p>}
            </div>
          ))}
        </Reveal>
        <Reveal delay={100} className="space-y-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            <Award size={18} className="text-accent" aria-hidden="true" /> Recognition
          </h3>
          {recognition.map((r) => (
            <div key={r.title} className="glass p-6">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-display text-xl text-fg">{r.title}</p>
                <p className="shrink-0 text-sm text-muted">{r.year}</p>
              </div>
              <p className="mt-2 text-muted">{r.detail}</p>
            </div>
          ))}
          <div className="glass p-6">
            <p className="mb-3 text-sm font-semibold text-fg">AI community</p>
            <ul className="flex flex-wrap gap-2">
              {community.map((c) => (
                <li key={c} className="rounded-full border border-line/10 px-3 py-1 text-sm text-muted">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Writing() {
  return (
    <Section id="writing" index="06" title="Writing" subtitle="Notes on shipping AI that has to be trusted.">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((p, i) => (
          <Reveal key={p.url} delay={(i % 2) * 100}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass group flex h-full flex-col p-6 transition-colors hover:border-accent/40 md:p-8"
            >
              <span className="mb-4 font-display text-5xl leading-none text-accent/60" aria-hidden="true">
                “
              </span>
              <blockquote className="mb-4 flex-1 font-display text-2xl italic leading-snug text-fg">{p.quote}</blockquote>
              <p className="mb-6 text-muted">{p.summary}</p>
              <span className="inline-flex items-center gap-1 text-sm text-accent">
                Read on LinkedIn <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const links = [
    { href: `mailto:${profile.email}`, label: profile.email, icon: Mail },
    ...(profile.phone ? [{ href: `tel:${profile.phone.replace(/\s/g, '')}`, label: profile.phone, icon: Phone }] : []),
    { href: profile.linkedin, label: 'LinkedIn', icon: Linkedin },
    { href: profile.github, label: 'GitHub', icon: Github },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-16 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-[2rem] p-px">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/70 via-line/10 to-accent/20" aria-hidden="true" />
          <div className="relative rounded-[calc(2rem-1px)] bg-surface px-6 py-16 text-center md:px-16 md:py-24">
            <div className="absolute inset-0 grain opacity-60" aria-hidden="true" />
            <p className="eyebrow relative mb-5">
              <span className="text-muted">07 /</span> Contact
            </p>
            <h2 id="contact-title" className="relative mx-auto mb-6 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
              Let's build AI that <span className="italic text-accent">ships</span>.
            </h2>
            <p className="relative mx-auto mb-10 max-w-xl text-muted">
              Open to applied AI and AI-focused software engineering conversations. Email is the fastest way to reach me.
            </p>
            <a href={`mailto:${profile.email}`} className="btn-primary relative">
              <Mail size={18} aria-hidden="true" />
              Email me
            </a>
            <ul className="relative mt-10 flex flex-wrap justify-center gap-3">
              {links.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center gap-2 rounded-full border border-line/10 px-4 py-2 text-sm text-muted transition hover:border-accent/50 hover:text-fg"
                  >
                    <Icon size={16} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink text-fg">
      <ParticleField />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Background />
        <Writing />
        <Contact />
      </main>
      <footer className="relative z-10 border-t border-line/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-sm text-muted sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>Built with React, Three.js, and an AI-first workflow.</p>
        </div>
      </footer>
    </div>
  );
}
