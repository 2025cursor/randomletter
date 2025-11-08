# Repository Guidelines

## Project Structure & Module Organization
The Next.js 14 codebase lives in `app/`, and every generator feature sits in its own route folder (for example, `app/password-generator/page.tsx`). Global layout, metadata, and styling are centralized in `app/layout.tsx`, `app/manifest.ts`, and `app/globals.css`. Static assets reside in `public/`, while deployment and SEO files (`next.config.js`, `vercel.json`, `SEO.md`, `robots.ts`, `sitemap.ts`) stay at the repository root. Add new UI by creating a sibling directory under `app/` so routing remains predictable.

## Build, Test, and Development Commands
- `npm run dev` – start the local development server at `http://localhost:3000`.
- `npm run build` – produce the optimized production build used by Vercel.
- `npm run start` – serve the built app locally, mirroring the deployment runtime.
- `npm run lint` – run the Next.js ESLint preset; fixes simple issues automatically when paired with `--fix`.

## Coding Style & Naming Conventions
Use TypeScript with React function components and hooks. Keep exported components in PascalCase files and route folders in kebab-case. Match the existing two-space indentation, single quotes, and trailing commas. Co-locate feature utilities within their route folder, and run `npm run lint` before pushing to align with `eslint-config-next`.

## Testing Guidelines
Automated tests are not yet configured. When adding them, set up Jest through `next/jest` with React Testing Library and expose the runner as `npm test`. Store specs close to features (`app/<route>/__tests__/*.test.tsx`), target 80% coverage on new logic, and record deliberate gaps in the PR. Until then, exercise core flows manually (`npm run dev`, toggle dark mode, copy results) and include the steps you covered.

## Commit & Pull Request Guidelines
Follow the conventional commits pattern seen in history (`feat:`, `chore:`, `fix:`). Keep subjects under 72 characters, use the imperative mood, and add detail in the body when context helps reviewers. Pull requests should include a concise change summary, linked issues, screenshots for UI changes, and manual test notes. Rebase onto `main` before requesting review to keep history linear.

## Environment & Deployment Tips
Copy `.env.example` to `.env.local` for local secrets (`cp .env.example .env.local`) and document additions in the example file. Verify production readiness with `npm run build`, and double-check that metadata updates land in `public/` and `SEO.md`. Vercel reads from `vercel.json`, so limit unrelated config edits in feature branches.
