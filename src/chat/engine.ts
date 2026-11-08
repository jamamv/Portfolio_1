// "Ask my portfolio" answer engine.
//
// Runs entirely in the browser: no API key, no server, no cost. It answers by
// matching the question against the content in src/data/portfolio.ts, so the
// bot stays accurate whenever that file changes.
//
// To swap in a real LLM later, replace `answerQuestion` in AskPortfolio.tsx with
// a call to a serverless function (see README, "Ask my portfolio").

import {
  about,
  community,
  earlierProjects,
  education,
  experiences,
  highlights,
  posts,
  profile,
  projects,
  recognition,
  skillGroups,
  stats,
} from '../data/portfolio';

export type Link = { label: string; href: string };
export type Answer = { text: string; bullets?: string[]; links?: Link[] };

const firstName = profile.name.split(' ')[0];
const emailLink: Link = { label: 'Email me', href: `mailto:${profile.email}` };
const resumeLink: Link = { label: 'Download my resume', href: profile.resume };
const linkedinLink: Link = { label: 'LinkedIn', href: profile.linkedin };

export const starterQuestions = [
  'What do you do now?',
  'What impact have your AI agents had?',
  'Do you know RAG?',
  'Are you open to new roles?',
  'Where did you study?',
];

// ---------- text helpers ----------

const STOP = new Set(
  'a an the and or of to in on at for with by from is are was were be been am do does did have has had i you your yours me my we our she he they them it its this that these those what which who whom how why when where can could would should will about any some there here tell know please just like also as into than then so if not no yes'.split(
    ' '
  )
);

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stem(w: string) {
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2);
  if (w.length > 4 && w.endsWith('es')) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  return w;
}

function tokens(s: string) {
  return normalize(s)
    .split(/[\s.-]+/)
    .filter((w) => w && !STOP.has(w))
    .map(stem);
}

// Whole-word / phrase match on the normalized question.
function has(q: string, term: string) {
  const t = normalize(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^a-z0-9])${t}($|[^a-z0-9])`).test(q);
}

function startsWord(q: string, term: string) {
  const t = normalize(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^a-z0-9])${t}`).test(q);
}

const list = (items: string[]) => (items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`);

// ---------- skill index: which skill shows up where ----------

type SkillHit = { name: string; category?: string; usedAt: string[] };

const skillIndex = (() => {
  const map = new Map<string, SkillHit>();
  const add = (name: string, where?: string, category?: string) => {
    const key = normalize(name);
    const hit = map.get(key) ?? { name, usedAt: [] };
    if (category && !hit.category) hit.category = category;
    if (where && !hit.usedAt.includes(where)) hit.usedAt.push(where);
    map.set(key, hit);
  };
  skillGroups.forEach((g) => g.items.forEach((i) => add(i, undefined, g.category)));
  experiences.forEach((e) => e.technologies.forEach((t) => add(t, `as ${e.title} at ${e.company}`)));
  projects.forEach((p) => p.technologies.forEach((t) => add(t, `in my project "${p.title}"`)));
  earlierProjects.forEach((p) => p.technologies.forEach((t) => add(t, `in my project "${p.title}"`)));
  return map;
})();

// Common ways people ask about a skill that differ from how it's written on the site.
const skillAliases: Record<string, string> = {
  'retrieval augmented generation': 'rag',
  'retrieval-augmented generation': 'rag',
  'model context protocol': 'mcp',
  'large language model': 'llm evaluation',
  bedrock: 'aws bedrock',
  'azure openai': 'azure openai',
  langgraph: 'langgraph',
  js: 'typescript',
  javascript: 'typescript',
  ts: 'typescript',
  postgres: 'postgresql',
  k8s: 'docker',
  ci: 'ci/cd',
  cicd: 'ci/cd',
  pytorch: 'pytorch',
  claude: 'claude code',
  codex: 'openai codex',
  'c#': '.net',
  dotnet: '.net',
  node: 'node.js',
  nodejs: 'node.js',
  spring: 'spring boot',
  agents: 'agent orchestration',
  agentic: 'agent orchestration',
  'multi-agent': 'multi-agent systems',
  evals: 'llm evaluation',
  evaluation: 'llm evaluation',
  guardrails: 'ai guardrails',
};

function findSkills(q: string): SkillHit[] {
  const found = new Map<string, SkillHit>();
  for (const [key, hit] of skillIndex) {
    // Skip one- and two-letter names; they match too much.
    if (key.length > 2 && has(q, key)) found.set(key, hit);
  }
  for (const [alias, key] of Object.entries(skillAliases)) {
    const hit = skillIndex.get(key);
    if (hit && has(q, alias)) found.set(key, hit);
  }
  // Prefer the most specific names: drop "AWS" when "AWS Bedrock" also matched.
  const keys = [...found.keys()];
  return keys.filter((k) => !keys.some((o) => o !== k && o.includes(k))).map((k) => found.get(k)!);
}

function describeSkill(hit: SkillHit) {
  if (hit.usedAt.length) return `${hit.name}: I've used it ${list(hit.usedAt.slice(0, 3))}.`;
  return `${hit.name}: it's part of my ${hit.category ?? 'core'} toolkit.`;
}

// ---------- topic answers ----------

const current = experiences[0];
const kbcAgents = experiences.find((e) => /technical lead/i.test(e.title));
const highlight = (label: string) => highlights.find((h) => h.label === label)?.value;

type Topic = { terms: string[]; answer: (q: string) => Answer };

// Ways people ask about a whole skill group rather than one skill.
const groupTerms: Record<string, string[]> = {
  'AI & Agentic Engineering': ['ai engineering', 'agentic', 'llm', 'llms', 'genai', 'generative ai', 'machine learning', 'ml'],
  'AI Platforms & Dev Tools': ['ai platform', 'ai tools', 'llm provider', 'model provider', 'dev tools', 'coding assistant'],
  'Programming & Full-Stack': ['frontend', 'front-end', 'backend', 'back-end', 'full-stack', 'fullstack', 'full stack', 'programming language', 'coding language', 'web development'],
  'Cloud & Production': ['cloud', 'devops', 'infrastructure', 'deployment', 'observability', 'monitoring'],
  'Databases & APIs': ['database', 'databases', 'db', 'sql', 'api', 'apis', 'data storage'],
};

const groupTopics: Topic[] = skillGroups.map((g) => ({
  terms: groupTerms[g.category] ?? [],
  answer: () => ({ text: `Yes. ${g.category}: ${g.items.join(', ')}.` }),
}));

const topics: Topic[] = [
  ...groupTopics,
  {
    terms: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'yo'],
    answer: () => ({
      text: `Hi! I'm ${firstName}'s portfolio assistant, and I answer in ${firstName}'s voice from what's on this site. Ask about my experience, skills, projects, education, or how to reach me.`,
    }),
  },
  {
    terms: ['who are you', 'about you', 'introduce', 'summary', 'summarize', 'tell me about', 'yourself', 'elevator pitch', 'tldr', 'overview', 'background'],
    answer: () => ({ text: `I'm ${profile.name}, an ${profile.role}. ${profile.summary}`, bullets: [about[1]], links: [resumeLink] }),
  },
  {
    terms: ['now', 'currently', 'current', 'today', 'present', 'job', 'role', 'position', 'openlane', 'work at', 'working'],
    answer: () => ({
      text: `My current role is ${current.title} at ${current.company} (${current.period}). Highlights so far:`,
      bullets: current.highlights,
    }),
  },
  {
    terms: ['impact', 'result', 'achievement', 'accomplish', 'proud', 'biggest', 'saving', 'roi', 'value', 'metric', 'number'],
    answer: () => ({
      text: `The headline numbers:`,
      bullets: stats.map((s) => `${s.prefix ?? ''}${s.value.toLocaleString('en-US')}${s.suffix ?? ''} ${s.label}`).concat(
        kbcAgents ? [kbcAgents.highlights[3]] : []
      ),
    }),
  },
  {
    terms: ['experience', 'career', 'worked', 'employer', 'companies', 'history', 'previous', 'past job', 'years'],
    answer: () => ({
      text: `I have ${highlight('Experience') ?? 'several years'} of experience. My roles, most recent first:`,
      bullets: experiences.map((e) => `${e.title}, ${e.company} (${e.period})`),
      links: [resumeLink],
    }),
  },
  {
    terms: ['skill', 'stack', 'tech', 'technology', 'tool', 'framework', 'programming', 'language you code', 'good at', 'expertise', 'specialize', 'strength'],
    answer: () => ({
      text: `My skills, grouped:`,
      bullets: skillGroups.map((g) => `${g.category}: ${g.items.join(', ')}`),
    }),
  },
  {
    terms: ['project', 'built', 'build', 'portfolio piece', 'side project', 'demo'],
    answer: () => ({
      text: `Featured projects:`,
      bullets: projects.map((p) => `${p.title}: ${p.description}`),
      links: [{ label: 'See all projects', href: '#projects' }],
    }),
  },
  {
    terms: ['study', 'studied', 'education', 'degree', 'university', 'school', 'college', 'master', 'bachelor', 'msc', 'beng', 'leuven', 'thesis', 'graduate', 'coursework'],
    answer: () => ({
      text: `I studied at KU Leuven:`,
      bullets: education.map((e) => `${e.degree}, ${e.school} (${e.period})${e.detail ? `. ${e.detail}` : ''}`),
    }),
  },
  {
    terms: ['contact', 'email', 'reach', 'get in touch', 'hire', 'interview', 'call', 'phone', 'connect', 'message'],
    answer: () => ({
      text: `Email is the fastest way to reach me: ${profile.email}. I'm also on LinkedIn.`,
      links: [emailLink, linkedinLink],
    }),
  },
  {
    terms: ['open to', 'available', 'availability', 'looking', 'opportunit', 'new role', 'job search', 'interested', 'hiring', 'recruit'],
    answer: () => ({
      text: `I'm open to applied AI and AI-focused software engineering conversations. Email is the best way to start one.`,
      links: [emailLink, resumeLink],
    }),
  },
  {
    terms: ['where', 'location', 'based', 'live', 'relocate', 'relocation', 'remote', 'visa', 'sponsor', 'sponsorship', 'authorization', 'authorized', 'green card', 'citizen', 'country'],
    answer: () => ({
      text: `I'm based in the ${profile.location.replace(/\s*\(.*\)/, '')} and I'm a ${/permanent resident/i.test(profile.location) ? 'US permanent resident, so I don\'t need visa sponsorship' : profile.location}. For remote or relocation details, email me.`,
      links: [emailLink],
    }),
  },
  {
    terms: ['speak', 'spoken', 'languages', 'english', 'russian', 'azerbaijani', 'dutch', 'french', 'turkish', 'multilingual', 'bilingual'],
    answer: () => ({ text: `Languages: ${highlight('Languages') ?? ''}.` }),
  },
  {
    terms: ['award', 'recognition', 'won', 'prize', 'talk', 'speaker', 'speaking', 'conference', 'event', 'community', 'google'],
    answer: () => ({
      text: `Recognition and community:`,
      bullets: recognition.map((r) => `${r.title} (${r.year}). ${r.detail}`).concat([`Events: ${community.join('; ')}`]),
    }),
  },
  {
    terms: ['write', 'writing', 'blog', 'post', 'article', 'linkedin', 'opinion', 'think about', 'view on'],
    answer: () => ({
      text: `I write on LinkedIn about shipping AI that has to be trusted. A few lines:`,
      bullets: posts.map((p) => `"${p.quote}" ${p.summary}`),
      links: [linkedinLink],
    }),
  },
  {
    terms: ['resume', 'cv', 'pdf'],
    answer: () => ({ text: `Here's my resume as a PDF.`, links: [resumeLink] }),
  },
  {
    terms: ['github', 'code sample', 'repo', 'open source'],
    answer: () => ({
      text: `My GitHub is linked below. Most of my production work is private to employers, so the project write-ups on this site are the best summary.`,
      links: [{ label: 'GitHub', href: profile.github }],
    }),
  },
  {
    terms: ['why hire', 'why should', 'good engineer', 'qualified', 'strong candidate', 'good fit', 'stand out', 'different', 'unique', 'fit', 'what makes'],
    answer: () => ({
      text: `I take GenAI from the first stakeholder conversation to a governed production system, and I've done it where mistakes are expensive.`,
      bullets: [about[1], about[2]],
      links: [emailLink],
    }),
  },
  {
    terms: ['governance', 'safety', 'responsible', 'compliance', 'regulat', 'eu ai act', 'dora', 'audit', 'risk', 'bank', 'banking', 'finance'],
    answer: () => ({
      text: `Governance is a big part of my work. At KBC I built the evaluation and safety layer around production agents:`,
      bullets: kbcAgents ? kbcAgents.highlights.slice(0, 2) : [about[1]],
    }),
  },
  {
    terms: ['ai first', 'ai-first', 'workflow', 'how do you work', 'use ai', 'day to day', 'process'],
    answer: () => ({ text: about[3] }),
  },
  {
    terms: ['thank', 'thanks', 'great', 'cool', 'awesome', 'nice', 'bye'],
    answer: () => ({ text: `Thanks for stopping by! If you'd like to talk, email is the fastest way to reach me.`, links: [emailLink] }),
  },
];

// ---------- full-text fallback ----------

type Doc = { text: string; title: string };

const docs: Doc[] = [
  ...experiences.flatMap((e) => e.highlights.map((h) => ({ title: `${e.title}, ${e.company}`, text: h }))),
  ...projects.map((p) => ({ title: p.title, text: p.description })),
  ...earlierProjects.map((p) => ({ title: p.title, text: p.description })),
  ...education.map((e) => ({ title: e.degree, text: `${e.school}. ${e.detail ?? ''} ${e.coursework?.join(', ') ?? ''}` })),
  ...recognition.map((r) => ({ title: r.title, text: r.detail })),
  ...posts.map((p) => ({ title: 'From my writing', text: `${p.quote} ${p.summary}` })),
  ...about.map((a) => ({ title: 'About me', text: a })),
];

const docTokens = docs.map((d) => new Set(tokens(`${d.title} ${d.text}`)));
const df = new Map<string, number>();
docTokens.forEach((set) => set.forEach((t) => df.set(t, (df.get(t) ?? 0) + 1)));
const idf = (t: string) => Math.log(1 + docs.length / (df.get(t) ?? docs.length));

function search(question: string) {
  const qt = [...new Set(tokens(question))];
  return docs
    .map((d, i) => ({ d, score: qt.reduce((sum, t) => sum + (docTokens[i].has(t) ? idf(t) : 0), 0) }))
    .filter((r) => r.score > 1.6)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.d);
}

// ---------- entry point ----------

export function answerQuestion(question: string): Answer {
  const q = normalize(question);
  if (!q) return { text: 'Ask me anything about my experience, skills, or projects.' };

  // A named company gets that role's details.
  const companies = experiences.filter((e) => {
    const name = normalize(e.company.split('(')[0]);
    return has(q, name) || (name === 'kbc group' && has(q, 'kbc'));
  });
  if (companies.length && !has(q, 'now') && !has(q, 'current')) {
    return {
      text: companies.length > 1 ? `I've had ${companies.length} roles there:` : `${companies[0].title} at ${companies[0].company} (${companies[0].period}):`,
      bullets: companies.length > 1 ? companies.map((e) => `${e.title} (${e.period}): ${e.highlights[0]}`) : companies[0].highlights,
    };
  }

  // Best-matching topic. Longer phrases count more, and a term also matches the
  // start of a longer word ("opportunit" matches "opportunities").
  let best: { topic: Topic; score: number } | null = null;
  for (const topic of topics) {
    const score = topic.terms.reduce((s, t) => (has(q, t) || (t.length > 4 && startsWord(q, t)) ? s + t.split(' ').length + 1 : s), 0);
    if (score > 0 && (!best || score > best.score)) best = { topic, score };
  }

  // A named skill: say whether and where I've used it.
  const skills = findSkills(q);
  const asksAboutSkill = /\b(know|use|used|using|familiar|work with|worked with|proficient|comfortable|experience with|experienced in|do you do)\b/.test(q);
  if (skills.length && (asksAboutSkill || !best)) {
    return skills.length === 1
      ? { text: `Yes. ${describeSkill(skills[0])}` }
      : { text: 'Yes, here is where those show up:', bullets: skills.map(describeSkill) };
  }

  // Asking about a specific tool that isn't on the site.
  const experienceTopic = topics.find((t) => t.terms.includes('experience'));
  if (/\b(worked with|experience with|experienced in|familiar with|used|use|know)\b/.test(q) && (!best || best.topic === experienceTopic)) {
    return {
      text: `That isn't listed on my portfolio, so I can't confirm it here. My core stack is Python, TypeScript, React, AWS Bedrock, RAG and MCP. Email me and I'll answer directly.`,
      links: [emailLink],
    };
  }

  if (best) return best.topic.answer(q);

  // Otherwise search everything on the site.
  const hits = search(question);
  if (hits.length) {
    return { text: 'Here is what my portfolio says about that:', bullets: hits.map((h) => `${h.text} (${h.title})`) };
  }

  return {
    text: `I don't have that on my portfolio. Email me and I'll answer directly.`,
    links: [emailLink],
  };
}
