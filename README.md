# Jamila Musayeva · Portfolio

Personal portfolio site for Jamila Musayeva, Applied AI & Software Engineer.

Built with React, TypeScript, Vite, and Tailwind CSS.

## Running locally

```bash
npm install
npm run dev      # start the dev server at http://localhost:5173
npm run build    # production build into dist/
npm run lint     # ESLint
```

## Updating content

All text lives in [`src/data/portfolio.ts`](src/data/portfolio.ts): profile, about, skills, experience, and projects. Layout code in `src/App.tsx` and `src/components/` reads from it, so content changes never require touching markup.

- **Resume:** replace `public/Jamila_Musayeva_CV.pdf` (keep the file name, or update `profile.resume`).
- **Project links:** set `github` or `live` on a project to show a link button; leave them out to hide it.
- **Phone number:** set `profile.phone` to show it in the contact section.

## Structure

```
public/            static files (favicon, CV)
src/data/          all site content
src/components/    Navbar and shared Section layout
src/App.tsx        page sections
```

## Ask my portfolio (chatbot)

The chat button in the bottom-right corner answers visitors' questions about my experience, skills, and projects.

- **No API key, no cost.** Answers are computed in the browser by matching the question against `src/data/portfolio.ts` (`src/chat/engine.ts`). Nothing is sent to a server.
- **Stays up to date.** Edit `src/data/portfolio.ts` and the bot's answers change with it.
- **Tuning answers.** Add phrasings to a topic's `terms` in `src/chat/engine.ts`, or a new entry to `skillAliases`. Starter questions are in `starterQuestions`.

### Upgrading to a real LLM later (optional)

`ask()` in `src/components/AskPortfolio.tsx` is the single place answers come from. To use an LLM:

1. Add a Vercel serverless function (e.g. `api/ask.ts`) that sends the question plus the contents of `portfolio.ts` to an LLM API and returns `{ text }`.
2. Store the API key as an environment variable in Vercel (Settings → Environment Variables), never in the code.
3. Make `ask()` call `/api/ask`, falling back to `answerQuestion()` if the request fails.
4. Add rate limiting, since a public endpoint spends money on every question.
