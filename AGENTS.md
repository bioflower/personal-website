# Personal Website

## Project purpose

This repository contains a minimalist personal website.

The first version should include:

- A landing page introducing me
- A résumé section with a link to a PDF
- An articles page for future blog posts
- Static deployment through AWS Amplify

The website should showcase thoughtful engineering and design while avoiding
confidential information from previous work.

## Technology

- React
- Vite
- JavaScript
- Plain CSS
- ESLint
- Prettier
- GitHub
- AWS Amplify Hosting

Do not add Django, a database, authentication, or a backend unless explicitly
requested.

## Code organization

- Put reusable components in `src/components/`.
- Put page-level components in `src/pages/`.
- Put global styles in `src/index.css`.
- Keep components small and focused.
- Use functional React components.
- Prefer named components over large anonymous inline components.
- Avoid unnecessary dependencies.
- Avoid premature abstractions.

## Design principles

- Minimalist and spacious
- Clear visual hierarchy
- Responsive on mobile and desktop
- Accessible semantic HTML
- Keyboard-accessible navigation
- Readable typography
- Restrained animation
- Fast page loading

Avoid:

- Excessive gradients
- Glassmorphism
- Large dependency-heavy UI frameworks
- Generic dashboard styling
- Unnecessary animations
- Decorative elements that reduce readability

## Development workflow

Before changing code:

1. Inspect the relevant existing files.
2. Explain the intended change briefly.
3. Prefer the smallest change that satisfies the task.

After changing code, run:

```bash
npm run lint
npm run build
```

Fix errors before declaring the task complete

Do not run deployment commands, publish packages, push to GitHub, or modify remote infrastructure without explicit approval 

## Git Practices
- Do not commit automatically
- Do not fun `git push`
- Do not rewrite Git history
- Keep generated files such as `dist/` out of Git
- Use clear and focused changes
- Suggest a concise commit message after completing as task

## Content rules
- Do not invent biographical details, employment history, achievements, or contact information
- Use visible placeholders when content has not been provided
- Store the public resume PDF under `public/`
- Articles may initially be represented by local static data or Markdown files

## Communication
- Explain important React concepts when introducing them
- After each request, tell me which files were changed
- Keep explanations practical, succint and concise
- Point out assumptions in a meaningful way but also succint and concise