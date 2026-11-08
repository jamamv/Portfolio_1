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
