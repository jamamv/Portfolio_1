import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUp, MessageCircle, Sparkles, X } from 'lucide-react';
import { answerQuestion, starterQuestions, type Answer } from '../chat/engine';
import { useReducedMotion } from '../hooks/useMotion';

type Message = { id: number; from: 'user' | 'bot'; text: string; answer?: Answer };

const greeting: Answer = {
  text: "Hi, I'm Jama! Ask me anything about my experience, skills, or projects. I answer from what's on this site.",
};

// Floating chat with "Jama", the portfolio bot. Answers come from src/chat/engine.ts, which runs
// in the browser with no API key. To use an LLM instead, make `ask` call a
// serverless endpoint and return the same Answer shape.
async function ask(question: string): Promise<Answer> {
  return answerQuestion(question);
}

function BotMessage({ answer, onNavigate }: { answer: Answer; onNavigate: () => void }) {
  return (
    <div className="space-y-2">
      <p>{answer.text}</p>
      {answer.bullets && (
        <ul className="space-y-1.5">
          {answer.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {answer.links && (
        <div className="flex flex-wrap gap-2 pt-1">
          {answer.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={l.href.startsWith('#') ? onNavigate : undefined}
              {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              {...(l.href.endsWith('.pdf') ? { download: l.href.split('/').pop() } : {})}
              className="rounded-full border border-accent/30 px-3 py-1 text-xs font-medium text-accent transition hover:bg-accent/10"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AskPortfolio() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: 'bot', text: greeting.text, answer: greeting }]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const reduced = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
  }, [messages, thinking, reduced]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  async function send(question: string) {
    const q = question.trim();
    if (!q || thinking) return;
    setInput('');
    setMessages((m) => [...m, { id: nextId.current++, from: 'user', text: q }]);
    setThinking(true);
    // A short pause so the reply doesn't feel jarring.
    const [answer] = await Promise.all([ask(q), new Promise((r) => setTimeout(r, reduced ? 0 : 350))]);
    setThinking(false);
    setMessages((m) => [...m, { id: nextId.current++, from: 'bot', text: answer.text, answer }]);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  const asked = messages.some((m) => m.from === 'user');

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls="ask-portfolio"
        className={`fixed bottom-4 right-4 z-[60] inline-flex items-center gap-2 rounded-full border border-accent/40 bg-ink/90 px-4 py-3 text-sm font-medium text-fg shadow-[0_8px_30px_rgb(0_0_0/0.5)] backdrop-blur-md transition hover:border-accent hover:text-accent sm:bottom-6 sm:right-6 ${
          open ? 'max-sm:hidden' : ''
        }`}
      >
        {open ? <X size={18} aria-hidden="true" /> : <MessageCircle size={18} className="text-accent" aria-hidden="true" />}
        {open ? 'Close' : 'Ask Jama'}
      </button>

      {open && (
        <div
          id="ask-portfolio"
          role="dialog"
          aria-label="Chat with Jama"
          className="chat-in fixed inset-x-4 bottom-4 z-[60] flex max-h-[min(640px,calc(100dvh-2rem))] flex-col overflow-hidden rounded-3xl border border-line/10 bg-surface/95 shadow-[0_20px_60px_rgb(0_0_0/0.6)] backdrop-blur-xl sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[400px]"
        >
          <header className="flex items-start justify-between gap-3 border-b border-line/10 px-5 py-4">
            <div>
              <p className="flex items-center gap-2 font-display text-lg text-fg">
                <Sparkles size={16} className="text-accent" aria-hidden="true" /> Jama
              </p>
              <p className="text-xs text-muted">My portfolio bot. Answers come from this site, instantly and privately.</p>
            </div>
            <button type="button" onClick={close} className="rounded-full p-1.5 text-muted transition hover:bg-fg/10 hover:text-fg" aria-label="Close chat">
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm leading-relaxed" aria-live="polite">
            {messages.map((m) =>
              m.from === 'user' ? (
                <div key={m.id} className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-fg px-4 py-2.5 text-ink">
                  {m.text}
                </div>
              ) : (
                <div key={m.id} className="mr-6 rounded-2xl rounded-bl-md border border-line/10 bg-raised px-4 py-3 text-fg/90">
                  <BotMessage answer={m.answer!} onNavigate={() => setOpen(false)} />
                </div>
              )
            )}
            {thinking && (
              <div className="flex w-fit gap-1 rounded-2xl rounded-bl-md border border-line/10 bg-raised px-4 py-3" aria-label="Thinking">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="typing-dot h-1.5 w-1.5 rounded-full bg-muted" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            )}
            {!asked && (
              <div className="flex flex-wrap gap-2 pt-1">
                {starterQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => void send(q)}
                    className="rounded-full border border-line/15 px-3 py-1.5 text-left text-xs text-muted transition hover:border-accent/50 hover:text-fg"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line/10 p-3">
            <label htmlFor="ask-input" className="sr-only">
              Your question
            </label>
            <input
              id="ask-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, roles, projects…"
              autoComplete="off"
              maxLength={300}
              className="min-w-0 flex-1 rounded-full border border-line/10 bg-ink/60 px-4 py-2.5 text-base text-fg placeholder:text-muted/70 focus:border-accent/50 focus:outline-none sm:text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || thinking}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-fg text-ink transition hover:bg-accent disabled:opacity-40 disabled:hover:bg-fg"
              aria-label="Send"
            >
              <ArrowUp size={18} aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
