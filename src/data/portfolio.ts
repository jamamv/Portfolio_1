// All site content lives here, so updating the portfolio never requires
// touching layout code. Edit this file to change text, skills, or projects.

export const profile = {
  name: 'Jamila Musayeva',
  role: 'Applied AI & Software Engineer',
  headline: 'Taking GenAI agents from stakeholder discovery to governed production',
  summary:
    'I led 3 enterprise GenAI agents in regulated banking, associated with $1.3M in audited annualized efficiency benefits. Now I build customer-facing products at OPENLANE with an AI-first workflow.',
  location: 'USA (Permanent Resident)',
  email: 'musayevajama@gmail.com',
  // Set to a string to show a phone number on the page. Left out by default for privacy.
  phone: undefined as string | undefined,
  linkedin: 'https://www.linkedin.com/in/jamilamusayeva/',
  github: 'https://github.com/jamamv',
  // The PDF lives in /public under this exact name.
  resume: '/Jamila_Musayeva_CV.pdf',
  currentCompany: 'OPENLANE',
  // Portrait in /public. Replace the file to change the photo.
  photo: '/jamila.webp',
};

// Animated counters under the hero headline.
export type Stat = { value: number; decimals?: number; prefix?: string; suffix?: string; label: string };

export const stats: Stat[] = [
  { value: 1.3, decimals: 1, prefix: '$', suffix: 'M', label: 'audited annual benefits from GenAI agents' },
  { value: 12000, suffix: '+', label: 'employees with access to agents I led' },
  { value: 3, label: 'production GenAI agents as tech lead' },
  { value: 15, label: 'repositories in my AI knowledge graph' },
];

export const about = [
  "I'm an applied AI and software engineer who takes generative AI from a stakeholder conversation to a governed production system. Most of my career has been in places where correctness matters: regulatory reporting and enterprise AI at KBC Group, and now customer-facing products at OPENLANE.",
  'At KBC I was technical lead for 3 production GenAI agents used by 12,000+ employees, with €1.2M+ ($1.3M) in audited annualized efficiency benefits. I built the evaluation and governance around them as well: LLM-as-judge assessments, golden-question benchmarks, human-in-the-loop approvals, and audit trails aligned with the EU AI Act and DORA.',
  'Before AI, I was a backend engineer building Java and SQL ETL pipelines for IFRS 9 and ECB reporting, and before that I resolved production incidents for a BI SaaS platform. That path means I care as much about observability, rollbacks, and runbooks as about the model.',
  'Today I work AI-first: Claude Code for codebase reasoning and planning, OpenAI Codex for execution, and MCP integrations that put tools like Honeycomb directly in the loop.',
];

export const highlights = [
  { label: 'Experience', value: '3.5+ years' },
  { label: 'Impact', value: '$1.3M audited annual benefits from GenAI agents' },
  { label: 'Education', value: 'MSc Information Management (Cum Laude) and BEng, KU Leuven' },
  { label: 'Recognition', value: 'Speaker at The Edge 2026, Google Brussels' },
  { label: 'Languages', value: 'English, Russian, Azerbaijani (native) · Dutch, French, Turkish (working)' },
];

export type SkillGroup = { category: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    category: 'AI & Agentic Engineering',
    items: ['Agent orchestration', 'Multi-agent systems', 'RAG', 'Tool calling', 'MCP', 'Context engineering', 'Knowledge graphs', 'LLM evaluation', 'AI guardrails', 'LangChain', 'LangGraph'],
  },
  {
    category: 'AI Platforms & Dev Tools',
    items: ['Claude Code', 'OpenAI Codex', 'AWS Bedrock', 'Azure OpenAI', 'OpenAI API', 'Azure AI Foundry', 'Copilot Studio', 'Power Automate'],
  },
  { category: 'Programming & Full-Stack', items: ['Python', 'TypeScript', 'Java', 'SQL', 'React', '.NET', 'Node.js', 'Spring Boot'] },
  { category: 'Cloud & Production', items: ['AWS', 'Azure DevOps', 'Docker', 'Jenkins', 'Git', 'CI/CD', 'Distributed tracing', 'Honeycomb'] },
  { category: 'Databases & APIs', items: ['PostgreSQL', 'Oracle', 'MongoDB', 'REST APIs', 'OpenAPI', 'Swagger'] },
];

export type Experience = {
  title: string;
  company: string;
  period: string;
  highlights: string[];
  technologies: string[];
};

export const experiences: Experience[] = [
  {
    title: 'AI Software Engineer',
    company: 'OPENLANE',
    period: 'Aug 2026 – Present',
    highlights: [
      'Shipped 12+ dealer-facing features and closed 50+ tickets across React/TypeScript and .NET, partnering with Product, UX, Customer Success, and dealers from discovery through post-launch adoption.',
      'Cut investigation time for customer-reported production failures from 2–3 hours to ~20 minutes by integrating Honeycomb with Codex via MCP to analyze distributed traces.',
      'Architected a team-adopted, AI-queryable knowledge graph across 15 repositories, saving ~2 hours of impact analysis per feature, plus a knowledge-layer agent that answers engineering questions with confidence scores.',
      'Built custom AI skills adopted by Product and Engineering leadership for capability discovery, cross-repo dependency analysis, and turning business requirements into engineering-ready tickets.',
    ],
    technologies: ['React', 'TypeScript', '.NET', 'Claude Code', 'Codex', 'MCP', 'Honeycomb'],
  },
  {
    title: 'AI Software Engineer (Technical Lead), GenAI & Agentic Systems',
    company: 'KBC Group',
    period: 'Aug 2025 – Aug 2026',
    highlights: [
      'Technical lead for 3 production GenAI agents with €1.2M+ ($1.3M) in audited annualized benefits and access for 12,000+ employees; contributed to 7 enterprise agentic AI cases.',
      'Established evaluation and governance safeguards (LLM-as-judge, golden-question benchmarks, evaluator agents, human-in-the-loop, audit trails) aligned with the EU AI Act and DORA.',
      'Pioneered an agentic use case on Claude Code and AWS Bedrock with multi-model routing, SharePoint / Confluence / ServiceNow connectors, and a 3-stage RAG pipeline over 10,000 documents.',
      'Cut monthly CFO report preparation from ~3 days to ~4 hours with a Copilot Studio agent, and eliminated ~40% of manual lookups with a RAG knowledge assistant over ~5,000 documents.',
      'Led delivery across DEV/ACC/PROD, lowered inference costs ~30% through model selection and token optimization, and mentored 2 engineers.',
    ],
    technologies: ['Python', 'AWS Bedrock', 'Azure OpenAI', 'RAG', 'Copilot Studio', 'Power Automate', 'GitHub CI/CD'],
  },
  {
    title: 'AI Benchmark Engineer (Freelance)',
    company: 'Alignerr',
    period: 'Feb 2025 – Present',
    highlights: [
      'Train and evaluate frontier LLMs with rubric-based ratings for factuality, completeness, and coherence.',
      'Provide human-in-the-loop feedback, prompt evaluation, and data annotation for generative AI model tasks.',
      'Hold labeled outputs to strict guidelines and reliability metrics such as benchmark consistency and minimal rework.',
    ],
    technologies: ['LLM evaluation', 'Rubric design', 'Human-in-the-loop', 'Data annotation'],
  },
  {
    title: 'Software Engineer',
    company: 'KBC Group',
    period: 'Sep 2024 – Jul 2025',
    highlights: [
      'Delivered 17 high-priority features ahead of ECB deadlines: REST APIs, CI/CD pipelines, and dependency-aware regression tests.',
      'Built a nightly ETL pipeline processing ~2M contract records for the migration to a new regulatory reporting platform.',
      'Engineered Java and SQL ETL pipelines for IFRS 9 and regulatory reporting across 10+ legal entities.',
      'Refactored a 30K-line Java calculation engine, modularizing 18 interdependent trigger handlers while preserving calculation integrity.',
    ],
    technologies: ['Java', 'SQL', 'Oracle', 'Jenkins', 'Maven', 'Docker'],
  },
  {
    title: 'Technical Support Engineer',
    company: 'Luzmo (SaaS BI Analytics)',
    period: 'Mar 2023 – Aug 2024',
    highlights: [
      'Resolved 200+ high-priority production incidents across data ingestion pipelines, API integrations, and customer environments.',
      'Designed real-time observability dashboards tracking 25+ operational KPIs with automated alerting.',
      'Authored 35+ technical playbooks and API runbooks for a platform serving 1,200+ users.',
    ],
    technologies: ['AWS CloudWatch', 'REST APIs', 'Observability'],
  },
];

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  icon: 'bot' | 'network' | 'search' | 'graduation';
  // Leave empty to hide the link button.
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: 'Enterprise GenAI Agents in Regulated Banking',
    description:
      'Three production agents for Finance and Compliance at KBC, from discovery to rollout for 12,000+ employees, with an evaluation and governance layer built for the EU AI Act and DORA.',
    technologies: ['AWS Bedrock', 'RAG', 'LLM-as-judge', 'Human-in-the-loop'],
    icon: 'bot',
  },
  {
    title: 'Cross-Repository Knowledge Graph',
    description:
      'An AI-queryable map of endpoints and downstream dependencies across 15 repositories, with an agent that answers engineering questions from normalized evidence and reports its confidence.',
    technologies: ['Knowledge graphs', 'Agents', 'Graphify'],
    icon: 'network',
  },
  {
    title: 'Trace-Driven Incident Debugging via MCP',
    description:
      'Connected Honeycomb to Codex through MCP so failing spans can be compared against successful paths automatically, cutting investigations from hours to ~20 minutes.',
    technologies: ['MCP', 'Honeycomb', 'Distributed tracing'],
    icon: 'search',
  },
  {
    title: 'Bayesian-Neural Hybrid for Insurance Claims',
    description:
      'Master thesis at KU Leuven. A multitask framework in PyTorch and TensorFlow predicting claim frequency and severity, with parametric distribution layers for interpretability on sparse data.',
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'Bayesian modeling'],
    icon: 'graduation',
  },
];

export type Education = { degree: string; school: string; period: string; detail?: string; coursework?: string[] };

export const education: Education[] = [
  {
    degree: 'MSc Information Management: Software Engineering',
    school: 'KU Leuven',
    period: 'Sep 2024 – Jun 2025 · Cum Laude',
    detail: 'Thesis: multi-task deep learning to predict insurance claim frequency and severity.',
    coursework: [
      'Data Science for Business',
      'Data Visualization',
      'AI Ethics & Regulations',
      'Information Retrieval & Search Engines',
      'ICT Service Management',
      'Requirements Engineering & Domain Modelling',
      'Business Analysis',
      'Project Management',
      'Survey Methodology',
    ],
  },
  {
    degree: 'BEng Technology: Software Engineering, ICT & Smart Electronics',
    school: 'KU Leuven, Group T Campus',
    period: 'Sep 2020 – Jun 2024',
    coursework: [
      'Software Engineering',
      'Operating Systems',
      'Computer Architecture',
      'Communication Networks',
      'Web Technology',
      'Data Engineering',
      'Data Management',
      'Statistics',
      'Human-Computer Interaction',
      'Systems & Control Theory',
      'Computational Thinking',
    ],
  },
];

export type Recognition = { title: string; detail: string; year: string };

export const recognition: Recognition[] = [
  {
    title: 'Speaker, The Edge 2026 at Google Brussels',
    detail: 'Spoke on human-AI collaboration in enterprise at a sold-out GDG KU Leuven event.',
    year: '2026',
  },
  {
    title: 'Best Data Visualization, Data 4 Good Challenge',
    detail: 'Won among 160 participants with a waste-management data solution, judged by McKinsey, KBC, and DataCamp.',
    year: '2023',
  },
];

// AI community events, shown as a compact list.
export const community = [
  'North East AI Agents Day at Jane Street (NYC AI Week)',
  'Miami AI Build Night with Google DeepMind',
  'AI & Business Scaling Summit NYC',
  'LLM Knowledge Bases & AI Memory, The AI Alliance (IBM)',
  'Women in AI Benelux',
];

export type Post = { quote: string; summary: string; url: string };

// Short excerpts from LinkedIn posts, linking to the full post.
export const posts: Post[] = [
  {
    quote: 'Shipping an AI agent takes a weekend. Shipping one inside a regulated institution takes months.',
    summary: 'Why the gap between demo and production is regulatory and human, not technical.',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7447276812180537344/',
  },
  {
    quote: "You don't have a model problem. You have a data debt problem.",
    summary: 'Clean data, solid architecture, and sensible retrieval come before model choice.',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7441512403458101248/',
  },
  {
    quote: 'The hard part of agents is shifting from "can the model reason?" to "can the system survive reality?"',
    summary: 'Takeaways from North East AI Agents Day at Jane Street on reliability and silent failure.',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7459628014385913856/',
  },
  {
    quote: "A model that tells you when it's not the right tool is one you'll keep coming back to.",
    summary: 'Miami AI Build Night with Google DeepMind, and why knowledge graphs beat long context for code.',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7524327515490889728/',
  },
];

export type SideProject = { title: string; description: string; technologies: string[] };

// University and earlier engineering projects, shown as a compact list under the featured projects.
export const earlierProjects: SideProject[] = [
  {
    title: 'Smart Bus System',
    description:
      'Led a team of 4 building an automated bus control system: Raspberry Pi and Arduino sensors for obstacle detection and temperature, plus a real-time web app for monitoring and route management.',
    technologies: ['Python', 'Django', 'MongoDB', 'Celery', 'Docker', 'IoT'],
  },
  {
    title: 'Embedded Home Automation Gateway',
    description:
      'A home automation master node and sensor gateway on ESP32-S3, with thread-safe FreeRTOS tasks, a TCP server syncing sensor data to SQL, crash consistency, and detailed logging.',
    technologies: ['C/C++', 'ESP32-S3', 'FreeRTOS', 'TCP/IP', 'SQL'],
  },
  {
    title: 'FPGA Hexadecimal Editor',
    description:
      'A hex editor on the PYNQ-Z1 board with sub-5 ns read/write latency through pipelining, plus parity and checksum error detection.',
    technologies: ['VHDL', 'Vivado', 'FPGA'],
  },
  {
    title: 'Process Optimization Dashboards',
    description:
      'Led a team of 5 on Celonis process mining across manufacturing sites to find supply-chain bottlenecks, with automated ERP data pipelines and live Tableau dashboards.',
    technologies: ['Celonis', 'Python', 'SQL', 'Tableau'],
  },
  {
    title: 'Resource Allocation Platform',
    description: 'A Google Cloud platform for server capacity planning whose automated pipelines improved resource efficiency by 30%.',
    technologies: ['Python', 'SQL', 'Google Cloud', 'Tableau'],
  },
];
