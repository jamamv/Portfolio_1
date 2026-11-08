import { Bot, Briefcase, Download, ExternalLink, Github, GraduationCap, Linkedin, Mail, MapPin, Network, Phone, ScanSearch } from 'lucide-react';
import Navbar from './components/Navbar';
import Section from './components/Section';
import { about, experiences, highlights, profile, projects, skillGroups, type Project } from './data/portfolio';

const projectIcons: Record<Project['icon'], typeof Bot> = { bot: Bot, network: Network, search: ScanSearch, graduation: GraduationCap };

const tagClass = 'rounded-full bg-emerald-600/15 px-3 py-1 text-sm text-emerald-300';

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/25 to-black" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="mb-4 font-medium uppercase tracking-widest text-emerald-400">{profile.role}</p>
        <h1 className="mb-6 text-4xl font-bold md:text-6xl">{profile.name}</h1>
        <p className="mb-4 text-xl text-gray-200 md:text-2xl">{profile.headline}</p>
        <p className="mx-auto mb-10 max-w-2xl text-gray-400">{profile.summary}</p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={profile.resume}
            download
            className="flex items-center justify-center rounded-lg bg-emerald-600 px-8 py-3 font-medium text-white transition-colors hover:bg-emerald-700"
          >
            <Download className="mr-2" size={20} aria-hidden="true" />
            Download Resume
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-emerald-600 px-8 py-3 font-medium text-emerald-400 transition-colors hover:bg-emerald-600 hover:text-white"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" title="About Me" className="bg-gray-900">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="space-y-5 leading-relaxed text-gray-300 lg:col-span-2">
          {about.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <aside className="h-fit space-y-5 rounded-lg bg-gray-800 p-8">
          <h3 className="text-xl font-bold text-emerald-400">Quick Facts</h3>
          <div className="flex items-center gap-3 text-gray-300">
            <Briefcase className="shrink-0 text-emerald-400" size={20} aria-hidden="true" />
            {profile.currentCompany}
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <MapPin className="shrink-0 text-emerald-400" size={20} aria-hidden="true" />
            {profile.location}
          </div>
          {highlights.map((h) => (
            <div key={h.label}>
              <p className="text-sm text-gray-500">{h.label}</p>
              <p className="text-gray-200">{h.value}</p>
            </div>
          ))}
        </aside>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" title="Skills" subtitle="What I use to design, ship, and run AI systems in production">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.category} className="rounded-lg bg-gray-900 p-6">
            <h3 className="mb-4 font-semibold text-emerald-400">{group.category}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="rounded bg-gray-800 px-3 py-1 text-sm text-gray-200">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience" className="bg-gray-900">
      <ol className="relative space-y-10 border-l-2 border-emerald-600/60 pl-8 md:ml-4">
        {experiences.map((exp) => (
          <li key={exp.title + exp.company} className="relative">
            <span className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-4 border-gray-900 bg-emerald-500" aria-hidden="true" />
            <div className="rounded-lg bg-gray-800 p-6">
              <div className="mb-4 flex flex-col justify-between gap-1 md:flex-row md:items-baseline">
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  <p className="font-semibold text-emerald-400">{exp.company}</p>
                </div>
                <p className="text-sm text-gray-400">{exp.period}</p>
              </div>
              <ul className="mb-4 list-disc space-y-2 pl-5 text-gray-300 marker:text-emerald-500">
                {exp.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {exp.technologies.map((t) => (
                  <li key={t} className={tagClass}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" title="Selected Projects" subtitle="Highlights from production AI work and my master thesis">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((project) => {
          const Icon = projectIcons[project.icon];
          return (
            <article key={project.title} className="flex flex-col rounded-lg border border-gray-800 bg-gray-900 p-6 transition-colors hover:border-emerald-600/60">
              <Icon className="mb-4 text-emerald-400" size={32} aria-hidden="true" />
              <h3 className="mb-3 text-xl font-bold text-white">{project.title}</h3>
              <p className="mb-6 flex-1 text-gray-300">{project.description}</p>
              <ul className="mb-4 flex flex-wrap gap-2" aria-label="Technologies">
                {project.technologies.map((t) => (
                  <li key={t} className={tagClass}>
                    {t}
                  </li>
                ))}
              </ul>
              {(project.github || project.live) && (
                <div className="flex gap-4 border-t border-gray-800 pt-4 text-sm">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300">
                      <Github size={16} aria-hidden="true" /> Code
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300">
                      <ExternalLink size={16} aria-hidden="true" /> Live
                    </a>
                  )}
                </div>
              )}
            </article>
          );
        })}
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
    <Section
      id="contact"
      title="Get In Touch"
      subtitle="Open to applied AI and AI-focused software engineering conversations. Email is the fastest way to reach me."
      className="bg-gray-900"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8">
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center rounded-lg bg-emerald-600 px-8 py-3 font-medium text-white transition-colors hover:bg-emerald-700"
        >
          <Mail className="mr-2" size={20} aria-hidden="true" />
          Email me
        </a>
        <ul className="flex flex-wrap justify-center gap-4">
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <a
                href={href}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
              >
                <Icon size={18} aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="border-t border-gray-800 bg-black py-8 text-center text-gray-400">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
      </footer>
    </div>
  );
}
