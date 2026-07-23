# Personal Website

A minimalist personal website built with React, Vite, and plain CSS, deployed on AWS Amplify.

## Sections

- **About** — intro, bio summary, links to resume PDF and notes
- **Skills** — technical skill domains and tools
- **Experience** — professional experience timeline
- **Contact** — contact details and message form
- **Notes** — (coming soon) future blog posts

## Tech stack

- React 19
- Vite
- JavaScript (no TypeScript)
- Plain CSS (no framework)
- ESLint + Prettier
- AWS Amplify Hosting

## Development

```bash
npm run dev     # start dev server
npm run build   # production build
npm run lint    # run ESLint
npm run preview # preview production build
```

## Deployment

Deployed via AWS Amplify. Requires a rewrite rule sending all requests to `index.html` for client-side routing to work (see AGENTS.md for details).
